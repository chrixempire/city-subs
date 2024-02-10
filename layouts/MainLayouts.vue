<template>
  <div>
    <div class="top-details">
      <section class="top-detail">
        <LayoutsMobileTopDetails
          v-if="isMobile"
          @openCartModal="openMobileCart"
          @search="handleSearch"
          ref="mobileTopDetails"
          class="mobile"
        />
        <LayoutsTopDetails
          v-if="!isMobile"
          @openCart="openCartModal"
          class="desktop"
          ref="topDetails"
          @search="handleSearch"
        />
  
      </section>
      <div class="filter-tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab"
          @click="toggleTab(index)"
          :class="{ clicked: activeTab === index }"
        >
          <p class="text-body-large-medium medium">{{ tab }}</p>
        </div>
      </div>
    </div>
    <div>
      <section>
        <slot name="container"></slot>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted } from "vue";
const props = defineProps(["tabs"]);
const activeTab = ref(0);
const tabs = props.tabs;
const emit = defineEmits([
  "openCartModal",
  "openMobileCart",
  "filterProducts",
  "filteredProducts",
]);

const searchQuery = ref("");

const handleSearch = (query) => {
  searchQuery.value = query;
  emit("filteredProducts", query);
};

const toggleTab = (index) => {
  activeTab.value = index;
  emit("filterProducts", tabs[index]);
};

const openCartModal = () => {
  emit("openCartModal");
};
const openMobileCart = () => {
  emit("openMobileCart");
};

const isMobile = ref(false);

onMounted(() => {
  if (process.client) {
    isMobile.value = window.innerWidth <= 550;

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 550;
    };

    window.addEventListener("resize", handleResize);

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
  } else {
    // Set default value for SSR
    isMobile.value = false;
  }

  // Additional logic if needed
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.top-detail {
  padding: 0px;
}
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
@media screen and (max-width: 970px) {
  .filter-tabs {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 6px 16px;
  }
  .filter-tabs::-webkit-scrollbar {
    display: none;
  }
  .top-details {
    position: sticky;
    z-index: 98;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-bottom: 32px;
    transition: all 0.3s ease; /* Add a smooth transition */
  }
  .tab {
    display: flex;
    white-space: nowrap;
  }
}

@media screen and (max-width: 550px) {
  .top-details {
    position: sticky;
    top: 0;
    z-index: 98;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 16px 16px 16px;
    transition: all 0.3s ease; /* Add a smooth transition */
  }
  .filter-tabs {
    width: 100%;
    display: flex;
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
