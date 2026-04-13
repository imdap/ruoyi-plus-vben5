interface TouchObject {
    startX: number;
    startY: number;
    curX: number;
    curY: number;
    swipeLength?: number;
}
type SlickSpec = Record<string, any>;
export declare function clamp(number: number, lowerBound: number, upperBound: number): number;
export declare function safePreventDefault(event: any): void;
export declare function getOnDemandLazySlides(spec: SlickSpec): number[];
export declare function getRequiredLazySlides(spec: SlickSpec): number[];
export declare function lazyStartIndex(spec: SlickSpec): number;
export declare function lazyEndIndex(spec: SlickSpec): any;
export declare function lazySlidesOnLeft(spec: SlickSpec): number;
export declare function lazySlidesOnRight(spec: SlickSpec): any;
export declare const getWidth: (elem: any) => any;
export declare const getHeight: (elem: any) => any;
export declare function getSwipeDirection(touchObject: TouchObject, verticalSwiping?: boolean): "left" | "right" | "up" | "down" | "vertical";
export declare function canGoNext(spec: SlickSpec): boolean;
export declare function extractObject(spec: SlickSpec, keys: string[]): Record<string, any>;
export declare function initializedState(spec: SlickSpec): Record<string, any>;
export declare function slideHandler(spec: SlickSpec): {
    state?: undefined;
    nextState?: undefined;
} | {
    state: Record<string, any>;
    nextState: Record<string, any>;
};
export declare function changeSlide(spec: SlickSpec, options: any): number;
export declare function keyHandler(e: KeyboardEvent, accessibility?: boolean, rtl?: boolean): "" | "previous" | "next";
export declare function swipeStart(e: any, swipe?: boolean, draggable?: boolean): "" | {
    dragging: boolean;
    touchObject: {
        startX: any;
        startY: any;
        curX: any;
        curY: any;
    };
};
export declare function swipeMove(e: any, spec: SlickSpec): void | Record<string, any>;
export declare function swipeEnd(e: MouseEvent | TouchEvent, spec: SlickSpec): Record<string, any>;
export declare function getNavigableIndexes(spec: SlickSpec): number[];
export declare function checkNavigable(spec: SlickSpec, index: number): number;
export declare function getSlideCount(spec: SlickSpec): any;
export declare function checkSpecKeys(spec: SlickSpec, keysArray: string[]): void | null;
export declare function getTrackCSS(spec: SlickSpec): Record<string, any>;
export declare function getTrackAnimateCSS(spec: SlickSpec): Record<string, any>;
export declare function getTrackLeft(spec: SlickSpec): number;
export declare function getPreClones(spec: SlickSpec): any;
export declare function getPostClones(spec: SlickSpec): any;
export declare function getTotalSlides(spec: SlickSpec): any;
export declare function siblingDirection(spec: SlickSpec): "left" | "right";
export declare function slidesOnRight({ slidesToShow, centerMode, rtl, centerPadding, }: {
    slidesToShow: number;
    centerMode?: boolean;
    rtl?: boolean;
    centerPadding?: string;
}): number;
export declare function slidesOnLeft({ slidesToShow, centerMode, rtl, centerPadding, }: {
    slidesToShow: number;
    centerMode?: boolean;
    rtl?: boolean;
    centerPadding?: string;
}): number;
export declare function canUseDOM(): boolean;
export declare const validSettings: string[];
export declare function filterSettings(settings: Record<string, any>): Record<string, any>;
export {};
