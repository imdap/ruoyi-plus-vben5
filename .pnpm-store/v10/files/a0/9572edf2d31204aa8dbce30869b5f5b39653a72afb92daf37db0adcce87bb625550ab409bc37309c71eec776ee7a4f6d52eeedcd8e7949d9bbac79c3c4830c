import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { Locale } from "../locale/index.js";
import { ComponentBaseProps } from "../config-provider/context.js";
import { CSSProperties } from "vue";
import { QRProps } from "@v-c/qrcode";

//#region src/qrcode/interface.d.ts
type QRStatus = 'active' | 'expired' | 'loading' | 'scanned';
interface StatusRenderInfo {
  status: Exclude<QRStatus, 'active'>;
  locale: Locale['QRCode'];
  onRefresh?: () => void;
}
type ImageSettings = QRProps['imageSettings'];
type QRPropsCanvas = QRProps;
type QRPropsSvg = QRProps;
type QRCodeSemanticName = keyof QRCodeSemanticClassNames & keyof QRCodeSemanticStyles;
interface QRCodeSemanticClassNames {
  root?: string;
  cover?: string;
}
interface QRCodeSemanticStyles {
  root?: CSSProperties;
  cover?: CSSProperties;
}
type QRCodeClassNamesType = SemanticClassNamesType<QRCodeProps, QRCodeSemanticClassNames>;
type QRCodeStylesType = SemanticStylesType<QRCodeProps, QRCodeSemanticStyles>;
interface QRCodeProps extends QRProps, ComponentBaseProps {
  type?: 'canvas' | 'svg';
  icon?: string;
  iconSize?: number | {
    width: number;
    height: number;
  };
  bordered?: boolean;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  status?: QRStatus;
  statusRender?: (info: StatusRenderInfo) => any;
  color?: any;
  classes?: QRCodeClassNamesType;
  styles?: QRCodeStylesType;
}
interface QRCodeSlots {
  statusRender?: (info: StatusRenderInfo) => any;
}
interface QRCodeEmits {
  refresh: () => void;
}
//#endregion
export { type ImageSettings, QRCodeClassNamesType, QRCodeEmits, QRCodeProps, QRCodeSemanticClassNames, QRCodeSemanticName, QRCodeSemanticStyles, QRCodeSlots, QRCodeStylesType, type QRProps, QRPropsCanvas, QRPropsSvg, QRStatus, StatusRenderInfo };