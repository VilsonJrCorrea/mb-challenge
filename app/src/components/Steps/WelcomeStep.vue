<template>
  <div class="form-step" v-on:keyup.enter="onContinue">
    <TitleComponent msg="Seja bem vindo(a)" />
    <TextInput
      :error="errors.email"
      :initial-value="currentFormData.email"
      @change="onChangeEmail"
      ref="textInput"
      text="Endereço de e-mail"
    />
    <CheckboxComponent
      :error="errors.type"
      :initial-value="currentFormData.type"
      :inputs="inputs"
      @change="onChangeType"
    />
    <ContinueButton @click="onContinue" text="Confirmar" />
  </div>
</template>

<script>
import TextInput from "../@shared/TextInput.vue";
import CheckboxComponent from "../@shared/CheckboxComponent.vue";
import TitleComponent from "../@shared/TitleComponent.vue";
import ContinueButton from "../@shared/ContinueButton.vue";
import RegisterTypeEnum from "../../utils/RegisterTypeEnum";
import EmailValidator from "../../validators/EmailValidator";
export default {
  components: {
    TextInput,
    CheckboxComponent,
    TitleComponent,
    ContinueButton,
  },
  mounted() {
    this.$refs.textInput.$el.querySelector("input").focus();
  },
  props: {
    formData: Object,
  },
  data() {
    return {
      currentFormData: {
        email: this.formData.email,
        type: this.formData.type,
      },
      errors: {
        email: "",
        type: "",
      },
      inputs: [
        {
          id: RegisterTypeEnum.PF,
          value: "Pessoa Física",
        },
        {
          id: RegisterTypeEnum.PJ,
          value: "Pessoa Jurídica",
        },
      ],
    };
  },
  emits: ["onContinue"],
  methods: {
    onChangeEmail(email) {
      this.currentFormData.email = email;
    },
    onChangeType(type) {
      this.currentFormData.type = type;
    },
    validate() {
      this.errors.email = EmailValidator.validate(this.currentFormData.email)
        ? ""
        : "Email inválido";

      this.errors.type =
        this.currentFormData.type === RegisterTypeEnum.UNDEFINED
          ? "Selecione um tipo de cadastro"
          : "";

      return Object.values(this.errors).every((error) => error === "");
    },
    onContinue() {
      if (!this.validate()) {
        return;
      }
      this.$emit("onContinue", {
        email: this.currentFormData.email,
        type: this.currentFormData.type,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.form-step {
  @include formStep;
}
.continue {
  @include continueButton;
  width: 100%;
}
</style>
