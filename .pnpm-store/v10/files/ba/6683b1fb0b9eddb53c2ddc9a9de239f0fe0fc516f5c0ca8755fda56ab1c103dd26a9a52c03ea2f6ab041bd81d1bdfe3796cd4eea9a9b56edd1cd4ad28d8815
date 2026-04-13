# Installation
> `npm install --save @types/nprogress`

# Summary
This package contains type definitions for nprogress (https://github.com/rstacruz/nprogress).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/nprogress.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/nprogress/index.d.ts)
````ts
declare namespace nProgress {
    interface NProgressOptions {
        minimum: number;
        template: string;
        easing: string;
        speed: number;
        trickle: boolean;
        trickleSpeed: number;
        showSpinner: boolean;
        parent: string;
        positionUsing: string;
        barSelector: string;
        spinnerSelector: string;
    }

    interface NProgress {
        version: string;
        settings: NProgressOptions;
        status: number | null;

        configure(options: Partial<NProgressOptions>): NProgress;
        set(number: number): NProgress;
        isStarted(): boolean;
        start(): NProgress;
        done(force?: boolean): NProgress;
        inc(amount?: number): NProgress;
        trickle(): NProgress;

        /* Internal */

        render(fromStart?: boolean): HTMLDivElement;
        remove(): void;
        isRendered(): boolean;
        getPositioningCSS(): "translate3d" | "translate" | "margin";
    }
}

declare const nProgress: nProgress.NProgress;
export = nProgress;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 09:09:39 GMT
 * Dependencies: none

# Credits
These definitions were written by [Judah Gabriel Himango](https://github.com/JudahGabriel), and [Ovyerus](https://github.com/Ovyerus).
