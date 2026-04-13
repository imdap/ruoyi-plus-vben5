import type { ResizeObserverProps } from '../index.tsx'
import findDOMNode from '@v-c/util/dist/Dom/findDOMNode'
import { filterEmpty } from '@v-c/util/dist/props-util'
import {
  computed,
  createVNode,
  defineComponent,
  inject,
  isVNode,
  shallowRef,
} from 'vue'
import { CollectionContext } from '../Collection'
import useResizeObserver from '../useResizeObserver.ts'
import DomWrapper from './DomWrapper'

const SingleObserver = defineComponent<ResizeObserverProps>({
  name: 'SingleObserver',
  inheritAttrs: false,
  setup(props, { expose, slots }) {
    const wrapperRef = shallowRef()

    const getDom = (el: any): any => {
      const dom = findDOMNode(el)
      // 判断当前的dom是不是一个text元素
      if (dom && (dom.nodeType === 3 || dom.nodeType === 8) && (dom as any).nextElementSibling)
        return (dom as any).nextElementSibling as HTMLElement
      return dom
    }
    const setWrapperRef = (el: any) => {
      let _wrapper = el
      if (el?.elementEl && typeof el.elementEl === 'object') {
        _wrapper = el.elementEl
      }
      else if (el?.__$el && typeof el.__$el === 'object') {
        _wrapper = el.__$el
      }

      wrapperRef.value = getDom(_wrapper)
    }
    const onCollectionResize = inject(CollectionContext, () => {})

    const enabled = computed(() => !props.disabled)
    useResizeObserver(
      enabled,
      wrapperRef,
      (...args) => props?.onResize?.(...args),
      (size, element) => {
        onCollectionResize?.(size, element, props.data)
      },
    )
    expose({
      getDom,
    })
    return () => {
      const children = filterEmpty(slots?.default?.())
      if (children.length === 1 && isVNode(children[0])) {
        return createVNode(children[0], {
          ref: setWrapperRef,
        })
      }
      return (
        <DomWrapper ref={wrapperRef}>
          {slots.default?.()}
        </DomWrapper>
      )
    }
  },
})

export default SingleObserver
