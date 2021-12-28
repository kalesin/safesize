
<template>
  <div class="h-90 flex">
    <div>go back</div>
    <div class="flex bg-blue-300 w-full">
      <div class="bg-gray-500 ml-4 mb-4 flex rounded-lg">
        <img :src="product.thumbnail" class="w-1/3 m-4 rounded-xl" />
        <div class="w-2/3 my-4 flex flex-col justify-center items-center">
          <div class="font-bold capitalize text-center">
            {{ product.brand }}
          </div>
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
            {{ product.model }}
          </div>
          <div class="marginTop text-center">{{ product.description }}</div>
          <div class="marginTop text-center font-bold">
            {{ product.price }} {{ product.price_unit }}
          </div>
          <p class="font-bold marginTop">Available in {{product.size_unit}} sizes:</p>
          <div class="marginTop sizeContainer flex">
              <div class="shoeButton bg-blue-300 mr-2" v-for="(item, index) in product.sizes" :key="index">
                  {{item}}
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
</style>

