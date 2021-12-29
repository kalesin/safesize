
<template>
  <div class="h-90 flex flex-col w-full">
    <router-link to="/home" class="h-5 flex items-center px-4">
      <p class="homeButton text-black">← Back to home</p>
    </router-link>
    <div class="bg-white flex rounded-lg w-full h-60 p-4">
      <img :src="product.thumbnail" class="w-1/3 m-4 rounded-xl" />
      <div class="w-2/3 my-4 flex justify-center items-center">
        <div
          class="
            textContainer
            w-2/3
            h-full
            m-4
            flex flex-col
            items-center
            justify-center
          "
        >
          <div class="capitalize text-center flex items-center mb-4 text-3xl">
            {{ product.model }}
          </div>
          <div
            v-if="product.price_unit == 'EUR'"
            class="text-center font-bold mb-4 text-xl"
          >
            € {{ product.price }}
          </div>
          <div class="text-left">{{ product.description }}</div>
        </div>

        <div
          class="
            mt-2
            sizeContainer
            flex flex-col
            w-1/3
            m-4
            flex-justify
            items-center
          "
        >
          <p class="font-bold my-4">
            Available in {{ product.size_unit }} sizes:
          </p>
          <div class="flex flex-wrap">
            <div
              class="shoeButton bg-main mr-2 mb-2 sizeWidth text-center"
              :class="{ 'mr-0': (index + 1) % 3 == 0 }"
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
      <h1 class="capitalize text-white text-xl font-bold mb-2">
        More from {{ product.brand }}
      </h1>
      <div class="w-full flex justify-center">
        <div
          class="bg-white elementWidth ml-4 flex rounded-lg h-full"
          :class="{ 'mr-4': index == 2 }"
          v-for="(item, index) in results"
          :key="index"
        >
          <img :src="item.thumbnail" class="m-4 rounded-lg w-1/2" />
          <div class="w-1/2 my-4 flex flex-col justify-center items-center">
            <div class="font-bold capitalize text-center">{{ item.brand }}</div>
            <div
              class="mt-2 capitalize text-center flex items-center mx-2 h-1/3"
            >
              {{ item.model }}
            </div>
            <div
              v-if="item.price_unit == 'EUR'"
              class="mt-2 text-center font-bold"
            >
              € {{ item.price }}
            </div>

            <router-link :to="`/product/${item.id}`" @click="setProduct(item.id)">
              <button class="shoeButton mt-2 text-white bg-main">
                View Shoe
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {getCurrentInstance, defineComponent} from 'vue'
import shoes from "../start code/shoes.json";
import router from "../router";
const productId = computed(() => router.currentRoute.value.params.id);
let product = ref([]);
//vsi razen trenutnega
const allResults = shoes.filter(
  (el) => el.brand == product.brand && el.id != product.id
);
let results = ref([]);
function generateRandom() {
  let array = [];
  let i = 0;
  while (i < 3) {
    let newNumber = Math.floor(Math.random() * allResults.length);
    if (!array.includes(newNumber)) {
      array.push(newNumber);
      i++;
    }
  }
  console.log(allResults);
  for (let i = 0; i < 3; i++) {
    results.value.push(allResults[array[i]]);
  }
}
generateRandom();
function setProduct(id){
  console.log(shoes.filter((el) => el.id == id)[0])
  product.value = shoes.filter((el) => el.id == id)[0];
};
</script>

<style scoped>
.elementWidth {
  width: calc(25% - 5 / 4 * 16px);
}
.shoeButton {
  @apply hover:opacity-60 font-bold py-2 md:px-3 px-2 lg:text-base text-sm rounded;
}
.homeButton {
  @apply hover:opacity-80 font-bold lg:text-base text-sm rounded;
}
.sizeWidth {
  width: calc((100% - 2 * 8px) / 3);
}
.suggContainer {
  height: 35%;
}
</style>

