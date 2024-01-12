<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
import {useToast} from "vue-toastification";

const products = ref([]);
const categories = ref([]);
const orders = ref([]);
const toast = useToast();

onMounted(async () => {
  try {
    const [productsResponse, categoriesResponse, ordersResponse] = await Promise.all([
      axios.get("http://localhost:3000/products"),
      axios.get("http://localhost:3000/categories"),
      axios.get("http://localhost:3000/orders")
    ]);

    products.value = productsResponse.data;
    categories.value = categoriesResponse.data;
    orders.value = ordersResponse.data;
    console.log(orders.value);
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

const updateOrderStatus = async (order, statusId) => {
  try {
    await axios.put(`http://localhost:3000/orders/${order.OrderId}`, {...order, OrderStatusId: statusId});
    toast.success('Order status updated successfully');
  } catch (e) {
    console.log(e);
    toast.error('Failed to update order status');
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 products-container">
        <h2 class="text-center">Products</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Weight</th>
            <th scope="col"></th>
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

    <div class="row">
      <div class="col-12 orders-container">
        <h2 class="text-center">Orders</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Approval Date</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Order Items</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orders" :key="order.OrderId">
            <td>{{ order.ApprovalDate }}</td>
            <td>{{ order.UserName }}</td>
            <td>{{ order.Email }}</td>
            <td>{{ order.PhoneNumber }}</td>
            <td>
              <!-- ni mo -->
            </td>
            <td>
              <button @click="updateOrderStatus(order, 4)" class="btn btn-success">Completed</button>
              <button @click="updateOrderStatus(order, 3)" class="btn btn-danger">Cancelled</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col-12 orders-container">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Approval Date</th>
            <th scope="col">Value</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orders" :key="order.OrderId">
            <td></td>
            <td>{{ order.ApprovalDate }}</td>
            <td>
              <!-- ni mo -->
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