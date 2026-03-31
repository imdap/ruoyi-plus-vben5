import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * 为了防止有人看不懂 这里用各国语言加了注释
 *
 * !!! 更改配置后请清空缓存 localStorage
 * !!! Please clear the localStorage cache after changing the configuration
 * !!! 更改配置後請清空緩存 localStorage
 * !!! 設定を変更した後は、localStorageキャッシュをクリアしてください
 * !!! 구성을 변경한 후에는 localStorage 캐시를 지우십시오
 * !!! Por favor, borre la caché de localStorage después de cambiar la configuración
 * !!! Veuillez effacer le cache localStorage après avoir modifié la configuration
 * !!! Bitte leeren Sie den localStorage-Cache nach Änderung der Konfiguration
 * !!! Si prega di cancellare la cache di localStorage dopo aver modificato la configurazione
 * !!! Пожалуйста, очистите кэш localStorage после изменения конфигурации
 * !!! Por favor, limpe o cache do localStorage após alterar a configuração
 * !!! Vui lòng xóa bộ nhớ cache localStorage sau khi thay đổi cấu hình
 * !!! โปรดล้างแคช localStorage หลังจากเปลี่ยนการกำหนดค่า
 * !!! Harap bersihkan cache localStorage setelah mengubah konfigurasi
 * !!! يرجى مسح ذاكرة التخزين المؤقت localStorage بعد تغيير التكوين
 * !!! Yapılandırmayı değiştirdikten sonra lütfen localStorage önbelleğini temizleyin
 * !!! Wis de localStorage-cache na het wijzigen van de configuratie
 * !!! Proszę wyczyścić pamięć podręczną localStorage po zmianie konfiguracji
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    /**
     * antdv-next改为mix模式
     * - 后端路由 通过菜单管理进行配置
     * - 前端路由 直接在`apps/web-antd/src/router/routes/modules`新增文件并默认导出即可
     * 然后路由会进行合并
     */
    accessMode: 'mixed',
    /**
     * 不需要refresh token 由后端处理
     */
    enableRefreshToken: false,
    /**
     * 这里可以设置默认头像 url链接或vite导入的图片链接
     */
    // defaultAvatar: '',
    /**
     * 在这里设置应用标题
     */
    name: import.meta.env.VITE_APP_TITLE,
    /**
     * 不支持modal模式 需要改动的地方太多
     * 1. 正常重新登录后不会再触发接口请求 即触发登录超时的页面为空数据
     * 2. 切换租户登录后不会重新加载菜单
     */
    // loginExpiredMode: 'modal',
  },
  footer: {
    /**
     * 不显示footer
     */
    enable: false,
  },
  tabbar: {
    /**
     * 标签tab 持久化 关闭
     */
    persist: false,
    // styleType: 'card',
  },
  theme: {
    /** 默认主题模式 */
    mode: 'light',
    /**
     * 按钮水波纹样式
     */
    buttonWaveMode: 'Default',
    /**
     * 浅色sidebar
     */
    semiDarkSidebar: false,
    /**
     * 圆角大小 换算比例为1.6px = 0.1radius
     * 这里为6px 与antd保持一致
     */
    radius: '0.375',
    // 这些颜色和antd默认颜色保持一致 即hex -> hsl
    // 错误色
    colorDestructive: 'hsl(359, 100%, 65%)',
    // 主题色
    colorPrimary: 'hsl(215, 100%, 54%)',
    // 成功色
    colorSuccess: 'hsl(100, 77%, 44%)',
    // 警告色
    colorWarning: 'hsl(40, 96%, 53%)',
  },
  /**
   * !!! 更改配置后请清空浏览器缓存
   * 在这里更换logo
   * source可选值：
   * 1. 本地public目录下的图片 需要加上/ 比如：/logo.png
   * 2. 网络图片链接
   * 3. vite导入的图片 import xxx from 'xxx.png'
   *
   * !!! 更改配置后请清空浏览器缓存
   */
  // logo: {
  //   enable: true,
  //   source: '',
  // },
});
