<template>
    <div class="container">
      <button @click="openModal($event)">Open</button>
    </div>
  
    <transition :name="transitionName">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div :class="{ 'modal-content': true, 'slide-in': showModal, 'slide-in-mobile': showModalMobile }">
          <!-- Your modal content goes here -->
          <div class="modal-slot">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const showModal = ref(false);
  const showModalMobile = ref(false);
  const transitionName = ref('fade');
  
  const openModal = () => {
    showModal.value = true;
    if (window.innerWidth <= 450) {
      showModalMobile.value = true;
      transitionName.value = 'slide-in-mobile';
    }
  };
  
  const closeModal = () => {
    showModal.value = false;
    showModalMobile.value = false;
    transitionName.value = 'fade';
  };
  
  watch(() => window.innerWidth, (newWidth) => {
    if (showModal.value && newWidth <= 450) {
      showModalMobile.value = true;
      transitionName.value = 'slide-in-mobile';
    } else {
      showModalMobile.value = false;
      transitionName.value = 'fade';
    }
  });
  
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  
  .modal-slot {
    width: 400px;
    height: 500px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  .slide-in-enter-active, .slide-in-leave-active {
    transition: transform 0.5s;
  }
  
  .slide-in-enter-from, .slide-in-leave-to {
    transform: translateY(100%);
  }
  
  .slide-in-mobile-enter-active, .slide-in-mobile-leave-active {
    transition: transform 0.5s;
  }
  
  .slide-in-mobile-enter-from, .slide-in-mobile-leave-to {
    transform: translateY(0);
  }
  
  @media screen and (max-width: 650px) {
    .modal-overlay {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
  
    .modal-content {
      width: 100%;
      display: flex;
      padding: 24px;
      border-radius: 24px 24px 0px 0px;
    }
  }
  
  @media screen and (max-width: 450px) {
    .slide-in-mobile-enter-active, .slide-in-mobile-leave-active {
      transition: transform 0.5s;
    }
  
    .slide-in-mobile-enter-from, .slide-in-mobile-leave-to {
      transform: translateY(100%);
    }
  }
  
  </style>
  