import getScrollBarSize from "../getScrollBarSize.js";
import setStyle_default from "../setStyle.js";
var uuid = 0;
var locks = [];
var scrollingEffectClassName = "ant-scrolling-effect";
var scrollingEffectClassNameReg = new RegExp(`${scrollingEffectClassName}`, "g");
var cacheStyle = /* @__PURE__ */ new Map();
var ScrollLocker = class {
	lockTarget;
	options;
	constructor(options) {
		this.lockTarget = uuid++;
		this.options = options;
	}
	getContainer = () => {
		return this.options?.container;
	};
	reLock = (options) => {
		const findLock = locks.find(({ target }) => target === this.lockTarget);
		if (findLock) this.unLock();
		this.options = options;
		if (findLock) {
			findLock.options = options;
			this.lock();
		}
	};
	lock = () => {
		if (locks.some(({ target }) => target === this.lockTarget)) return;
		if (locks.some(({ options }) => options?.container === this.options?.container)) {
			locks = [...locks, {
				target: this.lockTarget,
				options: this.options
			}];
			return;
		}
		let scrollBarSize = 0;
		const container = this.options?.container || document.body;
		if (container === document.body && window.innerWidth - document.documentElement.clientWidth > 0 || container.scrollHeight > container.clientHeight) {
			if (getComputedStyle(container).overflow !== "hidden") scrollBarSize = getScrollBarSize();
		}
		const containerClassName = container.className;
		if (locks.filter(({ options }) => options?.container === this.options?.container).length === 0) cacheStyle.set(container, setStyle_default({
			width: scrollBarSize !== 0 ? `calc(100% - ${scrollBarSize}px)` : void 0,
			overflow: "hidden",
			overflowX: "hidden",
			overflowY: "hidden"
		}, { element: container }));
		if (!scrollingEffectClassNameReg.test(containerClassName)) container.className = `${containerClassName} ${scrollingEffectClassName}`.trim();
		locks = [...locks, {
			target: this.lockTarget,
			options: this.options
		}];
	};
	unLock = () => {
		const findLock = locks.find(({ target }) => target === this.lockTarget);
		locks = locks.filter(({ target }) => target !== this.lockTarget);
		if (!findLock || locks.some(({ options }) => options?.container === findLock.options?.container)) return;
		const container = this.options?.container || document.body;
		const containerClassName = container.className;
		if (!scrollingEffectClassNameReg.test(containerClassName)) return;
		setStyle_default(cacheStyle.get(container), { element: container });
		cacheStyle.delete(container);
		container.className = container.className.replace(scrollingEffectClassNameReg, "").trim();
	};
};
export { ScrollLocker as default };
