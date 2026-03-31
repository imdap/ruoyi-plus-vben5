/* eslint-disable @typescript-eslint/no-dynamic-delete */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const offlineIconList = [
  'eos-icons:system-group',
  'ant-design:user-outlined',
  'eos-icons:role-binding-outlined',
  'eos-icons:role-binding-outlined',
  'ic:sharp-menu',
  'mingcute:department-line',
  'icon-park-outline:appointment',
  'fluent-mdl2:dictionary',
  'ant-design:setting-outlined',
  'fe:notice-push',
  'material-symbols:logo-dev-outline',
  'solar:folder-with-files-outline',
  'ant-design:setting-outlined',
  'solar:monitor-smartphone-outline',
  'ph:users-light',
  'ph:user-list',
  'bx:package',
  'solar:monitor-camera-outline',
  'material-symbols:generating-tokens-outline',
  'devicon:redis-wordmark',
  'devicon:spring-wordmark',
  'ant-design:tool-outlined',
  'tabler:code',
  'tabler:code',
  'flat-color-icons:plus',
  'devicon:vscode',
  'lucide:table',
  'emojione:evergreen-tree',
  'fluent-mdl2:leave-user',
  'mdi:workflow-outline',
  'tabler:category-plus',
  'material-symbols:regular-expression-rounded',
  'fluent-mdl2:build-definition',
  'icon-park-outline:monitor',
  'fluent-mdl2:flow',
  'flat-color-icons:leave',
  'carbon:task-approved',
  'ic:round-launch',
  'ri:todo-line',
  'material-symbols:cloud-done-outline-rounded',
  'mdi:cc-outline',
  'arcticons:one-hand-operation',
  'streamline:interface-login-dial-pad-finger-password-dial-pad-dot-finger',
  'ri:instance-line',
  'skill-icons:java-light',
  'tabler:file-type-xml',
  'carbon:sql',
  'skill-icons:typescript',
  'logos:vue',
  'flat-color-icons:folder',
  // 其他需要离线的
  'ep:fold',
  'lucide:book-open-text',
  'lucide:copyright',
];

// Deduplicate list
const uniqueIcons = [...new Set(offlineIconList)];

const outputLines = [
  '// 该文件由脚本 generate-offline-icons.js 生成 ，不要手动修改',
  '// 该文件由脚本 generate-offline-icons.js 生成 ，不要手动修改',
  '// 该文件由脚本 generate-offline-icons.js 生成 ，不要手动修改',
  "import { addIcon } from '@vben-core/icons';",
  '',
];

const projectRoot = path.resolve(__dirname, '..');
const nodeModules = path.join(projectRoot, 'packages/icons', 'node_modules');

// Helper to find icon data
function getIconData(prefix, name) {
  const jsonPath = path.join(
    nodeModules,
    '@iconify/json/json',
    `${prefix}.json`,
  );
  if (!fs.existsSync(jsonPath)) {
    console.warn(`Warning: Icon set ${prefix} not found at ${jsonPath}`);
    return null;
  }

  const content = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(content);

  if (data.icons[name]) {
    return {
      ...data.icons[name],
      width: data.icons[name].width || data.width || 24,
      height: data.icons[name].height || data.height || 24,
    };
  }

  if (data.aliases && data.aliases[name]) {
    const alias = data.aliases[name];
    const parentName = alias.parent;
    const parentData = getIconData(prefix, parentName);
    if (parentData) {
      return {
        ...parentData,
        ...alias,
        // Remove alias specific fields if not needed, but they overwrite parent
      };
    }
  }

  console.warn(`Warning: Icon ${name} not found in ${prefix}`);
  return null;
}

uniqueIcons.forEach((iconStr) => {
  const [prefix, ...nameParts] = iconStr.split(':');
  const name = nameParts.join(':'); // In case name has colons, though unlikely in Iconify

  if (!prefix || !name) {
    console.warn(`Invalid icon format: ${iconStr}`);
    return;
  }

  const iconData = getIconData(prefix, name);
  if (iconData) {
    // Clean up data to be minimal
    const cleanData = {
      body: iconData.body,
      width: iconData.width,
      height: iconData.height,
      left: iconData.left,
      top: iconData.top,
      hFlip: iconData.hFlip,
      vFlip: iconData.vFlip,
      rotate: iconData.rotate,
    };
    // Remove undefined keys
    Object.keys(cleanData).forEach(
      (key) => cleanData[key] === undefined && delete cleanData[key],
    );

    outputLines.push(`addIcon('${iconStr}', ${JSON.stringify(cleanData)});`);
  }
});

const outputPath = path.join(
  projectRoot,
  'packages/icons/src/iconify-offline',
  'offline-icons.ts',
);
fs.writeFileSync(outputPath, `${outputLines.join('\n')}\n`);

console.log(`Successfully generated ${outputPath}`);
