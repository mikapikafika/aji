<script setup>
import {useStore} from "vuex";
import {ref, computed, onMounted} from "vue";
import axios from "axios";
import {useToast} from "vue-toastification";

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref('');
const searchText = ref('');
const store = useStore();
const toast = useToast();

onMounted(async () => {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      axios.get("http://localhost:3000/products"),
      axios.get("http://localhost:3000/categories")
    ]);

    products.value = productsResponse.data;
    categories.value = categoriesResponse.data;
  } catch (e) {
    console.log(e);
  }
});

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    return product.Name.toLowerCase().includes(searchText.value.toLowerCase()) &&
        (selectedCategory.value === '' || product.CategoryId === selectedCategory.value);
  });
});

const addToCart = (product) => {
  store.commit('addToCart', product);
  toast.success(`${product.Name} added to cart!`);
};
</script>

<template>
  <div class="main-container">
    <div class="container">
      <div class="row justify-content-center align-items-center filter-container mb-lg-5 mt-5">
        <div class="col-auto">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
        </div>
        <div class="col-8">
          <div>
            <input v-model="searchText" class="form-control" placeholder="Search by name">
            <select v-model="selectedCategory" class="form-control">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.CategoryId" :value="category.CategoryId">
                {{ category.Name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 products-container mb-5">
          <h2 class="text-center">Products</h2>
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Unit Price</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in filteredProducts" :key="product.ProductId">
              <td>{{ product.Name }}</td>
              <td>{{ product.Description }}</td>
              <td>{{ product.UnitPrice }}</td>
              <td>
                <button @click="addToCart(product)" class="btn btn-primary btn-one">Buy</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //height: 80vh;
}

.filter-container input, .filter-container select {
  background-color: #e5e5e5;
}

</style>