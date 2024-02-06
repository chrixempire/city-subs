<template>
  <div class="modal-overlay" v-show="showModal" :class="{ 'show-modal': showModal }">
    <div class="modal-container" :class="{ 'show-modal': showModal }" @click.stop>
      <div class="modal-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});
watch(
  () => props.showModal,
  (newValue) => {
    handleBodyScroll(newValue);
  }
);

const handleBodyScroll = (show) => {
  if (show) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};
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
  padding: 0px 16px 16px 16px;

  border-radius: 16px;
  background: white;
  overflow-y: scroll;
  /* -ms-overflow-style: none; */
  /* scrollbar-width: none; */
  animation: fadeInOut 0.5s ease-in-out;
}

.modal-content {
  width: 100%;
}

.modal-container::-webkit-scrollbar {
  width: 1px; /* Adjust the width as needed */
}

.modal-container::-webkit-scrollbar-track {
  background: transparent; /* Background color of the scrollbar track */
}

.modal-container::-webkit-scrollbar-thumb {
  background-color: #d9d9e3; /* Color of the scrollbar thumb */
  border-radius: 4px; /* Rounded corners for the thumb */
}

.modal-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.7); /* Color of the scrollbar thumb on hover */
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
}
</style>
