<template>
    <div class="container">
        <div class="dashboard-wrapper">
            
            <section class="section-wrapper">
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
                <!-- <MobileHeader/> -->
                <div class="search-input">
                    <div class="search-icon" v-html="search"></div>
                    <input class="input-search" placeholder="Search for products" />
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router';
import { logo, search, cart } from "../../utils/svg";
const TotalCart = ref(2)



const router = useRouter();
const navigateToNewPage = (e) => {

  router.push('/cart'); 
};
</script>

<style scoped>
.container {
    margin: 16px 0px 20px 0px;
}

.dashboard-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 10px;
}

section {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    background: #fff;


}


.search-input {
    display: flex;
    position: relative;
    width: 100%;
    /* border: 1px solid green; */
}

.search-icon {
    top: 14px;
    left: 16px;
    position: absolute;
}

.input-search {
    padding-left: 46px;
}

.cart {
    position: relative;
    cursor: pointer;
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
