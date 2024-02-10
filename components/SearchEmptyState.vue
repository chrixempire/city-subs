<template>
<div class="flexed">
  <div class="container" v-if="!isMobile">
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
  <div class="small-container" v-if="isMobile">
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
        @clickButton="seeMoreMeals"
        buttonText="See more meal"
        :isLoading="isLoading"
        :showText="true"
        size="standard"
        type="primary"
      />
    </div>
  </div>
</div>
</template>

<script setup>
import { emptySearch } from "../../utils/svg";
const isLoading = ref(false);
const emit = defineEmits(["seeMore",'seeMoreMeals']);
const seeMore = (e) => {
  emit("seeMore");
};
const seeMoreMeals = (e) => {
  emit("seeMoreMeals");
};
const isMobile = ref(process.client ? window.innerWidth <= 550 : false);
onMounted(() => {
  if (process.client) {
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 550;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.small-container, .container{
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
.small-container {
  width: 100%;
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
  padding-top: 0px;
}
}
</style>
