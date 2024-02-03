<template>
  <div>
    <div :class="mode" v-if="mode == 'normal'">
      <slot></slot>
    </div>

    <div :class="mode" v-if="mode == 'modified'">
      <slot name="category">
        <div class="image"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    mode: {
      type: String,
      required: false,
      default: "normal",
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    category: {
      type: String,
      required: false,
      default: null,
    },
  },
  //   props: ["mode", "image", "category"],
});
</script>

<style scoped>
.normal {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
.modified {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.1rem;
}
.image {
  height: 20px;
  width: 20px;
}
.category {
  font-size: 10px;
}
</style>