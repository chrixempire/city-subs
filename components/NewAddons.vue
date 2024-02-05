<template>
  <div class="container">
    <div class="modal-content">
      <div class="cancel-btn">
        <div class="cancel" @click="closed">
          <div class="minus-icon" v-html="cancel"></div>
        </div>
      </div>
      <div class="image-cont">
        <DynamicImage :imageUrl="data?.image" :isModalView="true" />
      </div>
      <div class="product-details">
        <template v-if="data">
          <ProductDetails class="details" :product="data" />
        </template>

        <div class="Addons" v-if="data?.Addons">
          <div class="selective">
            <p class="text-body-small-medium medium">SELECT TYPE</p>
            <div class="flexed-select">
              <div
                class="select-type"
                v-for="(select, index) in data?.Addons?.selections"
                :key="index"
              >
                <DynamicSelect
                  :data="select"
                  :selectedItem="selectedCard"
                  @selectItem="selectItem"
                  :slotNeeded="slotNeeded"
                >
                  <template v-slot:image>
                    <DynamicImage :imageUrl="select?.image" :isModalView="true" />
                  </template>
                </DynamicSelect>
              </div>
            </div>
          </div>
          <div class="addMore">
            <div class="added">
              <p class="text-body-small-medium medium">ADD ADD-ONS</p>
              <ul class="multiChoice">
                <NewSelectAddons
                  v-for="(food, index) in data?.Addons?.foods"
                  :key="index"
                  :name="food.name"
                  :price="food.price"
                  :selectedNames="selectedNames"
                  @addToSelected="addToSelected(food.name, food.price)"
                  @removeFromSelected="removeFromSelected(food.name, food.price)"
                />
              </ul>
            </div>
          </div>
        </div>

        <div class="btn-ctn">
          <ProductCounterBtn
            :quantity="quantity"
            :modalCounter="modalCounter"
            @increaseQuantity="increaseQuantity"
            @decreaseQuantity="decreaseQuantity"
            class="count"
          />
          <DynamicButton
            class="bolder text-button-standard standard"
            @clickButton="addToCart"
            buttonText="Add"
            :isLoading="isLoading"
            :showText="true"
            size="standard"
            type="primary"
            :disabled="data?.Addons && !selectedCard"
          >
            <template v-slot:price>
              <p class="text-body-large-bold bolder">(₦{{ buttonPrice }})</p>
            </template>
          </DynamicButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useCartStore } from "~/stores/index.js";
import { cancel } from "../../utils/svg";
const modalCounter = ref(true);
const selectedCard = ref("");
const isLoading = ref(false);

const slotNeeded = ref(true);
const selectItem = (value) => {
  selectedCard.value = value;
  console.log(value);
};
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["closed", "cartItem", "addToCart"]);
const closed = (e) => {
  emit("closed");
};

const quantity = ref(1);
const increaseQuantity = () => {
  quantity.value += 1;
  console.log(quantity.value);
};
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
    console.log(quantity.value);
  }
};

const totalPrice = ref(0);

const selectedNames = ref([]);
const addonFoods = ref(props.data?.Addons?.foods ?? []);



selectedNames.value.forEach(name => {
  const food = addonFoods.value.find(item => item.name === name);
  if (food) {
    totalPrice.value += food.price;
  }
});

const addToSelected = (name, price) => {
  if (!selectedNames.value.includes(name)) {
    selectedNames.value.push(name);
    totalPrice.value += price;
  }
};

const removeFromSelected = (name, price) => {
  const index = selectedNames.value.indexOf(name);
  if (index !== -1) {
    selectedNames.value.splice(index, 1);
    totalPrice.value -= price;
  }
};

const totalAddonPrice = computed(() => {
  const addonPrice = totalPrice.value * quantity.value;
  return addonPrice;
});

const buttonPrice = computed(() => {
  const basePrice = props?.data?.price * quantity.value;
  return basePrice + totalAddonPrice.value;
});

const basePrice = computed(() => {
  const productPrice = props?.data?.price * quantity.value;
  return productPrice;
});

const pricePerUnit = computed(() => {
  return basePrice.value / quantity.value;
});
const totalPerUnit = computed(() => {
  return buttonPrice.value / quantity.value;
});

const addToCart = () => {
  const cartItem = {
    id: Date.now(),
    name: props.data.name,
    image: props.data.image,
    snippet: props.data.snippet,
    price: buttonPrice.value,
    productPrice: basePrice.value,
    selectedNames: selectedNames.value,
    AddonFoods: props.data.Addons?.foods ?? [],
    AddonSelections: props.data.Addons?.selections ?? [],
    selectedPrice: totalPrice.value,
    TotalselectedPrice: totalAddonPrice.value,
    selectedItem: selectedCard.value,
    quantity: quantity.value,
    pricePerUnit: pricePerUnit.value,
    totalPerUnit: totalPerUnit.value,
  };

  emit("addToCart", cartItem);
};
</script>

<style scoped>
.modal-content {
  padding-bottom: 24px;
}

.cancel {
  background: var(--grey---grey6);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-left: auto;
  cursor: pointer;
}

.btn-ctn {
  display: flex;
  align-items: center;
  gap: 48px;
  width: 100%;
}

button svg {
  width: 16px;
  height: 16px;
}

.image-cont {
  padding: 16px 0px;
}

.product-details {
  padding-top: 16px;
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-direction: column;
}

.selective p {
  color: var(--grey---grey1);
}

.added {
  display: flex;
  flex-direction: column;
  gap: 32px;
  /* justify-content: center; */
  align-items: flex-start;
}

.selective {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-direction: column;
}

.select-type {
  width: 224px;
}

.flexed-select {
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 24px;
}

.multiChoice {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.Addons {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  flex-direction: column;
}
</style>
