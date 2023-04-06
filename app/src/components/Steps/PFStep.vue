<template>
  <div class="form-step" v-on:keyup.enter="onContinue">
    <TitleComponent msg="Pessoa Física" />
    <TextInput
      text="Nome"
      @change="onChangeName"
      :initial-value="currentFormData.name"
      :error="errors.name"
      ref="textInput"
    />
    <TextInput
      :error="errors.cpf"
      :initial-value="currentFormData.cpf"
      @change="onChangeCpf"
      text="CPF"
      :data-maska="'###.###.###-##'"
    />
    <TextInput
      :error="errors.birthDate"
      :initial-value="currentFormData.birthDate"
      @change="onChangeBirthDate"
      text="Data de nascimento"
      :data-maska="'##/##/####'"
    />
    <TextInput
      :error="errors.phone"
      :initial-value="currentFormData.phone"
      @change="onChangePhone"
      text="Telefone"
      :data-maska="'(##) #####-####'"
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
import EmailValidator from "../../validators/EmailValidator";
import CpfValidator from "../../validators/CpfValidator";
import DateValidator from "../../validators/DateValidator";
import PhoneValidator from "../../validators/PhoneValidator";
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
      currentFormData: {
        name: this.formData.pfData.name,
        cpf: this.formData.pfData.cpf,
        birthDate: this.formData.pfData.birthDate,
        phone: this.formData.pfData.phone,
      },
      errors: {
        birthDate: "",
        cpf: "",
        name: "",
        phone: "",
      },
    };
  },
  emits: ["onContinue", "onBack"],
  methods: {
    isValid() {
      this.errors.cpf = CpfValidator.validate(this.currentFormData.cpf)
        ? ""
        : "CPF inválido";

      this.errors.birthDate = DateValidator.validate(
        this.currentFormData.birthDate
      )
        ? ""
        : "Data inválida";

      this.errors.name = this.currentFormData.name ? "" : "Nome inválido";

      this.errors.phone = PhoneValidator.validate(this.currentFormData.phone)
        ? ""
        : "Telefone inválido";

      return Object.values(this.errors).every((error) => error === "");
    },
    onContinue() {
      if (!this.isValid()) {
        return;
      }
      this.$emit("onContinue", {
        cpf: this.currentFormData.cpf,
        birthDate: this.currentFormData.birthDate,
        phone: this.currentFormData.phone,
        name: this.currentFormData.name,
      });
    },
    onBack() {
      this.$emit("onBack", {
        cpf: this.currentFormData.cpf,
        birthDate: this.currentFormData.birthDate,
        phone: this.currentFormData.phone,
        name: this.currentFormData.name,
      });
    },
    onChangeEmail(value) {
      this.currentFormData.email = value;
    },
    onChangeCpf(value) {
      this.currentFormData.cpf = value;
    },
    onChangeBirthDate(value) {
      this.currentFormData.birthDate = value;
    },
    onChangePhone(value) {
      this.currentFormData.phone = value;
    },
    onChangeName(value) {
      this.currentFormData.name = value;
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
