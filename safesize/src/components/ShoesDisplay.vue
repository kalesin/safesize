
<template>
  <div id="hero" class="w-full h-90 z-10 absolute bg-main" v-if="heroOpen">
    <img class="h-full w-full" src="../assets/parkour-1.jpg" alt="" />
    <button class="heroButton" @click="closeHero">Explore Shoes</button>
  </div>
  <div class="h-90 bg-white w-full">
    <div class="flex items-center h-10 mx-4">
      <div class="input-group searchContainer">
        <input
          type="search"
          class="form-control searchInput"
          placeholder="Search"
          v-model="searchInput"
        />
        <button
          class="searchButton"
          type="button"
          id="button-addon2"
          @click="search(searchInput)"
        >
          <svg
            focusable="false"
            class="w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
          </svg>
        </button>
      </div>
      <p class="ml-4">Price:</p>
      <button
        class="sortButton text-black bg-main p-1 w-10 ml-4"
        @click="toggleAscending();sortByPrice();"
        :class="{ 'bg-orange-300': ascending }"
      >
        <img v-if="ascending" src="../assets/ascending.png" />
        <img v-else src="../assets/descending.png" />
      </button>
      <p class="ml-4">Brand:</p>
      <div class="brandContainer flex">
        <div v-for="(item, index) in brandsArray" :key="index">
          <label class="ml-2 flex capitalize" for="brand">
            <input
              class="checkbox"
              type="checkbox"
              :v-model="uniqueBrands[item]"
              @click="negateCheckbox(item)"
            />
            {{ item }}
          </label>
        </div>
      </div>
    </div>

    <div
      class="flex bg-main w-full flex-wrap h-80 items-start content-start">
      <div
        class="bg-white elementWidth ml-4 mb-4 flex rounded-lg h-1/3"
        :class="{ 'mr-4': (index + 1) % 4 == 0, 'mt-4': index < 4 }"
        v-for="(item, index) in results"
        :key="index">
        <img :src="item.thumbnail" class="m-4 rounded-lg w-1/2" />
        <div class="w-1/2 my-4 flex flex-col justify-center items-center">
          <div class="font-bold capitalize text-center">{{ item.brand }}</div>
          <div class="mt-2 capitalize text-center flex items-center mx-2 h-1/3">
            {{ item.model }}
          </div>
          <div
            v-if="item.price_unit == 'EUR'"
            class="mt-2 text-center font-bold"
          >
            € {{ item.price }}
          </div>
          <router-link :to="`/product/${item.id}`">
            <button class="shoeButton mt-2 text-white bg-main">
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
        class="shoeButton bg-main mr-2"
        :class="{ 'bg-sec': index == page }"
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
let ascending = ref(false);
let heroOpen = ref(false);
let searchInput = ref("");
//filtrirani rezultati
let filtered = ref(shoes);
let searchResults = ref(shoes);
//prikaz
let results = computed(() =>
  filtered.value.slice(perPage * page.value, perPage * (page.value + 1))
);
const perPage = 12;
const pages = computed(() =>
  Math.round(Math.ceil(filtered.value.length / perPage))
);

//uredi in vrne objekt edinstvenih brandov
const brandsArray = [];
shoes.filter((item) => {
  let index = brandsArray.findIndex((el) => el == item.brand);
  if (index <= -1) {
    return brandsArray.push(item.brand);
  }
});
let uniqueBrands = {};
for (let i = 0; i < brandsArray.length; i++) {
  uniqueBrands[brandsArray[i]] = false;
}
//negira vrednost posameznega filtra
function negateCheckbox(value) {
  console.log(uniqueBrands[value]);
  uniqueBrands[value] = !uniqueBrands[value];
  generateFiltered();
  setPage(0);
}
function search(input) {
  let searchTerm = input.toLowerCase();
  let results = shoes.filter((el) => {
    const desc = el.description.toLowerCase().includes(searchTerm);
    const brand = el.brand.toLowerCase().includes(searchTerm);
    const model = el.model.toLowerCase().includes(searchTerm);
    console.log(desc, brand, model)
    if (desc || brand || model) {
      return 1;
    }
  });
  searchResults.value = results;
  filtered.value = results;
}
function generateFiltered() {
  let filters = [];
  for (let key in uniqueBrands) {
    if (uniqueBrands[key]) {
      filters.push(key);
    }
  }
  if (filters.length) {
    filtered.value = searchResults.value.filter((el) => {
      return filters.includes(el.brand);
    });
  } else {
    filtered.value = searchResults.value;
  }
}
function sortByPrice() {
  const sorted = filtered.value.sort((a, b) => a.price - b.price);
  console.log(sorted);
  if (ascending.value) {
    sorted.reverse();
  }
  filtered.value = sorted;
}

function sortByBrand() {
  const sorted = sortedShoes.sort(function (a, b) {
    var nameA = a.brand.toUpperCase();
    var nameB = b.brand.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  if (ascending.value) {
    sorted.reverse();
  }
  return sorted;
}

function closeHero() {
  const target = document.querySelectorAll("#hero")[0];
  target.addEventListener("animationend", () => {
    heroOpen.value = false;
  });
  target.classList.add("animate-fade-out");
}
function toggleAscending() {
  ascending.value = !ascending.value;
}
function setPage(index) {
  page.value = index;
}
</script>

<style scoped>
.elementWidth {
  width: calc(25% - 5 / 4 * 16px);
  height: calc((100% - 4 * 16px) / 3);
}
.checkbox {
  @apply w-6 h-6 mr-2 focus:ring-blue-500 focus:ring-opacity-0 border border-gray-400 rounded;
  filter: hue-rotate(-30deg) brightness(1.25);
}
.shoeButton {
  @apply hover:opacity-70 font-bold py-2 md:px-3 px-2 lg:text-base text-sm rounded;
}
.sortButton {
  @apply hover:opacity-80 rounded;
}
.heroButton {
  @apply hover:opacity-80 bg-orange-400 z-10 absolute bottom-20 left-96 w-64 h-16 text-white text-lg font-bold;
}

.searchContainer {
  @apply flex w-96;
}
.searchInput {
  @apply w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-400 focus:outline-none;
}
.searchButton {
  @apply px-6 py-2.5 bg-main text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-sec  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sec active:shadow-lg transition duration-150 ease-in-out flex items-center;
}
</style>
