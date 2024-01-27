<template>
  <div class="container">
    <div class="modal-content">
      <!-- Close button -->
      <div class="cancel-btn">
        <div class="cancel" @click="closed">
          <div class="minus-icon" v-html="cancel"></div>
        </div>
      </div>

      <!-- Product Image -->
      <div class="image-cont">
        <DynamicImage :imageUrl="formData?.image" :isModalView="true" />
      </div>

      <!-- Product Details -->
      <div class="product-details">
        <!-- Product Details Component -->
        <template v-if="formData">
          <ProductDetails class="details" :product="formData" />
        </template>

        <!-- Addons -->
        <div class="Addons" v-if="formData?.addons">
          <!-- Select Types -->
          <div class="selective">
            <p class="text-body-small-medium medium">SELECT TYPE</p>
            <div class="flexed-select">
              <div
                class="select-type"
                v-for="(select, index) in formData?.selectedItem"
                :key="index"
              >
                <!-- Select Component -->
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

          <!-- Addons Selection -->
          <div class="addMore">
            <div class="added">
              <p class="text-body-small-medium medium">ADD ADD-ONS</p>
              <div class="multiChoice">
                <!-- SelectAddons Component -->
                <SelectAddons
                  v-for="food in formData?.addons"
                  :key="food?.name"
                  :name="food?.name"
                  :price="food?.price"
                  :selectedFoods="selectedFoods"
                  @toggleSelection="toggleSelection"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Quantity Counter and Add Button -->
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
import { ref, defineProps, defineEmits, computed } from "vue";
import { cancel } from "../../utils/svg";
import { useCartStore } from "~/stores/index.js";

const props = defineProps({
  formData: {
    type: Object,
    default: null, 
  },
});

const emit = defineEmits(["closed", "cartItem", "addToCart"]);

const modalCounter = ref(true);
const selectedCard = ref("");
const isLoading = ref(false);
const slotNeeded = ref(true);
const selectedFoods = ref([]);


const populateEditData = () => {
  if (props.formData) {
    selectedCard.value = props?.formData.selectedItem;
    selectedFoods.value = props?.formData.addons;
  }
};
const selectItem = (value) => {
  selectedCard.value = value;
  console.log(value);
};
const quantity = ref(props?.formData?.quantity);

const increaseQuantity = () => {
  quantity.value += 1;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};

const totalPrice = ref(props?.formData?.selectedPrice);

const toggleSelection = (food) => {
  const index = selectedFoods.value.findIndex((item) => item.name === food.name);

  if (index === -1) {
    selectedFoods.value.push(food);
    totalPrice.value += food.price;
  } else {
    selectedFoods.value.splice(index, 1);
    totalPrice.value -= food.price;
  }
};

const totalAddonPrice = computed(() => totalPrice.value * quantity.value);

const buttonPrice = computed(() => {
  const basePrice = props?.formData?.productPrice * quantity.value;
  return basePrice + totalAddonPrice.value;
});

const pricePerUnit = computed(() => props?.formData?.productPrice);

const totalPerUnit = computed(() => buttonPrice.value / quantity.value);

const addToCart = () => {
  const cartItem = {
    id: Date.now(),
    name: props.formData.name,
    image: props.formData.image,
    snippet: props.formData.snippet,
    price: buttonPrice.value,
    productPrice: props.formData.productPrice,
    addon: selectedFoods.value.map((addon) => addon.name),
    addons: selectedFoods.value.map((addon) => ({
      name: addon.name,
      price: addon.price,
    })),
    selectedFood: selectedFoods.value.map((addon) => addon.name),
    selectedPrice: totalPrice.value,
    selectedItem: selectedCard.value,
    quantity: quantity.value,
    pricePerUnit: pricePerUnit.value,
    totalPerUnit: totalPerUnit.value,
  };
  emit("addToCart", cartItem);
};

const closed = () => {
  emit("closed");
};


populateEditData();
</script>

<style scoped>
.container{
  width: 500px;
}
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
  gap: 32px;
  flex-direction: column;
}

.Addons {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  flex-direction: column;
}
</style>
