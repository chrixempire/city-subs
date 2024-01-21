<template>
  <div class="location-modal">
    <ModalWrapper :showModal="showCreatedModal" >
      <Location @NextPage="closedModal"/>
    </ModalWrapper>
  </div>
  <div>
    <MainLayouts @openCartModal="openModal($event)">
      <CartModal :showModal="displayModal" @closeCart="closeModal($event)" />
      <div class="overall-container">
        <div class="products">
          <div v-if="!products.length" class="web-loader">
            <LoaderWeb  />
        </div>
        <div class="product-content">
            <!-- <div class="filter-tabs">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab"
            @click="toggleTab(index)"
            :class="{ clicked: activeTab === index }"
          >
            <P class="text-body-large-medium medium">{{ tab }}</P>
          </div>
        </div> -->
          <div class="product-container">
            <ProductCard v-for="(product, index) in products" :key="index" :data="product"
          @clickedButton="open(product)" />
          </div>
        </div>
        <div class="modals">
          <ModalWrapper :showModal="showModal">
            <div class="Addons-container">
              <Addons :data="selectedProduct"  :closed="closemodal"/>
            </div>
          </ModalWrapper>
        </div>
        </div>
      </div>
    </MainLayouts>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MainLayouts from "/layouts/MainLayouts.vue";
const tabs = ref([
  "All Categories",
  "Classic Sub",
  "Special sub",
  "Burger",
  "Pasteries",
  "Platters",
  "Toppings",
]);
const activeTab = ref(0);
const displayModal = ref(false);
const selectedProduct = ref(null);
const showModal = ref(false);
const showCreatedModal = ref(false);
const open = (product) => {
  selectedProduct.value = product;
  showModal.value = true;
  console.log(product)
};
const products = [
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
    snippet: "Classic sub",
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
    snippet: "Classic sub",
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
    snippet: "Classic sub",
    price: 3500,
    image: "images/chickenimage.jpg",

  },
  {
    name: "French fries",
    snippet: "Classic sub",
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
    snippet: "Classic sub",
    price: 3500,
    image: "images/pap.jpg",
  },
  {
    name: "Naija breakfast",
    snippet: "Classic sub",
    price: 3500,
    image: "images/philly.jpg",
  },

];
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

const toggleTab = (index) => {
  activeTab.value = index;
  filterItemsByType();
};

const filterItemsByType = () => {
  const selectedType = tabs.value[activeTab.value];
  filteredProducts.value =
    selectedType === "All Categories"
      ? Products.value
      : Products.value.filter((Product) => Product.type === selectedType);
};

const filteredProducts = ref([]);
const Products = ref([]);
</script>

<style scoped>
.overall-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 64px;
    margin: 0px 100px 100px 100px;
}
.products{
  width: 100%;
}
.web-loader{
    width: 100%;
    margin-bottom: 80px;
}
.product-content{
    width: 100%;
}
/* .filter-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
} */

.Addons-container{
  width: 100%;
}

.product-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px 28px;
}
.product-content{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  flex-direction: column;
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
 
  /* .filter-tabs {
    width: 100%;
    display: flex;
    flex-wrap: nowrap; 
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 6px 3px ;


    position: sticky;
  top: 0;
  background-color: white;
  z-index: 100; 
  }
  .filter-tabs::-webkit-scrollbar {
    display: none;
  }
  .tab {
    display: flex;
    height: 32px;
    padding: 8px 12px;
  }
  .tab p {
    color: var(--grey-grey1);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  } */
}
</style>
