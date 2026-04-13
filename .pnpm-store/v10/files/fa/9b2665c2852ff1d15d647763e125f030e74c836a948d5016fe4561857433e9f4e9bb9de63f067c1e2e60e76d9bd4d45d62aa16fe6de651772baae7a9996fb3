import { toFileDirURL, toFileURL } from '@cspell/url';
export class CwdUrlResolver {
    #lastPath;
    #lastUrl;
    #cwd;
    #cwdUrl;
    constructor() {
        this.#cwd = process.cwd();
        this.#cwdUrl = toFileDirURL(this.#cwd);
        this.#lastPath = this.#cwd;
        this.#lastUrl = this.#cwdUrl;
    }
    resolveUrl(path) {
        path = path || this.#cwd;
        if (path === this.#lastPath)
            return this.#lastUrl;
        if (path === this.#cwd)
            return this.#cwdUrl;
        this.#lastPath = path;
        this.#lastUrl = toFileURL(path);
        return this.#lastUrl;
    }
    reset(cwd = process.cwd()) {
        this.#cwd = cwd;
        this.#cwdUrl = toFileDirURL(this.#cwd);
    }
}
//# sourceMappingURL=resolveCwd.js.map