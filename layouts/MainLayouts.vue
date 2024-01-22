<template>
    <div>
      <div class="top-details">
        <section class="top-detail">
          <LayoutsTopDetails @openCart="openCartModal" class="desktop" />
          <LayoutsMobileTopDetails @openCart="openCartModal" class="mobile" />
        </section>
        <div class="filter-tabs">
          <div v-for="(tab, index) in tabs" :key="index" class="tab" @click="toggleTab(index)" :class="{ clicked: activeTab === index }">
            <p class="text-body-large-medium medium">{{ tab }}</p>
          </div>
        </div>
      </div>
      <div>
        <section>
          <slot></slot>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, defineProps } from 'vue';
  
  const props = defineProps(['products', 'tabs']);
  const activeTab = ref(0);
  const tabs = props.tabs;
  const emit = defineEmits(['openCartModal', 'filterProducts']);
  
  const toggleTab = (index) => {
    activeTab.value = index;
    emit('filterProducts', tabs[index]);
  };
  
  const openCartModal = () => {
      emit('openCartModal');
  };
  </script>
  
<style scoped>
.top-details {
    position: sticky;
    top: 0;
    z-index: 98;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding-bottom: 64px;
    transition: all 0.3s ease; /* Add a smooth transition */
}
.filter-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.desktop {
    display: block;
}

.mobile {
    display: none;
}

@media screen and (max-width: 450px) {
    .desktop{
        display: none;
    }
    .mobile {
        display: block;
    }
    .top-details {
    position: sticky;
    top: 0;
    z-index: 98;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding:0px 16px 16px 16px ;
    transition: all 0.3s ease; /* Add a smooth transition */
}
    .filter-tabs {
        width: 100%;
        display: flex;
        /* flex-wrap: nowrap; */
        justify-content: flex-start;
        align-items: flex-start;
        gap: 12px;
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        padding: 6px 3px;
    }




.tab {
    display: flex;
    white-space: nowrap;
    height: 32px;
    padding: 8px 12px;
    transition: all 0.3s ease; /* Add a smooth transition */
}

.tab p {
    color: var(--grey-grey1);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
}
.filter-tabs::-webkit-scrollbar {
    display: none;
  }
}
</style>
  