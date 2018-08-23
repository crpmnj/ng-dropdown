export interface DropdownItem<K, T> {

    id: K;
    data: T;

    name?: string;
    templateName?: string;

    groupBy?: string;
    searchBy?: string;
    sortBy?: number | string;

}
