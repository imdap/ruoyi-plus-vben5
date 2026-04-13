export function getVariantOrder(tailwindContext, classes) {
    const uniqueClasses = [...new Set(classes)];
    if (uniqueClasses.length <= 0) {
        return {};
    }
    // Tailwind tracks parsed variants internally and exposes grouped order via getVariantOrder().
    // Parse classes first so all encountered variants are known to that internal set.
    for (const className of uniqueClasses) {
        tailwindContext.parseCandidate(className);
    }
    const variantOrder = tailwindContext.getVariantOrder();
    return [...variantOrder.entries()].reduce((acc, [variant, order]) => {
        const variantName = tailwindContext.printVariant(variant);
        acc[variantName] ?? (acc[variantName] = order);
        return acc;
    }, {});
}
//# sourceMappingURL=variant-order.async.v4.js.map