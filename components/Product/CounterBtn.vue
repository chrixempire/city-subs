<template>
  <div class="container">
    <div class="counter" v-if="modalCounter">
      <button class="minus-button" @click="decreaseCart($event)">
        <div class="minus-icon" v-html="minus"></div>
      </button>
      <div class="quantity">
        <h4 class="text-heading-4-medium">{{ quantity }}</h4>
      </div>
      <button class="plus-button" @click="increaseCart($event)">
        <div class="plus-icon" v-html="plus"></div>
      </button>
    </div>

    <div class="cart-counter" v-else>
      <button class="minus2" @click="decreaseCart($event)">
        <div class="minus-icon" v-html="minus"></div>
      </button>
      <div class="quantity">
        <h4 class="text-body-small-medium medium text-grey1">{{ quantity }}</h4>
      </div>
      <button class="plus2" @click="increaseCart($event)">
        <div class="plus-icon" v-html="plus"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { plus, minus } from "../../utils/svg";
const props = defineProps({
  quantity: {
    type: Number,
    default: 0,
  },
  modalCounter: {
    type: Boolean,
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

.counter,
.cart-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.cart-counter {
  border-radius: 24px;
  background: var(--grey---grey6);
  height: 40px;
}
.cart-counter button{
  background-color:transparent;
}
.cart-counter .plus2,
.cart-counter .minus2 {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
