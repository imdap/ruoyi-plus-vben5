<script lang="ts" setup>
import type { LoginCodeParams, VbenFormSchema } from '@vben/common-ui';

import { computed, ref } from 'vue';

import { AuthenticationCodeLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Alert } from 'antdv-next';

import { sendSmsCode } from '#/api/core/captcha';
import { useAuthStore } from '#/store';

defineOptions({ name: 'CodeLogin' });

const loading = ref(false);
const CODE_LENGTH = 4;

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.mobile'),
      },
      fieldName: 'phoneNumber',
      label: $t('authentication.mobile'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^\d{11}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
    },
    {
      component: 'VbenPinInput',
      componentProps(_, form) {
        return {
          createText: (countdown: number) => {
            const text =
              countdown > 0
                ? $t('authentication.sendText', [countdown])
                : $t('authentication.sendCode');
            return text;
          },
          // 验证码长度
          codeLength: CODE_LENGTH,
          placeholder: $t('authentication.code'),
          handleSendCode: async () => {
            const { valid, value } = await form.validateField('phoneNumber');
            if (!valid) {
              // 必须抛异常 不能直接return
              throw new Error('未填写手机号');
            }
            // 调用接口发送
            await sendSmsCode(value);
            window.message.success('验证码发送成功');
          },
        };
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().length(CODE_LENGTH, {
        message: $t('authentication.codeTip', [CODE_LENGTH]),
      }),
    },
  ];
});

const authStore = useAuthStore();
async function handleLogin(values: LoginCodeParams) {
  try {
    const requestParams: any = {
      phoneNumber: values.phoneNumber,
      smsCode: values.code,
      grantType: 'sms',
    };
    await authStore.authLogin(requestParams);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <Alert
      class="mb-4"
      how-icon
      message="测试手机号: 15888888888 正确验证码: 1234 演示使用 不会真的发送"
      type="info"
    />
    <AuthenticationCodeLogin
      :form-schema="formSchema"
      :loading="loading"
      @submit="handleLogin"
    />
  </div>
</template>
