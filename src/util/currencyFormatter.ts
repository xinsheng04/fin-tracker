export default function formatCurrency(amount: number, currency: string='USD', locale: string='en-US') {
  console.log(amount);
  const abs = Math.abs(amount); 

  if (abs>= 1e9){ 
    return new Intl.NumberFormat(locale,{style:'currency',currency,maximumFractionDigits:2}).format(amount/1e9)+"B";
  }

  if (abs>=1e6){
    return new Intl.NumberFormat(locale,{style:'currency',currency,maximumFractionDigits:2}).format(amount/1e6)+"M";

  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}