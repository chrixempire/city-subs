<template>
  <div class="container">
    <button class="minus-button" @click="decreaseCart($event)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 12H18"
          stroke="#303237"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="quantity">
      <h4 class="text-heading-4-medium">{{ quantity }}</h4>
    </div>
    <button class="plus-button" @click="increaseCart($event)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 12H18"
          stroke="#303237"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 18V6"
          stroke="#303237"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["increaseQuantity", "decreaseQuantity"]);

const increaseCart = (e) => {
  emit("increaseQuantity");
};
const decreaseCart = (e) => {
  emit("decreaseQuantity");
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.plus-button,
.minus-button {
  display: flex;
  width: 48px;
  height: 48px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: var(--grey---grey6);
}
.quantity {
  display: flex;
  width: 48px;
  height: 48px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.quantity h4 {
  color: var(--grey---grey1);
}
</style>
