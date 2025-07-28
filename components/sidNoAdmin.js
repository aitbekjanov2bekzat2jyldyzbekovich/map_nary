export default {
  props: {
    select: {
      type: Array,
      required: true,
    },
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
<li>
  <div href="#" class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
           <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Поиск</span>
            </div>
</li>

  </ul>
  
  `,
};
