import { initMotion } from "./motion.js";
import { Keyframes } from "@antdv-next/cssinjs";

//#region src/style/motion/move.ts
const moveDownIn = new Keyframes("antMoveDownIn", {
	"0%": {
		transform: "translate3d(0, 100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
const moveDownOut = new Keyframes("antMoveDownOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(0, 100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
const moveLeftIn = new Keyframes("antMoveLeftIn", {
	"0%": {
		transform: "translate3d(-100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
const moveLeftOut = new Keyframes("antMoveLeftOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(-100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
const moveRightIn = new Keyframes("antMoveRightIn", {
	"0%": {
		transform: "translate3d(100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
const moveRightOut = new Keyframes("antMoveRightOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
const moveUpIn = new Keyframes("antMoveUpIn", {
	"0%": {
		transform: "translate3d(0, -100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
const moveUpOut = new Keyframes("antMoveUpOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(0, -100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
const moveMotion = {
	"move-up": {
		inKeyframes: moveUpIn,
		outKeyframes: moveUpOut
	},
	"move-down": {
		inKeyframes: moveDownIn,
		outKeyframes: moveDownOut
	},
	"move-left": {
		inKeyframes: moveLeftIn,
		outKeyframes: moveLeftOut
	},
	"move-right": {
		inKeyframes: moveRightIn,
		outKeyframes: moveRightOut
	}
};
function initMoveMotion(token, motionName) {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = moveMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: token.motionEaseOutCirc
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInOutCirc }
	}];
}

//#endregion
export { initMoveMotion, moveDownIn, moveDownOut, moveLeftIn, moveLeftOut, moveRightIn, moveRightOut, moveUpIn, moveUpOut };