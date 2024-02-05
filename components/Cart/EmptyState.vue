<template>
    <div>
      <section class="empty-cart-section">
        <div class="empty-cart-svg">
          <div class="empty-cart-icon" v-html="emptyCart"></div>
        </div>
        <div class="empty-cart-text">
          <h3 class="text-heading-3-medium medium text-grey1">Oops! You must be hungry</h3>
          <p class="text-body-large-regular regular text-grey3">
            Place your favorite meal now and get it delivered to you in no time.
          </p>
        </div>
        <div class="empty-cart-btn">
          <DynamicButton
            class="medium text-button-standard standard"
            @clickButton="placeOrder($event)"
            buttonText="Place your order"
            :isLoading="isLoading"
            :showText="true"
            size="standard"
            type="primary"
          />
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
import { ref} from 'vue'
  import { emptyCart } from "../utils/svg";
  const isLoading = ref(false);


  const emit = defineEmits(['placeOrder'])
const placeOrder= (e) => {
    emit('placeOrder')
}
  </script>
  
  <style scoped>
  .empty-cart-section{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 32px;
      width: 100%;
  }
  .empty-cart-text{
      width: 75%;
      display: flex;
      flex-direction: column;
      align-items:center;
      gap: 8px;
      justify-content: center;
  }
  .empty-cart-text p{
      text-align: center;
  }

  @media screen and (max-width: 550px) {
    .empty-cart-text{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items:center;
      gap: 8px;
      justify-content: center;
  }
  }
  </style>
  