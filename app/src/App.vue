<script>
import WelcomeStep from "./components/Steps/WelcomeStep.vue";
import PFStep from "./components/Steps/PFStep.vue";
import PJStep from "./components/Steps/PJStep.vue";
import PasswordStep from "./components/Steps/PasswordStep.vue";
import PJReviewStep from "./components/Steps/PJReviewStep.vue";
import PFReviewStep from "./components/Steps/PFReviewStep.vue";
import RegisterTypeEnum from "./utils/RegisterTypeEnum";
import Register from "./api/Register";
import LoadingComponent from "./components/@shared/LoadingComponent.vue";
import { useToast } from "vue-toastification";
export default {
  components: {
    WelcomeStep,
    PFStep,
    PJStep,
    PasswordStep,
    PJReviewStep,
    PFReviewStep,
    LoadingComponent,
  },
  data() {
    return {
      currentStep: "WelcomeStep",
      loading: false,
      formData: {
        email: "",
        type: RegisterTypeEnum.UNDEFINED,
        password: "",
        pfData: {
          cpf: "",
          birthDate: "",
          name: "",
          phone: "",
        },
        pjData: {
          cnpj: "",
          phone: "",
          socialName: "",
          openingDate: "",
        },
      },
      steps: {
        WelcomeStep: {
          name: "WelcomeStep",
          continue: this.onContinueWelcome,
          back: "",
        },
        PFStep: {
          name: "PFStep",
          continue: this.onContinuePF,
          back: this.onBackPF,
        },
        PJStep: {
          name: "PJStep",
          continue: this.onContinuePJ,
          back: this.onBackPJ,
        },
        PasswordStep: {
          name: "PasswordStep",
          continue: this.onContinuePassword,
          back: this.onBackPassword,
        },
        PFReviewStep: {
          name: "PFReviewStep",
          continue: this.onContinueReviewPF,
          back: this.onBackReviewPF,
        },
        PJReviewStep: {
          name: "PJReviewStep",
          continue: this.onContinueReviewPJ,
          back: this.onBackReviewPJ,
        },
      },
    };
  },
  methods: {
    onContinueWelcome({ email, type }) {
      this.formData.email = email;
      this.formData.type = type;
      switch (type) {
        case RegisterTypeEnum.PF:
          this.currentStep = this.steps.PFStep.name;
          break;
        case RegisterTypeEnum.PJ:
          this.currentStep = this.steps.PJStep.name;
          break;
      }
    },
    onContinuePF({ name, cpf, birthDate, phone }) {
      this.formData.pfData = { name, cpf, birthDate, phone };
      this.currentStep = this.steps.PasswordStep.name;
    },
    onContinuePJ({ cnpj, phone, socialName, openingDate }) {
      this.formData.pjData = { cnpj, phone, socialName, openingDate };
      this.currentStep = this.steps.PasswordStep.name;
    },
    onBackPF({ name, cpf, birthDate, phone }) {
      this.formData.pfData = { name, cpf, birthDate, phone };
      this.currentStep = this.steps.WelcomeStep.name;
    },
    onBackPJ({ cnpj, phone, socialName, openingDate }) {
      this.formData.pjData = { cnpj, phone, socialName, openingDate };
      this.currentStep = this.steps.WelcomeStep.name;
    },
    onContinuePassword({ password }) {
      this.formData.password = password;
      switch (this.formData.type) {
        case RegisterTypeEnum.PF:
          this.currentStep = this.steps.PFReviewStep.name;
          break;
        case RegisterTypeEnum.PJ:
          this.currentStep = this.steps.PJReviewStep.name;
          break;
      }
    },
    onBackPassword({ password }) {
      this.formData.password = password;
      switch (this.formData.type) {
        case 1:
          this.currentStep = this.steps.PFStep.name;
          break;
        case 2:
          this.currentStep = this.steps.PJStep.name;
          break;
      }
    },
    async onContinueReviewPF() {
      try {
        const data = {
          birthDate: this.formData.pfData.birthDate,
          cpf: this.formData.pfData.cpf,
          email: this.formData.email,
          name: this.formData.pfData.name,
          password: this.formData.password,
          phone: this.formData.pfData.phone,
          type: this.formData.type,
        };
        this.loading = true;
        await Register.post(data);
        this.loading = false;
        useToast().success("Cadastro realizado com sucesso!");
        this.onAfterRegister();
      } catch (err) {
        this.loading = false;
        useToast().error("Erro ao realizar cadastro!");
        this.onAfterRegister();
      }
    },
    async onContinueReviewPJ() {
      try {
        const data = {
          cnpj: this.formData.pjData.cnpj,
          email: this.formData.email,
          openingDate: this.formData.pjData.openingDate,
          password: this.formData.password,
          phone: this.formData.pjData.phone,
          socialName: this.formData.pjData.socialName,
          type: this.formData.type,
        };
        this.loading = true;
        await Register.post(data);
        this.onAfterRegister();
        this.loading = false;
        useToast().success("Cadastro realizado com sucesso!");
      } catch (err) {
        this.loading = false;
        useToast().error("Erro ao realizar cadastro!");
        this.onAfterRegister();
      }
    },

    onAfterRegister() {
      this.currentStep = this.steps.WelcomeStep.name;
      this.clearFormData();
    },

    onBackReviewPF({ name, cpf, birthDate, phone, email, password }) {
      this.formData.pfData = { name, cpf, birthDate, phone };
      this.formData.email = email;
      this.formData.password = password;
      this.currentStep = this.steps.PasswordStep.name;
    },
    onBackReviewPJ({
      cnpj,
      phone,
      socialName,
      openingDate,
      email,
      password,
      type,
    }) {
      this.formData.pjData = { cnpj, phone, socialName, openingDate };
      this.formData.email = email;
      this.formData.password = password;
      this.currentStep = this.steps.PasswordStep.name;
    },
    clearFormData() {
      this.formData = {
        email: "",
        type: RegisterTypeEnum.UNDEFINED,
        password: "",
        pfData: {
          cpf: "",
          birthDate: "",
          name: "",
          phone: "",
        },
        pjData: {
          cnpj: "",
          phone: "",
          socialName: "",
          openingDate: "",
        },
      };
    },
  },
};
</script>

<template>
  <component
    :is="currentStep"
    :form-data="formData"
    @onContinue="steps[currentStep].continue"
    @onBack="steps[currentStep].back"
  />
  <LoadingComponent v-if="loading" />
</template>
