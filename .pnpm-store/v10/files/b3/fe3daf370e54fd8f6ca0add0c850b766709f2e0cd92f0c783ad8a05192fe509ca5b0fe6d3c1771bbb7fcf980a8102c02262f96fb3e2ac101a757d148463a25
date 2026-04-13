import { computed } from "vue";
import { warning } from "@v-c/util";
function formatValue(value, { generateConfig, locale, format }) {
	if (!value) return "";
	if (typeof format === "function") return format(value);
	return generateConfig.locale.format(locale.locale, value, format) || String(value);
}
function pickAttrs(props, { aria, data }) {
	const result = {};
	Object.keys(props).forEach((key) => {
		if (aria && (key.startsWith("aria-") || key === "role")) result[key] = props[key];
		if (data && key.startsWith("data-")) result[key] = props[key];
	});
	return result;
}
function useInputProps(props, postProps) {
	const parseDate = (str, formatStr) => {
		const { generateConfig, locale } = props.value;
		const parsed = generateConfig.locale.parse(locale.locale, str, [formatStr]);
		return parsed && generateConfig.isValidate(parsed) ? parsed : null;
	};
	const firstFormat = computed(() => props.value.format[0]);
	const getText = (date) => {
		const { locale, generateConfig } = props.value;
		return formatValue(date, {
			locale,
			format: firstFormat.value,
			generateConfig
		});
	};
	const valueTexts = computed(() => (props.value.value || []).map(getText));
	const size = computed(() => {
		const { picker, generateConfig } = props.value;
		const defaultSize = picker === "time" ? 8 : 10;
		const length = typeof firstFormat.value === "function" ? firstFormat.value(generateConfig.getNow()).length : firstFormat.value.length;
		return Math.max(defaultSize, length) + 2;
	});
	const validateFormat = (text) => {
		const { format } = props.value;
		for (let i = 0; i < format.length; i += 1) {
			const singleFormat = format[i];
			if (typeof singleFormat === "string") {
				const parsed = parseDate(text, singleFormat);
				if (parsed) return parsed;
			}
		}
		return false;
	};
	const getInputProps = (index) => {
		function getProp(propValue) {
			return index !== void 0 ? propValue[index] : propValue;
		}
		const pickedAttrs = pickAttrs(props.value, {
			aria: true,
			data: true
		});
		const { maskFormat, preserveInvalidOnBlur, inputReadOnly, required, "aria-required": ariaRequired, name, autoComplete, id, invalid, placeholder, activeHelp, activeIndex, allHelp, disabled, onFocus, onBlur, onSubmit, onInputChange, onInvalid, onChange, onOpenChange, onKeyDown, open } = props.value;
		const inputProps = {
			...pickedAttrs,
			"format": maskFormat,
			"validateFormat": (text) => !!validateFormat(text),
			preserveInvalidOnBlur,
			"readOnly": inputReadOnly,
			required,
			"aria-required": ariaRequired,
			name,
			autoComplete,
			"size": size.value,
			"id": getProp(id),
			"value": getProp(valueTexts.value) || "",
			"invalid": getProp(invalid),
			"placeholder": getProp(placeholder),
			"active": activeIndex === index,
			"helped": allHelp || activeHelp && activeIndex === index,
			"disabled": getProp(disabled),
			"onFocus": (event) => {
				onFocus(event, index);
			},
			"onBlur": (event) => {
				onBlur(event, index);
			},
			onSubmit,
			"onChange": (text) => {
				onInputChange();
				const parsed = validateFormat(text);
				if (parsed) {
					onInvalid(false, index);
					onChange(parsed, index);
					return;
				}
				onInvalid(!!text, index);
			},
			"onHelp": () => {
				onOpenChange(true, { index });
			},
			"onKeyDown": (event) => {
				let prevented = false;
				onKeyDown?.(event, () => {
					if (process.env.NODE_ENV !== "production") warning(false, "`preventDefault` callback is deprecated. Please call `event.preventDefault` directly.");
					prevented = true;
				});
				if (!event.defaultPrevented && !prevented) switch (event.key) {
					case "Escape":
						onOpenChange(false, { index });
						break;
					case "Enter":
						if (!open) onOpenChange(true);
						break;
				}
			},
			...postProps?.({ valueTexts: valueTexts.value })
		};
		Object.keys(inputProps).forEach((key) => {
			if (inputProps[key] === void 0) delete inputProps[key];
		});
		return inputProps;
	};
	return [getInputProps, getText];
}
export { useInputProps as default };
