<script setup>
import { ref } from 'vue';

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};


</script>

<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <transition name="modal-slide">
      <div v-if="showModal" class="modal">
        i am a happy boy
        <button @click="closeModal">Close Modal</button>
      </div>
    </transition>
  </div>
  <New />

</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid red;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 0.5s;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: translateX(100%);
}

.modal-slide-enter-to,
.modal-slide-leave-from {
  transform: translateX(0);
}
</style>
