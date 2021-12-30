
<template>
  <div class="bg-white w-full flex">
    <img src="../assets/SafeSize-Logo-1.png" class="md:mx-16 mx-8 my-4 w-40" />
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
