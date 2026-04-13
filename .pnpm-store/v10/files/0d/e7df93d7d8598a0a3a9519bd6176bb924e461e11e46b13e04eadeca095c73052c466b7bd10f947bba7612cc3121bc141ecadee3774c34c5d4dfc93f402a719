import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getI18n, getIcon, createEvent } from '../../ui'

import type { EmptyReactData, VxeEmptyEmits, VxeEmptyPropTypes, EmptyMethods, EmptyPrivateMethods, ValueOf, EmptyPrivateRef, VxeEmptyPrivateComputed, VxeEmptyConstructor, VxeEmptyPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeEmpty',
  props: {
    imageUrl: String as PropType<VxeEmptyPropTypes.ImageUrl>,
    imageStyle: Object as PropType<VxeEmptyPropTypes.ImageStyle>,
    icon: String as PropType<VxeEmptyPropTypes.Icon>,
    status: String as PropType<VxeEmptyPropTypes.Status>,
    content: [String, Number] as PropType<VxeEmptyPropTypes.Content>
  },
  emits: [
  ] as VxeEmptyEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<EmptyReactData>({
    })

    const refMaps: EmptyPrivateRef = {
      refElem
    }

    const computeMaps: VxeEmptyPrivateComputed = {
    }

    const $xeEmpty = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeEmptyConstructor & VxeEmptyPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeEmptyEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $empty: $xeEmpty }, params))
    }

    const collapsePaneMethods: EmptyMethods = {
      dispatchEvent
    }

    const collapsePanePrivateMethods: EmptyPrivateMethods = {
    }

    Object.assign($xeEmpty, collapsePaneMethods, collapsePanePrivateMethods)

    const renderVN = () => {
      const { imageUrl, imageStyle, icon, status, content } = props
      return h('div', {
        ref: refElem,
        class: ['vxe-empty', {
          [`theme--${status}`]: status
        }]
      }, [
        h('div', {
          class: 'vxe-empty--inner'
        }, [
          imageUrl
            ? h('div', {
              class: 'vxe-empty--img-wrapper'
            }, [
              h('img', {
                src: imageUrl,
                style: imageStyle
              })
            ])
            : h('div', {
              class: 'vxe-empty--icon-wrapper'
            }, [
              h('i', {
                class: icon || getIcon().EMPTY_DEFAULT
              })
            ]),
          h('div', {
            class: 'vxe-empty--content-wrapper'
          }, `${content || getI18n('vxe.empty.defText')}`)
        ])
      ])
    }

    $xeEmpty.renderVN = renderVN

    return $xeEmpty
  },
  render () {
    return this.renderVN()
  }
})
