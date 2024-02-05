<template>
  <div class="container">
    <div class="cartlist">


      <div class="cartlist-noaddons">
       <div class="image-price">
        <div class="cartlist-image">
          <DynamicImage class="image" :imageUrl="data?.image" :isModalView="true" />
        </div>
        <div class="cartlist-item">
          <div class="cartlist-details">
            <p class="text-body-small-regular regular text-grey2">{{ data?.name }}
              <span v-if="data?.AddonSelections?.length">({{ data?.selectedItem }})</span>
            </p>
            <p class="text-body-large-medium medium text-grey1">₦{{ data?.productPrice }}</p>
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
        <div class="cart-addons" v-if="data?.AddonFoods?.length">
          <div class="addons-details">
            <p class="text-body-small-medium medium">Your add ons</p>
            <p class="text-body-small-medium medium">₦{{ data.price }}</p>
          </div>
          <div class="addons-added" v-for="(name, index) in data?.selectedNames" :key="index">
            <p>
              {{ name }}
            </p>
          </div>
          <div class="edit-addons" @click="openEditModal(data)">
            <div class="edit-icon" v-html="editIcon"></div>
            <p class="text-body-small-medium medium text-grey1">Edit add ons</p>
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


const updateQuantityFromProps = () => {
  if (props.data) {
    quantity.value = props.data.quantity;
  }
};

watch(() => props.data.quantity, () => {
  updateQuantityFromProps();
});

const quantity = ref(props?.data?.quantity);

const emit = defineEmits(["openEditModal"]);

const openEditModal = (data) => {
  emit('openEditModal', data)
};






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

onMounted(() => {
  console.log('quantity', quantity.value)
  if (props.data) {
    quantity.value = props.data.quantity

   
  }
});

watch(() => props.data, (newValue, oldValue) => {
  if (newValue) {
    quantity.value = newValue.quantity 

  }
});

updateQuantityFromProps()
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
}
.cartlist-noaddons {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 0px 25px 0px;
  align-items: flex-start;
  gap: 16px;
}
.image-price{
  display: flex;
  width: 100%;
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
  cursor: pointer;
}
.cartlist-image {
  height: 96px;
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
@media screen and (max-width: 300px) {
  .image-price{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 16px;
}
}
</style>
