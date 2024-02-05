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

        <div class="Addons">
          <div class="selective">
            <p class="text-body-small-medium medium">SELECT TYPE</p>
            <div class="flexed-select">
              <div
                class="select-type"
                v-for="(select, index) in data?.AddonSelections"
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
              <div class="multiChoice">
                <NewSelectAddons
                  v-for="(food, index) in data?.AddonFoods"
                  :key="index"
                  :name="food.name"
                  :price="food.price"
                  :selectedNames="localSelectedNames"
                  @addToSelected="addToSelected(food.name, food.price)"
                  @removeFromSelected="removeFromSelected(food.name, food.price)"
                />

                <p>{{ totalPriceWithQuantity }}</p>
                <p>{{ localSelectedNames }}</p>
                <p>{{ localTotalPrice }}</p>
              </div>
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
            class="bold text-button-standard standard"
            @clickButton="addAddons()"
            buttonText="Add-ons"
            :isLoading="isLoading"
            :showText="true"
            size="standard"
            type="primary"
            :disabled="data?.Addons && !selectedCard"
          >
            <template v-slot:price>
              <p class="text-body-large-bold bolder">(₦{{ finalPrice }})</p>
            </template>
          </DynamicButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch, computed } from "vue";
import { cancel } from "../utils/svg";
import { useCartStore } from "~/stores/index.js";
const cartStore = useCartStore();
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
  data: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["closeEditModal", "closed"]);
const modalCounter = ref(true);
const selectedCard = ref("");
const isLoading = ref(false);
const slotNeeded = ref(true);
const selectedFoods = ref([]);
const totalPrice = ref(0);
const selectedNames = ref([]);
const addonFoods = ref(props.data?.AddonFoods ?? []);
const localSelectedNames = ref([]);
const localTotalPrice = ref(0);

selectedNames.value.forEach((name) => {
  const food = addonFoods.value.find((item) => item.name === name);
  if (food) {
    totalPrice.value += food.price;
  }
});

const addToSelected = (name, price) => {
  if (!localSelectedNames.value.includes(name)) {
    localSelectedNames.value.push(name);
    localTotalPrice.value += price;
  }
};
const removeFromSelected = (name, price) => {
  const index = localSelectedNames.value.indexOf(name);
  if (index !== -1) {
    localSelectedNames.value.splice(index, 1);
    localTotalPrice.value -= price;
  }
};
const updateTotalPrice = () => {
  localTotalPrice.value = props.data.selectedPrice;
  localSelectedNames.value.forEach((name) => {
    const food = addonFoods.value.find((item) => item.name === name);
    if (food) {
      localTotalPrice.value += food.price;
    }
  });
};
const closed = (e) => {
  emit("closed");
};

const quantity = ref(props.data?.quantity || 1);
const finalPrice = computed(() => {
  return (localTotalPrice.value + props?.data?.pricePerUnit) * quantity.value;
});
const increaseQuantity = () => {
  quantity.value += 1;
};
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};

const totalPriceWithQuantity = computed(() => {
  return localTotalPrice.value * quantity.value;
});

const addAddons = () => {
  selectedNames.value = [...localSelectedNames.value];
  totalPrice.value = localTotalPrice.value;
  const index = cartStore.carts.findIndex((item) => item.id === props.data.id);
  if (index !== -1) {
    cartStore.carts[index].selectedItem = selectedCard.value;
    cartStore.carts[index].quantity = quantity.value;
    cartStore.carts[index].selectedNames = selectedNames.value;
    cartStore.carts[index].selectedPrice = totalPrice.value;
    cartStore.carts[index].TotalselectedPrice =
      totalPrice.value * cartStore.carts[index].quantity;
    cartStore.carts[index].productPrice =
      cartStore.carts[index].pricePerUnit * quantity.value;
    cartStore.carts[index].price =
      cartStore.carts[index].pricePerUnit * cartStore.carts[index].quantity +
      cartStore.carts[index].TotalselectedPrice;
    cartStore.carts[index].totalPerUnit =
      cartStore.carts[index].price / cartStore.carts[index].quantity;
    cartStore.saveToLocalStorage();
  }
  selectedFoods.value = [];
  emit("closed");
};

const selectItem = (value) => {
  selectedCard.value = value;
};

onMounted(() => {
  if (props.data) {
    selectedCard.value = props.data.selectedItem;
    quantity.value = props.data.quantity;
  }
  if (props.data && props.data.selectedNames) {
    localSelectedNames.value = [...props.data.selectedNames];
    updateTotalPrice();
  }
});

watch(
  () => props.data,
  (newValue, oldValue) => {
    if (newValue) {
      selectedCard.value = newValue.selectedItem;
      quantity.value = newValue.quantity;
    }
    if (newValue && newValue.selectedNames) {
      localSelectedNames.value = [...newValue.selectedNames];
      updateTotalPrice();
    }
  }
);
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
