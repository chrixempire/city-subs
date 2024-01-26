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
                <button @click="deleteCart(data?.id)">
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
            <p class="text-body-small-medium medium">₦{{ data.price }}</p>
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
              <button @click="deleteCart(data?.id)">
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
import { ref, computed } from "vue";
import { editIcon } from "../utils/svg";
import { useCartStore } from '~/stores/index.js';
const props = defineProps(["data"]);
const modalCounter = ref(false);
const quantity = ref(props?.data?.quantity);


const totalPerPriceUnit = computed(() => {
  return props?.data?.price / props?.data?.quantity;
});

let price = props?.data?.productPrice;
let pricePerUnit = props?.data?.totalPerUnit



const cartStore = useCartStore();


const updatePricesAndQuantity = () => {
  const index = cartStore.carts.findIndex(item => item.id === props.data.id);

  if (index !== -1) {
    cartStore.carts[index].quantity = quantity.value;
    cartStore.carts[index].price = cartStore.carts[index].totalPerUnit * quantity.value;
    cartStore.carts[index].productPrice = cartStore.carts[index].pricePerUnit * quantity.value;
    cartStore.saveToLocalStorage();
  }
};

const totalQuantity = computed(() => {
  cartStore.loadFromLocalStorage();
  return cartStore.carts.reduce((total, item) => total + item.quantity, 0);
});

const increaseQuantity = () => {
  quantity.value += 1;
  updatePricesAndQuantity();
  console.log(totalQuantity.value)
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
    updatePricesAndQuantity();
  }
};

const deleteCart = (productId) => {
  cartStore.loadFromLocalStorage();
  const index = cartStore.carts.findIndex(item => item.id === productId);

  if (index !== -1) {
    cartStore.carts.splice(index, 1);
    cartStore.saveToLocalStorage();

    console.log("Product with ID:", productId, "deleted from cart.");
  } else {
    console.log("Product with ID:", productId, "not found in cart.");
  }
}




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
