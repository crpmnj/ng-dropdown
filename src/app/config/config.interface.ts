export interface DropdownConfig {

    multipleLimit?: number;
    badgeLimit?: number;

    placeholder?: string;
    empty?: string;

    nameBy?: Function;
    templateBy?: Function;
    groupBy?: Function;
    searchBy?: Function;

    badge_width?: string;

}
