<template>
  <div class="location-modal">
    <ModalWrapper :showModal="showCreatedModal">
      <template v-slot:content>
        <Location @NextPage="closedModal" />
      </template>
    </ModalWrapper>
  </div>
  <div class="success-modal">
    <ModalWrapper :showModal="showSuccessModal">
      <template v-slot:content>
        <SuccessModal @closeSuccesModal="closeSuccesModal($event)" />
      </template>
    </ModalWrapper>
  </div>
  <div>
    <MainLayouts
      @openCartModal="openModal($event)"
      @openMobileCart="openMobileCart($event)"
      :tabs="tabs"
      :products="products"
      @filterProducts="updateFilteredProducts"
      @filteredProducts="updateSearchedProducts"
      
    >
      <template v-slot:container>
        <CartModal
          :carts="cartItems"
          :showModal="displayModal"
          @closeCart="closeModal($event)"
          @checkoutDone="checkoutDone($event)"
          :stepped="step"
          
        />
        <CartMobileModal
          :carts="cartItems"
          :showMobileModal="showMobileModal"
          @closeCart="closeMobileModal($event)"
          @checkoutDone="checkoutDone($event)"
          :stepMobile="stepp"
        />
        <div class="overall-container">
          <div class="products">
            <div v-if="!products.length" class="web-loader">
              <LoaderWeb />
            </div>
            <div class="product-content">
              <div class="product-container">
                <ProductCard
                  v-for="(product, index) in products"
                  :key="index"
                  :data="product"
                  @clickedButton="open(product)"
                />
              </div>
            </div>


            <div class="modals">
              <ModalWrapper :showModal="showModal">
                <template v-slot:content>
                  <div class="Addons-container" v-if="selectedProduct">
                    <Addons
                      :data="selectedProduct"
                      @closed="closemodal"
                      @addToCart="addToCart"
                    />
                  </div>
                </template>
              </ModalWrapper>
            </div>


            <div class="modals">
              <ModalWrapper :showModal="showEditModal">
                <template v-slot:content>
                  <div class="Addons-container" v-if="selectedProduct">
                    <Addons
                      :data="selectedProduct"
                      @closed="closemodal"
                      @addToCart="addToCart"
                    />
                  </div>
                </template>
              </ModalWrapper>
            </div>



          </div>
        </div>
      </template>
    </MainLayouts>
  </div>
</template>

<script setup>
import MainLayouts from "/layouts/MainLayouts.vue";
import { ref, watchEffect } from "vue";
import { useCartStore } from '~/stores/index.js';
const cartStore = useCartStore()
// import { cart } from "~/cart.js";

const cartItems =computed(() => useCartStore().carts);

// const cartLength = computed(() => cartItems.value.length);
const step = ref(1);
const stepp = ref(1);
const displayModal = ref(false);
const selectedProduct = ref(null);
const showModal = ref(false);
const showEditModal = ref(false);
const showSuccessModal = ref(false);
const showMobileModal = ref(false);
const showCreatedModal = ref(false);
const addToCart = (cartItem) => {
  useCartStore().addToCart(cartItem);
  showModal.value = false;
  selectedProduct.value = null;
  console.log("Item added to cart:", cartItem);

};
const checkoutDone = (e) => {
  showSuccessModal.value = true
}
const closeSuccesModal = (e) => {
  showSuccessModal.value = false
  displayModal.value = false;
  showMobileModal.value = false;
  useCartStore().clearCart()
  step.value = 2
  stepp.value = 2
  console.log('shit')
}


const tabs = ref([
  "All Categories",
  "Classic sub",
  "Special sub",
  "Burger",
  "Pasteries",
  "Platters",
  "Toppings",
]);
const open = (product) => {
  selectedProduct.value = product;
  showModal.value = true;
  console.log(product);
};

const initialProducts = [
  {
    name: "Classic beef burger",
    snippet: "Classic sub",
    price: 3500,
    image: "images/chickenimage.jpg",
    Addons: {
      selections: [
        { label: "Barbecue", value: "Barbecue", image: "images/chickenimage.jpg" },
        { label: "Peppered", value: "Peppered", image: "images/chickenimage.jpg" },
      ],
      foods: [
        { name: "Ketchup", price: 100 },
        { name: "Burger", price: 150 },
        { name: "Salad", price: 150 },
        { name: "Pasta", price: 100 },
      ],
    },
  },
  {
    name: "French fries",
    snippet: "Special sub",
    price: 3500,
    image: "images/bacon.jpg",
  },
  {
    name: "Chicken and bacon",
    snippet: "Special sub",
    price: 3500,
    image: "images/pap.jpg",
    Addons: {
      selections: [
        { label: "Barbecue", value: "Barbecue", image: "images/chickenimage.jpg" },
        { label: "Peppered", value: "Peppered", image: "images/chickenimage.jpg" },
      ],
      foods: [
        { name: "Ketchup", price: 100 },
        { name: "Burger", price: 150 },
        { name: "Salad", price: 150 },
        { name: "Pasta", price: 100 },
      ],
    },
  },
  {
    name: "Naija breakfast",
    snippet: "Pasteries",
    price: 3500,
    image: "images/philly.jpg",
  },
  {
    name: "Classic beef burger",
    snippet: "Classic sub",
    price: 3500,
    image: "images/chickenimage.jpg",
    Addons: {
      selections: [
        { label: "Barbecue", value: "Barbecue", image: "images/chickenimage.jpg" },
        { label: "Peppered", value: "Peppered", image: "images/chickenimage.jpg" },
      ],
      foods: [
        { name: "Ketchup", price: 100 },
        { name: "Burger", price: 150 },
        { name: "Salad", price: 150 },
        { name: "Pasta", price: 100 },
      ],
    },
  },
  {
    name: "French fries",
    snippet: "Pasteries",
    price: 3500,
    image: "images/bacon.jpg",
  },
  {
    name: "Chicken and bacon",
    snippet: "Classic sub",
    price: 3500,
    image: "images/pap.jpg",
    Addons: {
      selections: [
        { label: "Barbecue", value: "Barbecue", image: "images/chickenimage.jpg" },
        { label: "Peppered", value: "Peppered", image: "images/chickenimage.jpg" },
      ],
      foods: [
        { name: "Ketchup", price: 100 },
        { name: "Burger", price: 150 },
        { name: "Salad", price: 150 },
        { name: "Pasta", price: 100 },
      ],
    },
  },
  {
    name: "Naija breakfast",
    snippet: "Classic sub",
    price: 3500,
    image: "images/philly.jpg",
  },
  {
    name: "Classic beef burger",
    snippet: "Toppings",
    price: 3500,
    image: "images/chickenimage.jpg",
  },
  {
    name: "French fries",
    snippet: "Toppings",
    price: 3500,
    image: "images/bacon.jpg",
    Addons: {
      selections: [
        { label: "Barbecue", value: "Barbecue", image: "images/chickenimage.jpg" },
        { label: "Peppered", value: "Peppered", image: "images/chickenimage.jpg" },
      ],
      foods: [
        { name: "Ketchup", price: 100 },
        { name: "Burger", price: 150 },
        { name: "Salad", price: 150 },
        { name: "Pasta", price: 100 },
      ],
    },
  },
  {
    name: "Chicken and bacon",
    snippet: "Burger",
    price: 3500,
    image: "images/pap.jpg",
  },
  {
    name: "Naija breakfast",
    snippet: "Burger",
    price: 3500,
    image: "images/philly.jpg",
  },
];
const products = ref(initialProducts);
const closemodal = () => {
  showModal.value = false;
  selectedProduct.value = null;
};
const closedModal = () => {
  showCreatedModal.value = false;
};
onMounted(() => {
  showCreatedModal.value = true;
  cartStore.loadFromLocalStorage()
  step.value = 1
  stepp.value = 1
  
});

const openModal = (e) => {
  displayModal.value = true;
};
const openMobileCart = (e) => {
  showMobileModal.value = true;
};
const closeModal = (e) => {
  displayModal.value = false;
};
const closeMobileModal = (e) => {
  showMobileModal.value = false;
};

// const updateFilteredProducts = (selectedTab, searchQuery) => {
//   if (selectedTab === "All Categories") {
//     products.value = initialProducts;
//   } else {
//     products.value = initialProducts.filter((product) => product.snippet === selectedTab);
//   }
// };





const updateFilteredProducts = (selectedTab, searchQuery) => {
  let filtered = initialProducts;

  if (selectedTab !== 'All Categories') {
    filtered = initialProducts.filter(product => product.snippet === selectedTab);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      (product.Addons && product.Addons.selections.some(selection => selection.label.toLowerCase().includes(query)))
    );
  }

  products.value = filtered;
};

const updateSearchedProducts = (searchQuery) => {
  let filtered = initialProducts;

  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.snippet.toLowerCase().includes(query) ||
      product.price.toString().includes(query) || // Convert price to string for search
      (product.Addons && product.Addons.selections.some(selection => selection.label.toLowerCase().includes(query))) ||
      (product.Addons && product.Addons.foods.some(food => 
        food.name.toLowerCase().includes(query) ||
        food.price.toString().includes(query) // Convert food price to string for search
      ))
    );
  }

  products.value = filtered;
};

</script>

<style scoped>
.overall-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
  margin: 0px 5% 5% 5%;
}

.products {
  width: 100%;
}

.web-loader {
  width: 100%;
  margin-bottom: 80px;
}

.Addons-container {
  width: 100%;
}

.product-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px 28px;
}

.product-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  flex-direction: column;
  margin-bottom: 100px;
}

@media screen and (max-width: 450px) {
  .overall-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin: 0px 16px 16px 16px;
  }
  .product-content {
    margin-bottom: 100px;
  }
}
</style>
