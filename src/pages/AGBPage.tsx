import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Scale, Shield, CreditCard, Truck, AlertTriangle } from 'lucide-react';

const AGBPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('agb.title')}</h1>
        <p className="text-lg text-primary-600 mb-8">{t('agb.validFrom')}</p>
        
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section1.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    {t('agb.section1.content1')}
                  </p>
                  <p>
                    <strong>{t('agb.section1.provider')}</strong><br />
                    {t('agb.section1.company')}<br />
                    {t('agb.section1.email')}
                  </p>
                  <p>
                    {t('agb.section1.content2')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <Scale className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section2.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    {t('agb.section2.content1')}
                  </p>
                  <p>
                    {t('agb.section2.content2')}
                  </p>
                  <p>
                    {t('agb.section2.content3')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section3.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    {t('agb.section3.content1')}
                  </p>
                  <p>
                    <strong>{t('agb.section3.paymentMethods')}</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t('agb.section3.bankTransfer')}</li>
                    <li>{t('agb.section3.creditCard')}</li>
                  </ul>
                  <p>
                    {t('agb.section3.paymentTerms')}
                  </p>
                  <p>
                    <strong>{t('agb.section3.bankDetails')}</strong><br />
                    {t('agb.section3.iban')}<br />
                    {t('agb.section3.bic')}<br />
                    {t('agb.section3.recipient')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <Truck className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section4.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    {t('agb.section4.content1')}
                  </p>
                  <p>
                    <strong>{t('agb.section4.deliveryTimes')}</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t('agb.section4.germany')}</li>
                    <li>{t('agb.section4.austria')}</li>
                    <li>{t('agb.section4.switzerland')}</li>
                    <li>{t('agb.section4.eu')}</li>
                    <li>{t('agb.section4.norway')}</li>
                  </ul>
                  <p>
                    {t('agb.section4.shipping')}
                  </p>
                  <p>
                    {t('agb.section4.availability')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section5.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    <strong>{t('agb.section5.instruction')}</strong>
                  </p>
                  <p>
                    {t('agb.section5.right')}
                  </p>
                  <p>
                    {t('agb.section5.period')}
                  </p>
                  <p>
                    {t('agb.section5.exercise')}
                  </p>
                  <p>
                    <strong>{t('agb.section5.consequences')}</strong>
                  </p>
                  <p>
                    {t('agb.section5.refund')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section6.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    {t('agb.section6.legal')}
                  </p>
                  <p>
                    <strong>{t('agb.section6.manufacturer')}</strong>
                  </p>
                  <p>
                    {t('agb.section6.warranty')}
                  </p>
                  <p>
                    {t('agb.section6.coverage')}
                  </p>
                  <p>
                    {t('agb.section6.exclusions')}
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t('agb.section6.misuse')}</li>
                    <li>{t('agb.section6.wear')}</li>
                    <li>{t('agb.section6.accidents')}</li>
                    <li>{t('agb.section6.repairs')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section7.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    {t('agb.section7.unlimited')}
                  </p>
                  <p>
                    {t('agb.section7.limited')}
                  </p>
                  <p>
                    {t('agb.section7.excluded')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section8.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    {t('agb.section8.processing')}
                  </p>
                  <p>
                    {t('agb.section8.details')}
                  </p>
                  <p>
                    {t('agb.section8.usage')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 9 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <Scale className="h-6 w-6 text-primary-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('agb.section9.title')}</h2>
                <div className="text-primary-600 space-y-3">
                  <p>
                    <strong>{t('agb.section9.law')}</strong><br />
                    {t('agb.section9.germanLaw')}
                  </p>
                  <p>
                    <strong>{t('agb.section9.jurisdiction')}</strong><br />
                    {t('agb.section9.court')}
                  </p>
                  <p>
                    <strong>{t('agb.section9.severability')}</strong><br />
                    {t('agb.section9.validity')}
                  </p>
                  <p>
                    <strong>{t('agb.section9.changes')}</strong><br />
                    {t('agb.section9.modification')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-primary-700 mb-3">
            <strong>{t('agb.contact.title')}</strong>
          </p>
          <p className="text-primary-600">
            {t('agb.contact.description')}<br />
            {t('agb.contact.email')}
          </p>
          <p className="text-primary-600 text-sm mt-4">
            {t('agb.contact.lastUpdated')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AGBPage;