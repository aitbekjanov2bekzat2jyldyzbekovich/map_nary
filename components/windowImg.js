export default {
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },

  template: `
    <Transition>
      <div
        v-if="info.length"
        class="fixed h-svh w-full bg-black bg-opacity-60 flex items-center justify-center
               gap-3 flex-wrap z-50"
        @click="$emit('close')"
      >
        <div v-for="(img, index) in info" :key="index" class="w-[48%] h-[48%]">
          <img :src="img" class="object-contain w-full h-full" />
        </div>
      </div>
    </Transition>
  `,
};
