<template>
 <div class="cont">
    <div class="logo-container">
        <div class="logo-content">
            <div class="logo-mobile-icon" v-html="logo"></div>

        </div>

        <div class="cart" @click="navigateToNewPage($event)">
            <div class="circle">
                <div class="cart-icon" v-html="cart"></div>
            </div>
            <div class="badge">
                <p>{{ TotalCart }}</p>
            </div>
        </div>
     
    </div>

    <div class="filter-tabs">
            <div v-for="(tab, index) in tabs" :key="index" class="tab tablet" @click="toggleTab(index)"
                :class="{ clicked: activeTab === index }">
                <p class="text-body-large-medium medium">{{ tab }}</p>
            </div>
        </div>
 </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { logo, search, cart } from "../../utils/svg";
const TotalCart = ref(2)
const emit = defineEmits(['navigateToNewPage', 'openCartModal', 'filterProducts'])
const navigateToNewPage = (e) => {
    emit('navigateToNewPage')
}
const props = defineProps(['products',]);
const activeTab = ref(0);
const tabs = ref([
  "All Categories",
  "Classic sub",
  "Special sub",
  "Burger",
  "Pasteries",
  "Platters",
  "Toppings",
]);

const toggleTab = (index) => {
    activeTab.value = index;
    emit('filterProducts', tabs[index]);
    console.log(index)
};

</script>

<style scoped>
.logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 10px;
    border: 1px solid blue;
}

.cart {
    position: relative;
    cursor: pointer;
    border: 1px solid red;
}

.badge p {
    color: var(--white);
    text-align: center;
    font-family: var(--secondary---font--family);
    font-size: 10.793px;
    font-style: normal;
    font-weight: 500;
    line-height: 9.549px;
}




.filter-tabs {
    border: 1px solid red;
    height: 100px;
    width: auto;
    display: flex;
    /* flex-wrap: nowrap; */
    /* flex-direction: column; */
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
    white-space: nowrap;
}
/* .tablet{
   min-width: 130px;
} */
.tab p {
    color: var(--grey-grey1);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
}</style>