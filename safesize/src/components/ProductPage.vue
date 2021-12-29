
<template>
  <div class="h-90 flex flex-col w-full p-4">
    <router-link to="/home">
      <p class="shoeButton text-black flex items-center">← Back to home</p>
    </router-link>
    <div class="bg-white flex rounded-lg w-full">
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
            marginTop
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import shoes from "../start code/shoes.json";
import router from "../index";
const productId = computed(() => router.currentRoute.value.params.id);
const product = shoes.filter((el) => el.id == productId.value)[0];
console.log(product);
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
.sizeWidth {
  width: calc((100% - 2 * 8px) / 3);
}
</style>

