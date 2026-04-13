import HistoryScrollRestorationEnum from './HistoryScrollRestorationEnum.js';
/**
 * History item list.
 */
export default class HistoryItemList {
    currentItem = {
        title: '',
        href: 'about:blank',
        state: null,
        popState: false,
        scrollRestoration: HistoryScrollRestorationEnum.auto,
        method: 'GET',
        formData: null
    };
    items = [this.currentItem];
    /**
     * History item list.
     *
     * @param historyItem History item.
     */
    push(historyItem) {
        const index = this.items.indexOf(this.currentItem);
        // If the current item is not the last one, remove all items after it.
        if (index !== this.items.length - 1) {
            this.items.length = index + 1;
        }
        this.items.push(historyItem);
        this.currentItem = historyItem;
    }
    /**
     *
     * @param historyItem
     */
    replace(historyItem) {
        const index = this.items.indexOf(this.currentItem);
        // If the current item is not the last one, remove all items after it.
        if (index !== this.items.length - 1) {
            this.items.length = index + 1;
        }
        if (index === -1) {
            throw new Error('Current history item not found');
        }
        this.currentItem = historyItem;
        this.items[index] = historyItem;
    }
    /**
     * Clears history and sets current item to "about:blank".
     */
    clear() {
        this.items.length = 0;
        this.currentItem = {
            title: '',
            href: 'about:blank',
            state: null,
            popState: false,
            scrollRestoration: HistoryScrollRestorationEnum.auto,
            method: 'GET',
            formData: null
        };
        this.items.push(this.currentItem);
    }
}
//# sourceMappingURL=HistoryItemList.js.map