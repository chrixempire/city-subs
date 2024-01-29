<template>
  <div class="container">
    <div class="modal-content">
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
              <SelectAddons
                v-for="food in data?.AddonFoods"
                :key="food?.name"
                :name="food?.name"
                :price="food?.price"
                :selectedFoods="selectedFoods"
                @toggleSelection="toggleSelection"
              />
            </div>
          </div>
        </div>
        <div class="btn">
        <DynamicButton
        class="bold text-button-standard standard"
          @clickButton="addAddons()"
          buttonText="Add-ons"
          :isLoading="isLoading"
          :showText="true"
          size="standard"
          type="primary"
         
        />
      </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";
import { cancel } from "../../utils/svg";
import { useCartStore } from "~/stores/index.js";

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

const emit = defineEmits(["closeEditModal" ]);

const modalCounter = ref(true);
const selectedCard = ref("");
const isLoading = ref(false);
const slotNeeded = ref(true);
const selectedFoods = ref([]);

const totalPrice = ref(0);


const toggleSelection = (food) => {
  const index = selectedFoods.value.findIndex((item) => item.name === food.name);

  if (index === -1) {
    selectedFoods.value.push(food);
    totalPrice.value += food.price;
  } else {
  }
};



const cartStore = useCartStore();

// const addAddons = () => {
//   const index = cartStore.carts.findIndex(item => item.id === props.data.id);
//   if (index !== -1) {
//     cartStore.carts[index].selectedItem = selectedCard.value;
//     if (selectedFoods.value.length > 0) {
//       cartStore.carts[index].addon = selectedFoods.value.map((addon) => addon.name);
//       cartStore.carts[index].selectedPrice = totalPrice.value;
//       cartStore.carts[index].TotalselectedPrice = totalPrice.value * cartStore.carts[index].quantity;
//       cartStore.carts[index].price = (cartStore.carts[index].pricePerUnit * cartStore.carts[index].quantity) + cartStore.carts[index].TotalselectedPrice;
//       cartStore.carts[index].totalPerUnit = cartStore.carts[index].price / cartStore.carts[index].quantity;
//     }
//     cartStore.saveToLocalStorage();
//   }
//   if (selectedFoods.value.length > 0) {
//     selectedFoods.value = [];
//     totalPrice.value = 0;
//   }
//   emit('closeEditModal');
// }

const addAddons = () => {
  const index = cartStore.carts.findIndex(item => item.id === props.data.id);
  if (index !== -1) {
    cartStore.carts[index].selectedItem = selectedCard.value;
    cartStore.carts[index].addon = selectedFoods.value.map((addon) => addon.name);
    cartStore.carts[index].selectedPrice = totalPrice.value;
    cartStore.carts[index].TotalselectedPrice = totalPrice.value * cartStore.carts[index].quantity;
    cartStore.carts[index].price = (cartStore.carts[index].pricePerUnit * cartStore.carts[index].quantity) + cartStore.carts[index].TotalselectedPrice;
    cartStore.carts[index].totalPerUnit = cartStore.carts[index].price / cartStore.carts[index].quantity;
    cartStore.saveToLocalStorage();
  }
  selectedFoods.value = [];
  totalPrice.value = 0;
  emit('closeEditModal');
}

const selectItem = (value) => {
  selectedCard.value = value;
};


onMounted(() => {
  if (props.data) {
    selectedCard.value = props.data.selectedItem;
  }

});
watch(() => props.data, (newValue, oldValue) => {
  if (newValue) {
    selectedCard.value = newValue.selectedItem;
  }
});


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
