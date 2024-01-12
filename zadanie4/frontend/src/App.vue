<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <router-link class="navbar-brand h1" to="/"><font-awesome-icon :icon="['fas', 'house']" /> Home</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-2 mb-2 mb-lg-0">
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

nav {
  background-color: #f0f0f0;
}

.btn-one {
  background-color: #030303;
  border: none;
  transition: background 0.2s, box-shadow 0.3s;
}

.btn-one:hover {
  background-color: #000000;
  box-shadow: 0px 0px 7px 0px #030303;
}
</style>
