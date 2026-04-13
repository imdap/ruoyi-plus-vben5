import { normalize } from "../async-utils/path.js";
export async function getUnknownClasses(ctx, tailwindContext, classes) {
    const rules = await import(normalize(`${ctx.installation}/lib/lib/generateRules.js`));
    return classes
        .filter(className => {
        const generated = rules.generateRules?.([className], tailwindContext) ?? rules.default?.generateRules?.([className], tailwindContext);
        return generated.length === 0;
    });
}
//# sourceMappingURL=unknown-classes.async.v3.js.map