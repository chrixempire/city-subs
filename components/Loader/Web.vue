<template>
    <div class="total">
      <div class="header">
          <div class="skeleton-loader__header"></div>
      </div>
        <section class="container">
          <div class="grid-container">
          <div v-for="index in 12" :key="index" class="products">
            <div class="product-skeleton">
              <div class="skeleton-loader__image"></div>
              <div class="flexed-container" >
              <div class="flexed">
              <div class="skeleton-loader__title"></div>
              <div class="skeleton-loader__price"></div>
             </div>
              <div class="skeleton-loader__snip"></div>
              </div>
            </div>
          </div>
          </div>
        </section>
  
    </div>
  </template>
  
  <style scoped>
  .total{
      width: 100%;
  }
  .header{
      width: 100%;
      display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 64px;
  }
  .skeleton-loader__header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5.51px;
  
    max-width: 100%;
    width: 70%;
    height: 44.07px;
  
   border-radius: 100px;
  background: #E5E7EF;
  
    animation: skeleton-loader__image 1s ease-in-out infinite;
  }
  .grid-container {
      width: 100%;
      display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    gap: 24px 28px;
  }
  
  .products {
      width: 350px;
  }
  
  .product-skeleton {
    width: 350px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap:8px;
  }
  
  .skeleton-loader__image {
    width: 100%;
    height: 143px;
  }
  .flexed{
      display: flex;
      justify-content: space-between;
      /* align-items: center; */
      flex-direction: column;
      gap: 8px;
      width: 100%;
  }
  .flexed-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      width: 100%;
  }
  .skeleton-loader__title {
      width: 80%;
    height: 14px;
  }
  .skeleton-loader__snip {
      width: 35%;
    height: 26px;
    border-radius: 100px;
  }
  
  .skeleton-loader__price {
    width:70%;
    height: 14px;
  }
  
  
  </style>
  