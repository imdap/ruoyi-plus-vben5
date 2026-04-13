import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { QRCodeCanvas, QRCodeSVG } from '../src'

describe('qrcode render', () => {
  it('basic Render', () => {
    const wrapper = mount({
      render() {
        return <QRCodeCanvas value="https://www.baidu.com" />
      },
    })
    const wrapper2 = mount({
      render() {
        return <QRCodeSVG value="https://www.baidu.com" />
      },
    })
    expect(wrapper.find('canvas').exists()).toBe(true)
    expect(wrapper2.find('svg').exists()).toBe(true)
  })
})
