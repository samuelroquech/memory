<template>
  <div>
    <h1 class="justify-center text-4xl my-5 text-center">{{title}}</h1>
    <div class="flex w-full justify-center">
      <form v-on:submit.prevent="saveText" class="my-10 block w-6/12 justify-center">
        <div>
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="topic"
          >
            <span>Tema:</span>
            <strong>
              <abbr title="required">*</abbr>
            </strong>
          </label>
          <vue-tags-input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="tag"
            :tags="topic"
            @tags-changed="newTags => (topic = newTags)"
          />
        </div>
        <div>
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="text"
          >
            <span>Texto:</span>
            <strong>
              <abbr title="required">*</abbr>
            </strong>
          </label>
          <textarea
            class="appearance-none h-56 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="text"
            v-model="text"
          ></textarea>
        </div>
        <div class="md:flex md:items-center">
          <div class="w-1/3"></div>
          <div class="w-2/3 text-right">
            <button
              class="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >Enviar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "addItems",
  props: ["items"],
  components: {
    VueTagsInput
  },
  data() {
    return {
      title: "Añade Temas",
      tag: "",
      topic: [],
      text: ""
    };
  },
  methods: {
    addItem: function(tags, text) {
      console.log(this);
      if (Array.isArray(this.items)) {
        this.items.push({
          tags: tags,
          text: text
        });
        this.$emit("addItem", this.items);
      }
    },
    saveText: function(event) {
      if (this.topic == "" || this.text == "") {
        alert("Por favor, rellena todos los campos");
        return;
      }
      this.addItem(this.topic, this.text);
      this.clean();
    },
    clean: function() {
      this.topic = [];
      this.text = "";
      this.tag = "";
    }
  }
};
</script>

