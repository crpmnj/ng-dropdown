export interface DropdownConfig {

    multiSelectLimit?: number;
    badgeLimit?: number;

    placeholder?: string;
    empty?: string;

    nameBy?: Function;
    templateBy?: Function;
    groupBy?: Function;

}
