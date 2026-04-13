import { EventInfo } from './types';
export type EventListenerWithPointInfo = (e: PointerEvent, info: EventInfo) => void;
export declare function extractEventInfo(event: PointerEvent, pointType?: 'page' | 'client'): EventInfo;
export declare function addPointerInfo(handler: EventListenerWithPointInfo): EventListener;
