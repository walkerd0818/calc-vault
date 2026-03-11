'use client';

import React from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PaymentStep {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface AmortizationTableProps {
  data: PaymentStep[];
  loanAmount: number;
  calculatorName: string;
}

export default function AmortizationTable({ data, loanAmount, calculatorName }: AmortizationTableProps) {
  
  // Export to Excel Logic
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(row => ({
      "Period": row.period,
      "Payment ($)": row.payment.toFixed(2),
      "Principal ($)": row.principal.toFixed(2),
      "Interest ($)": row.interest.toFixed(2),
      "Balance ($)": row.remainingBalance.toFixed(2),
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Amortization");
    XLSX.writeFile(workbook, `${calculatorName.replace(/\s+/g, '_')}_Schedule.xlsx`);
  };

  // Export to PDF Logic
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(calculatorName, 14, 15);
    doc.setFontSize(10);
    doc.text(`Total Loan Amount: $${loanAmount.toLocaleString()}`, 14, 22);
    
    autoTable(doc, {
      startY: 30,
      head: [['Period', 'Payment', 'Principal', 'Interest', 'Balance']],
      body: data.map(row => [
        row.period,
        `$${row.payment.toFixed(2)}`,
        `$${row.principal.toFixed(2)}`,
        `$${row.interest.toFixed(2)}`,
        `$${row.remainingBalance.toFixed(2)}`
      ]),
    });
    doc.save(`${calculatorName.replace(/\s+/g, '_')}_Schedule.pdf`);
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Amortization Schedule</h3>
          <p className="text-sm text-slate-500">Breakdown of payments over the life of the loan.</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition"
          >
            <FileSpreadsheet size={16} /> Excel
          </button>
          <button 
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition"
          >
            <FileText size={16} /> PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold">
            <tr>
              <th className="px-6 py-3">Period</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Principal</th>
              <th className="px-6 py-3">Interest</th>
              <th className="px-6 py-3">Remaining Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => (
              <tr key={row.period} className="hover:bg-slate-50 transition">
                <td className="px-6 py-3 font-medium">{row.period}</td>
                <td className="px-6 py-3">${row.payment.toFixed(2)}</td>
                <td className="px-6 py-3 text-emerald-600">${row.principal.toFixed(2)}</td>
                <td className="px-6 py-3 text-red-500">${row.interest.toFixed(2)}</td>
                <td className="px-6 py-3 font-semibold">${row.remainingBalance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}