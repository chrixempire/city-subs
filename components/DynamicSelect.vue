<template>
 
        <li @click="selectItem(data.value)" class="select-content">
          <div class="select-content-container">
            <p class="text-body-large-regular regular text-grey1">
                {{ data?.label }}
            </p>
          
            <div class="radioInput-icon circle" :class="{ selected: isSelected }"  v-html="radioInput"></div>
            <div class="roundChecked-icon" v-if="isSelected" v-html="roundChecked"></div>
          </div>




            <div v-if="slotNeeded" class="add-slot" @click="selectItem(data.value)"
            :class="{ clicked: selectedItem === data.value }">
             <slot name="image"></slot>
        </div>
        </li>


</template>

  
<script setup>
import {   radioInput,roundChecked} from "../../utils/svg";
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
template:hover{
  background: red;
  border-radius: 12px;
}
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
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 6px;
  cursor: pointer;
}
.select-content-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  cursor: pointer;
  padding: 6px 0px;
}
li:hover{
  background: var(--grey---grey6);
  border-radius: 12px;
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
  transition: all 0.3s ease-out;
}
.roundChecked-icon{
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