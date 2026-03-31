<script setup lang="ts">
import { Input, SpaceCompact } from 'antdv-next';

interface Props {
  captcha?: string;
  label?: string;
  loading?: boolean;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  captcha: '',
  label: '验证码',
  loading: false,
  placeholder: '请输入验证码',
});

defineEmits<{ captchaClick: [] }>();

const modelValue = defineModel<string>({ default: '' });
</script>

<!-- 图片验证码 -->
<template>
  <div class="w-full flex-1">
    <SpaceCompact class="w-full">
      <Input
        size="large"
        id="code"
        name="code"
        type="text"
        autocomplete="off"
        required
        v-model:value="modelValue"
        :class="$attrs?.class ?? {}"
        :label="label"
        :placeholder="placeholder"
      />
      <div class="relative rounded-r-lg border">
        <img
          :src="captcha"
          class="h-[40px] w-[150px] cursor-pointer rounded-r-lg"
          :class="{ 'pointer-events-none': loading }"
          @click="$emit('captchaClick')"
        />
        <div
          v-if="loading"
          class="absolute inset-0 flex cursor-not-allowed items-center justify-center rounded-r-lg bg-black/30"
        >
          <span class="captcha-loading"></span>
        </div>
      </div>
    </SpaceCompact>
  </div>
</template>

<style lang="scss">
@keyframes loading-rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.captcha-loading {
  box-sizing: border-box;
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: loading-rotation 1s linear infinite;
}
</style>
