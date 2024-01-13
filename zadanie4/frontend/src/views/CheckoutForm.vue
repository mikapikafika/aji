<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required, email as emailValidator, minLength, numeric} from "@vuelidate/validators";
import axios from "axios";
import {useToast} from "vue-toastification";

const store = useStore();
const userName = ref("");
const email = ref("");
const phoneNumber = ref("");
const orderedItems = computed(() => store.state.orderedItems);
const toast = useToast();

// Validation
const rules = {
  userName: {required},
  email: {required, email: emailValidator},
  phoneNumber: {required, numeric, minLength: minLength(9)}
};
const v$ = useVuelidate(rules, {userName, email, phoneNumber});

// Methods
const updateQuantity = (index, quantity) => {
  if (quantity <= 0) {
    removeProduct(index);
  } else {
    orderedItems.value[index].Quantity = quantity;
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
    toast.error("Please fill in all the required fields.");
    return;
  }

  const order = {
    ApprovalDate: null,  // powinnismy to pozniej zmienic i guees po zatwierdzeniu zamowienia
    OrderStatusId: 1,
    UserName: userName.value,
    Email: email.value,
    PhoneNumber: phoneNumber.value,
    Items: orderedItems.value.map(product => {
      return {
        ProductId: product.ProductId,
        Quantity: product.Quantity
      };
    })
  };

  console.log(order);
  try {
    const response = await axios.post("http://localhost:3000/orders", order);
    console.log("resposne: ", response);
    toast.success("Thank you for shopping with us!")
  } catch (e) {
    toast.error('Error submitting order.');
  }
};
</script>

<template>
  <div class="checkout-container">
    <div class="container">
      <div class="row">

        <div class="col-7 shopping-cart-container mr-3">
          <h2 class="text-center">Shopping Cart</h2>
          <div v-if="orderedItems.length > 0">
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
                  <input type="number" v-model.number="product.Quantity" min="0"
                         @change="updateQuantity(index, product.Quantity)" class="form-control" style="width: 70px;">
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
            <div class="price-container">
              <p><strong>
                <font-awesome-icon :icon="['fas', 'dollar-sign']"/>
                Total:</strong> {{ totalPrice }}
              </p>
            </div>
          </div>
          <div v-else class="empty-cart-container">
            <h3 class="text-center">Your shopping cart is empty.</h3>
          </div>
        </div>

        <div class="col-5 form-container ml-3">
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
            <button class="btn btn-primary btn-one mt-3" type="submit">Submit Order</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
}

.shopping-cart-container {
  background-color: #e5e5e5;
  border-radius: 10px;
  padding: 2.5rem;
}

.price-container {
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
}

table {
  padding: 1rem;
  border-radius: 5px;
}

.empty-cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}

.form-container {
  background-color: #5ac8fa;
  border-radius: 10px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 35vh;
}

.form-container input {
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid white;
  width: 100%;
}

.form-container label {
  font-weight: 700;
  align-self: flex-start;
}
</style>