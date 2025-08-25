export default {
  template: `
  <div class="dark:text-white text-center text-2xl text-medium">{{time}}</div>
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
        <span class="font-medium">{{acrdionName}}</span>
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
        class="p-4 border border-t-0 border-blue-700  bg-white dark:bg-gray-900 rounded-b-lg relative "
      >
       <ol class="max-w-md space-y-3 text-gray-500 list-decimal list-inside dark:text-gray-400 text-sm">
    <li >
        <span>Кликните на карте Нарына или нажмите на экран , чтобы получить координаты.</span>
        <div class="text-gray-800 dark:text-white flex items-center gap-5 text-lg flex-wrap ">
    
         <div>
          <span>X: {{cardinats[0] || 0}}</span>
         </div >
          <div>
          <span>Y: {{cardinats[1] || 0}}</span>
         </div>
        </div>
    </li>
    <li class="space-y-1">
            <label for="first_name">Введите название Э.С</label>
            <input v-model="formValue.title" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="Токтогул ГЭС ......" required />

    </li>
    <li class="space-y-1">
     <label for="message">Введите кароткую информацию появленя о Э.С</label>
      <textarea v-model="formValue.description" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="Какшаал ГЭС - это гидроэлектростанция, которая, ........"></textarea>

  </li>
  <li class="space-y-1">
      <label for="place">Введите информатцию о место положение Э.С</label>
      <input v-model="formValue.place" type="text" id="place" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="Город Нарын итд." required />

  </li> 
      <li class="space-y-1">
      <label for="sel"> Введите цель проекта Э.С</label>
      <textarea v-model="formValue.Purpose_of_construction" id="sel" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="ГЭС призвана увеличить ......"></textarea>
  </li>
    <li class="space-y-1">
      <label for="partners">Введите партнеров.</label>
      <input type="text" v-model="formValue.partners" id="partners" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700" placeholder="Город Нарын итд." required />
 
  </li> 
  <li class="space-y-1">
  <span>Выберите статус Э.С</span>  
  
<div class="space-y-5">
    <div class="flex items-center me-4">
        <input id="inline-radio" v-model="formValue.statusEb" type="checkbox" value="Э.С строится."  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Э.С строится.</label>
    </div>
    <div class="flex items-center me-4">
        <input id="inline-2-radio" v-model="formValue.statusEb" type="checkbox" value="Э.С завершен, работает."  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Э.С завершен, работает.</label>
    </div>
    <div class="flex items-center me-4">
        <input  id="inline-checked-radio" v-model="formValue.statusEb" type="checkbox" value="Э.С, проект заброшен."  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="inline-checked-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Э.С, проект заброшен.</label>
    </div>
</div>
  </li>
  <li class="space-y-1">
  <span>Выберите категорию Э.С </span>
  <div class="space-y-5">
    <div v-for="i in category " class="flex items-center me-4">
        <input  :id="i.value" v-model="formValue.category" type="radio" :value="i.value" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label :for="i.value" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{i.name}}</label>
    </div>
  </div>
  </li>
  <li class="space-y-1 ">
  <span>Добавьте изобрежение Э.C</span>
 <div  class="rounded-md border border-indigo-500 bg-blue-700 w-full p-4 shadow-md  ">
    <label for="upload" class="flex flex-col items-center gap-2 cursor-pointer">
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
</svg>

      <span class="text-white font-medium">Загрузить</span>
    </label>
    <input id="upload" @change="imgToSrc" type="file" class="hidden" accept="image/*" multiple/>
</div>
  </li>
</ol>
  <div v-show="formValue.images.length && formValue.category && formValue.statusEb.length && formValue.title && cardinats.length && formValue.Purpose_of_construction && formValue.description && formValue.place && formValue.partners" class="  bg-white dark:bg-gray-900 sticky  bottom-[-1rem] left-0 pt-2 flex  items-center justify-between  border-t border-blue-700">
  <button type="button" v-show="!statusMarker" @click="  this.$emit('editMarker')" class="  text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800">
  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
</svg>

  </button>
  <button type="button" @click="  this.$emit('deleteMarker')" v-show="!statusMarker" class="  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5v14m-6-8h6m-6 4h6m4.506-1.494L15.012 12m0 0 1.506-1.506M15.012 12l1.506 1.506M15.012 12l-1.506-1.506M20 19H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1Z"/>
</svg>
  </button>
  <div v-show="statusMarker" class="w-full flex justify-center">
    <button  @click="sendValue()" type="button" class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    Добавить маркер
  </button>
  </div>

  </div>
      </div>
    </transition>
  </div>
        </li>
        <li>
           <div @click="this.$emit('clearMarker')" class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full gap-4 ">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
</svg>

                <span>Очистить все</span> 
            </div>
        </li>

        
       
               <li>
           <div @click="this.$emit('closeAdmin')" class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full gap-4 ">
  
 <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>


                <span>Выйти</span> 
            </div>
        </li>
    </ul>
  </div>`,

  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    formValue: Object,
    cardinats: Array,
    time: String,
    category: Array,
    statusMarker: Boolean,
    acrdionName: String,
  },
  methods: {
    async sendValue() {
      this.formValue.lat = await this.cardinats[0];
      this.formValue.lng = await this.cardinats[1];
      await this.$emit("getValue", this.formValue);
    },

    imgToSrc(e) {
      this.formValue.images = [];
      const files = Array.from(e.target.files);
      if (files.length < 5) {
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            // event.target.result содержит Base64
            this.formValue.images.push(event.target.result);
          };
          reader.readAsDataURL(file); // превращает файл в Base64
        });

        this.$emit("imgMessage", {
          title: "Система: ",
          message: ` Получено ${files.map((i) => i.name).join(", ")}`,
          color: "blue",
        });
      } else {
        this.formValue.images = [];
        this.$emit("imgMessage", {
          title: "Система: ",
          message: `Добавьте не больше 4 изображений!`,
          color: "yellow",
        });
      }
    },
  },
};
