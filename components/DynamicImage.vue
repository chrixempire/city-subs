<template>
    <img
      :src="imageUrl"
      alt="product-image"
      :class="{'modalView':isModalView, 'productView':isProductView}"
    />
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps(['imageUrl', 'isModalView', 'isProductView']);
  </script>

  <style scoped>
img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.modalView{
    border-radius: 12px;
}
.productView{
    border-radius: 12px 12px 0 0;
}
  </style>