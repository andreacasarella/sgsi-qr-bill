import { Data, SVGOptions } from "../shared/types";
import { SVG } from "svg-engine";
export declare class SVG_ {
    protected instance: SVG;
    private _data;
    private _language;
    constructor(data: Data, options?: SVGOptions);
    get outerHTML(): string;
    private _render;
    private _renderQRCode;
    private _formatAddress;
    private _getLineCountOfText;
    private _fitTextToWidth;
    private _ellipsis;
    private _addRectangle;
}
