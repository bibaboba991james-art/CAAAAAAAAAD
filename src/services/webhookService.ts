import axios from 'axios';
import { OrderFormData } from '../types';
import { generateOrderPDF } from './pdfService';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

export const sendOrderToWebhook = async (
  formData: OrderFormData,
  cartItems: { id: string; name: string; price: number; quantity: number }[],
  totalAmount: number,
  orderNumber: string = '149274158'
) => {
  // Check if webhook URL is configured
  if (!WEBHOOK_URL || WEBHOOK_URL === 'your_webhook_url_here') {
    console.warn('Webhook URL not configured. Skipping webhook send.');
    return false;
  }

  try {
    // Generate PDF
    const pdf = generateOrderPDF(formData, cartItems, totalAmount, orderNumber);
    const pdfBlob = pdf.output('blob');
    
    // Create FormData for multipart/form-data
    const formDataToSend = new FormData();
    
    // Add PDF file
    formDataToSend.append('pdf', pdfBlob, `ProWerk_Bestellung_${orderNumber}.pdf`);
    
    // Add order data as JSON
    const orderData = {
      orderNumber,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        city: formData.city,
        postalCode: formData.postalCode,
        address: formData.address
      },
      items: cartItems,
      totalAmount,
      paymentStatus: 'Ausstehend - Vorkasse',
      paymentDetails: {
        iban: 'CH4683036850217684504',
        recipient: 'Pro Werk'
      },
      timestamp: new Date().toISOString()
    };
    
    formDataToSend.append('orderData', JSON.stringify(orderData));
    
    const response = await axios.post(WEBHOOK_URL, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000, // 10 seconds timeout
    });
    
    return response.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Webhook error:', error.response?.data || error.message);
      throw new Error(`Webhook failed: ${error.response?.status || 'Network error'}`);
    } else {
      console.error('Error sending to webhook:', error);
      throw new Error('Failed to send order to webhook');
    }
  }
};