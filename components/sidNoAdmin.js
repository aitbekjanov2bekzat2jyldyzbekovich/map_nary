export default {
  props: {
    select: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    async sendCategory(event) {
      const category = event.target.value.trim();
      if (category) {
        try {
          await this.$router.push(`/filter=/${category}`);
          const a = await this.statusServer();
        } catch {
        } finally {
          this.$emit("eventMessage", category);
        }
      } else {
        await this.$router.push("/");
      }
    },
    statusServer() {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        return response;
      };
    },
  },

  template: `
  <ul class="space-y-3">
    <li class="max-w-sm mx-auto">
      <label
        for="categories"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Фильтр по категории:
      </label>
      <select
        id="categories"
        @change="sendCategory"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="i in select" :value="i.value">
          {{ i.name }}
        </option>
      </select>
    </li>
    <li v-show="$route.name === 'home'"> 
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input  v-model="searchQuery" @input="this.$emit('searchMarkers', searchQuery)" type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Поиск маркеров "  />
    </div>

    <div v-show="searchQuery" class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div>
    <span class="font-medium">Предуприждение:</span>
      <p class="mt-1.5 list-disc list-inside">
      Поиск работает только по началу названия и чувствителен к регистру. Пожалуйста, вводите первые буквы правильно
    </p>
  </div>
</div>

    </li>


  </ul>
  
  `,
};
