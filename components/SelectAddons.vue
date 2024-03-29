<template>
  <li class="food-item" @click="toggle">
    <label :class="{ selectedLabel: selected }">
      <input
        class="checkbox-input"
        type="checkbox"
        :checked="selected"
        @change="handleCheckboxChange"
      />
      <div class="squareChecked-icon" v-if="selected" v-html="squareChecked"></div>
    </label>
    <div class="food-details">
      <div><p class="text-body-large-regular regular">{{ name }}</p></div>
      <div class="price"><p class="text-body-large-regular regular">₦{{ price }}</p></div>
    </div>
  </li>
</template>

<script setup>
import { squareChecked } from "../../utils/svg";
import { ref, defineProps, defineEmits, watch } from 'vue';

const emit = defineEmits();
const { name, price, selectedFoods } = defineProps(['name', 'price', 'selectedFoods']);
const selected = ref(false);

const handleCheckboxChange = () => {
  selected.value = !selected.value;
  emit('toggleSelection', { name, price, selected: selected.value });
};

const toggle = () => {
  selected.value = !selected.value;
  emit('toggleSelection', { name, price, selected: selected.value });
};


// Watch for changes in selectedFoods
watch(() => selectedFoods, (newSelectedFoods) => {
  // Check if the current food item is included in the selectedFoods array
  selected.value = newSelectedFoods.some(food => food.name === name);
});

</script>

<style scoped>
.food-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.food-item:hover{
  border-radius: 4px;
  background: var(--grey---grey6);
}
li{
  padding: 16px 0px;
  border: 1px solid red;
}
.food-details {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.checkbox-input {
  display: none;
}

.selected {
  display: none;
}

.selectedLabel {
  border: 0px;
}

label {
  position: relative;
  display: flex;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid #BDC0CE;
  cursor: pointer;
}

.squareChecked-icon {
  animation: selectedAnimation 1s ease-in-out;
}

@keyframes selectedAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
