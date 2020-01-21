<template>
    <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Memory</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <router-link tag="li" to="/" exact>
                            <a>Home</a>
                        </router-link>
                        <router-link tag="li" to="/add">
                            <a>Añadir</a>
                        </router-link>
                    </ul>
                </div>
            </div>
        </nav>

        <router-view :items="items" @items="addItem = $event"></router-view>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <hr>

                    <footer>
                        <p>© 2020 Memory App.</p>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
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
  }
}
</script>

<style>
    body {
        padding-top: 50px;
    }
</style>