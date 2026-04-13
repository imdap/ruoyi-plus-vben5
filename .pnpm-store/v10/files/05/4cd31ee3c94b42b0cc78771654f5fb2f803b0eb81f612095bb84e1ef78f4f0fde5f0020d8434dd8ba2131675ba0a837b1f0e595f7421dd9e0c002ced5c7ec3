import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import Element_default from "./Element.js";
import style_default from "./style/index.js";
import Avatar_default from "./Avatar.js";
import Button_default from "./Button.js";
import Node_default from "./Node.js";
import Image_default from "./Image.js";
import Input_default from "./Input.js";
import Paragraph_default from "./Paragraph.js";
import Title_default from "./Title.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/skeleton/Skeleton.tsx
function getComponentProps(prop) {
	if (prop && typeof prop === "object") return prop;
	return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
	if (hasTitle && !hasParagraph) return {
		size: "large",
		shape: "square"
	};
	return {
		size: "large",
		shape: "circle"
	};
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
	if (!hasAvatar && hasParagraph) return { width: "38%" };
	if (hasAvatar && hasParagraph) return { width: "50%" };
	return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
	const basicProps = {};
	if (!hasAvatar || !hasTitle) basicProps.width = "61%";
	if (!hasAvatar && hasTitle) basicProps.rows = 3;
	else basicProps.rows = 2;
	return basicProps;
}
const Skeleton = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("skeleton", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const { classes, styles } = toPropsRefs(props, "classes", "styles");
	const mergedProps = computed(() => props);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	return () => {
		const { loading, rootClass, avatar = false, title = true, paragraph = true, active, round } = props;
		if (loading || loading === void 0) {
			const hasAvatar = !!avatar;
			const hasTitle = !!title;
			const hasParagraph = !!paragraph;
			let avatarNode;
			if (hasAvatar) {
				const avatarProps = {
					prefixCls: `${prefixCls.value}-avatar`,
					...getAvatarBasicProps(hasTitle, hasParagraph),
					...getComponentProps(avatar)
				};
				avatarNode = createVNode("div", {
					"class": [mergedClassNames.value.header, `${prefixCls.value}-header`],
					"style": mergedStyles.value.header
				}, [createVNode(Element_default, mergeProps({ "class": mergedClassNames.value.avatar }, avatarProps, { "style": mergedStyles.value.avatar }), null)]);
			}
			let contentNode;
			if (hasTitle || hasParagraph) {
				let $title;
				if (hasTitle) {
					const titleProps = {
						prefixCls: `${prefixCls.value}-title`,
						...getTitleBasicProps(hasAvatar, hasParagraph),
						...getComponentProps(title)
					};
					$title = createVNode(Title_default, mergeProps({ "class": mergedClassNames.value.title }, titleProps, { "style": mergedStyles.value.title }), null);
				}
				let paragraphNode;
				if (hasParagraph) {
					const paragraphProps = {
						prefixCls: `${prefixCls.value}-paragraph`,
						...getParagraphBasicProps(hasAvatar, hasTitle),
						...getComponentProps(paragraph)
					};
					paragraphNode = createVNode(Paragraph_default, mergeProps({ "class": mergedClassNames.value.paragraph }, paragraphProps, { "style": mergedStyles.value.paragraph }), null);
				}
				contentNode = createVNode("div", {
					"class": [mergedClassNames.value.section, `${prefixCls.value}-section`],
					"style": mergedStyles.value.section
				}, [$title, paragraphNode]);
			}
			const cls = classNames(prefixCls.value, {
				[`${prefixCls.value}-with-avatar`]: hasAvatar,
				[`${prefixCls.value}-active`]: active,
				[`${prefixCls.value}-rtl`]: direction.value === "rtl",
				[`${prefixCls.value}-round`]: round
			}, mergedClassNames.value.root, contextClassName.value, attrs?.class, rootClass, hashId.value, cssVarCls.value);
			return createVNode("div", mergeProps({ "class": cls }, omit(attrs, ["class", "style"]), { "style": [
				mergedStyles.value.root,
				contextStyle.value,
				attrs?.style
			] }), [avatarNode, contentNode]);
		}
		return slots.default?.() ?? null;
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		active: {
			type: Boolean,
			required: false,
			default: void 0
		},
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		avatar: {
			type: [Object, Boolean],
			required: false,
			default: void 0
		},
		title: {
			type: [Object, Boolean],
			required: false,
			default: void 0
		},
		paragraph: {
			type: [Object, Boolean],
			required: false,
			default: void 0
		},
		round: {
			type: Boolean,
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, {
		avatar: false,
		title: true,
		paragraph: true,
		loading: void 0
	}),
	name: "ASkeleton",
	inheritAttrs: false
});
Skeleton.install = (app) => {
	app.component(Skeleton.name, Skeleton);
	app.component(Button_default.name, Button_default);
	app.component(Avatar_default.name, Avatar_default);
	app.component(Input_default.name, Input_default);
	app.component(Image_default.name, Image_default);
	app.component(Node_default.name, Node_default);
};
const SkeletonWithSubComponents = Skeleton;
SkeletonWithSubComponents.Button = Button_default;
SkeletonWithSubComponents.Avatar = Avatar_default;
SkeletonWithSubComponents.Input = Input_default;
SkeletonWithSubComponents.Image = Image_default;
SkeletonWithSubComponents.Node = Node_default;
var Skeleton_default = SkeletonWithSubComponents;

//#endregion
export { Avatar_default as SkeletonAvatar, Button_default as SkeletonButton, Image_default as SkeletonImage, Input_default as SkeletonInput, Node_default as SkeletonNode, Skeleton_default as default };