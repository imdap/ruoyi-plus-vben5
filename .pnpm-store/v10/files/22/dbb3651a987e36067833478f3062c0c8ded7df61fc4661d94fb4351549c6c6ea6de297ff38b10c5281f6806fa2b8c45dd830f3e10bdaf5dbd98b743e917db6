import { computed } from 'vue';
import XEUtils from 'xe-utils';
export function useCellView(props) {
    const currColumn = computed(() => {
        const { renderParams } = props;
        return renderParams.column;
    });
    const currRow = computed(() => {
        const { renderParams } = props;
        return renderParams.row;
    });
    const cellOptions = computed(() => {
        const { renderOpts } = props;
        return renderOpts.props || {};
    });
    const cellModel = computed({
        get() {
            const { renderParams } = props;
            const { row, column } = renderParams;
            return XEUtils.get(row, column.field);
        },
        set(value) {
            const { renderParams } = props;
            const { row, column } = renderParams;
            return XEUtils.set(row, column.field, value);
        }
    });
    return {
        currColumn,
        currRow,
        cellModel,
        cellOptions
    };
}
