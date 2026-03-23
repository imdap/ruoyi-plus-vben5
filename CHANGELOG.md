# 1.5.4

对应后端版本 单体/微服务: 5.5.3/2.5.3(向后兼容5.5.x版本)

全是纯前端更新 没有后端功能变动

**重要**

由于更后面的官方提交将tailwind3升到到了4 故不再进行合并 当然你可以手动合并

此版本作为v1的latest进行归档

# 1.5.3

对应后端版本 单体/微服务: 5.5.3/2.5.3(向后兼容5.5.x版本)

全是纯前端更新 没有后端功能变动

**REFACTOR**

- 使用antd组件替换密码登录表单

**FEATURES**

- 合并官方更新 将Radix(v1)替换为Reka UI(v2)

# 1.5.2

对应后端版本 单体/微服务: 5.5.1/2.5.1

该版本后端功能值包含一个`同步租户参数配置`功能 旧版本也能升级(使用)

**REFACTOR**

- 流程相关代码重构 移除之前的历史代码

**FEATURES**

- 修改流程变量
- 租户管理 同步租户参数配置

**BUG FIX**

- 菜单管理 新增没有加载下拉选择api
- v-access:role指令错误判断code而非role
- modal/drawer里使用列配置 重置列弹窗被遮挡

# 1.5.1

对应后端版本 单体/微服务: 5.5.0/2.5.0

**STYLE**

- 拖拽列宽时的颜色与primary保持一致

**OTHERS**

- 调整不同环境打包命令 兼容windows系统

# 1.5.0

对应后端版本 单体/微服务: 5.5.0/2.5.0

**FEATURES**

- 流程表达式 follow后端更新
- websocket功能(默认关闭)
- useVbenForm 增加 TimeRangePicker(时间区间选择) 组件
- 字典(DictTag)支持fallback属性(未匹配到字典项时的回显)
- 微服务版本 logout接口在配置错误的情况返回401的提示(解决死循环调用logout接口)
- Tinymce 保存图片id 提供`contentWithOssIdTransform`来显示私有桶图片
- Vxe/Antd可编辑表格适配器(样式等) 解决浮层元素点击与失焦冲突导致无法选中的问题
- 工作流 后端发起流程demo
- API加密 前端已经实现RSA/SM2 AES/SM4
- Tinymce升级到7.9.1(v7版本的latest)

**REFACTOR**

- 流程表单详情重构 使用映射组件方案替代iframe显示 加载速度更快
- Modal/Drawer中使用VxeTable tooltip需要设置更高的z-index 防止被遮挡
- 字典(DictTag)使用tsx写法重构
- 请假申请 按钮区域重构
- oss下载 重构为浏览器原生下载(非阻塞)
- 流程相关样式更新
- 请假申请 表单更改为drawer方式 替换新页面打开
- API加密 迁移到@vben/utils下
- 菜单管理 改为节点懒加载(去除展开全部功能) 关闭虚拟滚动(可自行开启)

**OTHERS**

- 移除`getDict`方法 & getDictOptions代码修改(逻辑不变)
- 在`isTransformResponse`场景下对401的校验

**BUG FIX**

- 解决热更新Cannot read properties of null (reading 'nextSibling')报错
- OAuth登录 菜单打开后会折叠一次(路由重复跳转导致)

# 1.4.1

对应后端版本 单体/微服务: 5.4.1/2.4.1

**FEATURES**

- Tinymce添加在antd原生表单/useVbenForm下的校验样式
- useVbenForm 增加 Cascader(级联选择器) 组件

**BUG FIX**

- 菜单管理 路由地址的必填项不生效
- withDefaultPlaceholder中placeholder 在keepalive & 语言切换 & tab切换 显示不变的问题

**REFACTOR**

- 字典接口抛出异常(为什么会抛出异常?)无限调用接口 兼容处理
- 代码生成 字典下拉加载 改为每次进入编辑页面都加载
- ~~个人中心 账号绑定 样式/逻辑重构~~(回滚了 既要又要的问题)
- ~~个人中心 下拉卡片 昵称超长省略显示~~(回滚了 既要又要的问题)

# 1.4.0

**FEATURES**

- 菜单管理(通用方法) 保存表格滚动/展开状态并执行回调 用于树表在执行 新增/编辑/删除等操作后 依然在当前位置(体验优化)
-
- 菜单管理 级联删除 删除菜单和children

**REFACTOR**

- 除个人中心外所有本地路由改为从后端返回(需要执行更新sql)
- 流程图预览改为logicflow预览而非图片 ...然后后端又更新了 又改成iframe了
- 菜单管理 新增角色校验(与后端权限保持一致) 只有superadmin可进行增删改

# 1.3.6

**BUG FIX**

- oss配置switch切换 导致报错`存储类型找不到`
- 文件上传无法正确清除(innerList)

# 1.3.5

**BUG FIX**

- 某些带Vxe表格弹窗 关闭后没有正常清理表格数据的问题

# 1.3.4

**BUG FIX**

- 文件上传多次触发导致数据不一致 https://gitee.com/dapppp/ruoyi-plus-vben5/issues/IC3BK6

**PREFORMANCE**

- 浏览器返回按钮/手势操作时 弹窗不会被关闭(keepAlive导致)

# 1.3.3

**BUG FIX**

- 工作流list展示在开启缩放会有误差导致触底逻辑不会触发

**OTHER**

- 代码生成预览对模板的提示...（下载都懒得点一下吗）

# 1.3.2

**REFACTOR**

- 所有表格操作列宽度调整为'auto', 这样会根据子元素宽度适配(比如没有分配权限的情况)
- 菜单图标更新了一部分 sql同步更新

**OTHER**

- 暂时锁死vite依赖 i18n会报错

# 1.3.1

**REFACTOR**

- 所有Modal/Drawer表单关闭前会进行表单数据对比来弹出提示框
- 字典项颜色选择从`原生input type=color`改为`vue3-colorpicker`组件
- 全局Header: ClientID 更改大小写 [spring的问题导致](https://gitee.com/dapppp/ruoyi-plus-vben5/issues/IC0BDS)

**BUG FIX**

- getVxePopupContainer逻辑调整 解决表格固定高度展开不全的问题

**FEATURES**

- 字典渲染支持loading(length为0情况)

**OTHERS**

- useForm的组件改为异步导入(官方更新) bootstrap.js体积从2M降到600K 首屏加载速度提升

# 1.3.0

注意: 如果你使用老版本的`文件上传`/`图片上传` 可暂时使用

- `component: 'ImageUploadOld'`
- `component: 'FileUploadOld'`

代替 **建议替换为新版本**

大致变动:

- `accept string[] -> string`
- `resultField 已经移除 统一使用ossId`
- `maxNumber -> maxCount`

具体参数查看: `apps/web-antd/src/components/upload/src/props.d.ts`

不再推荐使用useDescription, 这个版本会标记为@deprecated, 下个次版本将会移除

框架所有使用useDescription组件的会替换为原生(TODO)

**REFACTOR**

- **文件上传/图片上传重构(破坏性更新 不兼容之前的api)**
- **文件上传/图片上传不再支持url用法 强制使用ossId**
- TableSwitch组件重构
- 管理员租户切换不再返回首页 直接刷新当前页(除特殊页面外会回到首页)
- 租户切换Select增加loading
- ~~modalLoading/drawerLoading改为调用内部的lock/unlock方法~~ 有待商榷暂时按老版本逻辑不变
- 登录验证码 增加loading
- DictEnum使用const代替enum
- TinyMCE组件重构 移除冗余代码/功能 增加loading

**ALPHA功能**

- 弹窗表单数据更改关闭时的提示框(可能最终不会加入) 测试页面: 参数管理

**BUG FIX**

- 重新登录 字典会unknown的情况[详细分析](https://gitee.com/dapppp/ruoyi-plus-vben5/issues/IBY27D)
- 测试菜单 请假申请 选中删除 需要根据状态判断
- 修复文件/图片在Safari中无法上传 file-type库与Safari不兼容导致
- 头像裁剪 图片加载失败一直处于loading无法上传
- 头像裁剪 私有桶会拼接timestamp参数导致sign计算异常无法上传 感谢cropperjs作者 https://github.com/fengyuanchen/cropperjs/issues/1230
- 租户选择下拉框会跟随body滚动(将下拉框样式的默认absolute改为fixed)

**OTHER**

- 字典管理 字典类型 表格选中行增加bold效果
- 全局圆角修改 与antd保持一致
- vditor(Markdown)升级3.10.9
- 老版本的文件/图片上传将于下个版本移除
- useDescription将于下个版本移除
- getVxePopupContainer与新版Vxe不兼容 先返回body(会导致滚动不跟随)后续版本再优化

# 1.2.3

**BUG FIX**

- `withDefaultPlaceholder`中将`placeholder`修改为computed, 解决后续使用`updateSchema`无法正常更新显示placeholder(响应式问题)

- 流程定义 修改accept类型 解决无法拖拽上传

**FEATURES**

- 增加`环境变量`打包配置demo -> build:antd:test
- 角色管理 勾选权限组件添加对错误用法的校验提示

**REFACTOR**

- OAuth内部逻辑重构 增加新的默认OAuth登录方式
- 重构部分setup组件为setup语法糖形式

# 1.2.2

**FEATURES**

- 代码生成支持路径方式生成
- 代码生成 支持选择表单生成类型(需要模板支持)
- 工作流 支持按钮权限

# 1.2.1

# BUG FIXES

- 客户端管理 错误的status disabled
- modal/drawer升级后zIndex(2000)会遮挡Tinymce的下拉框zIndex(1300)

# 1.2.0

**REFACTOR**

- 菜单选择组件重构为Table形式
- 字典相关功能重构 采用一个Map储存字典(之前为两个Map)
- 代码生成配置页面重构 去除步骤条

**Features**

- 对接后端工作流
- ~~通用的vxe-table排序事件(排序逻辑改为在排序事件中处理而非在api处理)~~
- getDict/getDictOptions 提取公共逻辑 减少冗余代码
- 字典新增对Number类型的支持 -> `getDictOptions('', true);`即可获取number类型的value
- 文件上传 增加上传进度条 下方上传提示
- 图片上传 增加上传进度条 下方上传提示
- oss下载进度提示

**BUG FIXES**

- 字典项为空时getDict方法无限调用接口(无奈兼容 不给字典item本来就是错误用法)
- 表格排序翻页会丢失排序参数
- 下载文件时(responseType === 'blob')需要判断下载失败(返回json而非二进制)的情况
- requestClient缺失i18n内容

**OTHERS**

- 用户管理 新增只获取一次(mounted)默认密码而非每次打开modal都获取
- `apps/web-antd/src/utils/dict.ts` `getDict`方法将于下个版本删除 使用`getDictOptions`替代
- VxeTable升级V4.10.0
- 移除`@deprecated` `apps/web-antd/src/adapter/vxe-table.ts`的`tableCheckboxEvent`方法
- 移除`由于更新方案弃用的` `apps/web-antd/src/adapter/vxe-table.ts`的`vxeSortEvent`方法
- 移除apps下的ele和naive目录

# 1.1.3

**REFACTOR**

- 重构: 判断vxe-table的复选框是否选中

**Bug Fixes**

- 节点树在编辑 & 空数组(不勾选)情况 勾选节点会造成watch延迟触发 导致会带上父节点id造成id重复
- 节点树在节点独立情况下的控制台warning: Invalid prop: type check failed for prop "value". Expected Array, got Object

**Others**

- 角色管理 优化Drawer布局
- unplugin-vue-components插件(默认未开启) 需要排除Button组件 全局已经默认导入了

**BUG FIXES**

- 操作日志详情 在description组件中json预览样式异常
- 微服务版本 区间查询和中文搜索条件一起使用 无法正确查询

# 1.1.2

**Features**

- Options转Enum工具函数

**OTHERS**

- 菜单管理 改为虚拟滚动
- 移除requestClient的一些冗余参数
- 主动退出登录(右上角个人选项)不需要带跳转地址

**BUG FIXES**

- 语言 漏加Content-Language请求头
- 用户管理/岗位管理 左边部门树错误emit导致会调用两次列表api

# 1.1.1

**REFACTOR**

- 使用VxeTable重构OAuth账号绑定列表(替代antdv的Table)
- commonDownloadExcel方法 支持处理区间选择器字段导出excel

**BUG FIXES**

- 修复在Modal/Drawer中使用VxeTable时, 第二次打开表单参数依旧为第一次提交的参数

**OTHERS**

- 废弃downloadExcel方法 统一使用commonDownloadExcel方法

# 1.1.0

**FEATURES**

- 支持离线图标功能(全局可在内网环境中使用)

**BUG FIXES**

- 在VxeTable固定列时, getPopupContainer会导致宽度不够, 弹出层样式异常 解决办法(将弹窗元素挂载到VXe滚动容器上)

**OTHERS**

- 代码生成 - 字段信息修改 改为minWidth 防止在高分辨率屏幕出现空白

# 1.0.0

**FEATURES**

- 用户管理 新增从参数取默认密码
- 全局表格加上id 方便进行缓存列排序的操作
- 支持菜单名称i18n
- 登录页 验证码登录
- Markdown编辑/预览组件(基于vditor)
- VxeTable搜索表单 enter提交

**BUG FIXES**

- 登录页面 关闭租户后下拉框没有正常隐藏
- 字典管理 关闭租户不应显示`同步租户字典`按钮
- 登录日志 漏掉了登录日志日期查询
- 登出相关逻辑在并发(非await)情况下重复执行的问题
- VxeTable在开启/关闭查询表单时 需要使用不同的padding
- VxeTable表格刷新 默认为reload 修改为在当前页刷新(query)
- 岗位管理 部门参数错误
- 角色管理 菜单分配 节点独立下的回显及提交问题
- 租户管理 套餐管理 回显时候`已选中节点`数量为0
- 用户管理 更新用户时打开drawer需要加载该部门下的岗位信息

**OTHERS**

- 登录页 租户选择框浮层固定高度[256px] 超过高度自动滚动
- 表单的Label默认方向改为`top` 支持\n换行
- 所有表格的搜索加上allowClear属性 支持清除
- vxe表格loading 只加载表格 不加载上面的表单

# 1.0.0-beta (2024-10-8)

**FEATURES**

- 基础功能已经开发完毕
- 工作流相关模块等待后端重构后开发
