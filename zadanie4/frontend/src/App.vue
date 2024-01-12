<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><font-awesome-icon :icon="['fas', 'house']" /> Home</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/checkout"><font-awesome-icon :icon="['fas', 'cart-shopping']"/></router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Source Sans 3', sans-serif;
}

.btn-one {
  background-color: #030303;
  border: none;
}
</style>
