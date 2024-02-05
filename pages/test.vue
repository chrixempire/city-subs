<template>
    <div>
      <TestEnv
        v-for="(food, index) in foods"
        :key="index"
        :name="food.name"
        :price="food.price"
        :selectedNames="selectedNames"
        @addToSelected="addToSelected(food.name, food.price)"
        @removeFromSelected="removeFromSelected(food.name, food.price)"
      />
      <div>
        <p>Selected Food Items: {{ selectedNames }}</p>
        <p>Total Price: ₦{{ totalPrice }}</p>
      </div>
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
