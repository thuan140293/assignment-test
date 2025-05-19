
interface UserListType {
    id?: number;
    date?: string;
    name: string;
    username?: string;
    email?: string;
    website?: string;
    company?: any;
    phone: number;
    address: AddressType;
}

interface AddressType {
    city?: string;
    geo?: { lat: string, lng: string };
    street?: string;
    suite?: string;
    zipcode?: string;
}

type ModeTupleType = "add" | "edit";

export { UserListType, AddressType, ModeTupleType }