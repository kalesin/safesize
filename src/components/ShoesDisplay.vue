<template>
  <div id="hero" class="w-full h-90 z-10 absolute bg-main" v-if="heroOpen">
    <img class="h-full w-full" src="../assets/parkour-1.jpg" alt="" />
    <button class="heroButton" @click="closeHero">Explore Shoes</button>
  </div>
  <div class="h-90 bg-white w-full">
    <div class="searchBarContainer">
      <div class="flex justify-start items-center md:w-auto w-full">
        <div class="flex w-96 md:grow-0 grow">
          <div class="searchButton" type="button" id="button-addon2">
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
          </div>
          <input type="search" class="searchInput" placeholder="Search" v-model="searchInput" />
        </div>
        <div class="priceSortContainer">
          <p class="ml-4 sm:block hidden">Price:</p>
          <button class="sortButton bg-main" @click="toggleAscending()" :class="{ 'bg-orange-300': sortAscending }">
            <img v-if="sortAscending" src="../assets/ascending.png" />
            <img v-else src="../assets/descending.png" />
          </button>
        </div>
      </div>
      <div class="brandContainer">
        <p class="ml-0 md:my-0 my-2">Brand:</p>
        <div v-for="(item, index) in allFilters" :key="index" class="flex md:ml-2 ml-0 lg:mb-0 mb-2">
          <input
            :id="item.toLowerCase()"
            class="checkbox"
            type="checkbox"
            :v-model="activeFilters[item]"
            @click="toggleFilter(item)"
          />
          <label class="flex capitalize xl:text-base lg:text-sm text-xs items-center" :for="item.toLowerCase()">
            {{ item }}
          </label>
        </div>
      </div>
    </div>
    <div class="elementContainer" v-if="pageProducts.length">
      <div class="element" v-for="(item, index) in pageProducts" :key="index">
        <div class="bg-white flex rounded-lg w-full">
          <img :src="item.thumbnail" class="my-4 ml-4 rounded-lg sm:w-1/2 w-1/3" />
          <div class="mb-2 flex flex-col items-center justify-around grow">
            <div class="font-bold capitalize text-center">{{ item.brand }}</div>
            <div class="textModel">
              <span class="lg:leading-4 leading-3">{{ item.model }}</span>
            </div>
            <div v-if="item.price_unit == 'EUR'" class="text-center font-bold xl:text-base text-sm">
              € {{ item.price }}
            </div>
            <router-link :to="`/product/${item.id}`">
              <button class="shoeButton">View Shoe</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex justify-center w-full pt-8 bg-main">
        <button
          v-for="(item, index) in pages"
          :key="index"
          class="pageButton bg-white"
          :class="{ 'bg-blue-200': index == page }"
          @click="setPage(index)"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <div v-else class="elementContainer justify-center items-center">
      <p>No products found matching search phrase!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import shoes from "../api/shoes.json";

let page = ref(0);
function setPage(index) {
  page.value = index;
}

let sortAscending = ref(false);
function toggleAscending() {
  sortAscending.value = !sortAscending.value;
}

let heroOpen = ref(localStorage.getItem("hero") !== "false");
if (heroOpen.value) {
  document.body.classList.add("overflow-hidden");
}
function closeHero() {
  const target = document.querySelectorAll("#hero")[0];
  target.addEventListener("animationend", () => {
    heroOpen.value = false;
    localStorage.setItem("hero", "false");
    document.body.classList.remove("overflow-hidden");
  });
  target.classList.add("animate-fade-out");
}

const allFilters = [];
shoes.filter((item) => {
  let index = allFilters.findIndex((el) => el == item.brand);
  if (index == -1) {
    return allFilters.push(item.brand);
  }
});

let activeFilters = ref({});
for (let i = 0; i < allFilters.length; i++) {
  activeFilters.value[allFilters[i]] = false;
}
function toggleFilter(value) {
  activeFilters.value[value] = !activeFilters.value[value];
  setPage(0);
}

let searchInput = ref("");

let filteredProducts = computed(() => {
  const filters = [];
  for (let key in activeFilters.value) {
    if (activeFilters.value[key]) {
      filters.push(key);
    }
  }

  const searchTerm = searchInput.value.toLowerCase();

  let searchResults;
  if (searchTerm.length) {
    searchResults = shoes.filter((el) => {
      const desc = el.description.toLowerCase().includes(searchTerm);
      const brand = el.brand.toLowerCase().includes(searchTerm);
      const model = el.model.toLowerCase().includes(searchTerm);
      if (desc || brand || model) {
        return true;
      }
    });
  } else {
    searchResults = shoes;
  }

  let filtered;
  if (filters.length) {
    filtered = searchResults.filter((el) => {
      return filters.includes(el.brand);
    });
  } else {
    filtered = searchResults;
  }

  const sorted = filtered.sort((a, b) => a.price - b.price);
  if (sortAscending.value) {
    sorted.reverse();
  }

  return sorted;
});

let pageProducts = computed(() =>
  filteredProducts.value.slice(perPage * page.value, perPage * (page.value + 1))
);
const perPage = 12;
const pages = computed(() =>
  Math.round(Math.ceil(filteredProducts.value.length / perPage))
);
</script>

<style scoped>
.checkbox {
  @apply w-6 h-6 mr-2 focus:ring-blue-500 focus:ring-opacity-0 border border-gray-400 rounded;
  filter: hue-rotate(-30deg) brightness(1.25);
}
.shoeButton {
  @apply hover:opacity-70 font-bold lg:text-base text-sm rounded py-2 md:px-4 px-2 text-white bg-main;
}
.pageButton {
  @apply hover:opacity-70 font-bold lg:text-base text-sm rounded py-2 md:px-4 px-3 mx-1;
}
.sortButton {
  @apply hover:opacity-80 rounded text-black p-1 w-8 ml-4;
}
.heroButton {
  @apply hover:opacity-80 bg-orange-400 z-10 absolute bottom-20 md:left-96 sm:left-0 w-64 h-16 text-white text-lg font-bold;
}
.elementContainer {
  @apply flex bg-main w-full flex-wrap 2xl:h-80 h-auto items-start content-start md:px-14 px-6 md:py-8 py-4;
}
.element {
  @apply bg-main 2xl:w-1/4 xl:w-1/3 sm:w-1/2 w-full xl:h-1/3 lg:h-60 h-48 p-2 flex rounded-lg;
}
.textModel {
  @apply capitalize text-center flex items-center h-1/3 2xl:text-base xl:text-sm text-xs mx-2;
}
.priceSortContainer {
  @apply flex items-center;
}
.brandContainer {
  @apply flex md:flex-row flex-col items-start mt-3;
}
.searchBarContainer {
  @apply flex items-start h-auto md:mx-16 mx-8 md:mb-0 pb-8 flex-col;
}
.searchInput {
  @apply w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded focus:border-blue-300 focus:outline-none;
}
.searchButton {
  @apply px-6 bg-main opacity-60 text-white rounded shadow-md flex items-center;
}
</style>
