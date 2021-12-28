
<template>
  <div class="h-90 bg-white w-full">
    <h1 class="text-left font-bold mb-4 ml-4 mt-4">Search for shoes</h1>
    <div class="flex items-center mb-4 ml-4">
      <p>Sort by:</p>
      <label class="labelBrand ml-4" for="brand">
        <input class="checkbox" type="checkbox" checked v-model="brand" />
        Brand
      </label>
      <label class="labelPrice ml-4" for="price">
        <input class="checkbox" type="checkbox" checked v-model="price" />
        Price
      </label>
      <label class="labelText ml-4" for="text">
        <input class="checkbox" type="checkbox" checked v-model="text" />
        Text
      </label>
    </div>
      <div class="flex bg-blue-300 w-full flex-wrap containerHeight">
        <div
          class="bg-white element ml-4 mt-4 flex rounded-lg"
          :class="{ 'mr-4': (index + 1) % 4 == 0 }"
          v-for="(item, index) in results"
          :key="index"
        >
          <img :src="item.thumbnail" class="w-1/3 m-4 rounded-lg" />
          <div class="w-2/3 my-4 flex flex-col justify-center items-center">
            <div class="font-bold capitalize text-center">{{ item.brand }}</div>
            <div class="marginTop capitalize text-center flex items-center">
              {{ item.model }}
            </div>
            <div class="marginTop text-center font-bold">
              {{ item.price }} {{ item.price_unit }}
            </div>

            <router-link :to="`/product/${index}`" @click="setProduct(index)">
              <button class="shoeButton marginTop text-black">View Shoe</button>
            </router-link>
          </div>
        </div>
        <div class="flex justify-center w-full my-4">
          <button
            v-for="(page, index) in pages"
            :key="index"
            class="shoeButton mr-2"
            :class="{ 'opacity-50': index }"
          >
            {{ page }}
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import shoes from "../start code/shoes.json";

const page = ref(0);
const brand = ref(false);
const price = ref(false);
const text = ref(false);
const perPage = 12;
const pages = Math.round(Math.ceil(shoes.length / perPage));
let results = computed(() =>
  shoes.slice(perPage * page.value, perPage * (page.value + 1))
);

console.log(pages);
</script>

<style scoped>
a {
  color: #42b983;
}
.element {
  width: calc(25% - 5 / 4 * 16px);
}
.containerHeight {
  height: calc(100% - 102px);
}
.checkbox {
  @apply w-6 h-6 mr-2 focus:ring-blue-500 focus:ring-opacity-0 border border-gray-400 rounded;
  filter: hue-rotate(-30deg) brightness(1.25);
}
label > span {
  @apply w-6 h-6 inline-block mr-2 rounded-full border border-gray-400 flex-shrink-0;
}
input[type="radio"] + label span {
  transition: background 0.2s, transform 0.2s;
}
input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span {
  transform: scale(1.2);
}
input[type="radio"]:checked + label span {
  background-color: var(--main);
  box-shadow: 0px 0px 0px 3px white inset;
}
input[type="radio"]:checked + label {
  color: var(--main);
}
.shoeButton {
  @apply hover:opacity-80 font-bold py-2 md:px-3 px-2 lg:text-base text-sm rounded bg-blue-300;
}
.marginTop {
  @apply mt-2;
}
</style>
