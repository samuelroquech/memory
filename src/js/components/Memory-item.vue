<template>
  <div>
    <h1 class="justify-center text-4xl my-5 text-center">{{ title }}</h1>
    <div class="w-full flex justify-center">
      HELLO
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import _ from "lodash";

export default {
  name: "default",
  props: ["items"],
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      title: "Estudiar",
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  watch: {
    items: function(val) {}
  },
  methods: {}
};
</script>
