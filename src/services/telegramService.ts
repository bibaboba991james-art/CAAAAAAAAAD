import axios from 'axios';
import { OrderFormData } from '../types';

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const sendOrderToTelegram = async (
  formData: OrderFormData,
  cartItems: { id: string; name: string; price: number; quantity: number }[],
  totalAmount: number,
  promoCode?: { code: string; discount: number } | null
) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram не настроен.');
  }

  const message = formatTelegramMessage(formData, cartItems, totalAmount, promoCode);

  const response = await axios.post(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }
  );

  return response.data.ok;
};

const formatTelegramMessage = (
  formData: OrderFormData,
  cartItems: { id: string; name: string; price: number; quantity: number }[],
  totalAmount: number,
  promoCode?: { code: string; discount: number } | null
) => {
  const { firstName, lastName, email, phone, city, postalCode, address } = formData;

  const now = new Date();
  const dateStr = now.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  let message = `🛒 <b>НОВЫЙ ЗАКАЗ</b>\n`;
  message += `📅 ${dateStr}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `👤 <b>Покупатель:</b>\n`;
  message += `• Имя: <b>${firstName} ${lastName}</b>\n`;
  message += `• Email: ${email}\n`;
  message += `• Телефон: <b>${phone}</b>\n\n`;

  message += `📦 <b>Адрес доставки:</b>\n`;
  message += `• Город: ${city}\n`;
  message += `• Индекс: ${postalCode}\n`;
  message += `• Адрес: ${address}\n\n`;

  message += `🛍 <b>Заказанные товары:</b>\n`;

  let subtotal = 0;
  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    message += `• ${item.name}\n`;
    message += `  ${item.quantity} шт. × CHF ${item.price.toFixed(2)} = <b>CHF ${itemTotal.toFixed(2)}</b>\n`;
  });

  message += `\n💰 <b>Итог:</b>\n`;
  message += `• Подытог: CHF ${subtotal.toFixed(2)}\n`;

  if (promoCode) {
    const discountAmount = subtotal * promoCode.discount;
    message += `• Промокод: <code>${promoCode.code}</code> (-${(promoCode.discount * 100).toFixed(0)}%)\n`;
    message += `• Скидка: -CHF ${discountAmount.toFixed(2)}\n`;
  }

  message += `• Доставка: Бесплатно\n`;
  message += `\n💳 <b>К оплате: CHF ${totalAmount.toFixed(2)}</b>\n`;
  message += `  (≈ €${(totalAmount * 1.07).toFixed(2)})\n\n`;
  message += `💡 Способ оплаты: Предоплата (банковский перевод)`;

  return message;
};
