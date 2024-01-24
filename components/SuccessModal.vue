<template>
  <div class="container">
    <div class="cancel-icon" @click="closeSuccesModal">
        <div class="cart-icon" v-html="cancel"></div>
    </div>
    <div class="success-checkout">
      <div class="fly-icon">
       
        <div class="cart-icon" v-html=" successPlane"></div>
      </div>
      <div class="success-text">
        <h3 class="text-heading-3-medium medium text-grey1">Your order is on its way!</h3>
        <p class="text-body-large-regular regular text-grey1">
          We have sent your order’s receipt to lanrebello@gmail.com. Kindly check your
          mail to see your order’s full details.
        </p>
      </div>
      <div class="success-btn">
        <DynamicButton
          class="bold text-button-standard standard"
          @clickButton="checkout($event)"
          buttonText="Buy more meals"
          :isLoading="isLoading"
          :showText="true"
          size="standard"
          type="primary"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {   cancel,  successPlane } from "../utils/svg";
import { ref } from "vue";
const isLoading = ref(false);
const emit = defineEmits(["checkout", 'closeSuccesModal']);
const checkout = (e) => {
  emit("checkout");
};
const closeSuccesModal = (e) => {
  emit("closeSuccesModal");
};
</script>

<style scoped>
.container {
  display: flex;
  width: 501px;
  padding: 8px 4px 16px 4px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
.success-btn {
  /* width: 100px; */
}
.success-checkout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  align-self: stretch;
}
.success-text{
    display: flex;
flex-direction: column;
align-items: center;
gap: 8px;
align-self: stretch;
}
.success-text p{
    text-align: center;
}
.cancel-icon {
  display: flex;
  width: 48px;
  height: 48px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: var(--grey---grey6);
  margin-left: auto;
  cursor: pointer;
}
</style>
