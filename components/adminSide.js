export default {
  template: `
  <div>{{time}}</div>
  <div>
  
    <div class="divide-y divide-slate-700 ">
        <h5 class="mb-2 text-lg text-center font-bold tracking-tight text-gray-900 dark:text-white ">
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
      class="flex items-center justify-between cursor-pointer p-3 border border-gray-200 dark:border-gray-700 transition"
      :class="isOpen 
        ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-t-lg' 
        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'"
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
        class="p-4 border border-t-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-lg"
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
    <li>
      Укажите название карты
    </li>
    <li>
        <span class="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> with <span class="font-semibold text-gray-900 dark:text-white">57</span> points
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
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
