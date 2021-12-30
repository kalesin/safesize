
<template>
  <div class="h-90 flex flex-col w-full">
    <router-link to="/home" class="h-5 flex items-center md:pl-16 pl-8">
      <p class="homeButton text-black">← Back to home</p>
    </router-link>
    <div class="productContainer">
      <img :src="product.thumbnail" class="lg:w-1/3 w-full rounded-xl" />
      <div class="flex-col flex justify-center">
        <div
          class="
            textContainer
            lg:pl-8
            pl-0
            w-full
            flex flex-col
            items-center
            justify-center
          "
        >
          <div class="textModel">
            {{ product.model }}
          </div>
          <div v-if="product.price_unit == 'EUR'" class="textPrice">
            € {{ product.price }}
          </div>
          <div class="textDescription">
            {{ product.description }}
          </div>
        </div>
        <div class="sizeContainer">
          <p class="font-bold my-4">
            Available in {{ product.size_unit }} sizes:
          </p>
          <div class="flex flex-wrap justify-center">
            <div
              class="sizeButton bg-main mr-2 mb-2 w-10 text-center"
              v-for="(item, index) in product.sizes"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        suggContainer
        bg-main
        w-full
        flex flex-col
        justify-center
        items-center
      "
    >
      <h1 class="capitalize text-white text-xl font-bold md:mb-8 mb-4">
        More from {{ product.brand }}
      </h1>
      <div
        class="w-full flex justify-center lg:flex-row flex-col"
        v-if="topSuggestions.length > 0"
      >
        <div
          class="bg-white flex rounded-lg h-full lg:mb-0 mb-8 mx-2"
          v-for="(item, index) in topSuggestions"
          :key="index"
        >
          <img :src="item.thumbnail" class="ml-4 rounded-lg w-1/2" />
          <div
            class="w-1/2 flex flex-col justify-around lg:my-2 my-8 items-center"
          >
            <div class="font-bold capitalize text-center">{{ item.brand }}</div>
            <div class="capitalize text-center flex items-center mx-2">
              {{ item.model }}
            </div>
            <div v-if="item.price_unit == 'EUR'" class="text-center font-bold">
              € {{ item.price }}
            </div>

            <router-link :to="`/product/${item.id}`">
              <button class="shoeButton text-white bg-main">View Shoe</button>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>We only have this product from this brand!</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import shoes from "../api/shoes.json";
import router from "../router";

const product = computed(() => {
  return shoes.filter((el) => el.id == router.currentRoute.value.params.id)[0];
});

if (!product.value) {
  window.location.href = "/home";
}

const allSuggestions = computed(() => {
  return shoes.filter(
    (el) => el.brand == product.value.brand && el.id != product.value.id
  );
});

const topSuggestions = computed(() => {
  const randomIndices = [];
  let i = 0;
  while (i < Math.min(3, allSuggestions.value.length)) {
    const randomIndex = Math.floor(Math.random() * allSuggestions.value.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
      i++;
    }
  }
  const suggestions = [];
  for (let i = 0; i < randomIndices.length; i++) {
    suggestions.push(allSuggestions.value[randomIndices[i]]);
  }
  return suggestions;
});
</script>

<style scoped>
.shoeButton {
  @apply hover:opacity-60 font-bold py-2 md:px-3 px-2 lg:text-base text-sm rounded;
}
.sizeButton {
  @apply hover:opacity-60 font-bold lg:text-base text-sm rounded;
}
.homeButton {
  @apply hover:opacity-80 font-bold lg:text-base text-sm rounded;
}
.textModel {
  @apply capitalize text-center flex items-center mb-4 xl:text-2xl md:text-xl sm:text-lg text-base;
}
.textPrice {
  @apply text-center font-bold mb-4 xl:text-xl lg:text-lg md:text-base text-sm;
}
.textDescription {
  @apply text-left xl:text-lg lg:text-base text-sm text-justify;
}
.suggContainer {
  @apply md:px-14 px-6 md:py-8 py-4;
}
.sizeContainer {
  @apply w-full mt-8 flex flex-col justify-center items-center px-8;
}
.productContainer {
  @apply bg-white flex rounded-lg w-full lg:h-60 h-auto lg:px-16 px-8 lg:py-8 py-4 lg:flex-row flex-col;
}
</style>

