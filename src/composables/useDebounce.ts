import { ref, type Ref, watch } from 'vue';

const myDebounce = (fn: any, delay = 0, immediate = false) => {
    let timeout: number | undefined;
    return (...args: any) => {
        if (immediate && !timeout) fn(...args);
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

const useDebounce = (value: Ref<string>, delay = 500, immediate = false) => {
    const debouncedValue = ref(value.value);

    const debouncedSetter = myDebounce(
        (newValue: string) => {
            debouncedValue.value = newValue;
        },
        delay,
        immediate
    );

    // Watch the original value and debounce it
    watch(value, (newValue) => {
        debouncedSetter(newValue);
    });

    return debouncedValue;
};

export { useDebounce };
