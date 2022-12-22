"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVG = void 0;
const svg_js_1 = require("../svg/svg.js");
class SVG extends svg_js_1.SVG_ {
    constructor(data, options) {
        super(data, options);
    }
    toString() {
        return this.outerHTML;
    }
}
exports.SVG = SVG;
//# sourceMappingURL=svg.js.map