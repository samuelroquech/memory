<template>
  <div>
    <h1 class="justify-center text-4xl my-5">Añade Temas</h1>
    <form class="my-20 flex justify-center">
      <section class="">
        <div>
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="topic">
            <span>Tema: </span>
            <strong><abbr title="required">*</abbr></strong>
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="topic" name="topic">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="text">
            <span> Texto: </span>
            <strong><abbr title="required">*</abbr></strong>
          </label>
          <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="text" name="text"></textarea>
        </div>
      </section>
    </form>  
  </div>
</template>

