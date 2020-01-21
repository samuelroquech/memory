<template>
  <div>
    <h1 class="justify-center text-4xl my-5 text-center">{{title}}</h1>
    
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      title: "Lista de  Temas",
      items: ""
    };
  },
  mounted() {
    if(localStorage.items) {
      this.items = JSON.parse(localStorage.items);
    }else{
      this.items = [];
    }
  }, 
  watch: {
    items(newItem) {
      localStorage.items = JSON.stringify(newItem);
    }
  },
  methods: {
    addItem: function(tags, text){
      if(Array.isArray(this.items)){
        this.items.push({
          tags : tags,
          text : text
        });  
      }
    },
    saveText: function(event) {
      if(this.topic == "" || this.text == ""){
        alert("Por favor, rellena todos los campos");
        return;
      }
      this.addItem(this.topic, this.text);
    }
  }
};
</script>

