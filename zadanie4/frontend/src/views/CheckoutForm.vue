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
    <div class="container">
      <div class="row">
        <div class="col-7 shopping-cart-container">
          <h2>Shopping Cart</h2>
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(product, index) in orderedItems" :key="index">
              <td>{{ product.Name }}</td>
              <td>
                <button class="btn" @click="decreaseQuantity(index)">
                  <font-awesome-icon :icon="['fas', 'minus']" size="sm"/>
                </button>
                {{ product.Quantity }}
                <button class="btn" @click="increaseQuantity(index)">
                  <font-awesome-icon :icon="['fas', 'plus']" size="sm"/>
                </button>
              </td>
              <td>{{ product.UnitPrice * product.Quantity }}</td>
              <td>
                <button class="btn" @click="removeProduct(index)">
                  <font-awesome-icon :icon="['fas', 'trash']"/>
                </button>
              </td>
            </tr>
            </tbody>
          </table>

          <p>Total: {{ totalPrice }}</p>
        </div>

        <div class="col-5 form-container">
          <h2 class="mb-4">Payment Info</h2>
          <form @submit.prevent="submitOrder">
            <div class="form-group row mb-3">
              <label>Username:</label>
              <div class="col">
                <input class="form-control" v-model="userName" type="text"/>
              </div>
            </div>
            <div class="form-group row mb-3">
              <label>Email:</label>
              <div class="col">
                <input class="form-control" v-model="email" type="email"/>
              </div>
            </div>
            <div class="form-group row mb-3">
              <label>Phone Number:</label>
              <div class="col">
                <input class="form-control" v-model="phoneNumber" type="tel"/>
              </div>
            </div>
            <button class="btn btn-primary btn-one mt-3 mb-3" type="submit">Submit Order</button>
            <div v-if="alertMessage" :class="'alert alert-' + alertType" role="alert">
              {{ alertMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shopping-cart-container {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 2.5rem;
}

.form-container {
  background-color: #5ac8fa;
  border-radius: 10px;
  padding: 2.5rem;
}

.form-container input {
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid white;
}

.form-container label {
  font-weight: 700;
}
</style>