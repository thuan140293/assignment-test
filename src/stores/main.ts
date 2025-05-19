import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        isPaddingZero: true,
    }),
    actions: {
        togglePadding() {
            this.isPaddingZero = !this.isPaddingZero;
        },
        setPaddingZero(val: boolean) {
            this.isPaddingZero = val;
        },
    },
});