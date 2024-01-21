<template>
    <button
      @click="$emit('clickButton')"
      class="button"
      :class="buttonClasses"
      :disabled="disabled || isLoading"
    >
      <span v-if="showText && !isLoading"> {{ buttonText }} {{ buttonPrice }} </span>
      <slot></slot>
      <slot v-if="!isLoading" name="svg"></slot>
      <LoaderButton :size="size" :isLoading="isLoading"/>
    </button>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const { buttonText, size, type, icon, showText, disabled, isLoading } =
    defineProps({
      buttonText: {
        type: String,
      },
      buttonPrice: {
        type: String,
      },
      size: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
      },
      showText: {
        type: Boolean,
        default: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
    });
  
  const buttonClasses = computed(() => {
    return {
      "text-button-micro ": size === "micro",
      "text-button-small ": size === "small",
      "text-button-medium ": size === "medium",
      "text-button-standard": size === "standard",
  
      // Button type
      "primary-button": type === "primary",
      "secondary-button": type === "secondary",
      "neutral-button": type === "neutral",
      "ghost-button": type === "ghost",
      "negative": type === "negative",
  
      // icon position
      "icon-left": icon === "left",
      "icon-right": icon === "right",
      "icon-button": !showText,
    };
  });
  
  </script>