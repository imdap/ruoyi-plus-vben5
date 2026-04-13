import { Ref } from 'vue';
export type ImageStatus = 'normal' | 'error' | 'loading';
export default function useStatus(options: {
    src: Ref<string | undefined>;
    isCustomPlaceholder?: Ref<boolean>;
    fallback?: Ref<string | undefined>;
}): readonly [(img?: HTMLImageElement | null) => void, import('vue').ComputedRef<{
    src: string;
    onLoad?: undefined;
} | {
    onLoad: () => void;
    src: string | undefined;
}>, import('vue').ShallowRef<ImageStatus, ImageStatus>];
