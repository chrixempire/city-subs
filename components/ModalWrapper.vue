<template>
    <div class="modal-overlay" v-show="showModal" :class="{  'show-modal': showModal }">
      <div class="modal-container" :class="{ 'show-modal': showModal  }" @click.stop>
        <div class="modal-content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </template>
    
    
  <script setup>
  
  import { ref, defineProps } from 'vue';
  const props = defineProps({
    showModal: {
      type: Boolean,
      required: true,
    },
  })
  
  </script>
    
  <style>
  body.show-modal {
    overflow: hidden;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeInOut 0.5s ease-in-out;
    z-index: 1001;
  }
  
  .modal-container {
    max-height: 90%;
    background: white;
    padding: 16px;
    border-radius: 16px;
    background: white;
    overflow-y: scroll;
    -ms-overflow-style: none;  
    scrollbar-width: none;  
    animation: fadeInOut 0.5s ease-in-out;
  
  }
  
  
  .modal-content {
    width: 100%;
  }
  .modal-container::-webkit-scrollbar {
      display: none;
  }
  
  @keyframes fadeInOut {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUpDown {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
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
  
    .modal-container {
      width: 100%;
      display: flex;
      padding: 24px;
      border-radius: 24px 24px 0px 0px;
      animation: slideUpDown 0.5s ease-in-out;
  
  
    }
  }</style>