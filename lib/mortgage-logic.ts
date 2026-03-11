export interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export const calculateMortgage = (
  principal: number,
  annualRate: number,
  years: number
) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  let remainingBalance = principal;
  const schedule: AmortizationRow[] = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    schedule.push({
      period: i,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return { monthlyPayment, schedule };
};