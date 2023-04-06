<template>
  <button class="continue" @click="onContinue">Continuar</button>
</template>
<script>
export default {
  emits: ["onContinue"],
  methods: {
    onContinue() {
      this.$emit("onContinue");
    },
  },
};
</script>
<style lang="scss" scoped>
.continue {
  @include continueButton;
}
</style>
