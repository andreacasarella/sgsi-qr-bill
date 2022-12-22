"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReferenceType = exports.px2mm = exports.mm2px = exports.pt2mm = exports.mm2pt = exports.formatAmount = exports.formatSCORReference = exports.formatReference = exports.formatQRReference = exports.calculateQRReferenceChecksum = exports.isQRReferenceValid = exports.isQRReference = exports.formatIBAN = exports.isIBANValid = exports.isQRIBAN = void 0;
/**
 * Checks whether the given iban is a QR-IBAN or not.
 *
 * @param iban - The IBAN to be checked.
 * @returns `true` if the given IBAN is a QR-IBAN and `false` otherwise.
 */
function isQRIBAN(iban) {
    iban = iban.replace(/ /g, "");
    const QRIID = iban.substr(4, 5);
    return (+QRIID >= 30000 && +QRIID <= 31999);
}
exports.isQRIBAN = isQRIBAN;
/**
 * Validates the given IBAN.
 *
 * @param iban - The IBAN to be checked.
 * @returns `true` if the checksum of the given IBAN is valid and `false` otherwise.
 */
function isIBANValid(iban) {
    iban = iban.replace(/ /g, "");
    iban = iban.toUpperCase();
    //-- Move country code + checksum to end
    iban = iban.substr(4) + iban.substr(0, 4);
    //-- Convert letters to numbers, beginning with A = 10...Z = 35
    const A = "A".charCodeAt(0);
    const ibanArr = iban.split("");
    for (let i = 0; i < ibanArr.length; i++) {
        const charCode = ibanArr[i].charCodeAt(0);
        if (charCode >= A) {
            ibanArr[i] = charCode - A + 10 + "";
        }
    }
    //-- Calculate mod9710
    return mod9710(ibanArr.join("")) === 1;
}
exports.isIBANValid = isIBANValid;
/**
 * Formats the given IBAN according the specifications to be easily readable.
 *
 * @param iban - The IBAN to be formatted.
 * @returns The formatted IBAN.
 */
function formatIBAN(iban) {
    var _a;
    iban = iban.replace(/ /g, "");
    const ibanArray = iban.replace(/ /g, "").match(/.{1,4}/g);
    return (_a = ibanArray === null || ibanArray === void 0 ? void 0 : ibanArray.join(" ")) !== null && _a !== void 0 ? _a : iban;
}
exports.formatIBAN = formatIBAN;
/**
 * Checks whether the given reference is a QR-Reference or not.
 *
 * @param reference - The Reference to be checked.
 * @returns `true` if the given reference is a QR-Reference and `false` otherwise.
 */
function isQRReference(reference) {
    reference = reference.replace(/ /g, "");
    if (reference.length === 27) {
        if (!isNaN(+reference)) {
            return true;
        }
    }
    if (reference.replace(/ /g, "").length <= 25) {
        return false;
    }
    throw new Error("Reference is not valid.");
}
exports.isQRReference = isQRReference;
/**
 * Validates the given reference.
 *
 * @param reference - The reference to be checked.
 * @returns `true` if the given reference is valid and `false` otherwise.
 */
function isQRReferenceValid(reference) {
    reference = reference.replace(/ /g, "");
    if (Number.isNaN(reference)) {
        return false;
    }
    if (reference.length !== 27) {
        return false;
    }
    const ref = reference.substr(0, 26);
    const checksum = reference.substr(26, 1);
    const calculatedChecksum = calculateQRReferenceChecksum(ref);
    return calculatedChecksum === checksum;
}
exports.isQRReferenceValid = isQRReferenceValid;
/**
 * Calculates the checksum according the specifications.
 *
 * @param reference - The 26 digits long reference (without the checksum) whose checksum should be calculated.
 * @returns The calculated checksum.
 */
function calculateQRReferenceChecksum(reference) {
    return mod10(reference);
}
exports.calculateQRReferenceChecksum = calculateQRReferenceChecksum;
/**
 * Formats the given QR-Reference according the specifications to be easily readable.
 *
 * @param reference - The QR-Reference to be formatted.
 * @returns The formatted QR-Reference.
 */
function formatQRReference(reference) {
    reference = reference.replace(/ /g, "");
    let referenceArray = [];
    const match = reference.substring(2).match(/.{1,5}/g);
    if (match !== null) {
        referenceArray = [reference.substring(0, 2)].concat(match);
    }
    return referenceArray.join(" ");
}
exports.formatQRReference = formatQRReference;
/**
 * Detects the type of the given reference and formats it according the specifications to be easily readable.
 *
 * @param reference - The reference to be formatted.
 * @returns The formatted reference.
 */
function formatReference(reference) {
    const referenceType = getReferenceType(reference);
    if (referenceType === "QRR") {
        return formatQRReference(reference);
    }
    else if (referenceType === "SCOR") {
        return formatSCORReference(reference);
    }
    return reference;
}
exports.formatReference = formatReference;
/**
 * Formats the given SCOR-Reference according the specifications to be easily readable.
 *
 * @param reference - The SCOR-Reference to be formatted.
 * @returns The formatted SCOR-Reference.
 */
function formatSCORReference(reference) {
    reference = reference.replace(/ /g, "");
    let referenceArray = [];
    const match = reference.match(/.{1,4}/g);
    if (match !== null) {
        referenceArray = match;
    }
    return referenceArray.join(" ");
}
exports.formatSCORReference = formatSCORReference;
/**
 * Formats the given amount according the specifications to be easily readable.
 *
 * @param amount - containing the amount to be formatted.
 * @returns The formatted amount.
 */
function formatAmount(amount) {
    const amountString = amount.toFixed(2);
    const amountArray = amountString.split(".");
    let formattedAmountWithoutDecimals = "";
    for (let x = amountArray[0].length - 1, i = 1; x >= 0; x--, i++) {
        formattedAmountWithoutDecimals = amountArray[0][x] + formattedAmountWithoutDecimals;
        if (i === 3) {
            formattedAmountWithoutDecimals = " " + formattedAmountWithoutDecimals;
            i = 0;
        }
    }
    return formattedAmountWithoutDecimals.trim() + "." + amountArray[1];
}
exports.formatAmount = formatAmount;
/**
 * Converts millimeters to points.
 *
 * @param millimeters - The millimeters you want to convert to points.
 * @returns The converted millimeters in points.
 */
function mm2pt(millimeters) {
    return millimeters * 2.83465;
}
exports.mm2pt = mm2pt;
/**
 * Converts points to millimeters.
 *
 * @param points - The points you want to convert to millimeters.
 * @returns The converted points in millimeters.
 */
function pt2mm(points) {
    return points / 2.83465;
}
exports.pt2mm = pt2mm;
/**
 * Converts millimeters to pixels.
 *
 * @param millimeters - The millimeters you want to convert to pixels.
 * @returns The converted millimeters in pixels.
 */
function mm2px(millimeters) {
    return millimeters * 960 / 254;
}
exports.mm2px = mm2px;
/**
 * Converts pixels to millimeters.
 *
 * @param pixels - containg the pixels you want to convert to millimeters.
 * @returns The converted pixels in millimeters.
 */
function px2mm(pixels) {
    return pixels * 254 / 960;
}
exports.px2mm = px2mm;
function getReferenceType(reference) {
    if (typeof reference === "undefined") {
        return "NON";
    }
    else if (isQRReference(reference)) {
        return "QRR";
    }
    else {
        return "SCOR";
    }
}
exports.getReferenceType = getReferenceType;
function mod9710(iban) {
    let remainder = iban;
    let block;
    while (remainder.length > 2) {
        block = remainder.slice(0, 9);
        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
    }
    return parseInt(remainder, 10) % 97;
}
function mod10(code) {
    code = code.replace(/ /g, "");
    const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
    let carry = 0;
    for (let i = 0; i < code.length; i++) {
        carry = table[(carry + parseInt(code.substr(i, 1), 10)) % 10];
    }
    return ((10 - carry) % 10).toString();
}
//# sourceMappingURL=utils.js.map