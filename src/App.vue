<template>
  <div id="app">
    <b-navbar toggleable sticky="true" variant="success">

   <b-nav-toggle target="nav_collapse"></b-nav-toggle>

   <b-link class="navbar-brand" to="/">
     <span>Appli test</span>
   </b-link>

   <b-collapse is-nav id="nav_collapse">

     <b-nav is-nav-bar>
       <b-nav-item><router-link to="/">Liste</router-link></b-nav-item>
       <b-nav-item><router-link to="/c">Cave</router-link></b-nav-item>
       <b-nav-item><router-link to="/a">Ajouter</router-link></b-nav-item>
     </b-nav>

   </b-collapse>
   <btnTous/>
 </b-navbar>

    <router-view></router-view>
  </div>
</template>

<script>
import btnTous from '@/components/BtnTous'

export default {
  name: 'app',
  components: {
    btnTous
  },
  created () {
    this.$store.dispatch('initListe')
  }
}
</script>

<style>
</style>
