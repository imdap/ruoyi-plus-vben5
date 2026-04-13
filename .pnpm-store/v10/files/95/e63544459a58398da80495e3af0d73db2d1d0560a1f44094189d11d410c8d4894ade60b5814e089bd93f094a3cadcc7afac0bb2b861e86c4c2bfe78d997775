import { VxeUI } from '../../ui';
import { tableProps } from '../../table/src/props';
const { getConfig } = VxeUI;
export const gridProps = Object.assign(Object.assign({}, tableProps), { layouts: Array, columns: Array, pagerConfig: Object, proxyConfig: Object, toolbarConfig: Object, formConfig: Object, zoomConfig: Object, size: {
        type: String,
        default: () => getConfig().grid.size || getConfig().size
    } });
