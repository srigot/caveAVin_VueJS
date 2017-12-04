<template>
  <div class="rangee">
    <b-btn class="btn-circle" v-for="n in nbBouteilles" :key="n">{{n}}</b-btn>
  </div>
</template>

<script>
export default {
  name: 'rangee',
  props: ['nbBouteilles']
}
</script>

<style>
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 50%;
}
</style>
