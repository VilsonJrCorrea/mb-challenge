<template>
  <div class="checkbox">
    <div v-for="input in inputs" :key="input.id">
      <input
        type="radio"
        :id="input.id"
        :value="input.id"
        v-model="picked"
        @change="onChangeInput"
      />
      <label :for="input.id">{{ input.value }}</label>
    </div>
  </div>
  <div class="span-error" v-if="error">
    <span>{{ error }}</span>
  </div>
</template>
<script>
export default {
  props: {
    inputs: Array,
    error: String,
    initialValue: Number,
  },
  data() {
    return {
      picked: this.initialValue,
    };
  },
  methods: {
    onChangeInput() {
      this.$emit("change", Number(this.picked));
    },
  },
  emits: ["change"],
};
</script>
<style lang="scss" scoped>
.checkbox {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  margin-top: 1em;
  input {
    margin-right: 0.5em;
  }
}
.span-error {
  @include spanError;
}
</style>
