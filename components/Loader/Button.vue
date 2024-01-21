<template>
    <svg
      :class="svgClass"
      v-if="isLoading"
      class="rotating-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10 1.26982C10 0.568517 9.42921 -0.00831001 8.73356 0.0805034C6.97204 0.305394 5.29394 0.996622 3.87778 2.09314C2.12537 3.45002 0.873383 5.3506 0.318492 7.49632C-0.2364 9.64204 -0.0627493 11.9113 0.812164 13.9476C1.68708 15.9839 3.21367 17.6719 5.15213 18.7463C7.09058 19.8208 9.33105 20.2208 11.5216 19.8836C13.7121 19.5463 15.7285 18.491 17.254 16.8833C18.7796 15.2756 19.7278 13.2066 19.9497 11.0014C20.1291 9.21939 19.8259 7.42999 19.0831 5.81701C18.7898 5.18001 17.9981 5.00167 17.4034 5.37333C16.8087 5.74499 16.6393 6.526 16.9049 7.17508C17.3649 8.2995 17.5458 9.52562 17.4229 10.7471C17.2573 12.3922 16.5499 13.9358 15.4118 15.1352C14.2736 16.3346 12.7693 17.1219 11.1351 17.3735C9.50094 17.6251 7.82947 17.3266 6.38331 16.5251C4.93715 15.7235 3.79826 14.4642 3.14554 12.9451C2.49282 11.4259 2.36327 9.73295 2.77724 8.13217C3.19121 6.53138 4.12524 5.11347 5.4326 4.1012C6.40329 3.3496 7.53895 2.85324 8.73627 2.64744C9.42744 2.52864 10 1.97112 10 1.26982Z"
        fill="white"
      />
    </svg>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
  const { size } = defineProps({
      size: {
        type: String,
        required: true,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
  });
  
  const svgClass = computed(() => {
    return {
      "micro": size === "micro",
      "small": size === "small",
      "medium": size === "medium",
      "large": size === "large",
    };
  });
  </script>
  
  <style scoped>
  svg {
    width: 100%;
  }
  svg.micro {
    width: 12px;
  }
  svg.small {
    width: 14px;
  }
  svg.medium {
    width: 16px;
  }
  svg.large {
    width: fit-content;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .rotating-svg {
    animation: rotate 0.4s linear infinite;
  }
  </style>
  