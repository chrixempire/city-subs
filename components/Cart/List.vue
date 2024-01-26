<template>
    <div class="cart-container">
      <div class="cart-header">
        <CartModalHeader :header="header"  @clickButton="closeCart">
            <template v-slot:btn-icon>
              <div class="cart-icon" v-html="cancel"></div>
            </template>
          </CartModalHeader>
      </div>
     
         <div class="cart-content">
      
          <div class="cart-list" v-if="cart.length">
            <CartAdded v-for="(item, index) in cart" :key="index" :data="item"/>
            <!-- <div class="subtotal-container">
            <div class="subtotal">
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
          </div> -->
          </div>
          <div class="cart-empty-state" v-else>
            <CartEmptyState class="empty-state" @placeOrder="closeCart($event)" />
          </div>
         </div>
         <div class="footer"  v-if="cart.length && !isMobile">
          <div class="subtotal-container">
            <div class="subtotal">
              <p class="text-body-small-regular regular text-grey2">
                Subtotal({{ totalQuantity }} {{ mealText }})
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
    </div>
</template>


<script setup>
import { logo, search,  cancel } from "../utils/svg";
import { useCartStore } from '~/stores/index.js';
import { ref, defineEmits, defineProps,  onMounted } from 'vue';
const cartStore = useCartStore();
const TotalPrice = ref(3500);
const numberOfMeals = ref(4);
const isLoading = ref(false);
const props = defineProps(['cart']);
const header = ref('My order')
const emit = defineEmits(["closeCart", 'checkout']);
const checkout = (e) => {
  emit("checkout");
};
const closeCart = (e) => {
  emit("closeCart");
};


const isMobile = ref(process.client ? window.innerWidth <= 450 : false);


const totalQuantity = computed(() => {
  cartStore.loadFromLocalStorage();
  return cartStore.carts.reduce((total, item) => total + item.quantity, 0);
});
const totalPrice = computed(() => {
  cartStore.loadFromLocalStorage();
  return cartStore.carts.reduce((total, item) => total + item.price, 0);
});
const mealText = computed(() => {
  if (totalQuantity.value === 1) {
    return 'meal';
  } else {
    return 'meals';
  }
});
onMounted(() => {
  if (process.client) {
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 450;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }
});
</script>

<style scoped>
.cart-header {
  position: sticky;
  top: 0;
  z-index: 98;
  width: 100%;
  background: white;
}
.footer{
  position: sticky;
   bottom: 0;
    z-index: 98;
    width: 100%;
    background: white;
    margin-top: auto;
}
.cart-content {
  width: 100%;
  padding: 0px 20px;
  margin-top: 30px;
}
.cart-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

}
.cart-empty-state{
  margin-top: 128px;
}
.cart-list{
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 0px;
  
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
  /* position: sticky;
    bottom: 0;
    z-index: 98; */
    width: 100%;

  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}
.btn {
  width: 100%;
  padding: 16px 24px 32px 24px;
}
@media screen and (max-width: 450px) {
  .cart-list {
  margin-bottom: 100px;
}
}
</style>