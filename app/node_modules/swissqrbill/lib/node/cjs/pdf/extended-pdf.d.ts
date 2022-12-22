import PDFDocument from "pdfkit";
export interface PDFTable {
    /**
     * Table rows.
     */
    rows: Array<PDFRow>;
    /**
     * Width of whole table.
     */
    width?: number;
    /**
     * Horizontal start position of the table.
     */
    x?: number;
    /**
     * Vertical start position of the table.
     */
    y?: number;
    /**
     * Cell padding of the table cells.
     */
    padding?: number | [number, number?, number?, number?];
    /**
     * Width of the border lines.
     */
    lineWidth?: number;
    /**
     * Font of the text inside the table.
     */
    font?: string;
    /**
     * Font size of the text inside the table.
     */
    fontSize?: number;
}
export interface PDFRow {
    /**
     * Table columns.
     */
    columns: Array<PDFColumn>;
    /**
     * Background color of the row.
     */
    fillColor?: string;
    /**
     * Border color of the row.
     */
    strokeColor?: string;
    /**
     * Height of the row.
     */
    height?: number;
    /**
     * Cell padding of the table cells inside the row.
     */
    padding?: number | [number, number?, number?, number?];
    /**
     * Font of the text inside the row.
     */
    font?: string;
    /**
     * Font size of the text inside the row.
     */
    fontSize?: number;
    /**
     * A header row gets inserted automatically on new pages. Only one header row is allowed.
     */
    header?: boolean;
}
export interface PDFColumn {
    /**
     * Cell text.
     */
    text: string | number | boolean;
    /**
     * Width of the cell.
     */
    width?: number;
    /**
     * Cell padding of the table cell.
     */
    padding?: number | [number, number?, number?, number?];
    /**
     * Background color of the cell.
     */
    fillColor?: string;
    /**
     * Border color of the cell.
     */
    strokeColor?: string;
    /**
     * Font of the text inside the cell.
     */
    font?: string;
    /**
     * Font size of the text inside the cell.
     */
    fontSize?: number;
    /**
     * Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling).
     */
    textOptions?: PDFKit.Mixins.TextOptions;
}
export declare class ExtendedPDF extends PDFDocument {
    constructor(options?: PDFKit.PDFDocumentOptions);
    /**
     * Inserts a table to the document.
     *
     * @param table - An Object which contains the table information.
     * @returns `this`
     * @example
     * ```
     * const table = {
     *   rows: [
     *     {
     *       fillColor: "#ECF0F1",
     *       columns: [
     *         {
     *           text: "Row 1 cell 1",
     *         }, {
     *           text: "Row 1 cell 2",
     *         }, {
     *           text: "Row 1 cell 3"
     *         }
     *       ]
     *     }, {
     *       columns: [
     *         {
     *           text: "Row 2 cell 1",
     *         }, {
     *           text: "Row 2 cell 2",
     *         }, {
     *           text: "Row 2 cell 3"
     *         }
     *       ]
     *     }
     *   ]
     * };
     * ```
     */
    addTable(table: PDFTable): PDFKit.PDFDocument;
    /**
     * Adds a path to the document on the given position.
     *
     * @param path - The path data to insert. This is the same as the `d` attribute of a SVG path.
     * @param x - The x position where the path should be inserted.
     * @param y - The y position where the path should be inserted.
     * @returns `this`
     */
    addPath(path: string, x: number, y: number): PDFKit.PDFDocument;
}
