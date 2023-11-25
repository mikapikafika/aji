<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

const randomMovies = _.sampleSize(movies, 100);
const moviesByGenre = ref({});
const uniqueGenres = _.uniq(_.flatten(randomMovies.map(movie => movie.genres)))

for (const genre of uniqueGenres) {
  moviesByGenre.value[genre] = randomMovies.filter((movie) => {
    return movie.genres.includes(genre);
  });
}

const moviesByGenreVisibility = ref({});
uniqueGenres.forEach((genre) => {
  moviesByGenreVisibility.value[genre] = false;
});

function toggleMoviesVisibility(genre) {
  moviesByGenreVisibility.value[genre] = !moviesByGenreVisibility.value[genre];
}
</script>

<template>
  <div>
    <h1>Movies by genre</h1>
    <ul>
      <li class="genres" v-for="genre in uniqueGenres" :key="genre">
        {{ genre }}
        <button @click="toggleMoviesVisibility(genre)">Show/Hide Movies</button>
        <ul v-if="moviesByGenreVisibility[genre]">
          <li class="movies_by_genre" v-for="movie in moviesByGenre[genre]" :key="movie.id">{{ movie.title }}</li>
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

