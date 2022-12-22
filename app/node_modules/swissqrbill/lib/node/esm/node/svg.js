import { SVG_ } from "../svg/svg.js";
export class SVG extends SVG_ {
    constructor(data, options) {
        super(data, options);
    }
    toString() {
        return this.outerHTML;
    }
}
//# sourceMappingURL=svg.js.map