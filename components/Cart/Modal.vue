<template>
    <div class="cart-modal">
        <div class="full-cart-bg">
            <transition name="slide" appear>
                <div class="full-cart" v-if="showModal">
                    <div class="cart-header">
                        <header>
                            <button class="close-btn" @click="closeCart($event)">
                                <div class="cart-icon" v-html="cancel"></div>
                            </button>
                            <p class="text-body-large-medium medium text-grey1">My order</p>
                        </header>

                    </div>
                    <div class="cart-content">
                        <CartEmptyState class="empty-state"/>
                    </div>
                </div>
            </transition>
            <transition name="fade" appear>
                <div class="modal-overlay cart-bg" v-if="showModal" @click="closeCart($event)"></div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { logo, search, cart } from "../utils/svg";
import { ref, onMounted, defineEmits, defineProps } from 'vue'
const props = defineProps({
    showModal: {
        type: Boolean,
        required: true

    }
})
const emit = defineEmits(['closeCart'])
const closeCart = (e) => {
    emit('closeCart')
}

</script>

<style scoped>
.cart-modal {
    position: relative;
    top: 0;
    left: auto;
    z-index: 2;
}

.full-cart-bg {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
}

.full-cart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    gap: 16px;

    position: absolute;
    width: 100%;
    max-width: 35%;
    height: 100vh;
    margin-right: auto;
    top: 0px;

    background: #ffffff;

    position: fixed;
    top: 50%;
    right: 0%;
    transform: translate(-0%, -50%);
    z-index: 99;
}

.cart-bg {
    width: 100%;
    height: 100%;

    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    background-color: rgba(0, 0, 0, 0.3);
}

.cart-header {
    width: 100%;
    height: 72px;
    background: var(--White);
    box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.10), 0px 0px 1px 0px rgba(12, 26, 75, 0.20);
    padding: 16px 20px;
}

header {
    display: flex;
    align-items: center;
    gap: 158px;
}

.close-btn {
    display: flex;
    width: 40px;
    height: 40px;
    padding: 9.6px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 80px;
    background-color: #F4F5F8;
}
.cart-content{
    width: 100%;
    padding: 0px 20px;
}
.empty-state{
    margin-top: 126px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-50%) translateX(100vw);
}

@media screen and (max-width : 450px) {
    .full-cart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    gap: 16px;

    position: absolute;
    width: 100%;
    max-width: 100%;
    height: 100vh;
    margin-right: auto;
    top: 0px;

    background: #ffffff;

    position: fixed;
    top: 50%;
    right: 0%;
    transform: translate(-0%, -50%);
    z-index: 99;
}
.cart-header {
    width: 100%;
    height: auto;
    background: var(--White);
    box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.10), 0px 0px 1px 0px rgba(12, 26, 75, 0.20);
    padding: 16px 10px ;
}
header {
    display: flex;
    align-items: center;
    gap: 100px;
}
}
</style>