export default {
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },
  template: ` <Transition>
   <div v-if="info.length" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center  flex-wrap z-50 p-5 gap-" @click="$emit('close')">
        <img v-for="(img, index) in info" :key="index"  :src="img" class="w-1/2 h-1/2  " />
    </div>
  </div>
   </Transition>`,
};
