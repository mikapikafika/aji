<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
import {useToast} from "vue-toastification";

const products = ref([]);
const categories = ref([]);
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

const updateProduct = async (product) => {
  try {
    await axios.put(`http://localhost:3000/products/${product.ProductId}`, product);
    toast.success('Product updated successfully!');
  } catch (e) {
    console.log(e);
    toast.error('An error occurred while updating the product');
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 products-container">
        <table class="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Unit Price</th>
            <th>Weight</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in products" :key="product.ProductId">
            <td>{{ product.Name }}</td>
            <td>
              <select v-model="product.CategoryId" class="form-control">
                <option v-for="category in categories" :key="category.CategoryId" :value="category.CategoryId">
                  {{ category.Name }}
                </option>
              </select>
            </td>
            <td><input type="number" v-model="product.UnitPrice" class="form-control"></td>
            <td><input type="number" v-model="product.Weight" class="form-control"></td>
            <td>
              <button @click="updateProduct(product)" class="btn btn-primary btn-one">Save</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>