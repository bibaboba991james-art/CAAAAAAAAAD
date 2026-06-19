import jsPDF from 'jspdf';
import { OrderFormData } from '../types';

export const generateOrderPDF = (
  formData: OrderFormData,
  cartItems: { id: string; name: string; price: number; quantity: number }[],
  totalAmount: number,
  orderNumber: string = '149274158'
): jsPDF => {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('ProWerk', 20, 30);
  
  doc.setFontSize(16);
  doc.text('Bestellbestätigung', 20, 45);
  
  // Order details
  let yPosition = 70;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Bestellnummer:', 20, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(orderNumber, 70, yPosition);
  
  yPosition += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Kundenname:', 20, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(`${formData.firstName} ${formData.lastName}`, 70, yPosition);
  
  yPosition += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('E-Mail:', 20, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.email, 70, yPosition);

  yPosition += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Lieferadresse:', 20, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(`${formData.address}, ${formData.postalCode} ${formData.city}${formData.country ? ', ' + formData.country : ''}`, 70, yPosition);

  yPosition += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('Bestellte Artikel:', 20, yPosition);
  
  yPosition += 15;
  cartItems.forEach((item) => {
    doc.setFont('helvetica', 'normal');
    const itemText = `${item.name} - Menge: ${item.quantity} × CHF ${item.price.toFixed(2)}`;
    doc.text(itemText, 25, yPosition);
    yPosition += 10;
  });
  
  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Gesamtbetrag:', 20, yPosition);
  doc.text(`CHF ${totalAmount.toFixed(2)}`, 70, yPosition);
  
  yPosition += 20;
  doc.setFontSize(12);
  doc.text('Zahlungsstatus:', 20, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Ausstehend - Vorkasse', 70, yPosition);
  
  yPosition += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Zahlungsdaten:', 20, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 10;
  doc.text('IBAN: AT80 1200 0100 4833 6985', 25, yPosition);
  yPosition += 10;
  doc.text('BIC: BKAUATWWXXX', 25, yPosition);
  yPosition += 10;
  doc.text('Bank: UNICREDIT BANK AUSTRIA AG', 25, yPosition);
  yPosition += 10;
  doc.text('Empfänger: Pro Werk', 25, yPosition);
  yPosition += 10;
  doc.text(`Verwendungszweck: Bestellung #${orderNumber}`, 25, yPosition);
  
  yPosition += 20;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('Bitte überweisen Sie den Betrag innerhalb von 14 Tagen.', 20, yPosition);
  doc.text('Die Ware wird nach Zahlungseingang versendet.', 20, yPosition + 10);
  
  return doc;
};