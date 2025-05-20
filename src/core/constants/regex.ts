const COOKIE_REGEX = (name: string): RegExp =>
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1')}=([^;]*)`);

export {
    COOKIE_REGEX
}