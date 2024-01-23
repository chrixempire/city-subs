<template>
    <div class="msg" :class="['message', msgType]">
        <div class="icons" v-if="iconType">
            <template v-if="msgType === 'error'">
            <div class="error-icon" v-html="error"></div>
        </template>
        <template v-else-if="msgType === 'success'">
            <div class="success-icon" v-html="success"></div>
        </template>
        </div>
        <p class="text-body-micro-regular regular "> {{ msg }} </p>
    </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';
import { error, success } from "../../utils/svg";
const props = defineProps({
    msg: {
            type: String,
            default: "",
        },
        msgType: {
            type: String,
            default: "",
        },
        iconType: {
            type: Boolean,
            default:false,
        },

    })
</script>
<style scoped>
.msg{
    display: flex;
    gap: 8px;
}
p{
font-family: var(--secondary---font--family);
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 18px; 
}
.message.error p {
    color: var(--negative---negative);
}

.message.success p{
    color: var(--positive---p300);
}

</style>