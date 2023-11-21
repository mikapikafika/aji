<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

const moviesByCast = ref({});
const moviesCast = _.cloneDeep(movies);
const uniqueCast = ref(_.uniq(_.flatten(_.map(moviesCast, 'cast'))).slice(0, 100));

for (const cast of uniqueCast.value) {
  moviesByCast.value[cast] = _.filter(moviesCast, (movie) => {
    return _.includes(movie.cast, cast);
  });
}

const moviesByCastVisibility = ref({});
uniqueCast.value.forEach((genre) => {
  moviesByCastVisibility.value[genre] = false;
});

function toggleMoviesVisibility(cast) {
  moviesByCastVisibility.value[cast] = !moviesByCastVisibility.value[cast];
}
</script>

<template>
  <div>
    <h3>bezcenny argentyński kaktus</h3>
    <ul>
      <li class="cast" v-for="cast in uniqueCast" :key="cast">
        {{ cast }}
        <button @click="toggleMoviesVisibility(cast)">Show/Hide Movies</button>
        <ul v-if="moviesByCastVisibility[cast]">
          <li class="movies_by_cast" v-for="movie in moviesByCast[cast]" :key="movie.id">{{ movie.title }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cast, .movies_by_cast {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

