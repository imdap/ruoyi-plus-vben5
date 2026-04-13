import Event from '../../event/Event.js';
import HTMLElement from '../html-element/HTMLElement.js';
import TimeRanges from './TimeRanges.js';
import DOMTokenList from '../../dom/DOMTokenList.js';
import type RemotePlayback from './RemotePlayback.js';
import MediaStream from './MediaStream.js';
import type TextTrackList from './TextTrackList.js';
import type TextTrack from './TextTrack.js';
import TextTrackKindEnum from './TextTrackKindEnum.js';
import * as PropertySymbol from '../../PropertySymbol.js';
interface IMediaError {
    code: number;
    message: string;
}
/**
 * HTML Media Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 *
 */
export default class HTMLMediaElement extends HTMLElement {
    cloneNode: (deep?: boolean) => HTMLMediaElement;
    [PropertySymbol.volume]: number;
    [PropertySymbol.paused]: boolean;
    [PropertySymbol.currentTime]: number;
    [PropertySymbol.playbackRate]: number;
    [PropertySymbol.defaultPlaybackRate]: number;
    [PropertySymbol.muted]: boolean;
    [PropertySymbol.defaultMuted]: boolean;
    [PropertySymbol.preservesPitch]: boolean;
    [PropertySymbol.buffered]: TimeRanges;
    [PropertySymbol.duration]: number;
    [PropertySymbol.error]: IMediaError | null;
    [PropertySymbol.ended]: boolean;
    [PropertySymbol.networkState]: number;
    [PropertySymbol.readyState]: number;
    [PropertySymbol.seeking]: boolean;
    [PropertySymbol.seekable]: TimeRanges;
    [PropertySymbol.sinkId]: string;
    [PropertySymbol.played]: TimeRanges;
    [PropertySymbol.remote]: RemotePlayback;
    [PropertySymbol.controlsList]: DOMTokenList | null;
    [PropertySymbol.mediaKeys]: object | null;
    [PropertySymbol.srcObject]: MediaStream | null;
    [PropertySymbol.textTracks]: TextTrack[];
    get onabort(): ((event: Event) => void) | null;
    set onabort(value: ((event: Event) => void) | null);
    get oncanplay(): ((event: Event) => void) | null;
    set oncanplay(value: ((event: Event) => void) | null);
    get oncanplaythrough(): ((event: Event) => void) | null;
    set oncanplaythrough(value: ((event: Event) => void) | null);
    get ondurationchange(): ((event: Event) => void) | null;
    set ondurationchange(value: ((event: Event) => void) | null);
    get onemptied(): ((event: Event) => void) | null;
    set onemptied(value: ((event: Event) => void) | null);
    get onended(): ((event: Event) => void) | null;
    set onended(value: ((event: Event) => void) | null);
    get onloadeddata(): ((event: Event) => void) | null;
    set onloadeddata(value: ((event: Event) => void) | null);
    get onloadedmetadata(): ((event: Event) => void) | null;
    set onloadedmetadata(value: ((event: Event) => void) | null);
    get onloadstart(): ((event: Event) => void) | null;
    set onloadstart(value: ((event: Event) => void) | null);
    get onpause(): ((event: Event) => void) | null;
    set onpause(value: ((event: Event) => void) | null);
    get onplay(): ((event: Event) => void) | null;
    set onplay(value: ((event: Event) => void) | null);
    get onplaying(): ((event: Event) => void) | null;
    set onplaying(value: ((event: Event) => void) | null);
    get onprogress(): ((event: Event) => void) | null;
    set onprogress(value: ((event: Event) => void) | null);
    get onratechange(): ((event: Event) => void) | null;
    set onratechange(value: ((event: Event) => void) | null);
    get onresize(): ((event: Event) => void) | null;
    set onresize(value: ((event: Event) => void) | null);
    get onseeked(): ((event: Event) => void) | null;
    set onseeked(value: ((event: Event) => void) | null);
    get onseeking(): ((event: Event) => void) | null;
    set onseeking(value: ((event: Event) => void) | null);
    get onstalled(): ((event: Event) => void) | null;
    set onstalled(value: ((event: Event) => void) | null);
    get onsuspend(): ((event: Event) => void) | null;
    set onsuspend(value: ((event: Event) => void) | null);
    get ontimeupdate(): ((event: Event) => void) | null;
    set ontimeupdate(value: ((event: Event) => void) | null);
    get onvolumechange(): ((event: Event) => void) | null;
    set onvolumechange(value: ((event: Event) => void) | null);
    get onwaiting(): ((event: Event) => void) | null;
    set onwaiting(value: ((event: Event) => void) | null);
    /**
     * Returns buffered.
     *
     * @returns Buffered.
     */
    get buffered(): TimeRanges;
    /**
     * Returns duration.
     *
     * @returns Duration.
     */
    get duration(): number;
    /**
     * Returns error.
     *
     * @returns Error.
     */
    get error(): IMediaError | null;
    /**
     * Returns ended.
     *
     * @returns Ended.
     */
    get ended(): boolean;
    /**
     * Returns networkState.
     *
     * @returns NetworkState.
     */
    get networkState(): number;
    /**
     * Returns readyState.
     *
     * @returns ReadyState.
     */
    get readyState(): number;
    /**
     * Return a RemotePlayback object instance associated with the media element.
     *
     * @returns RemotePlayback.
     */
    get remote(): RemotePlayback;
    /**
     * Returns seeking.
     *
     * @returns Seeking.
     */
    get seeking(): boolean;
    /**
     * Returns seekable.
     *
     * @returns Seekable.
     */
    get seekable(): TimeRanges;
    /**
     * Returns sinkId.
     *
     * @returns SinkId.
     */
    get sinkId(): string;
    /**
     * Returns played.
     *
     * @returns Played.
     */
    get played(): TimeRanges;
    /**
     * Returns autoplay.
     *
     * @returns Autoplay.
     */
    get autoplay(): boolean;
    /**
     * Sets autoplay.
     *
     * @param autoplay Autoplay.
     */
    set autoplay(autoplay: boolean);
    /**
     * Returns controls.
     *
     * @returns Controls.
     */
    get controls(): boolean;
    /**
     * Sets controls.
     *
     * @param controls Controls.
     */
    set controls(controls: boolean);
    /**
     * Returns loop.
     *
     * @returns Loop.
     */
    get loop(): boolean;
    /**
     * Sets loop.
     *
     * @param loop Loop.
     */
    set loop(loop: boolean);
    /**
     * Returns preload.
     *
     * @returns preload.
     */
    get preload(): string;
    /**
     * Sets preload.
     *
     * @param preload preload.
     */
    set preload(preload: string);
    /**
     * Returns src.
     *
     * @returns Src.
     */
    get src(): string;
    /**
     * Sets src.
     *
     * @param src Src.
     */
    set src(src: string);
    /**
     * Returns controlsList.
     *
     * @returns ControlsList.
     */
    get controlsList(): DOMTokenList;
    /**
     * Sets controlsList.
     *
     * @param value Value.
     */
    set controlsList(value: string);
    /**
     * Returns mediaKeys.
     *
     * @returns MediaKeys.
     */
    get mediaKeys(): object | null;
    /**
     * Returns muted.
     *
     * @returns Muted.
     */
    get muted(): boolean;
    /**
     * Sets muted.
     *
     * @param muted Muted.
     */
    set muted(muted: boolean);
    /**
     * Returns defaultMuted.
     *
     * @returns DefaultMuted.
     */
    get defaultMuted(): boolean;
    /**
     * Sets defaultMuted.
     *
     * @param defaultMuted DefaultMuted.
     */
    set defaultMuted(defaultMuted: boolean);
    /**
     * Returns disableRemotePlayback.
     *
     * @returns DisableRemotePlayback.
     */
    get disableRemotePlayback(): boolean;
    /**
     * Sets disableRemotePlayback.
     *
     * @param disableRemotePlayback DisableRemotePlayback.
     */
    set disableRemotePlayback(disableRemotePlayback: boolean);
    /**
     * A MediaStream representing the media to play or that has played in the current HTMLMediaElement, or null if not assigned.
     *
     * @returns MediaStream.
     */
    get srcObject(): MediaStream | null;
    /**
     * Sets src object.
     *
     * @param srcObject SrcObject.
     */
    set srcObject(srcObject: MediaStream | null);
    /**
     * Returns text track list.
     *
     * @returns Text track list.
     */
    get textTracks(): TextTrackList;
    /**
     * Returns currentSrc.
     *
     * @returns CurrentrSrc.
     */
    get currentSrc(): string;
    /**
     * Returns volume.
     *
     * @returns Volume.
     */
    get volume(): number;
    /**
     * Sets volume.
     *
     * @param volume Volume.
     */
    set volume(volume: number | string);
    /**
     * Returns crossOrigin.
     *
     * @returns CrossOrigin.
     */
    get crossOrigin(): string | null;
    /**
     * Sets crossOrigin.
     *
     * @param crossOrigin CrossOrigin.
     */
    set crossOrigin(crossOrigin: string);
    /**
     * Returns currentTime.
     *
     * @returns CurrentTime.
     */
    get currentTime(): number;
    /**
     * Sets currentTime.
     *
     * @param currentTime CurrentTime.
     */
    set currentTime(currentTime: number | string);
    /**
     * Returns playbackRate.
     *
     * @returns PlaybackRate.
     */
    get playbackRate(): number;
    /**
     * Sets playbackRate.
     *
     * @param playbackRate PlaybackRate.
     */
    set playbackRate(playbackRate: number | string);
    /**
     * Returns defaultPlaybackRate.
     *
     * @returns DefaultPlaybackRate.
     */
    get defaultPlaybackRate(): number;
    /**
     * Sets defaultPlaybackRate.
     *
     * @param defaultPlaybackRate DefaultPlaybackRate.
     */
    set defaultPlaybackRate(defaultPlaybackRate: number | string);
    /**
     * Returns preservesPitch.
     *
     * @returns PlaybackRate.
     */
    get preservesPitch(): boolean;
    /**
     * Sets preservesPitch.
     *
     * @param preservesPitch PreservesPitch.
     */
    set preservesPitch(preservesPitch: boolean);
    /**
     * Returns paused.
     *
     * @returns Paused.
     */
    get paused(): boolean;
    /**
     * @override
     */
    get tabIndex(): number;
    /**
     * @override
     */
    set tabIndex(tabIndex: number);
    /**
     * Adds a new text track to the media element.
     *
     * @param kind The kind of text track.
     * @param label The label of the text track.
     * @param language The language of the text track data.
     */
    addTextTrack(kind: TextTrackKindEnum, label?: string, language?: string): TextTrack;
    /**
     * Pause played media.
     */
    pause(): void;
    /**
     * Start playing media.
     */
    play(): Promise<void>;
    /**
     * Reports how likely it is that the current browser will be able to play media of a given MIME type.
     *
     * @param _type MIME type.
     * @returns Can play type.
     */
    canPlayType(_type: string): string;
    /**
     * Quickly seeks the media to the new time with precision tradeoff.
     *
     * @param _time Time.
     */
    fastSeek(_time: number): void;
    /**
     * Load media.
     */
    load(): void;
    /**
     * Sets media keys.
     *
     * @param mediaKeys MediaKeys.
     * @returns Promise.
     */
    setMediaKeys(mediaKeys: object | null): Promise<void>;
    /**
     * Sets sink id.
     *
     * @param sinkId SinkId.
     * @returns Promise.
     */
    setSinkId(sinkId: string): Promise<void>;
    /**
     * Returns MediaStream, captures a stream of the media content.
     *
     * @returns MediaStream.
     */
    captureStream(): MediaStream;
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep?: boolean): HTMLMediaElement;
}
export {};
//# sourceMappingURL=HTMLMediaElement.d.ts.map