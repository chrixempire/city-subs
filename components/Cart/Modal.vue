<template>
  <div class="cart-modal">
    <div class="full-cart-bg" v-if="!isMobile">
      <transition name="slide" appear>
        <div class="full-cart" v-if="showModal">
          <div
            class="modal-content"
            :class="{ 'slide-left': step > prevStep, 'slide-right': step < prevStep }"
          >
            <CartList
              @closeCart="closeCart"
              @checkout="checkout"
              @openEditModal="openEditModal"
              :cart="carts"
              v-if="step === 1 || stepped === 2"
            />

            <DeliveryInfo
              @clickButton="prevCart"
              @checkoutDone="checkoutDone"
              v-if="step === 2 && stepped === 1"
            />
          </div>
        </div>
      </transition>
      <transition name="fade" appear>
        <div
          class="modal-overlay cart-bg"
          v-if="showModal"
          @click="closeCart($event)"
        ></div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { logo, search, cancel } from "../utils/svg";
import { ref, onMounted, defineEmits, defineProps, computed } from "vue";
import { useCartStore } from "~/stores/index.js";
const cartItems = useCartStore().carts;
const TotalCart = computed(() => useCartStore().cartLength);
const isLoading = ref(false);
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  carts: {
    type: Array,
    required: true,
  },
  stepped: {
    type: Number,
    required: true,
  },
});
const step = ref(1);
const prevStep = ref(1);
const emit = defineEmits(["closeCart", "checkoutDone", "openEditModal"]);

watch(
  () => props.showModal,
  (newValue) => {
    handleBodyScroll(newValue);
  }
);

const handleBodyScroll = (show) => {
  if (show) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

const openEditModal = (data) => {
  emit("openEditModal", data);
};
const closeCart = (e) => {
  emit("closeCart");
};
const checkoutDone = (e) => {
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
  step.value--;
};
const cartLength = computed(() => props.carts.length > 0);
const isMobile = ref(false);

onMounted(() => {
  if (process.client) {
    isMobile.value = window.innerWidth <= 550;

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 550;
    };

    window.addEventListener("resize", handleResize);

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
  } else {
    // Set default value for SSR
    isMobile.value = false;
  }

  // Additional logic if needed
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.cart-modal {
  position: relative;
  top: 0;
  left: auto;
  z-index: 1000;
}
.full-cart-bg {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
}
.full-cart {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 16px;

  position: absolute;
  width: 100%;
  max-width: 35%;
  height: 100vh;
  margin-right: auto;
  top: 0px;

  background: #ffffff;

  position: fixed;
  top: 50%;
  right: 0%;
  transform: translate(-0%, -50%);
  z-index: 1000;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.full-cart::-webkit-scrollbar {
  display: none;
}
.cart-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  background-color: rgba(0, 0, 0, 0.3);
}

.cart-header {
  width: 100%;
  height: 72px;
  background: var(--White);
  box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.1), 0px 0px 1px 0px rgba(12, 26, 75, 0.2);
  padding: 16px 20px;
}

header {
  display: flex;
  align-items: center;
  gap: 158px;
}

.close-btn {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 9.6px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  background-color: #f4f5f8;
}
.cart-content {
  width: 100%;
  padding: 0px 20px;
}
.empty-state {
  margin-top: 126px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
.modal-content {
  height: 100vh;
  width: 100%;
  display: flex;
}
.fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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
@media screen and (max-width: 1350px) {
  .full-cart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    position: absolute;
    width: 50%;
    max-width: 100%;
    height: 100vh;
    margin-right: auto;
    top: 0px;
    background: #ffffff;
    position: fixed;
    top: 50%;
    right: 0%;
    transform: translate(-0%, -50%);
    z-index: 1000;
  }
}
@media screen and (max-width: 1000px) {
  .full-cart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    position: absolute;
    width: 70%;
    max-width: 100%;
    height: 100vh;
    margin-right: auto;
    top: 0px;
    background: #ffffff;
    position: fixed;
    top: 50%;
    right: 0%;
    transform: translate(-0%, -50%);
    z-index: 1000;
  }
}
@media screen and (max-width: 950px) {
  .full-cart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    position: absolute;
    width: 70%;
    max-width: 100%;
    height: 100vh;
    margin-right: auto;
    top: 0px;
    background: #ffffff;
    position: fixed;
    top: 50%;
    right: 0%;
    transform: translate(-0%, -50%);
    z-index: 1000;
  }
}

</style>
