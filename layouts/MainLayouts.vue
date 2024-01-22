<template>
    <div>
        <div class="top-details" :class="{ 'sticky': isSticky }">
            <section class="top-detail">
                <LayoutsTopDetails @openCart="openCartModal" class="desktop" />
                <LayoutsMobileTopDetails @openCart="openCartModal" class="mobile" />
            </section>
            <div class="filter-tabs">
                <div v-for="(tab, index) in tabs" :key="index" class="tab" @click="toggleTab(index)"
                    :class="{ clicked: activeTab === index }">
                    <P class="text-body-large-medium medium">{{ tab }}</P>
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
import { ref, defineEmits, onMounted, onUnmounted } from 'vue';
const tabs = ref([
    "All Categories",
    "Classic Sub",
    "Special sub",
    "Burger",
    "Pasteries",
    "Platters",
    "Toppings",
]);
const activeTab = ref(0);

const filteredProducts = ref([]);
const Products = ref([]);
const toggleTab = (index) => {
    activeTab.value = index;
    filterItemsByType();
};

const filterItemsByType = () => {
    const selectedType = tabs.value[activeTab.value];
    filteredProducts.value =
        selectedType === "All Categories"
            ? Products.value
            : Products.value.filter((Product) => Product.type === selectedType);
};


const emit = defineEmits(['openCartModal']);
const isSticky = ref(false);

const openCartModal = (e) => {
    emit('openCartModal');
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    const scrollY = window.scrollY;
    const threshold = 0; 
    isSticky.value = scrollY > threshold;
};
</script>
  
<style scoped>
.filter-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.top-details {
    width: 100%;
    position: relative;
    z-index: 98;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding-bottom: 64px;
    /* Adjust the z-index value based on your layout */
}

.sticky {
    position: fixed;
    top: 0;
    left: 0;
}

.desktop {
    display: block;
}

.mobile {
    display: none;
}

@media screen and (max-width: 450px) {
    .desktop {
        display: none;
    }
    .top-details {
    width: 100%;
    position: relative;
    z-index: 98;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom:16px ;
    /* Adjust the z-index value based on your layout */
}
    .sticky {
    position: fixed;
    top: 0;
    left: 0;
}
    .mobile {
        display: block;
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
    .filter-tabs::-webkit-scrollbar {
    display: none;
  }
  .tab {
    display: flex;
    width: 500px;
    /* border: 1px solid red; */
    height: 32px;
    padding: 8px 12px;
  }
  .tab p {
    color: var(--grey-grey1);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  }
}
</style>
  