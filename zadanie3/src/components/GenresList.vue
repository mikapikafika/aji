<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

const moviesByGenre = ref({});
const moviesGenres = _.cloneDeep(movies);
const uniqueGenres = ref(_.uniq(_.flatten(_.map(moviesGenres, 'genres'))).slice(0, 100));

for (const genre of uniqueGenres.value) {
  moviesByGenre.value[genre] = _.filter(moviesGenres, (movie) => {
    return _.includes(movie.genres, genre);
  });
}

const moviesByGenreVisibility = ref({});
uniqueGenres.value.forEach((genre) => {
  moviesByGenreVisibility.value[genre] = false;
});

function toggleMoviesVisibility(genre) {
  moviesByGenreVisibility.value[genre] = !moviesByGenreVisibility.value[genre];
}


</script>

<template>
  <div>
    <h3>gdzie pieniądze za las?</h3>
    <ul>
      <li class="genres" v-for="genres in uniqueGenres" :key="genres">
        {{ genres }}
        <button @click="toggleMoviesVisibility(genres)">Show/Hide Movies</button>
        <ul v-if="moviesByGenreVisibility[genres]">
          <li class="movies_by_genre" v-for="movie in moviesByGenre[genres]" :key="movie.id">{{ movie.title }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.genres, .movies_by_genre {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

