<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

// Choose random movies that have genres
const nonEmptyGenreMovies = movies.filter(movie => movie.genres && movie.genres.length > 0);
const randomMovies = _.sampleSize(nonEmptyGenreMovies, 100);
console.log("Total number of movies:", randomMovies.length);

// Create a dictionary that maps genres to movies
const moviesByGenre = ref({});
const uniqueGenres = _.uniq(_.flatten(randomMovies.map(movie => movie.genres))).sort();
console.log("Total number of genres:", uniqueGenres.length);

// Populate the dictionary
for (const genre of uniqueGenres) {
  moviesByGenre.value[genre] = randomMovies.filter(movie => movie.genres.includes(genre));
}

// Control the visibility of movies by genre
const moviesByGenreVisibility = ref({});
uniqueGenres.forEach((genre) => {
  moviesByGenreVisibility.value[genre] = false;
});

function toggleMoviesVisibility(genre) {
  moviesByGenreVisibility.value[genre] = !moviesByGenreVisibility.value[genre];
}
</script>

<template>
  <div class="movies-by-container">
    <h2>Movies by genre</h2>
    <ul class="list-group">
      <li class="genres list-group-item shadow" v-for="genre in uniqueGenres" :key="genre">
        {{ genre }}
        <span class="badge badge-pill"><button class="btn btn-light"
                                               @click="toggleMoviesVisibility(genre)">Show / Hide</button></span>
        <ol v-if="moviesByGenreVisibility[genre]">
          <li class="movies-by-genre" v-for="movie in moviesByGenre[genre]" :key="movie.id">{{ movie.title }}</li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.genres {
  list-style: none;
  margin: 1rem;
  font-weight: 500;
  font-size: 1.3rem;
  border-radius: 10px;
}

.movies-by-genre {
  margin: 0.5rem;
  font-weight: 300;
  font-size: 1rem;
}

.btn {
  border-color: #6c757d;
}
</style>

