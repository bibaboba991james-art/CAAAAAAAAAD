import emailjs from '@emailjs/browser';
import { OrderFormData } from '../types';
import { generateOrderPDF } from './pdfService';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Send order notification to admin email
export const sendOrderNotificationToAdmin = async (
  formData: OrderFormData,
  cartItems: { id: string; name: string; price: number; quantity: number }[],
  totalAmount: number,
  orderNumber: string = '149274158'
) => {
  console.log('Sending order notification to admin...');
  
  // Check if EmailJS is configured
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY ||
      EMAILJS_SERVICE_ID === 'your_emailjs_service_id' ||
      EMAILJS_TEMPLATE_ID === 'your_emailjs_template_id' ||
      EMAILJS_PUBLIC_KEY === 'your_emailjs_public_key') {
    console.error('EmailJS not configured properly for admin notifications');
    throw new Error('EmailJS configuration missing for admin notifications');
  }

  try {
    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total_chf = totalAmount;
    const total_eur = total_chf * 1.07;
    
    // Prepare email template parameters for admin notification
    const templateParams = {
      to_email: 'info@prowerkgm.ch', // Admin email
      subject: `Neue Bestellung #${orderNumber} - ProWerk`,
      order_id: orderNumber,
      
      // Customer information
      customer_name: `${formData.firstName} ${formData.lastName}`,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
      
      // Order items
      order_items: cartItems.map(item => 
        `${item.name} - Menge: ${item.quantity} × CHF ${item.price.toFixed(2)} = CHF ${(item.price * item.quantity).toFixed(2)}`
      ).join('\n'),
      
      // Totals
      total_chf: total_chf.toFixed(2),
      total_eur: total_eur.toFixed(2),
      
      // Payment info
      payment_method: 'Vorkasse (Banküberweisung)',
      payment_status: 'Ausstehend'
    };
    
    console.log('Sending admin notification email...');
    
    // Send email to admin
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_admin_notification', // Different template for admin
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Admin notification email sent successfully:', response.status, response.text);
    return response.status === 200;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    throw new Error('Failed to send admin notification email');
  }
};

export const sendOrderEmailToCustomer = async (
  formData: OrderFormData,
  cartItems: { id: string; name: string; price: number; quantity: number }[],
  totalAmount: number,
  orderNumber: string = '149274158'
) => {
  console.log('Starting email send process...');
  console.log('EmailJS Config:', {
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    publicKey: EMAILJS_PUBLIC_KEY ? 'Set' : 'Not set'
  });

  // Check if EmailJS is configured
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY ||
      EMAILJS_SERVICE_ID === 'your_emailjs_service_id' ||
      EMAILJS_TEMPLATE_ID === 'your_emailjs_template_id' ||
      EMAILJS_PUBLIC_KEY === 'your_emailjs_public_key') {
    console.error('EmailJS not configured properly:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      publicKey: EMAILJS_PUBLIC_KEY ? 'Set' : 'Not set'
    });
    throw new Error('EmailJS configuration missing');
  }

  try {
    console.log('Generating PDF...');
    // Generate PDF
    const pdf = generateOrderPDF(formData, cartItems, totalAmount, orderNumber);
    const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 without data:application/pdf;base64,
    console.log('PDF generated, size:', pdfBase64.length);

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping_chf = 0; // Free shipping
    const tax_chf = 0; // No tax shown separately
    const total_chf = totalAmount;
    
    // Convert to EUR
    const shipping_eur = shipping_chf * 1.07;
    const tax_eur = tax_chf * 1.07;
    const total_eur = total_chf * 1.07;
    
    console.log('Preparing template parameters...');
    // Prepare email template parameters
    const templateParams = {
      to_email: formData.email,
      customer_name: `${formData.firstName} ${formData.lastName}`,
      order_id: orderNumber,
      
      // Order items for the table
      orders: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price_chf: `${item.price.toFixed(2)}`,
        price_eur: `${(item.price * 1.07).toFixed(2)}`
      })),
      
      // Totals
      shipping_chf: shipping_chf.toFixed(2),
      shipping_eur: shipping_eur.toFixed(2),
      tax_chf: tax_chf.toFixed(2),
      tax_eur: tax_eur.toFixed(2),
      total_chf: total_chf.toFixed(2),
      total_eur: total_eur.toFixed(2),
      
      // PDF attachment
      pdf_attachment: pdfBase64,
      pdf_filename: `ProWerk_Rechnung_${orderNumber}.pdf`
    };
    
    console.log('Template params prepared:', {
      to_email: templateParams.to_email,
      customer_name: templateParams.customer_name,
      order_id: templateParams.order_id,
      orders_count: templateParams.orders.length,
      pdf_size: pdfBase64.length
    });

    console.log('Sending email via EmailJS...');
    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully:', response.status, response.text);
    const success = response.status === 200;
    return success;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email to customer');
  }
};

// Initialize EmailJS (call this once in your app)
export const initializeEmailJS = () => {
  console.log('Initializing EmailJS...');
  if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'your_emailjs_public_key' && EMAILJS_PUBLIC_KEY.trim() !== '') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized with public key');
  } else {
    console.warn('EmailJS public key not configured - email functionality will be disabled');
  }
};