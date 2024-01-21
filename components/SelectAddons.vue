<template>
    <div class="food-item">
      <label :class="{ selectedLabel: selected }">
        <input
          :class="{ selected: selected }"
          type="checkbox"
          v-model="selected"
          @change="handleCheckboxChange"
        />
        <svg
        v-if="selected"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect width="24" height="24" rx="4" fill="#121212" />
          <path
            d="M6.59961 12.0004L10.1996 15.6004L17.3996 8.40039"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </label>
      <div class="food-details">
          <div><p class="text-body-large-regular  regular">{{ name }}</p></div>
          <div class="price"><p class="text-body-large-regular  regular">₦{{ price }}</p></div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  const emit = defineEmits();
  const { name, price } = defineProps(['name', 'price']);
  const selected = ref(false);
  
  const handleCheckboxChange = () => {
    emit('checkboxChange', { name, price, selected: selected.value });
  };
  </script>
  
  <style scoped>
  .food-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .food-details {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
  
  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }
  
  .selected {
    display: none;
  }
  .selectedLabel{
    border: 0px;
  }
  label{
    position: relative;
   display: flex;
   width: 24px;
   height: 24px;
   border-radius: 4px;
   border: 2px solid #BDC0CE;
  }

  svg{
   position: absolute;
  }

  </style>
