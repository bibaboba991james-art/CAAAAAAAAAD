import React from 'react';
import { Building2 } from 'lucide-react';

const CompanyInfo: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 border border-secondary-700/50">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-primary-100 rounded-lg flex-shrink-0">
          <Building2 className="h-6 w-6 text-primary-800" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white mb-3">PROWERKGM LTD</h4>
          <div className="space-y-2 text-sm text-secondary-300">
            <p>
              <span className="font-semibold text-secondary-200">Company Number:</span> 16852637
            </p>
            <p>
              <span className="font-semibold text-secondary-200">Registered:</span> England and Wales
            </p>
            <p>
              <span className="font-semibold text-secondary-200">Address:</span>
              <br />
              20 Wenlock Road<br />
              London<br />
              England N1 7GU
            </p>
            <p>
              <span className="font-semibold text-secondary-200">Nature of Business:</span> Wholesale of machine tools
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
