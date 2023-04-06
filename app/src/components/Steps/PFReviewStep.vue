<template>
  <div class="form-step" v-on:keyup.enter="onContinue">
    <TitleComponent msg="Revise suas informações" />
    <TextInput
      ref="textInput"
      text="Endereço de e-mail"
      @change="onChangeEmail"
      :initial-value="currentFormData.email"
      :error="errors.email"
    />
    <TextInput
      text="Nome"
      @change="onChangeName"
      :initial-value="currentFormData.name"
      :error="errors.name"
    />
    <TextInput
      text="CPF"
      @change="onChangeCpf"
      :initial-value="currentFormData.cpf"
      :data-maska="'###.###.###-##'"
      :error="errors.cpf"
    />
    <TextInput
      text="Data de nascimento"
      @change="onChangeBirthDate"
      :initial-value="currentFormData.birthDate"
      :data-maska="'##/##/####'"
      :error="errors.birthDate"
    />
    <TextInput
      text="Telefone"
      @change="onChangePhone"
      :initial-value="currentFormData.phone"
      :data-maska="'(##) #####-####'"
      :error="errors.phone"
    />
    <TextInput
      text="Senha"
      @change="onChangePassword"
      :initial-value="currentFormData.password"
      type="password"
      :error="errors.password"
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
import PhoneValidator from "../../validators/PhoneValidator";
import EmailValidator from "../../validators/EmailValidator";
import CpfValidator from "../../validators/CpfValidator";
import DateValidator from "../../validators/DateValidator";
import PasswordValidator from "../../validators/PasswordValidator";
export default {
  components: {
    TextInput,
    CheckboxComponent,
    TitleComponent,
    ContinueButton,
    BackButton,
  },
  props: {
    formData: Object,
  },
  mounted() {
    this.$refs.textInput.$el.querySelector("input").focus();
  },
  data() {
    return {
      currentFormData: {
        email: this.formData.email,
        cpf: this.formData.pfData.cpf,
        birthDate: this.formData.pfData.birthDate,
        phone: this.formData.pfData.phone,
        password: this.formData.password,
        name: this.formData.pfData.name,
      },
      errors: {
        email: "",
        name: "",
        cpf: "",
        birthDate: "",
        phone: "",
        password: "",
      },
    };
  },
  emits: ["onContinue", "onBack"],
  methods: {
    isValid() {
      this.errors.email = EmailValidator.validate(this.currentFormData.email)
        ? ""
        : "Email inválido";

      this.errors.name = this.currentFormData.name ? "" : "Nome inválido";

      this.errors.cpf = CpfValidator.validate(this.currentFormData.cpf)
        ? ""
        : "CPF inválido";

      this.errors.birthDate = DateValidator.validate(
        this.currentFormData.birthDate
      )
        ? ""
        : "Data de nascimento inválida";

      this.errors.phone = PhoneValidator.validate(this.currentFormData.phone)
        ? ""
        : "Telefone inválido";

      this.errors.password = PasswordValidator.validate(
        this.currentFormData.password
      )
        ? ""
        : "Senha inválida";

      return Object.values(this.errors).every((error) => error === "");
    },
    onContinue() {
      if (!this.isValid()) {
        return;
      }
      this.$emit("onContinue", {
        email: this.currentFormData.email,
        type: this.currentFormData.type,
        name: this.currentFormData.name,
        cpf: this.currentFormData.cpf,
        birthDate: this.currentFormData.birthDate,
        phone: this.currentFormData.phone,
        password: this.currentFormData.password,
      });
    },
    onBack() {
      this.$emit("onBack", {
        email: this.currentFormData.email,
        type: this.currentFormData.type,
        name: this.currentFormData.name,
        cpf: this.currentFormData.cpf,
        birthDate: this.currentFormData.birthDate,
        phone: this.currentFormData.phone,
        password: this.currentFormData.password,
      });
    },
    onChangeEmail(value) {
      this.currentFormData.email = value;
    },
    onChangeName(value) {
      this.currentFormData.name = value;
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
    onChangePassword(value) {
      this.currentFormData.password = value;
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
