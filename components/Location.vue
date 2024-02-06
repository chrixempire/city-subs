<template>
  <div class="container">
    <div class="header">
      <h3 class="text-heading-3-bold bold text-grey1">Select your branch</h3>
    </div>
    <div class="select-container">
      <ul class="list-container">
        <DynamicSelect
          v-for="(location, index) in locations"
          :key="index"
          :data="location"
          :selectedItem="selectedCard"
          @selectItem="selectItem"
          :slotNeeded="slotNeeded"
        />
      </ul>
    </div>
    <div class="btn">
      <DynamicButton
        class="bold text-button-standard standard"
        @clickButton="NextPage"
        buttonText="Continue"
        :isLoading="isLoading"
        :showText="true"
        size="standard"
        type="primary"
        :disabled="!selectedCard"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const locations = [
  { label: "Yaba", value: "Yaba" },
  { label: "Ikeja", value: "Ikeja" },
  { label: "Ikorodu", value: "Ikorodu" },
  { label: "Lekki", value: "Lekki" },
  { label: "Abuja", value: "Abuja" },
];
const selectedCard = ref("");
const isLoading = ref(false);
const slotNeeded = ref(false);
const selectItem = (value) => {
  selectedCard.value = value;
  console.log(value);
};

const emit = defineEmits();
const NextPage = () => {
  emit("NextPage");
  console.log("work");
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  flex-direction: column;
  min-width: 330px;
  width: 100%;
  padding-top:16px ;

}

.select-container {
  width: 100%;
}

.list-container {
  display: flex;
  flex-direction: column;
}
.btn {
  width: 100%;
}
.hold {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

@media screen and (max-width: 550px) {
  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 40px;
    flex-direction: column;
    width: 100%;
    padding: 16px;
  }
}
</style>
