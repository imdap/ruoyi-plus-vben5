<script setup lang="ts">
import type { Component } from 'vue';

import type { VbenFormSchema } from '@vben-core/form-ui';

import type { AuthenticationProps, LoginAndRegisterParams } from './types';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { $t } from '@vben/locales';

import { useVbenForm } from '@vben-core/form-ui';
import { VbenButton, VbenCheckbox } from '@vben-core/shadcn-ui';
import { cloneDeep, cn } from '@vben-core/shared/utils';

import Title from './auth-title.vue';
import ThirdPartyLogin from './third-party-login.vue';

interface Props extends AuthenticationProps {
  formSchema?: VbenFormSchema[];
  buttonComponent?: Component;
  checkboxComponent?: Component;
  submitBtnExtraProps?: Record<string, any>;
  mobileLoginBtnExtraProps?: Record<string, any>;
  qrcodeLoginBtnExtraProps?: Record<string, any>;
}

defineOptions({
  name: 'AuthenticationLogin',
});

const props = withDefaults(defineProps<Props>(), {
  codeLoginPath: '/auth/code-login',
  forgetPasswordPath: '/auth/forget-password',
  formSchema: () => [],
  loading: false,
  qrCodeLoginPath: '/auth/qrcode-login',
  registerPath: '/auth/register',
  showCodeLogin: true,
  showForgetPassword: true,
  showQrcodeLogin: true,
  showRegister: true,
  showRememberMe: true,
  showThirdPartyLogin: true,
  submitButtonText: '',
  subTitle: '',
  title: '',
  checkboxComponent: () => VbenCheckbox,
  buttonComponent: () => VbenButton,
  submitBtnExtraProps: () => ({}),
  mobileLoginBtnExtraProps: () => ({}),
  qrcodeLoginBtnExtraProps: () => ({}),
});

const emit = defineEmits<{
  submit: [LoginAndRegisterParams];
}>();

const [Form, formApi] = useVbenForm(
  reactive({
    commonConfig: {
      hideLabel: true,
      hideRequiredMark: true,
    },
    schema: computed(() => props.formSchema),
    showDefaultActions: false,
  }),
);
const router = useRouter();

const REMEMBER_ME_KEY = `REMEMBER_ME_USERNAME_${location.hostname}`;

const localUsername = localStorage.getItem(REMEMBER_ME_KEY) || '';

const rememberMe = ref(!!localUsername);

async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (valid) {
    const values = cloneDeep(await formApi.getValues());
    localStorage.setItem(
      REMEMBER_ME_KEY,
      rememberMe.value ? values?.username : '',
    );
    // 加上认证类型
    (values as any).grantType = 'password';
    emit('submit', values as LoginAndRegisterParams);
  }
}

function handleGo(path: string) {
  router.push(path);
}

onMounted(() => {
  if (localUsername) {
    formApi.setFieldValue('username', localUsername);
  }
});

defineExpose({
  getFormApi: () => formApi,
});
</script>

<template>
  <div @keydown.enter.prevent="handleSubmit">
    <slot name="title">
      <Title>
        <slot name="title">
          {{ title || `${$t('authentication.welcomeBack')} 👋🏻` }}
        </slot>
        <template #desc>
          <span class="text-muted-foreground">
            <slot name="subTitle">
              {{ subTitle || $t('authentication.loginSubtitle') }}
            </slot>
          </span>
        </template>
      </Title>
    </slot>

    <Form class="mb-2" />

    <div
      v-if="showRememberMe || showForgetPassword"
      class="mb-6 flex justify-between"
    >
      <div class="flex-center">
        <component
          :is="checkboxComponent"
          v-if="showRememberMe"
          v-model="rememberMe"
          name="rememberMe"
        >
          {{ $t('authentication.rememberMe') }}
        </component>
      </div>

      <span
        v-if="showForgetPassword"
        class="vben-link text-sm font-normal"
        @click="handleGo(forgetPasswordPath)"
      >
        {{ $t('authentication.forgetPassword') }}
      </span>
    </div>
    <component
      :is="buttonComponent"
      v-bind="submitBtnExtraProps"
      :class="cn({ 'cursor-wait': loading }, 'h-10')"
      :loading="loading"
      aria-label="login"
      class="w-full"
      @click="handleSubmit"
    >
      {{ submitButtonText || $t('common.login') }}
    </component>

    <div
      v-if="showCodeLogin || showQrcodeLogin"
      class="mt-4 mb-2 flex items-center justify-between"
    >
      <component
        :is="buttonComponent"
        v-bind="mobileLoginBtnExtraProps"
        v-if="showCodeLogin"
        class="w-1/2"
        variant="outline"
        @click="handleGo(codeLoginPath)"
      >
        {{ $t('authentication.mobileLogin') }}
      </component>
      <component
        :is="buttonComponent"
        v-bind="qrcodeLoginBtnExtraProps"
        v-if="showQrcodeLogin"
        class="ml-4 w-1/2"
        variant="outline"
        @click="handleGo(qrCodeLoginPath)"
      >
        {{ $t('authentication.qrcodeLogin') }}
      </component>
    </div>

    <!-- 第三方登录 -->
    <slot v-if="showThirdPartyLogin" name="third-party-login">
      <ThirdPartyLogin />
    </slot>

    <slot name="to-register">
      <div v-if="showRegister" class="mt-3 text-center text-sm">
        {{ $t('authentication.accountTip') }}
        <span
          class="vben-link text-sm font-normal"
          @click="handleGo(registerPath)"
        >
          {{ $t('authentication.createAccount') }}
        </span>
      </div>
    </slot>
  </div>
</template>
