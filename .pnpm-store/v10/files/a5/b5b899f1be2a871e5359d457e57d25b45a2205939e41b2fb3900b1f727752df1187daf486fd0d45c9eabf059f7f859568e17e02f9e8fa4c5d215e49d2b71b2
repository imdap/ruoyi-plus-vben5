function useInvalidate(generateConfig, picker, disabledDate, showTime) {
	const isInvalidate = (date, info) => {
		const outsideInfo = {
			type: picker.value,
			...info
		};
		delete outsideInfo.activeIndex;
		if (!generateConfig.value.isValidate(date) || disabledDate.value && disabledDate.value(date, outsideInfo)) return true;
		if ((picker.value === "date" || picker.value === "time") && showTime.value) {
			const range = info && info.activeIndex === 1 ? "end" : "start";
			const { disabledHours, disabledMinutes, disabledSeconds, disabledMilliseconds } = showTime.value.disabledTime?.(date, range, { from: outsideInfo.from }) || {};
			const { disabledHours: legacyDisabledHours, disabledMinutes: legacyDisabledMinutes, disabledSeconds: legacyDisabledSeconds, disabledMilliseconds: legacyDisabledMilliseconds } = showTime.value;
			const mergedDisabledHours = disabledHours || legacyDisabledHours;
			const mergedDisabledMinutes = disabledMinutes || legacyDisabledMinutes;
			const mergedDisabledSeconds = disabledSeconds || legacyDisabledSeconds;
			const mergedDisabledMilliseconds = disabledMilliseconds || legacyDisabledMilliseconds;
			const hour = generateConfig.value.getHour(date);
			const minute = generateConfig.value.getMinute(date);
			const second = generateConfig.value.getSecond(date);
			const millisecond = generateConfig.value.getMillisecond(date);
			if (mergedDisabledHours && mergedDisabledHours().includes(hour)) return true;
			if (mergedDisabledMinutes && mergedDisabledMinutes(hour).includes(minute)) return true;
			if (mergedDisabledSeconds && mergedDisabledSeconds(hour, minute).includes(second)) return true;
			if (mergedDisabledMilliseconds && mergedDisabledMilliseconds(hour, minute, second).includes(millisecond)) return true;
		}
		return false;
	};
	return isInvalidate;
}
export { useInvalidate as default };
