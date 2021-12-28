
<template>
  <div class="bg-blue-300 h-10 w-full flex"></div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
