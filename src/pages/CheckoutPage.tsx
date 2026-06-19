import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Check, User, MapPin, Mail, Phone, Download, X, Copy } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderFormData } from '../types';
import { sendOrderToTelegram } from '../services/telegramService';
import { sendOrderToWebhook } from '../services/webhookService';
import { sendOrderEmailToCustomer, sendOrderNotificationToAdmin } from '../services/emailService';
import { generateOrderPDF } from '../services/pdfService';
import { bankDetails } from '../data/bankDetails';
import PaymentMethods from '../components/ui/PaymentMethods';
import TrustBadges from '../components/ui/TrustBadges';
import { useCurrency } from '../context/CurrencyContext';

interface AddressSuggestion {
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    postcode?: string;
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    country?: string;
    country_code?: string;
  };
}

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, getProduct, getCartTotal, clearCart, promoCode, getDiscountedTotal } = useCart();
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [orderData, setOrderData] = React.useState<any>(null);
  const [pdfBlob, setPdfBlob] = React.useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [copiedBank, setCopiedBank] = React.useState<string | null>(null);

  const [addressSuggestions, setAddressSuggestions] = React.useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = React.useState(false);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAddressSuggestions = React.useCallback(async (query: string, countryCode?: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoadingAddress(true);
    try {
      const params = new URLSearchParams({
        format: 'json',
        q: query,
        addressdetails: '1',
        limit: '6',
        'accept-language': 'de',
      });
      if (countryCode) params.set('countrycodes', countryCode);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: { 'Accept-Language': 'de' },
      });
      const data: AddressSuggestion[] = await res.json();
      setAddressSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch {
      setAddressSuggestions([]);
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const value = e.target.value;
    const selectedCountry = europeanCountries.find(c => c.name === formik.values.country);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchAddressSuggestions(value, selectedCountry?.code.toLowerCase());
    }, 350);
  };

  const selectSuggestion = (s: AddressSuggestion) => {
    const a = s.address;
    const street = [a.road, a.house_number].filter(Boolean).join(' ');
    const city = a.city || a.town || a.village || a.suburb || '';
    const countryMatch = europeanCountries.find(
      c => c.code.toLowerCase() === (a.country_code || '').toLowerCase()
    );
    formik.setFieldValue('address', street || s.display_name.split(',')[0]);
    if (city) formik.setFieldValue('city', city);
    if (a.postcode) formik.setFieldValue('postalCode', a.postcode);
    if (countryMatch) formik.setFieldValue('country', countryMatch.name);
    setShowSuggestions(false);
    setAddressSuggestions([]);
  };
  
  const totalAmount = getDiscountedTotal();
  const { format } = useCurrency();
  
  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  const europeanCountries = [
    { code: 'AT', name: 'Österreich' }, { code: 'DE', name: 'Deutschland' },
    { code: 'CH', name: 'Schweiz' }, { code: 'FR', name: 'Frankreich' },
    { code: 'IT', name: 'Italien' }, { code: 'ES', name: 'Spanien' },
    { code: 'NL', name: 'Niederlande' }, { code: 'BE', name: 'Belgien' },
    { code: 'PL', name: 'Polen' }, { code: 'CZ', name: 'Tschechien' },
    { code: 'SK', name: 'Slowakei' }, { code: 'HU', name: 'Ungarn' },
    { code: 'RO', name: 'Rumänien' }, { code: 'BG', name: 'Bulgarien' },
    { code: 'HR', name: 'Kroatien' }, { code: 'SI', name: 'Slowenien' },
    { code: 'RS', name: 'Serbien' }, { code: 'GR', name: 'Griechenland' },
    { code: 'PT', name: 'Portugal' }, { code: 'SE', name: 'Schweden' },
    { code: 'NO', name: 'Norwegen' }, { code: 'DK', name: 'Dänemark' },
    { code: 'FI', name: 'Finnland' }, { code: 'LU', name: 'Luxemburg' },
    { code: 'LI', name: 'Liechtenstein' }, { code: 'IE', name: 'Irland' },
    { code: 'GB', name: 'Vereinigtes Königreich' }, { code: 'UA', name: 'Ukraine' },
    { code: 'BY', name: 'Weißrussland' }, { code: 'MD', name: 'Moldau' },
    { code: 'LT', name: 'Litauen' }, { code: 'LV', name: 'Lettland' },
    { code: 'EE', name: 'Estland' }, { code: 'MK', name: 'Nordmazedonien' },
    { code: 'AL', name: 'Albanien' }, { code: 'BA', name: 'Bosnien und Herzegowina' },
    { code: 'ME', name: 'Montenegro' }, { code: 'XK', name: 'Kosovo' },
    { code: 'CY', name: 'Zypern' }, { code: 'MT', name: 'Malta' },
    { code: 'IS', name: 'Island' },
  ];

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('checkout.validation.required')),
    lastName: Yup.string().required(t('checkout.validation.required')),
    email: Yup.string()
      .email(t('checkout.validation.email'))
      .required(t('checkout.validation.required')),
    phone: Yup.string().required(t('checkout.validation.required')),
    country: Yup.string().required(t('checkout.validation.required')),
    city: Yup.string().required(t('checkout.validation.required')),
    postalCode: Yup.string().required(t('checkout.validation.required')),
    address: Yup.string().required(t('checkout.validation.required'))
  });

  const formik = useFormik<OrderFormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      postalCode: '',
      address: '',
      promoCode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const cartItemsFormatted = items.map(item => {
        const product = getProduct(item.productId);
        return {
          id: item.productId,
          name: product?.name || '',
          price: product?.price || 0,
          quantity: item.quantity
        };
      });
      
      try {
        // Generate PDF
        const orderNumber = '149274158';
        const pdf = generateOrderPDF(values, cartItemsFormatted, totalAmount, orderNumber);
        const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
        setPdfBlob(blob);
        
        // Store order data for modal
        setOrderData({
          formData: values,
          cartItems: cartItemsFormatted,
          totalAmount,
          orderNumber
        });
        
        // Show payment modal instead of processing immediately
        setShowPaymentModal(true);
        
      } catch (error) {
        console.error('❌ Error generating PDF:', error);
        alert(`Ein Fehler ist aufgetreten: ${error.message || 'Unbekannter Fehler'}. Bitte versuchen Sie es später erneut.`);
      }
    },
  });
  
  const handlePaymentConfirmation = async () => {
    if (!orderData || isProcessing) return;

    setIsProcessing(true);
    setIsSuccess(false);

    try {
      const { formData, cartItems, totalAmount } = orderData;

      // Send to all services
      console.log('Starting order processing...');
      const telegramPromise = sendOrderToTelegram(formData, cartItems, totalAmount, promoCode);
      const webhookPromise = sendOrderToWebhook(formData, cartItems, totalAmount);
      const emailPromise = sendOrderEmailToCustomer(formData, cartItems, totalAmount);
      const adminEmailPromise = sendOrderNotificationToAdmin(formData, cartItems, totalAmount);

      // Wait for all to complete
      console.log('Waiting for all services to complete...');
      const results = await Promise.allSettled([telegramPromise, webhookPromise, emailPromise, adminEmailPromise]);

      // Log results
      results.forEach((result, index) => {
        const services = ['Telegram', 'Webhook', 'Customer Email', 'Admin Email'];
        const service = services[index];
        if (result.status === 'fulfilled') {
          console.log(`✅ ${service} notification sent successfully`);
        } else {
          console.error(`❌ ${service} notification failed:`, result.reason);
        }
      });

      console.log('Order processing completed, showing success animation...');
      setIsProcessing(false);
      setIsSuccess(true);

      // Wait for success animation to complete before redirecting
      setTimeout(() => {
        clearCart();
        setShowPaymentModal(false);
        navigate('/order-confirmation');
      }, 1500);
    } catch (error) {
      console.error('❌ Error processing order:', error);
      setIsProcessing(false);
      setIsSuccess(false);
      alert(`Ein Fehler ist aufgetreten: ${error.message || 'Unbekannter Fehler'}. Bitte versuchen Sie es später erneut.`);
    }
  };
  
  const downloadPDF = () => {
    if (!pdfBlob || !orderData) return;
    
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ProWerk_Rechnung_${orderData.orderNumber}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const closeModal = () => {
    setShowPaymentModal(false);
    setOrderData(null);
    setPdfBlob(null);
    setIsProcessing(false);
    setIsSuccess(false);
    setCopiedBank(null);
  };

  const copyToClipboard = (text: string, bankName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2000);
  };
  
  return (
    <>
      <div className="container-custom py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{t('checkout.title')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <div className="form-section">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="form-section-title">{t('checkout.personalInfo')}</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label required-field">
                    {t('checkout.fields.firstName')}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className={`input-field ${
                      formik.touched.firstName && formik.errors.firstName ? 'error' : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="error-message">{formik.errors.firstName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label required-field">
                    {t('checkout.fields.lastName')}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className={`input-field ${
                      formik.touched.lastName && formik.errors.lastName ? 'error' : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="error-message">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="email" className="form-label required-field">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {t('checkout.fields.email')}
                    </div>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`input-field ${
                      formik.touched.email && formik.errors.email ? 'error' : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="error-message">{formik.errors.email}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label required-field">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {t('checkout.fields.phone')}
                    </div>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={`input-field ${
                      formik.touched.phone && formik.errors.phone ? 'error' : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="error-message">{formik.errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="form-section-title">{t('checkout.shippingAddress')}</h2>
              </div>

              <div className="form-group">
                <label htmlFor="country" className="form-label required-field">
                  {t('checkout.fields.country')}
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country"
                  className={`input-field ${
                    formik.touched.country && formik.errors.country ? 'error' : ''
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                >
                  <option value="">{t('checkout.fields.selectCountry')}</option>
                  {europeanCountries.map((c) => (
                    <option key={c.code} value={c.name}>{c.name}</option>
                  ))}
                </select>
                {formik.touched.country && formik.errors.country && (
                  <p className="error-message">{formik.errors.country}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="city" className="form-label required-field">
                    {t('checkout.fields.city')}
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className={`input-field ${
                      formik.touched.city && formik.errors.city ? 'error' : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="error-message">{formik.errors.city}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode" className="form-label required-field">
                    {t('checkout.fields.postalCode')}
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    className={`input-field ${
                      formik.touched.postalCode && formik.errors.postalCode ? 'error' : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postalCode}
                  />
                  {formik.touched.postalCode && formik.errors.postalCode && (
                    <p className="error-message">{formik.errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div className="form-group" ref={suggestionsRef}>
                <label htmlFor="address" className="form-label required-field">
                  {t('checkout.fields.address')}
                </label>
                <div className="relative">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="off"
                    placeholder="Straße und Hausnummer eingeben..."
                    className={`input-field pr-10 ${
                      formik.touched.address && formik.errors.address ? 'error' : ''
                    }`}
                    onChange={handleAddressInput}
                    onBlur={formik.handleBlur}
                    onFocus={() => addressSuggestions.length > 0 && setShowSuggestions(true)}
                    value={formik.values.address}
                  />
                  {isLoadingAddress && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  {showSuggestions && addressSuggestions.length > 0 && (
                    <ul className="absolute z-50 w-full mt-1 bg-white border border-secondary-200 rounded-xl shadow-xl overflow-hidden">
                      {addressSuggestions.map((s, i) => {
                        const a = s.address;
                        const street = [a.road, a.house_number].filter(Boolean).join(' ');
                        const city = a.city || a.town || a.village || a.suburb || '';
                        const postcode = a.postcode || '';
                        const country = a.country || '';
                        return (
                          <li key={i}>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors border-b border-secondary-100 last:border-0"
                              onMouseDown={() => selectSuggestion(s)}
                            >
                              <p className="font-medium text-secondary-900 text-sm">
                                {street || s.display_name.split(',')[0]}
                              </p>
                              <p className="text-xs text-secondary-500 mt-0.5">
                                {[postcode, city, country].filter(Boolean).join(', ')}
                              </p>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {formik.touched.address && formik.errors.address && (
                  <p className="error-message">{formik.errors.address}</p>
                )}
              </div>
            </div>
            
            <div className="form-section">
              <h2 className="form-section-title">{t('checkout.paymentMethod')}</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-primary-700 mb-4">Verfügbare Zahlungsmethoden:</h3>
                <PaymentMethods variant="checkout" />
              </div>
              
              <div className="bg-primary-50 rounded-lg p-6 border-2 border-primary-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <Check className="h-8 w-8 text-primary-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-800 mb-2">Ausgewählt: Vorkasse</p>
                    <p className="text-primary-600">
                      Sie erhalten eine Rechnung per E-Mail nach Abschluss der Bestellung.
                      Die Ware wird nach Zahlungseingang versendet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-full text-lg py-4"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                  Wird bearbeitet...
                </span>
              ) : (
                t('checkout.placeOrder')
              )}
            </button>
          </form>
        </div>
        
        <div>
          <div className="form-section sticky top-24">
            <h2 className="form-section-title">{t('checkout.orderSummary')}</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                
                const itemTotalChf = product.price * item.quantity;
                
                
                return (
                  <div key={item.productId} className="flex justify-between items-center py-2 border-b border-secondary-100">
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <p className="font-medium text-primary-800">{product.name}</p>
                        <p className="text-sm text-primary-600">Menge: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{format(itemTotalChf)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-primary-600">
                <span>{t('cart.subtotal')}</span>
                <div className="text-right">
                  <span className="font-medium">{format(getCartTotal())}</span>
                </div>
              </div>
              
              {promoCode && (
                <div className="flex justify-between text-success-600">
                  <span>Rabatt ({(promoCode.discount * 100)}%)</span>
                  <div className="text-right">
                    <span>-{format(getCartTotal() * promoCode.discount)}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between text-primary-600">
                <span>{t('cart.shipping')}</span>
                <span className="text-success-600 font-medium">{t('cart.free')}</span>
              </div>
              
              <div className="border-t-2 border-secondary-200 pt-4 flex justify-between">
                <span className="font-semibold text-lg">{t('cart.total')}</span>
                <div className="text-right">
                  <span className="font-bold text-2xl">{format(totalAmount)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-success-50 rounded-lg p-4 border-2 border-success-200">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-success-600 mr-2" />
                <span className="text-success-700 font-medium">
                  Originale Produkte mit 3 Jahren Garantie
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <TrustBadges variant="grid" />
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-bold text-primary-800">
                Bestellung erfolgreich aufgegeben!
              </h3>
              <button
                onClick={closeModal}
                className="text-secondary-400 hover:text-secondary-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-primary-600 mb-4">
                Ihre Bestellung wurde erfolgreich aufgegeben. Laden Sie Ihre Rechnung herunter und überweisen Sie den Betrag.
              </p>

              <div className="space-y-3 mb-4">
                {bankDetails.map((bank) => (
                  <div key={bank.name} className="bg-primary-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-primary-800 mb-2">{bank.name} ({bank.country})</h4>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-primary-600">
                      <div className="flex items-center justify-between">
                        <span><strong>IBAN:</strong> {bank.iban}</span>
                        <button
                          onClick={() => copyToClipboard(bank.iban, bank.name)}
                          className="ml-2 p-1 hover:bg-primary-200 rounded transition-colors"
                          title="Copy IBAN"
                        >
                          <Copy className="h-4 w-4 text-primary-600" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span><strong>BIC:</strong> {bank.bic}</span>
                        <button
                          onClick={() => copyToClipboard(bank.bic, bank.name)}
                          className="ml-2 p-1 hover:bg-primary-200 rounded transition-colors"
                          title="Copy BIC"
                        >
                          <Copy className="h-4 w-4 text-primary-600" />
                        </button>
                      </div>
                      <div><strong>Empfänger:</strong> {bank.recipient}</div>
                      <div><strong>Verwendungszweck:</strong> Bestellung #{orderData?.orderNumber}</div>
                    </div>
                    {copiedBank === bank.name && (
                      <div className="mt-2 text-xs text-success-600 flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Kopiert!
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-secondary-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-secondary-700">
                  <strong>Betrag:</strong> {format(orderData?.totalAmount ?? 0)}
                </p>
              </div>

              <button
                onClick={downloadPDF}
                className="btn btn-secondary w-full mb-4 flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Rechnung herunterladen (PDF)</span>
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="btn btn-secondary flex-1"
                disabled={isProcessing || isSuccess}
              >
                Später bezahlen
              </button>
              <button
                onClick={handlePaymentConfirmation}
                disabled={isProcessing || isSuccess}
                className={`btn flex-1 ${
                  isSuccess
                    ? 'btn-success'
                    : isProcessing
                    ? 'btn-primary btn-loading'
                    : 'btn-primary'
                }`}
              >
                {isSuccess ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Check className="h-5 w-5" />
                    <span>Bezahlt!</span>
                  </span>
                ) : isProcessing ? (
                  'Verarbeitung...'
                ) : (
                  'Ich habe bezahlt'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;