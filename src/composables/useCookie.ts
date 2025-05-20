import { COOKIE_REGEX } from "@/core/constants";

export function useCookie() {
    const getCookie = (name: string): string | null => {
        const matches = document.cookie.match(COOKIE_REGEX(name));
        return matches ? decodeURIComponent(matches[1]) : null;
    };

    const setCookie = (name: string, value: string, expired_time: string | number): void => {
        let expires = '';

        if (typeof expired_time === 'string') {
            const date = new Date(expired_time);
            expires = `expires=${date.toUTCString()}`;
        } else {
            const date = new Date();
            date.setTime(date.getTime() + expired_time * 1000);
            expires = `expires=${date.toUTCString()}`;
        }

        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
    };

    const deleteCookie = (name: string): void => {
        setCookie(name, '', -1);
    };

    return {
        getCookie,
        setCookie,
        deleteCookie,
    };
}
