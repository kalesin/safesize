
<template>
  <div class="bg-white h-10 w-full flex">
<img src="../assets/SafeSize-Logo-1.png" class="m-2 ml-4">
  </div>
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
