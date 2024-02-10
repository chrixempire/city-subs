<template>
  <div class="container">
    <div class="info-header">
      <CartModalHeader :header="header" @clickButton="clickButton">
        <template v-slot:btn-icon>
          <div class="cart-icon" v-html="leftArrow"></div>
        </template>
      </CartModalHeader>
    </div>

    <div class="information-container">
      <div class="delievery-container">
        <div class="delivery-header">
          <p>Delivery information</p>
        </div>
        <div class="delievery-inputs">
          <DynamicInput
            placeholder="Daniel Ayomide"
            label="Full name"
            :type="text"
            :id="fullName"
            :value="fullName"
            :inValid="ctaClicked && !fullName ? true : false"
            :msg="ctaClicked && !fullName ? 'Full Name is required' : ''"
            :iconType="ctaClicked && !fullName ? true : false"
            msgType="error"
            @update-value="updateValue($event, 'full-name')"
            :ctaClicked="ctaClicked"
          />

          <DynamicInput
            placeholder="daniel@gmail.com"
            label="Email address"
            :type="email"
            :id="email"
            :value="email"
            :inValid="ctaClicked && !isEmailValid ? true : false"
            :msg="ctaClicked && !isEmailValid ? 'Email is not valid' : ''"
            :iconType="ctaClicked && !isEmailValid ? true : false"
            :msgType="isEmailValid ? 'success' : 'error'"
            @update-value="updateValue($event, 'email')"
            :ctaClicked="ctaClicked"
          />

          <DynamicInput
            placeholder="+234 815 251 2717"
            label="Phone number"
            :type="number"
            :id="phoneNumber"
            :value="phoneNumber"
            :inValid="ctaClicked && !phoneNumber ? true : false"
            :iconType="ctaClicked && !phoneNumber ? true : false"
            :msg="ctaClicked && !phoneNumber ? 'Phone Number is not required' : ''"
            msgType="error"
            @update-value="updateValue($event, 'phone-number')"
            :ctaClicked="ctaClicked"
          />
        </div>
      </div>
      <div class="address-container">
        <div class="address-header">
          <p>Adress information</p>
        </div>
        <div class="address-inputs">
          <DynamicInput
            placeholder="3A, Adewunmi Street"
            label="Delievery address"
            :type="text"
            :id="deliveryAddress"
            :value="deliveryAddress"
            :inValid="ctaClicked && !deliveryAddress ? true : false"
            :iconType="ctaClicked && !deliveryAddress ? true : false"
            :msg="ctaClicked && !deliveryAddress ? 'Delivery Address is needed' : ''"
            msgType="error"
            @update-value="updateValue($event, 'deliveryAddress')"
            :ctaClicked="ctaClicked"
          />

          <DynamicInput
            placeholder="Describe your area"
            label="Landmark (Optional)"
            :type="text"
            :id="landMark"
            :value="landMark"
            :inValid="ctaClicked && !landMark ? false : false"
            :msg="ctaClicked && !landMark ? '' : ''"
            msgType="success"
            @update-value="updateValue($event, 'landMark')"
            :ctaClicked="ctaClicked"
          />
        </div>
      </div>
      <div class="subtotal-container">
        <div class="subtotal">
          <p class="text-body-small-regular regular text-grey2">
                Subtotal({{ TotalCart }} {{ mealText }})
              </p>
          <p class="text-body-small-medium medium text-grey1">₦{{ totalPrice }}</p>
        </div>
        <div class="btn">
          <DynamicButton
            class="bold text-button-standard standard"
            @clickButton="checkout($event)"
            buttonText="Continue"
            :isLoading="isLoading"
            :showText="true"
            size="standard"
            type="primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from '~/stores/index.js';
import { leftArrow } from "../utils/svg";
const header = ref("Delivery information");
const cartStore = useCartStore();
const text = ref("");
const number = ref();
const email = ref("");

const isLoading = ref(false);
const fullName = ref("");
const phoneNumber = ref();
const landMark = ref("");
const deliveryAddress = ref("");
const ctaClicked = ref(false);
const inValided = ref(true);

const emit = defineEmits(["clickButton",'checkoutDone']);
const clickButton = (e) => {
  emit("clickButton");
};

const TotalCart = computed(() => useCartStore().cartLength);
const updateValue = (e, name) => {
  if (name === "phone-number") {
    phoneNumber.value = e;
  } else if (name === "email") {
    email.value = e;
  } else if (name === "full-name") {
    fullName.value = e;
  } else if (name === "landMark") {
    landMark.value = e;
  } else if (name === "deliveryAddress") {
    deliveryAddress.value = e;
  }
};
const isEmailValid = computed(() => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email.value);
});
const checkout = (e) => {
  ctaClicked.value = true;
  if (
    !fullName.value ||
    !isEmailValid.value ||
    !phoneNumber.value ||
    !deliveryAddress.value
  ) {
    return;
  }
  emit("checkoutDone");
};

const totalQuantity = computed(() => {
  cartStore.loadFromLocalStorage();
  return cartStore.carts.reduce((total, item) => total + item.quantity, 0);
});
const totalPrice = computed(() => {
  cartStore.loadFromLocalStorage();
  return cartStore.carts.reduce((total, item) => total + item.price, 0);
});
const mealText = computed(() => {
  if (TotalCart.value === 1) {
    return 'meal';
  } else {
    return 'meals';
  }
});
</script>

<style scoped>
.info-header {
  position: sticky;
  top: 0;
  z-index: 98;
  width: 100%;
  background: white;
}
.container {
  width: 100%;
  height: 100%;
  background-color: white;

}
.information-container {
  margin: 20px;
}
.delievery-container,
.address-container,
.information-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
}
.delievery-inputs,
.address-inputs {
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
}
.delivery-header p,
.address-header p {
  color: var(--grey---grey1);
  font-family: var(--secondary---font--family);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.3px;
}
.subtotal {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--foundation---yellow---y50);

  padding: 16px 24px;
}
.subtotal-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}
.btn {
  width: 100%;
  padding: 16px 0px 32px 0px;
}
</style>
