<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
// import axios from "axios";

const store = useStore();
const userName = ref("");
const email = ref("");
const phoneNumber = ref("");
const orderedItems = computed(() => store.state.orderedItems);

// Needed for input validation
// const form = ref({
//   userName: "",
//   email: "",
//   phoneNumber: "",
// });
//
// const rules = {
//   userName: {required},
//   email: {required, email},
//   phoneNumber: {required},
// };
//
// const v$ = useVuelidate(rules);


const increaseQuantity = (index) => {
  orderedItems.value[index].Quantity++;
};

const decreaseQuantity = (index) => {
  if (orderedItems.value[index].Quantity > 1) {
    orderedItems.value[index].Quantity--;
  }
};

const removeProduct = (index) => {
  orderedItems.value.splice(index, 1);
};

// very much idk
// const submitOrder = async () => {
//   const order = {
//     UserName: userName.value,
//     Email: email.value,
//     PhoneNumber: phoneNumber.value,
//   };
//
//   try {
//     const response = await axios.post("http://localhost:3000/orders", order);
//     console.log(response.data);
//     userName.value = "";
//     email.value = "";
//     phoneNumber.value = "";
//     orderedItems.value = [];
//   } catch (e) {
//     console.log(e);
//
//   }
// };


const totalPrice = computed(() => {
  return orderedItems.value.reduce((total, product) => total + product.UnitPrice * product.Quantity, 0);
});
</script>

<template>
  <div v-if="orderedItems">
    <!-- Table -->
    <table>
      <tr>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Sum</th>
        <th></th>
      </tr>
      <tr v-for="(product, index) in orderedItems" :key="index">
        <td>{{ product.Name }}</td>
        <td>
          <button @click="decreaseQuantity(index)">-</button>
          {{ product.Quantity }}
          <button @click="increaseQuantity(index)">+</button>
        </td>
        <td>{{ product.UnitPrice * product.Quantity }}</td>
        <td>
          <button @click="removeProduct(index)">Remove</button>
        </td>
      </tr>
    </table>


    <!-- Total Price -->
    <p>Total Price: {{ totalPrice }}</p>

    <!-- Form -->
    <form @submit.prevent="submitOrder">
      <label>
        Username:
        <input v-model="userName" type="text" required/>
      </label>
      <label>
        Email:
        <input v-model="email" type="email" required/>
      </label>
      <label>
        Phone:
        <input v-model="phoneNumber" type="tel" required/>
      </label>
      <button type="submit">Submit Order</button>
    </form>
  </div>
</template>

<style scoped>

</style>