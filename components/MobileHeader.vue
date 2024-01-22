<template>
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
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { logo, search, cart } from "../../utils/svg";
const emit = defineEmits (['navigateToNewPage'])
const navigateToNewPage = (e) => {
    emit('navigateToNewPage')
}
const TotalCart = ref(2)
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
</style>