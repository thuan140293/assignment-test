import { IconProps } from "element-plus";

interface MenuItemType {
    index: string;
    title: string;
    icon: IconProps;
    disabled?: boolean;
    children?: MenuItemType[];
};

export { MenuItemType }