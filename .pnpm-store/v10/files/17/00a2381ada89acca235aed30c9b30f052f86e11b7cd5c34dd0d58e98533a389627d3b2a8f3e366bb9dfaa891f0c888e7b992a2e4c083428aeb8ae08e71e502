import { mount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import { defineComponent, ref } from 'vue'
import MutateObserver from '../src'

describe('mutateObserver', () => {
  it('mutateObserver should support onMutate', async () => {
    const fn = vitest.fn()

    const Comp = defineComponent({
      setup() {
        const flag = ref(true)
        return () => (
          <MutateObserver onMutate={fn}>
            <button
              class={flag.value ? 'aaa' : 'bbb'}
              onClick={() => flag.value = !flag.value}
            >
              click
            </button>
          </MutateObserver>
        )
      },
    })

    const wrapper = mount(<Comp />)

    await wrapper.find('button').trigger('click')

    expect(fn).toHaveBeenCalled()
  })
})
