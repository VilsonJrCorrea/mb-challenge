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
      text="Razão social"
      @change="onChangeSocialName"
      :initial-value="currentFormData.socialName"
      :error="errors.socialName"
    />
    <TextInput
      text="CNPJ"
      @change="onChangeCnpj"
      :initial-value="currentFormData.cnpj"
      :error="errors.cnpj"
      :data-maska="'##.###.###/####-##'"
    />
    <TextInput
      text="Data de abertura"
      @change="onChangeOpeningDate"
      :initial-value="currentFormData.openingDate"
      :error="errors.openingDate"
      :data-maska="'##/##/####'"
    />
    <TextInput
      text="Telefone"
      @change="onChangePhone"
      :initial-value="currentFormData.phone"
      :error="errors.phone"
      :data-maska="'(##) #####-####'"
    />
    <TextInput
      text="Senha"
      @change="onChangePassword"
      :initial-value="currentFormData.password"
      :error="errors.password"
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
import PhoneValidator from "../../validators/PhoneValidator";
import EmailValidator from "../../validators/EmailValidator";
import CnpjValidator from "../../validators/CnpjValidator";
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
        cnpj: this.formData.pjData.cnpj,
        email: this.formData.email,
        openingDate: this.formData.pjData.openingDate,
        password: this.formData.password,
        phone: this.formData.pjData.phone,
        socialName: this.formData.pjData.socialName,
      },
      errors: {
        cnpj: "",
        email: "",
        openingDate: "",
        password: "",
        phone: "",
        socialName: "",
      },
    };
  },
  emits: ["onContinue", "onBack"],
  methods: {
    isValid() {
      this.errors.cnpj = CnpjValidator.validate(this.currentFormData.cnpj)
        ? ""
        : "CNPJ inválido";

      this.errors.email = EmailValidator.validate(this.currentFormData.email)
        ? ""
        : "E-mail inválido";

      this.errors.openingDate = DateValidator.validate(
        this.currentFormData.openingDate
      )
        ? ""
        : "Data inválida";

      this.errors.password = PasswordValidator.validate(
        this.currentFormData.password
      )
        ? ""
        : "Senha inválida";

      this.errors.phone = PhoneValidator.validate(this.currentFormData.phone)
        ? ""
        : "Telefone inválido";

      this.errors.socialName = this.currentFormData.socialName
        ? ""
        : "Razão social inválida";

      return Object.values(this.errors).every((error) => error == "");
    },
    onContinue() {
      if (!this.isValid()) {
        return;
      }
      this.$emit("onContinue", {
        email: this.currentFormData.email,
        type: this.currentFormData.type,
        phone: this.currentFormData.phone,
        password: this.currentFormData.password,
        socialName: this.currentFormData.socialName,
        cnpj: this.currentFormData.cnpj,
        openingDate: this.currentFormData.openingDate,
      });
    },
    onBack() {
      this.$emit("onBack", {
        email: this.currentFormData.email,
        type: this.currentFormData.type,
        phone: this.currentFormData.phone,
        password: this.currentFormData.password,
        socialName: this.currentFormData.socialName,
        cnpj: this.currentFormData.cnpj,
        openingDate: this.currentFormData.openingDate,
      });
    },
    onChangeEmail(value) {
      this.currentFormData.email = value;
    },
    onChangePhone(value) {
      this.currentFormData.phone = value;
    },
    onChangePassword(value) {
      this.currentFormData.password = value;
    },
    onChangeSocialName(value) {
      this.currentFormData.socialName = value;
    },
    onChangeCnpj(value) {
      this.currentFormData.cnpj = value;
    },
    onChangeOpeningDate(value) {
      this.currentFormData.openingDate = value;
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
