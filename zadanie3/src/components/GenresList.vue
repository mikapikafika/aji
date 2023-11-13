<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

const moviesGenres = _.cloneDeep(movies);
const uniqueGenres = ref(_.uniq(_.flatten(_.map(moviesGenres, 'genres'))).slice(0, 100));
</script>

<template>
  <div>
    <h3>gdzie pieniądze za las?</h3>
    <ul>
      <li v-for="genres in uniqueGenres" :key="genres">{{ genres }}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>

