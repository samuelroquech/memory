<template>
  <div>
    <h1 class="justify-center text-4xl my-5 text-center">{{ title }}</h1>
    <div class="w-full flex justify-center">
      <div class="w-1/2">
        <div class="flex w-full h-screen items-start justify-center bg-grey-lighter">
          <label class="w-64 m-5 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
              <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Importar CSV</span>
              <input type='file' class="hidden" v-on:change="importFile"/>
          </label>
          <label class="w-64 m-5 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
              <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Descargar</span>
              <input type='button' class="hidden" v-on:click="exportFile"/>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "default",
  props: ["items"],
  components: {
  },
  data() {
    return {
      title: "Bulk Editor",
    };
  },
  mounted() {
  },
  watch: {
  },
  computed: {},

  methods: {
    importFile: function(e){
      alert("Import");
      var f = e.target.files[0]; 
      if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
          var contents = e.target.result;
          var lines = contents.split("\n"), output = [];
          this.items = [];

          for (var i=0; i<lines.length; i++){
            let item = lines[i].split(",");
            let tags = [];
            let text = item[item.length-1];
            item.forEach((element, i) => {
              if(i != (item.length-1)){
                console.log("-----");
                console.log(element);
                tags.push({
                  text: element,
                  tiClasses:["ti-valid"]
                });
              }
            });

            this.items.push({
              tags : tags,
              text : text
            });

            console.log(lines[i].split(",").join(","));
          }

          this.$emit('addItem', this.items);
        }
        r.readAsText(f);
      } else { 
        alert("Failed to load file");
      }
    },
    exportFile: function(){
      alert("Export");
    }
  }
};
</script>
