import { leftPad } from "../utils/miscUtil.js";
import { computed } from "vue";
import { warning } from "@v-c/util";
function emptyDisabled() {
	return [];
}
function generateUnits(start, end, step = 1, hideDisabledOptions = false, disabledUnits = [], pad = 2) {
	const units = [];
	const integerStep = step >= 1 ? step | 0 : 1;
	for (let i = start; i <= end; i += integerStep) {
		const disabled = disabledUnits.includes(i);
		if (!disabled || !hideDisabledOptions) units.push({
			label: leftPad(i, pad),
			value: i,
			disabled
		});
	}
	return units;
}
function useTimeInfo(generateConfig, props, date) {
	const mergedDate = computed(() => date?.value || generateConfig.value.getNow());
	if (process.env.NODE_ENV !== "production") {
		const p = props?.value || {};
		const isHourStepValid = 24 % (p.hourStep ?? 1) === 0;
		const isMinuteStepValid = 60 % (p.minuteStep ?? 1) === 0;
		const isSecondStepValid = 60 % (p.secondStep ?? 1) === 0;
		warning(isHourStepValid, `\`hourStep\` ${p.hourStep ?? 1} is invalid. It should be a factor of 24.`);
		warning(isMinuteStepValid, `\`minuteStep\` ${p.minuteStep ?? 1} is invalid. It should be a factor of 60.`);
		warning(isSecondStepValid, `\`secondStep\` ${p.secondStep ?? 1} is invalid. It should be a factor of 60.`);
	}
	const getDisabledTimes = (targetDate) => {
		const p = props?.value || {};
		const disabledConfig = p.disabledTime?.(targetDate) || {};
		return [
			disabledConfig.disabledHours || p.disabledHours || emptyDisabled,
			disabledConfig.disabledMinutes || p.disabledMinutes || emptyDisabled,
			disabledConfig.disabledSeconds || p.disabledSeconds || emptyDisabled,
			disabledConfig.disabledMilliseconds || emptyDisabled
		];
	};
	const getAllUnits = (getDisabledHours, getDisabledMinutes, getDisabledSeconds, getDisabledMilliseconds) => {
		const p = props?.value || {};
		const hours = generateUnits(0, 23, p.hourStep ?? 1, !!p.hideDisabledOptions, getDisabledHours?.());
		const rowHourUnits$1 = p.use12Hours ? hours.map((unit) => ({
			...unit,
			label: leftPad(unit.value % 12 || 12, 2)
		})) : hours;
		const getMinuteUnits = (nextHour) => generateUnits(0, 59, p.minuteStep ?? 1, !!p.hideDisabledOptions, getDisabledMinutes?.(nextHour));
		const getSecondUnits = (nextHour, nextMinute) => generateUnits(0, 59, p.secondStep ?? 1, !!p.hideDisabledOptions, getDisabledSeconds?.(nextHour, nextMinute));
		const getMillisecondUnits = (nextHour, nextMinute, nextSecond) => generateUnits(0, 999, p.millisecondStep ?? 100, !!p.hideDisabledOptions, getDisabledMilliseconds?.(nextHour, nextMinute, nextSecond), 3);
		return [
			rowHourUnits$1,
			getMinuteUnits,
			getSecondUnits,
			getMillisecondUnits
		];
	};
	const defaultUnits = computed(() => {
		const [mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds] = getDisabledTimes(mergedDate.value);
		return getAllUnits(mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds);
	});
	const rowHourUnits = computed(() => defaultUnits.value[0]);
	const minuteUnitsGetter = (nextHour) => defaultUnits.value[1](nextHour);
	const secondUnitsGetter = (nextHour, nextMinute) => defaultUnits.value[2](nextHour, nextMinute);
	const millisecondUnitsGetter = (nextHour, nextMinute, nextSecond) => defaultUnits.value[3](nextHour, nextMinute, nextSecond);
	const getValidTime = (nextTime, certainDate) => {
		let getCheckHourUnits = () => rowHourUnits.value;
		let getCheckMinuteUnits = minuteUnitsGetter;
		let getCheckSecondUnits = secondUnitsGetter;
		let getCheckMillisecondUnits = millisecondUnitsGetter;
		if (certainDate) {
			const [targetDisabledHours, targetDisabledMinutes, targetDisabledSeconds, targetDisabledMilliseconds] = getDisabledTimes(certainDate);
			const [targetRowHourUnits, targetGetMinuteUnits, targetGetSecondUnits, targetGetMillisecondUnits] = getAllUnits(targetDisabledHours, targetDisabledMinutes, targetDisabledSeconds, targetDisabledMilliseconds);
			getCheckHourUnits = () => targetRowHourUnits;
			getCheckMinuteUnits = targetGetMinuteUnits;
			getCheckSecondUnits = targetGetSecondUnits;
			getCheckMillisecondUnits = targetGetMillisecondUnits;
		}
		return findValidateTime(nextTime, getCheckHourUnits, getCheckMinuteUnits, getCheckSecondUnits, getCheckMillisecondUnits, generateConfig.value);
	};
	return [
		getValidTime,
		rowHourUnits,
		minuteUnitsGetter,
		secondUnitsGetter,
		millisecondUnitsGetter
	];
}
function findValidateTime(nextTime, getHourUnits, getMinuteUnits, getSecondUnits, getMillisecondUnits, generateConfig) {
	let nextDate = nextTime;
	function alignValidate(getUnitValue, setUnitValue, units) {
		let nextValue = Reflect.get(generateConfig, getUnitValue)(nextDate);
		const nextUnit = units.find((unit) => unit.value === nextValue);
		if (!nextUnit || nextUnit.disabled) {
			const validateUnits = units.filter((unit) => !unit.disabled);
			const validateUnit = [...validateUnits].reverse().find((unit) => unit.value <= nextValue) || validateUnits[0];
			if (validateUnit) {
				nextValue = validateUnit.value;
				nextDate = Reflect.get(generateConfig, setUnitValue)(nextDate, nextValue);
			}
		}
		return nextValue;
	}
	const nextHour = alignValidate("getHour", "setHour", getHourUnits());
	const nextMinute = alignValidate("getMinute", "setMinute", getMinuteUnits(nextHour));
	alignValidate("getMillisecond", "setMillisecond", getMillisecondUnits(nextHour, nextMinute, alignValidate("getSecond", "setSecond", getSecondUnits(nextHour, nextMinute))));
	return nextDate;
}
export { useTimeInfo as default };
