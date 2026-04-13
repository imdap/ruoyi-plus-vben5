Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
function useOffset(min, max, step, markList, allowCross, pushable) {
	const formatRangeValue = (val) => Math.max(min.value, Math.min(max.value, val));
	const formatStepValue = (val) => {
		if (step.value !== null) {
			const stepValue = min.value + Math.round((formatRangeValue(val) - min.value) / step.value) * step.value;
			const getDecimal = (num) => (String(num).split(".")[1] || "").length;
			const maxDecimal = Math.max(getDecimal(step.value), getDecimal(max.value), getDecimal(min.value));
			const fixedValue = Number(stepValue.toFixed(maxDecimal));
			return min.value <= fixedValue && fixedValue <= max.value ? fixedValue : null;
		}
		return null;
	};
	const formatValue = (val) => {
		const formatNextValue = formatRangeValue(val);
		const alignValues = markList.value.map((mark) => mark && mark.value);
		if (step.value !== null) {
			const stepValue = formatStepValue(val);
			if (stepValue !== null) alignValues.push(stepValue);
		}
		alignValues.push(min.value, max.value);
		let closeValue = alignValues[0];
		let closeDist = max.value - min.value;
		alignValues.forEach((alignValue) => {
			const dist = Math.abs(formatNextValue - alignValue);
			if (dist <= closeDist) {
				closeValue = alignValue;
				closeDist = dist;
			}
		});
		return closeValue;
	};
	const offsetValue = (values, offset, valueIndex, mode = "unit") => {
		if (typeof offset === "number") {
			let nextValue;
			const originValue = values[valueIndex];
			const targetDistValue = originValue + offset;
			let potentialValues = [];
			markList.value.forEach((mark) => {
				potentialValues.push(mark.value);
			});
			potentialValues.push(min.value, max.value);
			const originStepValue = formatStepValue(originValue);
			if (originStepValue !== null) potentialValues.push(originStepValue);
			const sign = offset > 0 ? 1 : -1;
			if (mode === "unit") {
				if (step.value !== null) {
					const allStepValues = formatStepValue(originValue + sign * step.value);
					if (allStepValues !== null) potentialValues.push(allStepValues);
				}
			} else if (step.value !== null) {
				const targetStepValue = formatStepValue(targetDistValue);
				if (targetStepValue !== null) potentialValues.push(targetStepValue);
			}
			potentialValues = potentialValues.filter((val) => val !== null).filter((val) => offset < 0 ? val <= originValue : val >= originValue);
			if (mode === "unit") potentialValues = potentialValues.filter((val) => val !== originValue);
			const compareValue = mode === "unit" ? originValue : targetDistValue;
			nextValue = potentialValues[0];
			let valueDist = Math.abs(nextValue - compareValue);
			potentialValues.forEach((potentialValue) => {
				const dist = Math.abs(potentialValue - compareValue);
				if (dist < valueDist) {
					nextValue = potentialValue;
					valueDist = dist;
				}
			});
			if (nextValue === void 0) return offset < 0 ? min.value : max.value;
			if (mode === "dist") return nextValue;
			if (Math.abs(offset) > 1) {
				const cloneValues = [...values];
				cloneValues[valueIndex] = nextValue;
				return offsetValue(cloneValues, offset - sign, valueIndex, mode);
			}
			return nextValue;
		}
		if (offset === "min") return min.value;
		if (offset === "max") return max.value;
		return values[valueIndex];
	};
	const offsetChangedValue = (values, offset, valueIndex, mode = "unit") => {
		const originValue = values[valueIndex];
		const nextValue = offsetValue(values, offset, valueIndex, mode);
		return {
			value: nextValue,
			changed: nextValue !== originValue
		};
	};
	const needPush = (dist) => {
		return pushable.value === null && dist === 0 || typeof pushable.value === "number" && dist < pushable.value;
	};
	const offsetValues = (values, offset, valueIndex, mode = "unit") => {
		const nextValues = values.map(formatValue);
		const originValue = nextValues[valueIndex];
		nextValues[valueIndex] = offsetValue(nextValues, offset, valueIndex, mode);
		if (!allowCross.value) {
			const pushNum = pushable.value || 0;
			if (valueIndex > 0 && nextValues[valueIndex - 1] !== originValue) nextValues[valueIndex] = Math.max(nextValues[valueIndex], nextValues[valueIndex - 1] + pushNum);
			if (valueIndex < nextValues.length - 1 && nextValues[valueIndex + 1] !== originValue) nextValues[valueIndex] = Math.min(nextValues[valueIndex], nextValues[valueIndex + 1] - pushNum);
		} else if (typeof pushable.value === "number" || pushable.value === null) {
			for (let i = valueIndex + 1; i < nextValues.length; i += 1) {
				let changed = true;
				while (needPush(nextValues[i] - nextValues[i - 1]) && changed) ({value: nextValues[i], changed} = offsetChangedValue(nextValues, 1, i));
			}
			for (let i = valueIndex; i > 0; i -= 1) {
				let changed = true;
				while (needPush(nextValues[i] - nextValues[i - 1]) && changed) ({value: nextValues[i - 1], changed} = offsetChangedValue(nextValues, -1, i - 1));
			}
			for (let i = nextValues.length - 1; i > 0; i -= 1) {
				let changed = true;
				while (needPush(nextValues[i] - nextValues[i - 1]) && changed) ({value: nextValues[i - 1], changed} = offsetChangedValue(nextValues, -1, i - 1));
			}
			for (let i = 0; i < nextValues.length - 1; i += 1) {
				let changed = true;
				while (needPush(nextValues[i + 1] - nextValues[i]) && changed) ({value: nextValues[i + 1], changed} = offsetChangedValue(nextValues, 1, i + 1));
			}
		}
		return {
			value: nextValues[valueIndex],
			values: nextValues
		};
	};
	return [formatValue, offsetValues];
}
exports.default = useOffset;
