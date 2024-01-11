// IDK NA RAZIE TAK BO MI SIĘ NUDZIŁO

<script setup>
import {ref} from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true
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
      <th>Weight</th>
      <th>Category</th>
      <th>Action(?)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="product in products" :key="product.id">
      <td>{{ product.name }}</td>
      <td>{{ product.description }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.weight }}</td>
      <td>{{ product.category }}</td>
      <td>
        <button @click="addToCart(product)">Buy</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>