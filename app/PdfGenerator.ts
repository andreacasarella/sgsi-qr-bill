const {PDF} = require("swissqrbill/pdf");
const {mm2pt} = require("swissqrbill/utils");
import {Address, Invoice, Signature} from "../shared/sgsi-qr-bill-types"

export class PdfGenerator {

  private readonly marginTop = 20;
  private readonly margin = 15;
  private readonly logoWith = 60;
  private readonly headerHeight = 15;

  private readonly font: string;
  private readonly fontSize: number;
  private readonly fontSizeLarge: number;

  constructor(font:string = "Helvetica", fontSize: number = 10) {
    this.font = font;
    this.fontSize = fontSize;
    this.fontSizeLarge = fontSize + 1;
  }

  generate(invoice: Invoice, outputFile: string):void{
    const pdf = new PDF(this.invoiceToData(invoice), outputFile, { autoGenerate: false, size: "A4", language: invoice.language });
    const textWidth = pdf.page.width - (2 * mm2pt(this.margin));
    pdf.font(this.font);

    if(invoice.creditor.logoUrl) {
      // Add logo
      pdf.image(invoice.creditor.logoUrl.url, mm2pt(this.margin), mm2pt(this.marginTop), {
        fit: [mm2pt(this.logoWith), mm2pt(this.headerHeight)],
        width: mm2pt(this.logoWith),
        height: mm2pt(this.headerHeight),
        valign: "center"
      });
    }

    // Add creditor information
    pdf.fontSize(this.fontSizeLarge);
    const creditorText = this.creditorHeader(invoice);
    const creditorInformationX = mm2pt(this.margin) + mm2pt(this.logoWith) + mm2pt(10);
    const creditorInformationY = mm2pt(this.marginTop) + (mm2pt(this.headerHeight) - ((creditorText.split("\n").length - 1) * pdf.currentLineHeight(true) + pdf.currentLineHeight(false))) * 0.5;
    const creditorInformationWidth = textWidth - mm2pt(10) - mm2pt(this.logoWith);
    pdf.text(creditorText, creditorInformationX, creditorInformationY, {
      width: creditorInformationWidth,
      height: mm2pt(this.headerHeight),
      align: "right",
    });

    // Add debtor address
    pdf.fontSize(this.fontSize);
    pdf.text(this.debtorAddress(invoice), mm2pt(120), mm2pt(56), {
      width: mm2pt(75),
      height: mm2pt(23),
      align: "left"
    });

    pdf.fontSize(this.fontSize);
    pdf.text("", mm2pt(this.margin), mm2pt(88),{
      height: 0
    });

    if(invoice.salutation) {
      // Add salutation
      pdf.text(invoice.salutation, mm2pt(this.margin), mm2pt(88), {
        width: textWidth,
        height: mm2pt(8),
        align: "justify"
      });
      pdf.moveDown();
    }

    if(invoice.content) {
      // Add text
      pdf.text(invoice.content, {
        width: textWidth,
        height: mm2pt(65),
        align: "justify"
      });
    }

    if(invoice.signatures?.length === 1) {
      // Add single signature
      pdf.moveDown();
      pdf.text("\n\n" + this.signatureToString(invoice.signatures[0]), {
        columns: 2,
        width: textWidth,
        height: mm2pt(8),
        align: "center"
      });
    } else if(invoice.signatures?.length) {
      const length = invoice.signatures.length;
      // Add signatures
      pdf.moveDown();
      pdf.text(invoice.signatures.join("\n"), {
        columns: length,
        width: textWidth,
        height: mm2pt(8),
        align: "center"
      });
    }

    pdf.addQRBill();
    pdf.end();
  }

  private invoiceToData(invoice: Invoice) {
    return {
      currency: invoice.currency,
      amount: invoice.amount,
      message: invoice.message,
      reference: invoice.reference,
      creditor: {
        name: invoice.creditor.name,
        address: this.fullStreet(invoice.creditor.address),
        zip: invoice.creditor.address.zip,
        city: invoice.creditor.address.city,
        account: invoice.creditor.ibanAccount,
        country: invoice.creditor.address.country
      },
      debtor: {
        name: this.fullName(invoice.debtor.firstName, invoice.debtor.lastName),
        address: this.fullStreet(invoice.debtor.address),
        zip: invoice.debtor.address.zip,
        city: invoice.debtor.address.city,
        country: invoice.debtor.address.country
      }
    };
  }

  private debtorAddress(invoice: Invoice):string{
    let address = "";
    if(invoice.debtor.title) {
      address += `${invoice.debtor.title}\n`;
    }
    address += this.fullName(invoice.debtor.firstName, invoice.debtor.lastName);
    address += `\n${this.fullStreet(invoice.debtor.address)}`;
    address += `\n${this.fullCity(invoice.debtor.address)}`;
    //address += `\n${invoice.debtor.address.country}`;
    return address;
  }

  private creditorHeader(invoice: Invoice):string{
    let creditorHeader = invoice.creditor.name;
    creditorHeader += `\n${this.fullStreet(invoice.creditor.address)} • ${this.fullCity(invoice.creditor.address)} • ${invoice.creditor.address.country}`;
    if(invoice.creditor.website && invoice.creditor.email){
      creditorHeader += `\n${invoice.creditor.website.url} - ${invoice.creditor.email}`;
    } else if (invoice.creditor.website) {
      creditorHeader += `\n${invoice.creditor.website.url}`;
    } else if (invoice.creditor.email) {
      creditorHeader += `\n${invoice.creditor.email}`;
    }
    return creditorHeader;
  }

  private signatureToString(signature: Signature):string{
    let signatureString = "";
    if(signature.position) {
      signatureString += `${signature.position}\n`;
      signatureString += this.fullName(signature.firstName, signature.lastName);
    } else {
      signatureString += `${this.fullName(signature.firstName, signature.lastName)}\n`;
    }
    return signatureString;
  }

  private fullName(firstName: string, lastName: string):string{
    return `${firstName} ${lastName}`
  }

  private fullStreet(address: Address):string {
    return `${address.street} ${address.buildingNumber}`;
  }

  private fullCity(address: Address):string {
    return `${address.zip} ${address.city}`;
  }

}
