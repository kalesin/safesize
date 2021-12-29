
<template>
  <div id="hero" class="w-full h-90 z-10 absolute bg-main" v-if="heroOpen">
    <img class="h-full w-full" src="../assets/parkour-1.jpg" alt="" />
    <button
      class="
        hover:opacity-80
        bg-orange-400
        z-10
        absolute
        bottom-20
        left-96
        w-64
        h-16
        text-white text-lg
        font-bold
      "
      @click="closeHero"
    >
      Explore Shoes
    </button>
  </div>
  <div class="h-90 bg-white w-full">
    <div class="flex items-center h-10">
      <h1 class="text-left font-bold mb-4 ml-4 mt-4 text-xl">
        Search for shoes
      </h1>
      <div class="flex items-center ml-20 justify-center">
        <p>Sort by:</p>
        <button
          class="sortButton text-black bg-main p-1 w-10 h-10 ml-4"
          @click="setAscending()"
          :class="{ 'bg-orange-300': ascending }"
        >
          <img v-if="ascending" src="../assets/ascending.png" />
          <img v-else src="../assets/descending.png" />
        </button>
        <label class="ml-4 flex" for="brand">
          <input class="checkbox" type="checkbox" checked v-model="brand" />
          Brand
        </label>
        <label class="ml-4 flex" for="price">
          <input class="checkbox" type="checkbox" checked v-model="price" />
          Price
        </label>
        <label class="ml-4 flex" for="text">
          <input class="checkbox" type="checkbox" checked v-model="text" />
          Text
        </label>
      </div>
      <div class="flex justify-center">
        <div class="mb-3 xl:w-96">
          <select
            class="
              form-select
              appearance-none
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700
              focus:bg-white
              focus:border-blue-600
              focus:outline-none
            "
            aria-label="Default select example"
          >
            <option selected>Sort by:</option>
            <option value="1">Price</option>
            <option value="2">Brand</option>
            <option value="3">Text</option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex bg-main w-full flex-wrap containerHeight">
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
          <div
            v-if="item.price_unit == 'EUR'"
            class="marginTop text-center font-bold"
          >
            € {{ item.price }}
          </div>

          <router-link :to="`/product/${item.id}`">
            <button class="shoeButton marginTop text-white bg-main">
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
import { ref, computed, onMounted } from "vue";
import shoes from "../start code/shoes.json";

let page = ref(0);
let sortedShoes = JSON.parse(JSON.stringify(shoes));
const brand = ref(false);
const price = ref(false);
const text = ref(false);
const ascending = ref(false);
let heroOpen = ref(true);
let dropdownOpen = ref(false);
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
function closeHero() {
  const target = document.querySelectorAll("#hero")[0];
  target.addEventListener("animationend", () => {
    heroOpen.value = false;
  });
  target.classList.add("animate-fade-out");
}
function setAscending() {
  ascending.value = !ascending.value;
}
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
#sortbox:checked ~ #sortboxmenu {
  opacity: 1;
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
.sortButton {
  @apply hover:opacity-80 rounded;
}
.marginTop {
  @apply mt-2;
}
</style>
