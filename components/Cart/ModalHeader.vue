<template>
    <div class="cart-header">
      <header>
        <button class="close-btn" @click="closeCart($event)">
          <div class="cart-icon" v-html="cancel"></div>
        </button>
        <p class="text-body-large-medium medium text-grey1">My order</p>
      </header>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const closeCart = (e) => {
      console.log('log')
  }
  </script>