import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, RefreshCw, FileText, AlertCircle } from 'lucide-react';

const ReturnPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('returnPolicy.title')}</h1>
        <p className="text-lg text-primary-600 mb-8">{t('returnPolicy.subtitle')}</p>
        
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-primary-800" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{t('returnPolicy.warranty.title')}</h2>
                <p className="text-primary-600">
                  {t('returnPolicy.warranty.description')}
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1 text-primary-600">
                  <li>Die Garantie deckt alle Herstellungsfehler und Materialdefekte ab.</li>
                  <li>Bei Defekten innerhalb der Garantiezeit erfolgt eine kostenlose Reparatur oder ein Austausch.</li>
                  <li>Schäden durch unsachgemäße Nutzung, Unfälle oder normale Abnutzung sind von der Garantie ausgeschlossen.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <RefreshCw className="h-6 w-6 text-primary-800" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{t('returnPolicy.returns.title')}</h2>
                <p className="text-primary-600">
                  {t('returnPolicy.returns.description')}
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1 text-primary-600">
                  <li>Die 14-tägige Widerrufsfrist beginnt am Tag nach Erhalt der Ware.</li>
                  <li>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung über Ihren Entschluss informieren.</li>
                  <li>Die Ware muss in unbenutztem Zustand und in der Originalverpackung zurückgeschickt werden.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-primary-800" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{t('returnPolicy.process.title')}</h2>
                <p className="text-primary-600">
                  {t('returnPolicy.process.description')}
                </p>
                <ol className="list-decimal pl-6 mt-3 space-y-1 text-primary-600">
                  <li>Kontaktieren Sie uns per E-Mail unter info@prowerkgm.ch mit Ihrer Bestellnummer und dem Grund für die Rückgabe.</li>
                  <li>Wir senden Ihnen ein Rücksendeetikett und weitere Anweisungen.</li>
                  <li>Verpacken Sie den Artikel sorgfältig in der Originalverpackung.</li>
                  <li>Senden Sie den Artikel mit dem bereitgestellten Etikett zurück.</li>
                  <li>Nach Erhalt und Prüfung der Ware erstatten wir den Kaufpreis zurück.</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-primary-800" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{t('returnPolicy.conditions.title')}</h2>
                <p className="text-primary-600">
                  {t('returnPolicy.conditions.description')}
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1 text-primary-600">
                  <li>Alle Artikel müssen unbeschädigt, unbenutzt und in der Originalverpackung sein.</li>
                  <li>Alle Zubehörteile, Handbücher und Garantiekarten müssen enthalten sein.</li>
                  <li>Sonderanfertigungen und personalisierte Produkte sind vom Umtausch ausgeschlossen.</li>
                  <li>Die Kosten für die Rücksendung werden von uns übernommen.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-primary-700 mb-3">
            <strong>Rechtliche Hinweise:</strong>
          </p>
          <p className="text-primary-600 text-sm">
            Diese Rückgabe- und Garantiebedingungen entsprechen den gesetzlichen Bestimmungen der EU-Richtlinie 2011/83/EU über Verbraucherrechte und den entsprechenden nationalen Gesetzen. Für weitere Informationen kontaktieren Sie uns bitte unter info@prowerkgm.ch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;