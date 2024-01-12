<script setup>
import {useStore} from "vuex";
import {ref, computed, onMounted} from "vue";
import axios from "axios";

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref('');
const searchText = ref('');
const store = useStore();

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
    return product.Name.includes(searchText.value) &&
      (selectedCategory.value === '' || product.CategoryId === selectedCategory.value);
  });
});

const addToCart = (product) => {
  console.log('added');
  store.commit('addToCart', product);
};
</script>

<template>
  <div>
    <input v-model="searchText" class="form-control" placeholder="Search by name">
    <select v-model="selectedCategory" class="form-control">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category.CategoryId" :value="category.CategoryId">
        {{ category.Name }}
      </option>
    </select>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Unit Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.ProductId">
          <td>{{ product.Name }}</td>
          <td>{{ product.Description }}</td>
          <td>{{ product.UnitPrice }}</td>
          <td>
            <button @click="addToCart(product)" class="btn btn-primary">Buy</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>

</style>