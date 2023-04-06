<template>
  <div class="form-step" v-on:keyup.enter="onContinue">
    <TitleComponent msg="Pessoa Jurídica" />
    <TextInput
      :error="errors.socialName"
      :initial-value="currentFormData.socialName"
      @change="onChangeSocialName"
      ref="textInput"
      text="Razão social"
    />
    <TextInput
      :error="errors.cnpj"
      :initial-value="currentFormData.cnpj"
      @change="onChangeCnpj"
      text="CNPJ"
      :data-maska="'##.###.###/####-##'"
    />
    <TextInput
      :error="errors.openingDate"
      :initial-value="currentFormData.openingDate"
      @change="onChangeOpeningDate"
      text="Data de abertura"
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
import CnpjValidator from "../../validators/CnpjValidator";
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
        cnpj: this.formData.pjData.cnpj,
        openingDate: this.formData.pjData.openingDate,
        phone: this.formData.pjData.phone,
        socialName: this.formData.pjData.socialName,
      },
      errors: {
        cnpj: "",
        openingDate: "",
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

      this.errors.openingDate = DateValidator.validate(
        this.currentFormData.openingDate
      )
        ? ""
        : "Data inválida";

      this.errors.phone = PhoneValidator.validate(this.currentFormData.phone)
        ? ""
        : "Telefone inválido";

      this.errors.socialName = this.currentFormData.socialName
        ? ""
        : "Razão social inválida";

      return Object.values(this.errors).every((error) => error === "");
    },
    onContinue() {
      if (!this.isValid()) {
        return;
      }
      this.$emit("onContinue", {
        socialName: this.currentFormData.socialName,
        cnpj: this.currentFormData.cnpj,
        openingDate: this.currentFormData.openingDate,
        phone: this.currentFormData.phone,
      });
    },
    onBack() {
      this.$emit("onBack", {
        socialName: this.currentFormData.socialName,
        cnpj: this.currentFormData.cnpj,
        openingDate: this.currentFormData.openingDate,
        phone: this.currentFormData.phone,
      });
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
    onChangePhone(value) {
      this.currentFormData.phone = value;
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
