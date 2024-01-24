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
          </div>
          <div class="cart-empty-state" v-else>
            <CartEmptyState class="empty-state" @placeOrder="closeCart($event)" />
          </div>
         </div>
    </div>
</template>


<script setup>
import { logo, search,  cancel } from "../utils/svg";
import { ref } from "vue";
const props = defineProps(['cart']);
const header = ref('My order')
const emit = defineEmits(["closeCart"]);
const closeCart = (e) => {
  emit("closeCart");
};
</script>

<style scoped>
.cart-header{
  position: sticky;
    top: 0;
    z-index: 98;
    width: 100%;
    background: white;
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
  justify-content: space-between;
  margin-bottom: 0px;
  
}

@media screen and (max-width: 450px) {
  .cart-list {
  margin-bottom: 100px;
}
}
</style>