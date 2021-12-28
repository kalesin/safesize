
<template>
  <div class="h-90 bg-white w-full">
    <div class="flex items-center h-10">
      <h1 class="text-left font-bold mb-4 ml-4 mt-4">Search for shoes</h1>
      <div class="flex items-center mb-4 ml-4">
        <p>Sort by:</p>
        <label class="labelAscending ml-4" for="ascending">
          <input class="checkbox" type="checkbox" checked v-model="ascending" />
          Asceding order
        </label>
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
    </div>
    <div class="flex bg-blue-300 w-full flex-wrap containerHeight">
      <div
        class="bg-white elementWidth ml-4 mb-4 flex rounded-lg h-1/3"
        :class="{ 'mr-4': (index + 1) % 4 == 0, 'mt-4': index < 4 }"
        v-for="(item, index) in results"
        :key="index"
      >
        <img :src="item.thumbnail" class="w-1/3 m-4 rounded-lg" />
        <div class="w-2/3 my-4 flex flex-col justify-center items-center">
          <div class="font-bold capitalize text-center">{{ item.brand }}</div>
          <div
            class="
              marginTop
              capitalize
              text-center
              flex
              items-center
              mx-2
              h-1/3
            "
          >
            {{ item.model }}
          </div>
          <div class="marginTop text-center font-bold">
            {{ item.price }} {{ item.price_unit }}
          </div>

          <router-link :to="`/product/${item.id}`">
            <button class="shoeButton marginTop text-black bg-blue-300">
              View Shoe
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full p-4 h-10">
      <button
        v-for="(item, index) in pages"
        :key="index"
        class="shoeButton bg-blue-400 mr-2"
        :class="{ 'bg-blue-200': index == page }"
        @click="setPage(index)"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import shoes from "../start code/shoes.json";

let page = ref(0);
let sortedShoes = JSON.parse(JSON.stringify(shoes));
const brand = ref(false);
const price = ref(false);
const text = ref(false);
const ascending = ref(false);
const perPage = 12;
const pages = Math.round(Math.ceil(shoes.length / perPage));
let results = computed(() => {
  if (brand.value) {
    sortByBrand();
    return sortedShoes.slice(perPage * page.value, perPage * (page.value + 1));
  } else if (price.value) {
    sortByPrice();
    return sortedShoes.slice(perPage * page.value, perPage * (page.value + 1));
  } else {
    return shoes.slice(perPage * page.value, perPage * (page.value + 1));
  }
});
function setPage(index) {
  page.value = index;
  console.log(page.value);
}
function sortByPrice() {
  const sorted = sortedShoes.sort((a, b) => a.price - b.price);
  if (ascending.value) {
    sorted.reverse();
  }
  return sorted;
}
function sortByBrand() {
  const sorted = sortedShoes.sort(function (a, b) {
    var nameA = a.brand.toUpperCase(); // ignore upper and lowercase
    var nameB = b.brand.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1; //nameA comes first
    }
    if (nameA > nameB) {
      return 1; // nameB comes first
    }
    return 0; // names must be equal
  });
  if (ascending.value) {
    sorted.reverse();
  }
  return sorted;
}
function sortByText() {}
</script>

<style scoped>
a {
  color: #42b983;
}
.elementWidth {
  width: calc(25% - 5 / 4 * 16px);
  height: calc((100% - 4 * 16px) / 3);
}
.containerHeight {
  height: calc(100% - 20%);
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
  @apply hover:opacity-80 font-bold py-2 md:px-3 px-2 lg:text-base text-sm rounded;
}
.marginTop {
  @apply mt-2;
}
</style>
