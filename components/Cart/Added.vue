<template>
  <div class="container">
    <div class="cartlist">
      <div class="cartlist-addons" v-if="data?.addons?.length">
        <div class="cart-topp">
          <div class="cartlist-image">
            <DynamicImage class="image" :imageUrl="data?.image" :isModalView="true" />
          </div>
          <div class="cartlist-item">
            <div class="cartlist-details">
              <p class="text-body-small-regular regular text-grey2">
                {{ data?.name }}({{ data?.selectedItem }})
              </p>
              <div class="delete-cart">
                <button @click="deleteCart($event)">
                    <div class="delete-icon" v-html="deleteIcon"></div>
                </button>
              </div>
            </div>
            <div class="cartlist-action">
              <p class="text-body-large-medium medium text-grey1">
                ₦{{ data?.productPrice }}
              </p>
              <div class="cart-counter">
                <ProductCounterBtn
                  :modalCounter="modalCounter"
                  :quantity="quantity"
                  @increaseQuantity="increaseQuantity"
                  @decreaseQuantity="decreaseQuantity"
                  class="count"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="cart-addons">
          <div class="addons-details">
            <p class="text-body-small-medium medium">Your add ons</p>
            <p class="text-body-small-medium medium">₦{{ data?.price }}</p>
          </div>
          <div class="addons-added" v-for="(name, index) in data?.addon" :key="index">
            <p>
              {{ name }}
            </p>
          </div>
          <div class="edit-addons">
            <div class="edit-icon" v-html="editIcon"></div>
            <p class="text-body-small-medium medium text-grey1">Edit add ons</p>
          </div>
        </div>
      </div>
      <div class="cartlist-noaddons" v-else>
        <div class="cartlist-image">
          <DynamicImage class="image" :imageUrl="data?.image" :isModalView="true" />
        </div>
        <div class="cartlist-item">
          <div class="cartlist-details">
            <p class="text-body-small-regular regular text-grey2">{{ data?.name }}</p>
            <p class="text-body-large-medium medium text-grey1">{{ data?.price }}</p>
          </div>
          <div class="cartlist-action">
            <div class="delete-cart">
              <button @click="deleteCart($event)">
                <div class="delete-icon" v-html="deleteIcon"></div>
              </button>
            </div>
            <div class="cart-counter">
              <ProductCounterBtn
                :modalCounter="modalCounter"
                :quantity="quantity"
                @increaseQuantity="increaseQuantity"
                @decreaseQuantity="decreaseQuantity"
                class="count"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { editIcon } from "../utils/svg";
const props = defineProps(["data"]);
const modalCounter = ref(false);
const quantity = ref(props?.data?.quantity);
const increaseQuantity = () => {
  quantity.value += 1;
  console.log(quantity.value);
};
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
    console.log(quantity.value);
  }
};
const deleteCart = (e) => {
  console.log("delete");
};
</script>

<style scoped>
.cart-topp {
  display: flex;
  display: flex;
  gap: 16px;
}
.cartlist-addons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: flex-start;
  /* padding: 0px 20px; */
}
.cartlist-noaddons {
  display: flex;
  width: 100%;
  padding: 0px 0px 100px 0px;
  align-items: flex-start;
  gap: 16px;
}
.cartlist-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 96px;
}
.delete-cart button {
  display: flex;
  width: 32px;
  height: 32px;
  padding: 6.4px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  background: var(--grey---grey6);
}
.cart-counter {
  width: 150px;
}
.addons-added p {
  color: var(--grey---grey2);
  font-family: var(--secondary---font--family);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
.addons-added {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.edit-addons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cartlist-image {
  height: 96px;
  /* width: px; */
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.cartlist-details,
.cartlist-action {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart-addons {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
}
.addons-details {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cartlist-action {
  height: 40px;
}
</style>
