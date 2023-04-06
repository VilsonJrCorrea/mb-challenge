<template>
  <div class="form-step" v-on:keyup.enter="onContinue">
    <TitleComponent msg="Senha de acesso" />
    <TextInput
      :error="passwordError"
      :initial-value="password"
      @change="onChangePassword"
      ref="textInput"
      text="Sua senha"
      type="password"
    />
    <div class="buttons-container">
      <BackButton @click="onBack" />
      <ContinueButton @click="onContinue" />
    </div>
  </div>
</template>

<script>
import TextInput from "../@shared/TextInput.vue";
import CheckboxComponent from "../@shared/CheckboxComponent.vue";
import TitleComponent from "../@shared/TitleComponent.vue";
import ContinueButton from "../@shared/ContinueButton.vue";
import BackButton from "../@shared/BackButton.vue";
import PasswordValidator from "../../validators/PasswordValidator";
export default {
  components: {
    TextInput,
    CheckboxComponent,
    TitleComponent,
    ContinueButton,
    BackButton,
  },
  mounted() {
    this.$refs.textInput.$el.querySelector("input").focus();
  },
  props: {
    formData: Object,
  },
  data() {
    return {
      password: this.formData.password,
      passwordError: "",
    };
  },
  emits: ["onContinue", "onBack"],
  methods: {
    onChangePassword(value) {
      this.password = value;
    },
    onContinue() {
      this.passwordError = PasswordValidator.validate(this.password)
        ? ""
        : "Senha inválida";
      if (this.passwordError.length > 0) {
        return;
      }
      this.$emit("onContinue", { password: this.password });
    },
    onBack() {
      this.$emit("onBack", { password: this.password });
    },
  },
};
</script>

<style scoped lang="scss">
.form-step {
  @include formStep;
}
.buttons-container {
  @include buttonsContainer;
}
</style>
