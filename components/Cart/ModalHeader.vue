<template>
  <div class="cart-header">
    <header>
      <button class="close-btn" @click="clickButton($event)">
        <slot name="btn-icon"></slot>
      </button>
      <p class="text-body-large-medium medium text-grey1">{{ header }}</p>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
    header: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['clickButton'])
const clickButton = (e) => {
    emit('clickButton')
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  gap: 158px;
}
.cart-header {
  width: 100%;
  height: 72px;
  background: var(--White);
  box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.1), 0px 0px 1px 0px rgba(12, 26, 75, 0.2);
  padding: 16px 20px;
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

@media screen and (max-width: 450px) {
  .cart-header {
    width: 100%;
    height: 120px;
    background: var(--White);
    box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.1),
      0px 0px 1px 0px rgba(12, 26, 75, 0.2);
    padding: 0px 10px;
    padding-top: 30px;
    display: flex;
    justify-items: center;
  }
  header {
    display: flex;
    align-items: center;
    gap: 100px;
  }
}
</style>
