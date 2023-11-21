<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

const moviesTable = ref(_.take(movies, 10));
const counter = ref(1);

function showMore() {
  counter.value++;
  moviesTable.value = _.take(movies, 10 * counter.value);
}
</script>

<template>
  <div class="centered-container">
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Cast</th>
        <th>Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="movie in moviesTable" :key="movie.id">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.cast }}</td>
        <td>{{ movie.genres }}</td>
      </tr>
      </tbody>
    </table>
    <button @click="showMore">Show more</button>
  </div>

</template>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>