<template>
  <div class="cart-modal">
    <div class="full-cart-bg">
      <transition name="slide" appear>
        <div class="full-cart" v-if="showModal">
            <CartList @closeCart="closeCart" :cart="carts"/>
            <!-- <DeliveryInfo @clickButton="closeCart"/> -->


            <div class="subtotal-container" v-if="cartLength">
        <div class="subtotal" >
          <p class="text-body-small-regular regular text-grey2">
            Subtotal({{ numberOfMeals }} meals)
          </p>
          <p class="text-body-small-medium medium text-grey1">₦{{ TotalPrice }}</p>
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
import { logo, search, cart, cancel } from "../utils/svg";
import { ref, onMounted, defineEmits, defineProps, computed } from "vue";
const header = ref('My order')
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  carts:{
    type: Array,
    required: true,
  }
});
const emit = defineEmits(["closeCart"]);
const closeCart = (e) => {
  emit("closeCart");
};
const cartLength = computed(() => props.carts.length > 0);
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
.subtotal {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--foundation---yellow---y50);

  padding: 16px 24px;
}
.subtotal-container {
    position: sticky;
    bottom: 0;
    z-index: 98;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  width: 100%;
  background: white;

}
.btn {
  width: 100%;
  padding: 16px 24px 32px 24px;
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
</style>
