export default {
  template: `
  <div>{{time}}</div>
  <div>
  
    <div class="divide-y divide-blue-700 ">
        <h5 class="mb-2 text-lg text-center font-bold tracking-tight text-blue-700  ">
            Админ панель
        </h5>
           <div />
    </div>
    <ul class="space-y-3 py-5">
        <li>
             <router-link to="/"  class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full gap-4 ">
                <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
                <span>Главная</span> 
            </router-link>
        </li>
        <li>
       
          <div class="w-full max-w-md mx-auto">
    <!-- Заголовок аккордеона -->
    <div 
      @click="isOpen = !isOpen" 
      class="flex items-center justify-between cursor-pointer p-3 transition"
      :class="isOpen 
        ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-t-lg border border-blue-700 ' 
        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 '"
    >
      <div class="flex items-center gap-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <span class="font-medium">Добавить место</span>
      </div>

      <!-- Иконка стрелки -->
      <svg 
        class="w-4 h-4 text-gray-800 dark:text-white transition-transform duration-300 rotate-90 "
        :class="{ 'rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </div>

    <!-- Контент аккордеона -->
    <transition name="accordion">
      <div 
        v-show="isOpen" 
        class="p-4 border border-t-0 border-blue-700  bg-white dark:bg-gray-900 rounded-b-lg"
      >
       <ol class="max-w-md space-y-3 text-gray-500 list-decimal list-inside dark:text-gray-400 text-sm">
    <li >
        <span>Кликните на карте Нарына или нажмите на экран , чтобы получить координаты.</span>
        <div class="text-gray-800 dark:text-white flex items-center gap-5 text-lg  ">
    
         <div>
          <span>X: </span>
          <span>0</span>
         </div >
          <div>
          <span>Y: </span>
          <span>0</span>
         </div>
        </div>
    </li>
    <li class="space-y-1">
            <label for="first_name">Введите название Э.С</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="Токтогул ГЭС ......" required />
    </li>
    <li class="space-y-1">
      <label for="message">Введите кароткую информацию появленя о Э.С</label>
      <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="Какшаал ГЭС - это гидроэлектростанция, которая, ........"></textarea>
  </li>
  <li class="space-y-1">
      <label for="place">Введите информатцию о место положение Э.С</label>
      <input type="text" id="place" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="Город Нарын итд." required />
  </li> 
      <li class="space-y-1">
      <label for="sel"> Введите цель проекта Э.С</label>
      <textarea id="sel" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="ГЭС призвана увеличить ......"></textarea>
  </li>
    <li class="space-y-1">
      <label for="partners">Введите партнеров.</label>
      <input type="text" id="partners" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="Город Нарын итд." required />
  </li> 
  <li>
    Выберите статус Э.С
  
<div class="flex flex-wrap gap-5 mt-3">
    <div class="flex items-center me-4">
        <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Э.С строится.</label>
    </div>
    <div class="flex items-center me-4">
        <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Э.С завершен, работает.</label>
    </div>
    <div class="flex items-center me-4">
        <input checked id="inline-checked-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="inline-checked-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Э.С, проект заброшен.</label>
    </div>
 
</div>

  </li>
</ol>
      </div>
    </transition>
  </div>
        </li>
    </ul>
  </div>`,
  props: {
    time: String,
    category: Object,
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
