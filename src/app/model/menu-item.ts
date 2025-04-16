export class MenuItem {
    display: string;
    href: string;
    tooltip: string;
    requiresReviewer: boolean = false

    constructor(display: string = "", href: string = "", tooltip: string = "", requiresReviewer = false) {
        this.display = display;
        this.href = href;
        this.tooltip = tooltip;
        this.requiresReviewer = requiresReviewer;
    }
}
