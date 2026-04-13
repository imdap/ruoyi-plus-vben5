import { initMotion } from "./motion.js";
import { Keyframes } from "@antdv-next/cssinjs";

//#region src/style/motion/zoom.ts
const zoomIn = new Keyframes("antZoomIn", {
	"0%": {
		transform: "scale(0.2)",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		opacity: 1
	}
});
const zoomOut = new Keyframes("antZoomOut", {
	"0%": { transform: "scale(1)" },
	"100%": {
		transform: "scale(0.2)",
		opacity: 0
	}
});
const zoomBigIn = new Keyframes("antZoomBigIn", {
	"0%": {
		transform: "scale(0.8)",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		opacity: 1
	}
});
const zoomBigOut = new Keyframes("antZoomBigOut", {
	"0%": { transform: "scale(1)" },
	"100%": {
		transform: "scale(0.8)",
		opacity: 0
	}
});
const zoomUpIn = new Keyframes("antZoomUpIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "50% 0%"
	}
});
const zoomUpOut = new Keyframes("antZoomUpOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "50% 0%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 0%",
		opacity: 0
	}
});
const zoomLeftIn = new Keyframes("antZoomLeftIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "0% 50%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "0% 50%"
	}
});
const zoomLeftOut = new Keyframes("antZoomLeftOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "0% 50%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "0% 50%",
		opacity: 0
	}
});
const zoomRightIn = new Keyframes("antZoomRightIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "100% 50%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "100% 50%"
	}
});
const zoomRightOut = new Keyframes("antZoomRightOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "100% 50%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "100% 50%",
		opacity: 0
	}
});
const zoomDownIn = new Keyframes("antZoomDownIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 100%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "50% 100%"
	}
});
const zoomDownOut = new Keyframes("antZoomDownOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "50% 100%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 100%",
		opacity: 0
	}
});
const zoomMotion = {
	zoom: {
		inKeyframes: zoomIn,
		outKeyframes: zoomOut
	},
	"zoom-big": {
		inKeyframes: zoomBigIn,
		outKeyframes: zoomBigOut
	},
	"zoom-big-fast": {
		inKeyframes: zoomBigIn,
		outKeyframes: zoomBigOut
	},
	"zoom-left": {
		inKeyframes: zoomLeftIn,
		outKeyframes: zoomLeftOut
	},
	"zoom-right": {
		inKeyframes: zoomRightIn,
		outKeyframes: zoomRightOut
	},
	"zoom-up": {
		inKeyframes: zoomUpIn,
		outKeyframes: zoomUpOut
	},
	"zoom-down": {
		inKeyframes: zoomDownIn,
		outKeyframes: zoomDownOut
	}
};
function initZoomMotion(token, motionName) {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = zoomMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			transform: "scale(0)",
			opacity: 0,
			animationTimingFunction: token.motionEaseOutCirc,
			"&-prepare": { transform: "none" }
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInOutCirc }
	}];
}

//#endregion
export { initZoomMotion, zoomBigIn, zoomBigOut, zoomDownIn, zoomDownOut, zoomIn, zoomLeftIn, zoomLeftOut, zoomOut, zoomRightIn, zoomRightOut, zoomUpIn, zoomUpOut };