
<template>
  <div class="w-full h-screen"><Banner /> <router-view /></div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import { useStore } from "vuex";
import { computed, ref, onMounted, onRenderTriggered } from "vue";
import Banner from "./components/Banner.vue";
//const store = useStore();
let alert = ref([]);
</script>

<style>
</style>

