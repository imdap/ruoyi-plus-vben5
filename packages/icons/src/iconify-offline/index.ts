import { createIconifyOfflineIcon } from '@vben-core/icons';

import dingdingFill from '@iconify/icons-ri/dingding-fill';
import giteeIcon from '@iconify/icons-simple-icons/gitee';

import './offline-icons';

// 第三方登录相关图标
export const DingdingIcon = createIconifyOfflineIcon(
  'ri:dingding-fill',
  dingdingFill,
);
export const GiteeIcon = createIconifyOfflineIcon(
  'simple-icons:gitee',
  giteeIcon,
);
