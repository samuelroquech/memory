<template>
  <div>
    <h1 class="justify-center text-4xl my-5 text-center">{{ title }}</h1>
    <div class="w-full flex justify-center">
      <div class="w-1/2">
        <div class="w-full">
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >Filtros</label>
              <div class="relative">
                <vue-tags-input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  v-model.lazy="tag"
                  :tags="tags"
                  @tags-changed="newTags => (tags = newTags)"
                />
              </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >Precisión</label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  v-model.lazy="percent"
                >
                  <option value="0.99">1%</option>
                  <option value="0.9">10%</option>
                  <option value="0.8">20%</option>
                  <option value="0.7">30%</option>
                  <option value="0.6">40%</option>
                  <option value="0.5">50%</option>
                  <option value="0.4" selected>60%</option>
                  <option value="0.3">70%</option>
                  <option value="0.2">80%</option>
                  <option value="0.1">90%</option>
                  <option value="0.01">99%</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-4/5">
        <swiper class="my-20 relative" :options="swiperOption" ref="swiper">
          <swiper-slide v-for="(item, index) in fItemsFiltered" :key="index">
            <memory-item :item="item" :percent="percent" :filter="tags"></memory-item>
          </swiper-slide>
          <div
            class="mem-swiper-prev absolute left-0 top-0 text-teal-500 hover:text-teal-400 h-8 w-8 z-10 overflow-hidden"
            slot="button-prev"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              class="fill-current"
            >
              <path
                style="width:100%"
                d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm3 5.753l-6.44 5.247 6.44 5.263-.678.737-7.322-6 7.335-6 .665.753z"
              />
            </svg>
          </div>
          <div
            class="mem-swiper-next absolute right-0 top-0 text-teal-500 hover:text-teal-400 h-8 w-8 z-10 overflow-hidden"
            slot="button-next"
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              class="fill-current"
            >
              <path
                d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z"
              />
            </svg>
          </div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import _ from "lodash";
import memoryItem from "./Memory-item.vue";
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "memory",
  components: {
    swiper,
    swiperSlide,
    memoryItem,
    VueTagsInput
  },
  data() {
    return {
      title: "Estudiar",
      swiperOption: {
        navigation: {
          nextEl: ".mem-swiper-next",
          prevEl: ".mem-swiper-prev"
        }
      },
      percent: "0.6",
      tag: "",
      tags: []
    };
  },
  mounted() {
    this.autocompleteTags;
  },
  computed: {
    autocompleteTags() {},
    fItemsFiltered: function() {
      let t = this;
      let local = _.reverse(JSON.parse(JSON.stringify(this.$parent.items)));

      let array = _.filter(local, function(o) {
        if (t.tags.length > 0) {
          var found = _.unionBy(t.tags, o.tags, "text");
          return found.length == o.tags.length;
        }
        return true;
      });

      return _.slice(array, 0, 20);
    }
  },
  methods: {}
};
</script>
