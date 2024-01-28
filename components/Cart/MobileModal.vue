<template>
  <div>
    <transition name="modal-slide">
      <div v-if="showMobileModal" class="modal">
        <div
          class="modal-content"
          :class="{ 'slide-left': step > prevStep, 'slide-right': step < prevStep }"
        >
          <div class="cart-list" v-if="step === 1 || stepMobile === 2">
            <CartList    @openEditModal="openEditModal" @closeCart="closeCart" :cart="carts" />
          </div>

          <DeliveryInfo @clickButton="prevCart" @checkoutDone="checkoutDone" v-if="step === 2 && stepMobile === 1" />
        </div>
        <div class="subtotal-container" v-if="cartLength && step === 1">
          <div class="subtotal">
            <p class="text-body-small-regular regular text-grey2">
              Subtotal({{ TotalCart }} {{ mealText }})
              </p>
            <p class="text-body-small-medium medium text-grey1">₦{{ totalPrice }}</p>
          </div>
          <div class="btn">
            <DynamicButton
              class="bold text-button-standard standard"
              @clickButton="checkout($event)"
              buttonText="Continue"
              :isLoading="isLoading"
              :showText="true"
              size="standard"
              type="primary"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { logo, search, cancel } from "../utils/svg";
import { ref,  defineEmits, defineProps, computed } from "vue";
const cartStore = useCartStore();
import { useCartStore } from '~/stores/index.js';
const step = ref(1);
const prevStep = ref(1);
const TotalPrice = ref(3500);
const numberOfMeals = ref(4);
const header = ref("My order");
const isLoading = ref(false);
const props = defineProps({
  showMobileModal: {
    type: Boolean,
    required: true,
  },
  carts: {
    type: Array,
    required: true,
  },
  stepMobile:{
    type:Number,
    required: true
  }
});
const emit = defineEmits(["closeCart",'checkoutDone',"openEditModal"]);
const openEditModal = (data) => {
  emit("openEditModal", data);
};
const closeCart = (e) => {
  emit("closeCart");
};
const checkoutDone = () => {
  emit("checkoutDone");
};
const checkout = (e) => {
  prevStep.value = step.value;
  if (step.value === 1) {
    step.value++;
  }
};
const prevCart = (e) => {
  prevStep.value = step.value;
    step.value--
};
const TotalCart = computed(() => useCartStore().cartLength);
const cartLength = computed(() => props.carts.length > 0);
const mealText = computed(() => {
  if (TotalCart.value === 1) {
    return 'meal';
  } else {
    return 'meals';
  }
});


const totalQuantity = computed(() => {
  // Load cart data from the store
  cartStore.loadFromLocalStorage();

  // Calculate the total quantity by summing up the quantities of all objects in the cart array
  return cartStore.carts.reduce((total, item) => total + item.quantity, 0);
});
const totalPrice = computed(() => {
  // Load cart data from the store
  cartStore.loadFromLocalStorage();

  // Calculate the total quantity by summing up the quantities of all objects in the cart array
  return cartStore.carts.reduce((total, item) => total + item.price, 0);
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
  box-sizing: border-box;
  z-index: 998;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.modal::-webkit-scrollbar {
  display: none;
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
.modal-content{
    height: 100vh;
    width: 100%;
    display: flex;
}
.subtotal {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--foundation---yellow---y50);

  padding: 16px 24px;
}
.subtotal-container {
  margin-top: auto;
  width: 100%;

  position: fixed;
  width: 100%;
  left: 0px;
  bottom: 0px;
  z-index: 2;

  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  margin-top: auto;
}
.btn {
  width: 100%;
  padding: 16px 24px 32px 24px;
}
.cart-list {
  margin-bottom: 100px;
}


@keyframes slideLeft {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slideRight {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
}

.slide-left {
    height: 100vh;
  animation: slideLeft 0.4s ease-in-out;
}

.slide-right {
  animation: slideRight 0.4s ease-in-out;
}
</style>
