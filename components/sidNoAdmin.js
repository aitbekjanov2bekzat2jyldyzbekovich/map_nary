export default {
  props: {
    select: {
      type: Array,
      required: true,
    },
  },
  methods: {
    sendCategory(event) {
      const selected = event.target.value;
      this.$emit("get-category", selected);
    },
  },
  template: `
    <form class="max-w-sm mx-auto">
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
    </form>
  `,
};
