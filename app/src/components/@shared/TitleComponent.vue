<template>
  <h2 class="title">{{ msg }}</h2>
</template>
<script>
export default {
  props: {
    msg: String,
  },
};
</script>
<style lang="scss" scoped>
.title {
  @include title;
}
</style>
