<template>
  <button class="back" @click="onBack">Voltar</button>
</template>
<script>
export default {
  emits: ["onBack"],
  methods: {
    onBack() {
      this.$emit("onBack");
    },
  },
};
</script>
<style lang="scss" scoped>
.back {
  @include backButton;
}
</style>
