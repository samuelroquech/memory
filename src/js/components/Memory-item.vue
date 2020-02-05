<template>
  <div>
    <h2
      class="justify-center text-2xl mb-5 text-center"
      v-html="compressedTags"
    ></h2>
    <div
      v-if="show"
      class="w-full flex justify-center"
      v-html="noCompressedText"
    ></div>
    <div v-if="!show" class="w-full flex justify-center">
      <p v-html="compressedText"></p>
    </div>

    <div class="w-full flex justify-center pt-5">
      <button
        class="bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs px-4 rounded justify-center"
        v-on:click="showHide"
      >
        VER
      </button>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import _ from "lodash";

export default {
  name: "default",
  props: ["item", "percent", "filter"],
  data() {
    return {
      title: "Estudiar",
      compressedText: "",
      noCompressedText: "",
      fullText: "",
      compressedTags: "",
      show: false
    };
  },
  mounted() {
    this.compressText();
    this.compressTags();
  },
  watch: {
    percent: function() {
      this.compressText();
      this.compressTags();
    },
    filter: function() {
      this.compressText();
      this.compressTags();
    }
  },
  methods: {
    showHide() {
      this.show = !this.show;
    },

    compressTags() {
      let tagsText = [];

      _.map(this.item.tags, u => {
        tagsText.push(u.text);
      });

      this.compressedTags = _.join(tagsText, ", ");
    },

    compressText() {
      this.noCompressedText = this.item.text.replace(/\r?\n/g, " <br /> ");
      let array = _.split(this.noCompressedText, " ");
      let regex = /^[\S]*[0-9]+[\S]*$/;
      let limit = 3;
      let values = [];

      array.forEach((element, i) => {
        if (element.length > limit && element != "<br />") {
          values.push({
            index: i,
            text: element
          });
        }
      });

      values = _.shuffle(values);

      if (values.length > 1) {
        let stopShuffle = Math.trunc(+this.percent * values.length) + 1;

        //console.log(values);

        for (let i = 0; stopShuffle > i; i++) {
          const element = values[i];
          if (element.index > 0) {
            array[element.index] =
              '<span title="' +
              element.text +
              '" class="cursor-pointer">' +
              element.text.replace(/./g, "_") +
              "</span>";
          }
        }
      }
      this.compressedText = array.join(" ");
    }
  }
};
</script>
