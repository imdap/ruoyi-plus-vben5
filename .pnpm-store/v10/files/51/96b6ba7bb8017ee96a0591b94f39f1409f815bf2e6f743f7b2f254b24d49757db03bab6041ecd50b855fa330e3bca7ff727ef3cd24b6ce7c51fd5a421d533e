import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getIcon, createEvent, renderEmptyElement } from '../../ui'

import type { ResultReactData, VxeResultEmits, ResultMethods, ResultPrivateMethods, VxeResultPropTypes, ValueOf, ResultPrivateRef, VxeResultPrivateComputed, VxeResultConstructor, VxeResultPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeResult',
  props: {
    imageUrl: String as PropType<VxeResultPropTypes.ImageUrl>,
    imageStyle: Object as PropType<VxeResultPropTypes.ImageStyle>,
    icon: String as PropType<VxeResultPropTypes.Icon>,
    type: [String, Number] as PropType<VxeResultPropTypes.Type>,
    status: [String, Number] as PropType<VxeResultPropTypes.Status>,
    title: [String, Number] as PropType<VxeResultPropTypes.Title>,
    content: [String, Number] as PropType<VxeResultPropTypes.Content>
  },
  emits: [
  ] as VxeResultEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<ResultReactData>({
    })

    const refMaps: ResultPrivateRef = {
      refElem
    }

    const computeMaps: VxeResultPrivateComputed = {
    }

    const $xeResult = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeResultConstructor & VxeResultPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeResultEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $result: $xeResult }, params))
    }

    const collapsePaneMethods: ResultMethods = {
      dispatchEvent
    }

    const collapsePanePrivateMethods: ResultPrivateMethods = {
    }

    Object.assign($xeResult, collapsePaneMethods, collapsePanePrivateMethods)

    const renderVN = () => {
      const { imageUrl, imageStyle, icon, title, type, content } = props
      const status = props.status || type
      const slotExtra = slots.extra
      return h('div', {
        ref: 'refElem',
        class: ['vxe-result', {
          [`theme--${status}`]: status
        }]
      }, [
        h('div', {
          class: 'vxe-result--inner'
        }, [
          imageUrl
            ? h('div', {
              class: 'vxe-result--img-wrapper'
            }, [
              h('img', {
                src: imageUrl,
                style: imageStyle
              })
            ])
            : h('div', {
              class: 'vxe-result--icon-wrapper'
            }, [
              h('i', {
                class: [icon, type ? getIcon()[`RESULT_${type}`.toLocaleUpperCase() as 'RESULT_SUCCESS' | 'RESULT_ERROR'| 'RESULT_WARNING' | 'RESULT_QUESTION'] : '']
              })
            ]),
          h('div', {
            class: 'vxe-result--title-wrapper'
          }, `${title || ''}`),
          h('div', {
            class: 'vxe-result--content-wrapper'
          }, `${content || ''}`),
          slotExtra
            ? h('div', {
              class: 'vxe-result--extra-wrapper'
            }, slotExtra({}))
            : renderEmptyElement($xeResult)
        ])
      ])
    }

    $xeResult.renderVN = renderVN

    return $xeResult
  },
  render () {
    return this.renderVN()
  }
})
