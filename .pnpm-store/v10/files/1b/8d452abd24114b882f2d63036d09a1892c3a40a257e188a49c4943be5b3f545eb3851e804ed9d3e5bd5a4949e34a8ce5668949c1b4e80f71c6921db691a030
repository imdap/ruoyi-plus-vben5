import { runAsWorker } from "synckit";
import { getClassOrder } from "./class-order.async.v3.js";
import { createTailwindContext } from "./context.async.v3.js";
import { getCustomComponentClasses } from "./custom-component-classes.async.v3.js";
import { getDissectedClasses } from "./dissect-classes.async.v3.js";
import { getPrefix, getSuffix } from "./prefix.async.v3.js";
import { getUnknownClasses } from "./unknown-classes.async.v3.js";
import { getVariantOrder } from "./variant-order.async.v3.js";
const handlers = {
    getCanonicalClasses: async (ctx, classes, _options) => {
        const canonicalClasses = classes.reduce((acc, className) => {
            acc[className] = {
                input: [className],
                output: className
            };
            return acc;
        }, {});
        return { canonicalClasses, warnings: ctx.warnings };
    },
    getClassOrder: async (ctx, classes) => {
        const tailwindContext = await createTailwindContext(ctx);
        const classOrder = getClassOrder(tailwindContext, classes);
        return { classOrder, warnings: ctx.warnings };
    },
    getConflictingClasses: async (ctx, _classes) => {
        const conflictingClasses = {};
        return { conflictingClasses, warnings: ctx.warnings };
    },
    getCustomComponentClasses: async (ctx) => {
        const customComponentClasses = await getCustomComponentClasses(ctx);
        return { customComponentClasses, warnings: ctx.warnings };
    },
    getDissectedClasses: async (ctx, classes) => {
        const tailwindContext = await createTailwindContext(ctx);
        const dissectedClasses = await getDissectedClasses(ctx, tailwindContext, classes);
        return { dissectedClasses, warnings: ctx.warnings };
    },
    getPrefix: async (ctx) => {
        const tailwindContext = await createTailwindContext(ctx);
        const prefix = getPrefix(tailwindContext);
        const suffix = getSuffix(tailwindContext);
        return { prefix, suffix, warnings: ctx.warnings };
    },
    getUnknownClasses: async (ctx, classes) => {
        const tailwindContext = await createTailwindContext(ctx);
        const unknownClasses = await getUnknownClasses(ctx, tailwindContext, classes);
        return { unknownClasses, warnings: ctx.warnings };
    },
    getVariantOrder: async (ctx) => {
        const variantOrder = getVariantOrder();
        return { variantOrder, warnings: ctx.warnings };
    }
};
runAsWorker(async (operation, ...args) => {
    return handlers[operation](...args);
});
//# sourceMappingURL=tailwind.async.worker.v3.js.map