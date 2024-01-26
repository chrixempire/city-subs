<template>
    <div>
        
        <div class="Addons" >
          <div class="selective">
            <p class="text-body-small-medium medium">SELECT TYPE</p>
            <div class="flexed-select">
              <div
                class="select-type"
                v-for="(select, index) in data?.Addons?.selections"
                :key="index"
              >
                <DynamicSelect
                  :data="select"
                  :selectedItem="selectedCard"
                  @selectItem="selectItem"
                  :slotNeeded="slotNeeded"
                >
                  <template v-slot:image>
                    <DynamicImage :imageUrl="select?.image" :isModalView="true" />
                  </template>
                </DynamicSelect>
              </div>
            </div>
          </div>
          <div class="addMore">
            <div class="added">
              <p class="text-body-small-medium medium">ADD ADD-ONS</p>
              <div class="multiChoice">
                <SelectAddons
                  v-for="food in data?.Addons?.foods"
                  :key="food?.name"
                  :name="food?.name"
                  :price="food?.price"
                  @checkboxChange="handleCheckboxChange"
                />
              </div>
            </div>
          </div>
          <DynamicButton
            class="bolder text-button-standard standard"
            @clickButton="addToCart"
            buttonText="Add addons"
            :isLoading="isLoading"
            :showText="true"
            size="standard"
            type="primary"
          />
        </div>
    </div>
</template>


<script setup>
import { ref, defineProps, computed } from "vue";
const isLoading = ref(false);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.Addons {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  flex-direction: column;
}
.selective p {
  color: var(--grey---grey1);
}
.flexed-select {
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 24px;
}
.select-type {
  width: 224px;
}
.added {
  display: flex;
  flex-direction: column;
  gap: 32px;
  /* justify-content: center; */
  align-items: flex-start;
}

.multiChoice {
  width: 100%;
  display: flex;
  gap: 32px;
  flex-direction: column;
}
</style>