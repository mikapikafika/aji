<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
import {useToast} from "vue-toastification";

const products = ref([]);
const categories = ref([]);
const orders = ref([]);
const orderItems = ref([]);
const status = ref([]);
const updatedOrders = ref([]);
const toast = useToast();


onMounted(async () => {
  try {
    const [productsResponse, categoriesResponse, ordersResponse,  orderItemsResponse, statusResponse] = await Promise.all([
      axios.get("http://localhost:3000/products"),
      axios.get("http://localhost:3000/categories"),
      axios.get("http://localhost:3000/orders"),
      axios.get("http://localhost:3000/orderItems"),
      axios.get("http://localhost:3000/status"),
    ]);

    products.value = productsResponse.data;
    categories.value = categoriesResponse.data;
    orders.value = ordersResponse.data;

  updatedOrders.value = ordersResponse.data.filter(order => order.OrderStatusId == 1 || order.OrderStatusId == 2);


    orderItems.value = orderItemsResponse.data;
    status.value = statusResponse.data;
    console.log(status.value);
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
    await axios.patch(`http://localhost:3000/orders/${order.OrderId}`, {OrderStatusId: statusId});
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
      <div class="col-12 products-container mt-5">
        <h2 class="text-center">Manage Products</h2>
        <table class="table table-bordered">
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
      <div class="col-12 orders-container mt-5">
        <h2 class="text-center">Manage Orders</h2>
        <table class="table table-bordered">
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
          <tr v-for="order in updatedOrders" :key="order.OrderId">
            <td>{{ order.ApprovalDate }}</td>
            <td>{{ order.UserName }}</td>
            <td>{{ order.Email }}</td>
            <td>{{ order.PhoneNumber }}</td>
            <td>
              {{ orderItems.filter(item => item.OrderId === order.OrderId).map(item => {
                const product = products.find(product => product.ProductId === item.ProductId);
                return `${product.Name} x ${item.Quantity}`;
              }).join(', ') }}
            </td>
            <td>
              <button @click="updateOrderStatus(order, 4)" class="btn btn-primary btn-green">Completed</button>
              <button @click="updateOrderStatus(order, 3)" class="btn btn-primary btn-red">Cancelled</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col-12 status-container mt-5 mb-5">
        <h2 class="text-center">Status</h2>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Approval Date</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orders" :key="order.OrderId">
            <td>{{ status.find(item => item.OrderStatusId === order.OrderStatusId)?.Name}}</td>
            <td>{{ order.ApprovalDate }}</td>
            <td>{{ order.UserName }}</td>
            <td>{{ order.Email }}</td>
            <td>{{ order.PhoneNumber }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container, .status-container {
  background-color: #5ac8fa;
  border-radius: 10px;
  padding: 2.5rem;
}
</style>