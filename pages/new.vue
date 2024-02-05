<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <transition name="modal-slide">
      <div v-if="showModal" class="modal">
        i am a happy boy
        <button @click="closeModal">Close Modal</button>
      </div>
    </transition>
  </div>
  <New />

</template>

<script setup>


const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};



import { ref, defineProps, defineEmits, onMounted, watch } from "vue";
import { cancel } from "../../utils/svg";
import { useCartStore } from "~/stores/index.js";
const cartStore = useCartStore();

const props = defineProps({
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
const quantity = ref(1);



const totalPrice = ref(0);


const toggleSelection = (food) => {
  const index = selectedFoods.value.findIndex((item) => item.name === food.name);
  if (index === -1) {
    selectedFoods.value.push(food);
    totalPrice.value += food.price;
  } else {
  }
};


const selectItem = (value) => {
  selectedCard.value = value;
};


const updatePricesAndQuantity = () => {
  const index = cartStore.carts.findIndex(item => item.id === props.data.id);

  if (index !== -1) {
    cartStore.carts[index].quantity = quantity.value;
    cartStore.carts[index].selectedItem = selectedCard.value;
    cartStore.carts[index].addon = selectedFoods.value.map((addon) => addon.name);
    cartStore.carts[index].selectedPrice = totalPrice.value;
    cartStore.carts[index].TotalselectedPrice = totalPrice.value * quantity.value;
    cartStore.carts[index].price = (cartStore.carts[index].pricePerUnit * quantity.value) + cartStore.carts[index].TotalselectedPrice;
    cartStore.carts[index].productPrice = cartStore.carts[index].pricePerUnit * quantity.value;
    cartStore.carts[index].totalPerUnit = cartStore.carts[index].price / quantity.value;
    cartStore.saveToLocalStorage();
  }
};


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



const increaseQuantity = () => {
  quantity.value += 1;
  updatePricesAndQuantity()
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
    updatePricesAndQuantity()
  }
};


















const updateSelectedFoods = () => {
  selectedFoods.value = [];
  if (props.data?.addon && props.data?.AddonFoods) {
    props.data.addon.forEach((addonName) => {
      const found = props.data.AddonFoods.find((food) => food.name === addonName);
      if (found) {
        found.selected = true; // Set the selected property to true
        selectedFoods.value.push(found);
      }
    });
  }
};

onMounted(() => {
  console.log('quantity', quantity.value)
  if (props.data) {
    selectedCard.value = props.data.selectedItem;
    quantity.value = props.data.quantity
    updateSelectedFoods();
   
  }
});

watch(() => props.data, (newValue, oldValue) => {
  if (newValue) {
    selectedCard.value = newValue.selectedItem;
    quantity.value = newValue.quantity 
    updateSelectedFoods();
  }
});


</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid red;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 0.5s;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: translateX(100%);
}

.modal-slide-enter-to,
.modal-slide-leave-from {
  transform: translateX(0);
}
</style>
