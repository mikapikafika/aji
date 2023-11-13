<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

const moviesCast = _.cloneDeep(movies);
const uniqueCast = ref(_.uniq(_.flatten(_.map(moviesCast, 'cast'))).slice(0, 100));
</script>

<template>
  <div>
    <h3>bezcenny argentyński kaktus</h3>
    <ul>
      <li v-for="cast in uniqueCast" :key="cast">{{ cast }}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>

