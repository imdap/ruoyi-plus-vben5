/* eslint-disable vue/multi-word-component-names */
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';
import type { ModalFuncProps } from 'antdv-next/dist/modal/interface';

import { defineComponent, h, reactive, ref } from 'vue';

import { Alert, Form, FormItem, Input } from 'antdv-next';
import { isFunction } from 'lodash-es';

export interface ConfirmModalProps extends Omit<ModalFuncProps, 'visible'> {
  confirmText?: string;
  placeholder?: string;
  onValidated?: () => Promise<void>;
}

export function confirmDeleteModal(props: ConfirmModalProps) {
  const placeholder = props.placeholder || `输入'确认删除'`;
  const confirmText = props.confirmText || '确认删除';

  const formValue = reactive({
    content: '',
  });
  const rulesRef = reactive<{ [key: string]: Rule[] }>({
    content: [
      {
        message: '校验不通过',
        required: true,
        validator(_, value) {
          if (value !== confirmText) {
            return Promise.reject(new Error('校验不通过'));
          }
          return Promise.resolve();
        },
      },
    ],
  });

  const outerInstance = ref<{ formInstance?: FormInstance }>({});

  window.modal.confirm({
    ...props,
    centered: true,
    content: () =>
      h(
        defineComponent({
          setup(_, { expose }) {
            const formInstance = ref<FormInstance>();
            expose({ formInstance });
            return () => (
              <div class="flex flex-col gap-[8px]">
                <Alert
                  title={'确认删除后将无法恢复，请谨慎操作！'}
                  type="error"
                />
                <Form layout="vertical" model={formValue} ref={formInstance}>
                  <FormItem name="content" rules={rulesRef.content}>
                    <Input
                      placeholder={placeholder}
                      v-model:value={formValue.content}
                    />
                  </FormItem>
                </Form>
              </div>
            );
          },
        }),
        { ref: outerInstance },
      ),
    okButtonProps: { danger: true, type: 'primary' },
    onOk: async () => {
      await outerInstance.value?.formInstance?.validate();
      isFunction(props.onValidated) && props.onValidated();
    },
    title: '提示',
    type: 'warning',
  });
}
