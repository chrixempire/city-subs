<template>
    <div class="container">
        <div class="product-details">
            <p class="text-body-large-regular regular product-name">
            {{ product?.name }}
        </p>
        <p class="text-body-large-regular regular product-price">
            ₦{{ product?.price }}
        </p>
        </div>
        <div class="product-snippet">
            <p class="snippet text-body-small-regular regular text-grey3">
                {{ product?.snippet }}
            </p>
        </div>
    </div>
</template>

    
<script setup>
import { ref, defineProps, defineEmits} from 'vue';
const props = defineProps({
 product: {
     type: Object,
     required: true,
   },
})
</script>

<style scoped>
   .container{
        display: flex;
        flex-direction: column;
        gap: 8px;
        justify-content: center;
    }
    .product-details{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .snippet{
        color: #7E8494;
        font-weight: 400;
    }
    .product-name{
        color: #303237;
        font-weight: 400;
    }
    .product-price{
        color: #303237;
        font-weight: 500;
    }
</style>