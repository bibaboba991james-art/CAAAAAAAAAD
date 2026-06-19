export interface BankDetails {
  name: string;
  country: string;
  iban: string;
  bic: string;
  recipient: string;
}

export const bankDetails: BankDetails[] = [
  {
    name: 'UNICREDIT BANK AUSTRIA AG',
    country: 'AT',
    iban: 'AT80 1200 0100 4833 6985',
    bic: 'BKAUATWWXXX',
    recipient: 'Pro Werk'
  }
];
