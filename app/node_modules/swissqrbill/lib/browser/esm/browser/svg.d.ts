import { SVG_ } from "../svg/svg.js";
import { SVGOptions, Data } from "../shared/types.js";
export declare class SVG extends SVG_ {
    constructor(data: Data, options?: SVGOptions);
    /**
     * Outputs the SVG as a string.
     *
     * @returns The outerHTML of the SVG as a `string`.
     */
    toString(): string;
    /**
     * Returns the SVG element.
     * > **Note:** This function is only available in the browser.
     *
     * @readonly
     */
    get element(): SVGElement;
}
