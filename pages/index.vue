<template>
  <div class="location-modal">
    <ModalWrapper :showModal="showCreatedModal">
      <template v-slot:content>
        <Location @NextPage="closedModal" />
      </template>
    </ModalWrapper>
  </div>
  <div>
    <MainLayouts @openCartModal="openModal($event)" :tabs="tabs" :products="products" @filterProducts="updateFilteredProducts">
      <template v-slot:container>
        <CartModal :showModal="displayModal" @closeCart="closeModal($event)" />
      <div class="overall-container">
        <div class="products">
          <div v-if="!products.length" class="web-loader">
            <LoaderWeb />
          </div>
          <div class="product-content">

            <div class="product-container">
              <ProductCard v-for="(product, index) in products" :key="index" :data="product"
                @clickedButton="open(product)" />
            </div>
          </div>
          <div class="modals">
            <ModalWrapper :showModal="showModal">
              <template v-slot:content>
                <div class="Addons-container" v-if="selectedProduct">
                  <Addons :data="selectedProduct" @closed="closemodal" />
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
import { ref } from "vue";
import MainLayouts from "/layouts/MainLayouts.vue";
const tabs = ref([
  "All Categories",
  "Classic sub",
  "Special sub",
  "Burger",
  "Pasteries",
  "Platters",
  "Toppings",
]);
const displayModal = ref(false);
const selectedProduct = ref(null);
const showModal = ref(false);
const showCreatedModal = ref(false);
const open = (product) => {
  selectedProduct.value = product;
  showModal.value = true;
  console.log(product)
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
      ]
    }



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
      ]
    }
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
      ]
    }

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
      ]
    }
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
      ]
    }

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
};
const closedModal = () => {
  showCreatedModal.value = false;
};
onMounted(() => {
  showCreatedModal.value = true;
});
const openModal = (e) => {
  displayModal.value = true;
};
const closeModal = (e) => {
  displayModal.value = false;
};

const updateFilteredProducts = (selectedTab) => {
  if (selectedTab === "All Categories") {
    products.value = initialProducts;
  } else {
    products.value = initialProducts.filter((product) => product.snippet === selectedTab);
  }
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
  .product-content{
    margin-bottom: 100px;
  }

}</style>
