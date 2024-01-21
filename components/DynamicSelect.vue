<template>
    <div class="container">
        <li @click="selectItem(data.value)" class="select-content">
            <p class="text-body-large-regular regular text-grey1">
                {{ data?.label }}
            </p>

            <svg class="circle" :class="{ selected: isSelected }" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 20 20" fill="none">
                <rect x="2.50033" y="2.50002" width="15" height="15" rx="7.5" fill="white" stroke="#E4E7EC"
                    stroke-width="1.66667" />
            </svg>
            <svg v-if="isSelected" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                fill="none">
                <rect width="16" height="16" rx="8" fill="#303237" />
                <path d="M4.3999 7.99961L6.7999 10.3996L11.5999 5.59961" stroke="white" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </li>
        <div v-if="slotNeeded" class="add-slot" @click="selectItem(data.value)"
            :class="{ clicked: selectedItem === data.value }">
            <slot></slot>
        </div>
    </div>
</template>

  
<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  selectedItem: {
    type: String,
    required: true,
  },
  slotNeeded: {
    type: Boolean,
    required: true,
  },
});
const isSelected = computed(() => {
  return props.selectedItem === props.data.value;
});

const emits = defineEmits(["selectItem"]);
const selectItem = (value) => {
  emits("selectItem", value);
};
</script>
  

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.selected.circle {
  stroke: none;
  fill: black;
  display: none;
}

svg circle {
  stroke: var(--grey-200);
  stroke-width: 1px;
  fill: none;
  width: 20px;
  height: 20px;
}
.select-content{
    width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
li {
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.clicked {
  border: 2px solid #000;
  border-radius: 12px;
}
</style>