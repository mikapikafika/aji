<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required, email as emailValidator, minLength, numeric} from "@vuelidate/validators";
import axios from "axios";

const store = useStore();
const userName = ref("");
const email = ref("");
const phoneNumber = ref("");
const orderedItems = computed(() => store.state.orderedItems);

// Validation
const rules = {
  userName: {required},
  email: {required, email: emailValidator},
  phoneNumber: {required, numeric, minLength: minLength(9)}
};
const v$ = useVuelidate(rules, {userName, email, phoneNumber});

const alertMessage = ref("");
const alertType = ref("");

// Methods
const increaseQuantity = (index) => {
  orderedItems.value[index].Quantity++;
};

const decreaseQuantity = (index) => {
  if (orderedItems.value[index].Quantity > 1) {
    orderedItems.value[index].Quantity--;
  } else {
    removeProduct(index);
  }
};

const removeProduct = (index) => {
  orderedItems.value.splice(index, 1);
};

const totalPrice = computed(() => {
  return orderedItems.value.reduce((total, product) => total + product.UnitPrice * product.Quantity, 0);
});

// Submitting the order
const submitOrder = async () => {
  if (v$.value.$invalid) {
    alertMessage.value = "Please fill in all the required fields";
    alertType.value = "danger";
    return;
  }

  const order = {
    UserName: userName.value,
    Email: email.value,
    PhoneNumber: phoneNumber.value,
    OrderedItems: orderedItems.value.map(product => {
      return {
        ProductId: product.ProductId,
        Quantity: product.Quantity
      };
    })
  };

  console.log(order);
  try {
    const response = await axios.post("http://localhost:3000/orders", order);
    console.log(response);
    alertMessage.value = "Order submitted successfully";
    alertType.value = "success";
  } catch (e) {
    console.error('Error submitting order:', e);
  }
};
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
        <input v-model="userName" type="text"/>
      </label>
      <label>
        Email:
        <input v-model="email" type="email"/>
      </label>
      <label>
        Phone:
        <input v-model="phoneNumber" type="tel"/>
      </label>
      <div v-if="alertMessage" :class="'alert alert-' + alertType" role="alert">
        {{ alertMessage }}
      </div>
      <button type="submit">Submit Order</button>
    </form>
  </div>
</template>

<style scoped>

</style>