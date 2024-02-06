<template>
  <div class="container">
    <div class="search-icon">
      <div class="emptySearch-icon" v-html="emptySearch"></div>
    </div>
    <div class="empty-text">
      <h3 class="text-heading-3-small medium text-grey1">
        We currently do not have this right now, kindly check in back later
      </h3>
    </div>
    <div class="empty-button">
      <DynamicButton
        class="bold text-button-medium medium"
        @clickButton="seeMore"
        buttonText="See more meal"
        :isLoading="isLoading"
        :showText="true"
        size="standard"
        type="primary"
      />
    </div>
  </div>
</template>

<script setup>
import { emptySearch } from "../../utils/svg";
const isLoading = ref(false);
const emit = defineEmits(["seeMore"]);
const seeMore = (e) => {
  emit("seeMore");
};
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 394px;
  flex-direction: column;
  /* height: 100vh; */

  margin: auto;
  padding-top: 50px;
}
.empty-text{
  text-align: center;
  width: 80%;
  
}
@media screen and (max-width: 550px) {
  .container{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 394px;
  flex-direction: column;
  /* height: 100vh; */

  margin: auto;
  padding-top: 80px;
}
}
</style>
