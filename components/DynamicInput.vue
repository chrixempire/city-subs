<template>
    <div class="cont">
        <div class="form-group">
            <label class="input-label">{{ label }}</label>
            <input :placeholder="placeholder" class="form-input" required="required" :class="{ 'error': inValid }"
                :type="type" :id="id" :name="id" :value="value" @input="$emit('updateValue', $event.target.value)" />

            <div class="input-icon" v-if="icon">
                <slot name="icon"></slot>
            </div>
        </div>
        <div  v-if="ctaClicked" class="message-container">
      <ValidationMsg :msg="msg" :msgType="msgType" :iconType="iconType" />
    </div>
    </div>
</template>
   
<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
    msgType: {
        type: String,
        default: "",
    },
    msg: {
        type: String,
        default: "",
    },
    inValid: {
        type: Boolean,
        default: false,
    },
    inValid: {
        type: Boolean,
        default: false,
    },
    iconType: {
        type: Boolean,
        default: false,
    },
    value: {
        type: String,
        default: "",
    },
    ctaClicked: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: "text",
    },
    id: {
        type: String,
        default: "",
    },
    icon: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['updateValue']);

</script>
   
<style scoped>

.message-container {
  animation: fadeIn 0.3s ease-out;
}
@keyframes slideLeft {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.cont{
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
}
.form-group {

    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
}
label{
    color: var(--grey---grey1);
    font-family: var(--secondary---font--family);
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 21px; 
}
input {
    width: 100%;
    display: flex;
    height: 48px;
    padding: 16px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid var(--grey---grey5);
    background: #FFF;
    box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.10), 0px 0px 1px 0px rgba(12, 26, 75, 0.20);



    color: var(--grey---grey1);
    font-family: var(--secondary---font--family);
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 21px; 
}

input::placeholder {
    color: var(--grey---grey4);
    font-family: var(--secondary---font--family);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
}

input:hover {
    border: 1px solid var(--grey---grey3);
    background: #FFF;
    box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.10), 0px 0px 1px 0px rgba(12, 26, 75, 0.20);
}
input:active{
border: 1px solid var(--grey---grey1);
background: var(--White);
box-shadow: 0px 0px 0px 3px #E5E7EF;
}
input:not(:placeholder-shown):not(:focus) {
    border: 1px solid var(--grey---grey5);
    background: #FFF;
    box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.10), 0px 0px 1px 0px rgba(12, 26, 75, 0.20);
}
input:disabled{
    border-radius: 12px;
border: 1px solid var(--grey---grey5);
background: var(--grey---grey6);
}
.error{
    border-radius: 12px;
background: var(--White);
}
</style>