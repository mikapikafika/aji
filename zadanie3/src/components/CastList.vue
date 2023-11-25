<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

const moviesByCast = ref({});
const moviesCast = _.cloneDeep(movies);


const nonEmptyCastMovies = _.filter(moviesCast, (movie) => {
  console.log(movie.cast);
  return movie.cast && movie.cast.length > 0;
});

const uniqueCast = ref(_.uniq(_.flatten(_.map(nonEmptyCastMovies, 'cast'))).slice(0, 100));

for (const actor of uniqueCast.value) {
  moviesByCast.value[actor] = _.filter(moviesCast, (movie) => {
    return movie.cast && movie.cast.includes(actor);
  });
}

const moviesByCastVisibility = ref({});
uniqueCast.value.forEach((cast) => {
  moviesByCastVisibility.value[cast] = false;
});

function toggleMoviesVisibility(cast) {
  moviesByCastVisibility.value[cast] = !moviesByCastVisibility.value[cast];
}
</script>

<template>
  <div class="centered-container">
    <h2>Movies by cast</h2>
    <ul class="list-group">
      <li class="cast list-group-item" v-for="cast in uniqueCast" :key="cast">
        {{ cast }}
        <span class="badge badge-pill"><button class="btn btn-light"
                                               @click="toggleMoviesVisibility(cast)">Show / Hide</button></span>
        <ol v-if="moviesByCastVisibility[cast]">
          <li class="movies-by-cast" v-for="movie in moviesByCast[cast]" :key="movie.id">{{ movie.title }}</li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
}

.cast, .movies_by_cast {
  list-style: none;
  margin: 1rem;
  font-weight: 500;
  font-size: 1.3rem;
  border-radius: 10px;
}

.movies-by-cast {
  margin: 0.5rem;
  font-weight: 300;
  font-size: 1rem;
}

.btn {
  border-color: #6c757d;
}

</style>

