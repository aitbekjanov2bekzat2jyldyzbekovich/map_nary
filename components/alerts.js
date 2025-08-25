export default {
  props: {
    alertOp: {
      type: Object,
      default: {
        status: false,
        title: "",
        color: "",
        message: "",
      },
    },
  },

  template: `
    <transition name="alert-slide">
      <div
        v-if="alertOp.status"
        :class="[
          'flex items-center p-4 mb-4 text-sm border rounded-lg bottom-0 right-0 fixed z-50',
          'bg-' + alertOp.color + '-50',
          'text-' + alertOp.color + '-800',
          'border-' + alertOp.color + '-300',
          'dark:bg-gray-800',
          'dark:text-' + alertOp.color + '-400',
          'dark:border-' + alertOp.color + '-800'
        ]"
        role="alert"
      >
        <svg
          class="shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">{{ alertOp.title }}</span>
          {{ alertOp.message }}
        </div>
      </div>
    </transition>
  `,

  watch: {
    alertOp() {
      setTimeout(() => {
        this.$emit("clearalert");
      }, 2500);
    },
  },
};
