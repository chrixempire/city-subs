<template>
    <div> 
        <section header-section>
            <div class="cart-header">
                        <header>
                            <button class="close-btn" @click="closeCart($event)">
                                <div class="cart-icon" v-html="cancel"></div>
                            </button>
                            <p class="text-body-large-medium medium text-grey1">My order</p>
                        </header>

                    </div>
        </section>
        <section class="content-section">
            <div class="cart-content">
                        <CartEmptyState class="empty-state" @placeOrder="closeCart($event)"/>
                    </div>
        </section>
    </div>
</template>
<script setup>
import { ref} from 'vue'


import { useRouter } from 'vue-router';
const router = useRouter();
const closeCart = (e) => {

  router.push('/'); 
};
</script>

<style scoped>

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
@media screen and (max-width: 450px) {
    .cart-header {
    width: 100%;
    background: var(--White);
    box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.10), 0px 0px 1px 0px rgba(12, 26, 75, 0.20);
    padding: 0px 10px ;
    display: flex;
    justify-items: center;
}
header {
    display: flex;
    align-items: center;
    gap: 100px;
}
}
</style>