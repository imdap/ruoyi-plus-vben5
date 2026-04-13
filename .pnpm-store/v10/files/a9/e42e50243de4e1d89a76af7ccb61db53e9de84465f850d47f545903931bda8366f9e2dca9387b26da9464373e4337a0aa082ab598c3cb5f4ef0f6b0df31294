import { CSSProperties } from 'vue';
import { TransformType } from '../hooks/useImageTransform.ts';
import { ImgInfo } from '../Image.tsx';
import { Actions, PreviewProps } from './index.tsx';
export type FooterSemanticName = 'footer' | 'actions';
export interface FooterProps extends Actions {
    prefixCls: string;
    showProgress: boolean;
    countRender?: PreviewProps['countRender'];
    actionsRender?: PreviewProps['actionsRender'];
    current: number;
    count: number;
    showSwitch: boolean;
    icons: PreviewProps['icons'];
    scale: number;
    minScale: number;
    maxScale: number;
    image: ImgInfo;
    transform: TransformType;
    classNames: Record<string, string | undefined>;
    styles: Record<string, CSSProperties | undefined>;
}
declare const Footer: import('vue').DefineSetupFnComponent<FooterProps, {}, {}, FooterProps & {}, import('vue').PublicProps>;
export default Footer;
