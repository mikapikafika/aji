<template>
  <div id="app" class="container mt-4">
    <h1>Zadanie 4 - Vue.js Frontend</h1>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Dane z Backendu</h2>
        <ul>
          <li v-for="item in backendData" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backendData: [],
    };
  },
  mounted() {
    // Tutaj użyj axios, aby pobierać dane z backendu i ustawiać backendData
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
  margin-top: 20px;
}
</style>
