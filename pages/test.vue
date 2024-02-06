<template>
    <div>
    <SearchEmptyState/>
    </div>
  </template>
  <script setup>
import { ref, computed } from 'vue';

const foods = ref([
  { name: 'Pizza', price: 10 },
  { name: 'Burger', price: 8 },
  { name: 'Salad', price: 6 }
]);

const selectedNames = ref(['Pizza']);
const totalPrice = ref(0);

// Initialize totalPrice with the initial price of selected items
selectedNames.value.forEach(name => {
  const food = foods.value.find(item => item.name === name);
  if (food) {
    totalPrice.value += food.price;
  }
});

const addToSelected = (name, price) => {
  if (!selectedNames.value.includes(name)) {
    selectedNames.value.push(name);
    totalPrice.value += price;
  }
};

const removeFromSelected = (name, price) => {
  const index = selectedNames.value.indexOf(name);
  if (index !== -1) {
    selectedNames.value.splice(index, 1);
    totalPrice.value -= price;
  }
};
</script>
