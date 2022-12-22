import { SVG_ } from "../svg/svg.js";
export class SVG extends SVG_ {
    constructor(data, options) {
        super(data, options);
    }
    /**
     * Outputs the SVG as a string.
     *
     * @returns The outerHTML of the SVG as a `string`.
     */
    toString() {
        return this.outerHTML;
    }
    /**
     * Returns the SVG element.
     * > **Note:** This function is only available in the browser.
     *
     * @readonly
     */
    get element() {
        return this.instance.element;
    }
}
//# sourceMappingURL=svg.js.map