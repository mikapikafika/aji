<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required, email as emailValidator, minLength, numeric} from "@vuelidate/validators";

const store = useStore();
const userName = ref("");
const email = ref("");
const phoneNumber = ref("");
const orderedItems = computed(() => store.state.orderedItems);

const rules = {
  userName: { required },
  email: { required, email: emailValidator },
  phoneNumber: { required, numeric, minLength: minLength(9) }
};

const v$ = useVuelidate(rules, { userName, email, phoneNumber });

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

const submitOrder = () => {
  if (v$.value.$invalid) {
    alert('Invalid form');
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
        <span v-if="v$.userName.$error">Username is required</span>
      </label>
      <label>
        Email:
        <input v-model="email" type="email"/>
        <span v-if="v$.email.$error">Email is required</span>
      </label>
      <label>
        Phone:
        <input v-model="phoneNumber" type="tel"/>
        <span v-if="v$.phoneNumber.$error">Phone number is required</span>
      </label>
      <button type="submit">Submit Order</button>
    </form>
  </div>
</template>

<style scoped>

</style>