<template>
  <div class="food-item" @click="toggle">
    <label :class="{ selectedLabel: isSelected }">
      <input
        class="checkbox-input"
        type="checkbox"
        :value="name"
        :checked="isSelected"
        @change="handleCheckboxChange"
      />
      <div class="squareChecked-icon" v-if="isSelected" v-html="squareChecked"></div>
    </label>
    <div class="food-details">
      <div>
        <p class="text-body-large-regular regular">{{ name }}</p>
      </div>
      <div class="price">
        <p class="text-body-large-regular regular">₦{{ price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { squareChecked } from "../../utils/svg";
import { ref, defineProps, defineEmits, watch } from "vue";

const emit = defineEmits();
const { name, price, selectedNames } = defineProps(["name", "price", "selectedNames"]);
const isSelected = ref(selectedNames.includes(name));

const handleCheckboxChange = () => {
  isSelected.value = !isSelected.value;
  if (isSelected.value) {
    emit("addToSelected", name);
  } else {
    emit("removeFromSelected", name);
  }
};

const toggle = () => {
  isSelected.value = !isSelected.value;
  if (isSelected.value) {
    emit("addToSelected", name);
  } else {
    emit("removeFromSelected", name);
  }
};


watch(
  () => selectedNames,
  (newSelectedNames) => {
    isSelected.value = newSelectedNames.includes(name);
  }
);
</script>

<style scoped>
.food-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.food-item:hover {
  border-radius: 4px;
  background: var(--grey---grey6);
}
.food-details {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.checkbox-input {
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
  border: 2px solid #bdc0ce;
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
