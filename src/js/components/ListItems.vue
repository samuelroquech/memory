<template>
  <div>
    <h1 class="justify-center text-4xl my-5 text-center">{{title}}</h1>
    <div class="flex w-full justify-center">
      <table class="table-fixed">
        <thead>
          <tr>
            <th class="w-1/2 px-4 py-2">Tema</th>
            <th class="w-1/4 px-4 py-2">Texto</th>
            <th class="w-1/4 px-4 py-2">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" class="bg-gray-100">
            <td class="border px-4 py-2">{{ item.tags }}</td>
            <td class="border px-4 py-2">{{ item.text }}</td>
            <td class="border px-4 py-2">858</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "default",
  props: ['items'],
  data() {
    return {
      title: "Lista de  Temas",
    };
  },
  methods: {
    
  }
};
</script>

