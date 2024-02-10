<template>
    <div class="dashboard-wrapper">
      <section class="section-wrapper">
        <div class="logo">
          <div class="logo-icon" v-html="logo"></div>
        </div>
        <div class="search-input">
          <div class="search-icon" v-html="search"></div>
          <input
            class="input-search"
            placeholder="Search for products"
            v-model="searchQuery"
            @input="searchProducts"
            ref="searchInput"
          />
        </div>
        <div class="cart" @click="triggerCart($event)">
          <div class="circle">
            <div class="cart-icon" v-html="Cart"></div>
          </div>
          <div class="badge">
            <p>{{ TotalCart }}</p>
          </div>
        </div>
      </section>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { logo, search, Cart } from "../../utils/svg";
const cartStore = useCartStore();

import { useCartStore } from "~/stores/index.js";
const cartItems = useCartStore().carts;
const TotalCart = computed(() => useCartStore().cartLength);

const searchQuery = ref("");

const emit = defineEmits(["openCart", "search"]);

const searchProducts = () => {
  emit("search", searchQuery.value);
};
const triggerCart = (e) => {
  emit("openCart");
};

const clearSearchInput = () => {
  searchQuery.value = '';
};

defineExpose({
  clearSearchInput
});
</script>

<style scoped>
.dashboard-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: 0px 80px;
  align-items: center;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.1), 0px 0px 1px 0px rgba(12, 26, 75, 0.2);
}

.search-input {
  display: flex;
  position: relative;
  width: 40%;
}

.search-icon {
  top: 14px;
  left: 16px;
  position: absolute;
}

.input-search {
  padding-left: 46px;
}

.cart {
  position: relative;
  cursor: pointer;
}

.badge p {
  color: var(--white);
  text-align: center;
  font-family: var(--secondary---font--family);
  font-size: 10.793px;
  font-style: normal;
  font-weight: 500;
  line-height: 9.549px;
}
@media screen and (max-width: 1450px) {
  .search-input {
    display: flex;
    position: relative;
    width: 50%;
  }
}
@media screen and (max-width: 970px) {
  .section-wrapper {
    padding: 0px 16px;
  }
}
</style>
