<template>
  <div class="input-text">
    <div class="label" :class="error ? 'error' : ''">
      <span>{{ text }}</span>
    </div>
    <input
      :type="type"
      class="text"
      @change="onChangeInput"
      :class="error ? 'error' : ''"
      :value="initialValue"
      :data-maska="dataMaska"
      v-maska
    />
    <div class="span-error" v-if="error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>
<script>
import { vMaska } from "maska";
export default {
  props: {
    text: String,
    initialValue: String,
    error: String,
    mask: String,
    dataMaska: String,
    type: String,
  },
  directives: { maska: vMaska },
  methods: {
    onChangeInput(e) {
      this.$emit("change", e.target.value);
    },
  },
  emits: ["change"],
};
</script>
<style lang="scss" scoped>
.input-text {
  @include inputText;
}
.span-error {
  @include spanError;
}
</style>
