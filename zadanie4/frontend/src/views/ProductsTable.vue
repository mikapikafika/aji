// IDK NA RAZIE TAK BO MI SIĘ NUDZIŁO

<script setup>
import {onMounted, ref, defineEmits} from "vue";
import axios from "axios";

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    console.log(response.data);
    products.value = response.data;
  } catch (e) {
    console.log(e);
  }
});
const emit = defineEmits(["addToCart"]);
const addToCart = (product) => {
  emit("addToCart", product);
};
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Unit Price</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="product in products" :key="product.ProductId">
      <td>{{ product.Name }}</td>
      <td>{{ product.Description }}</td>
      <td>{{ product.UnitPrice }}</td>
      <td>
        <button @click="addToCart(product)">Buy</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>