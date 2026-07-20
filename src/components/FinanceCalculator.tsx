"use client";

import { useMemo, useState } from "react";

function fmtPKR(n: number) {
  return "PKR " + Math.round(n).toLocaleString("en-PK");
}

export default function FinanceCalculator() {
  const [price, setPrice] = useState(5000000);
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(5);

  const emi = useMemo(() => {
    const down = price * (downPct / 100);
    const principal = price - down;
    const annualRate = 0.16; // illustrative flat rate
    const months = years * 12;
    const monthlyRate = annualRate / 12;
    if (monthlyRate === 0) return principal / months;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  }, [price, downPct, years]);

  return (
    <section id="finance" className="py-24">
      <div className="wrap grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="text-red font-mono text-xs tracking-[0.2em] mb-3">FINANCE CALCULATOR</div>
          <h2 className="text-[28px] md:text-4xl mb-4">Estimate your monthly installment</h2>
          <p className="text-gray text-[15px] leading-relaxed max-w-[440px] mb-4">
            Get a quick, illustrative estimate of your monthly car payment. Our
            team can walk you through real bank offers once you&apos;re ready.
          </p>
          <p className="text-xs text-gray-light">
            * Illustrative flat rate of 16% annually — actual rates vary by
            bank. Not a loan offer.
          </p>
        </div>

        <div className="bg-white border border-line rounded-2xl p-8 shadow-xl">
          <div className="mb-6">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Car Price</span>
              <span className="font-mono text-red">{fmtPKR(price)}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={30000000}
              step={100000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-red"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Down Payment</span>
              <span className="font-mono text-red">{downPct}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={70}
              step={5}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="w-full accent-red"
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Tenure</span>
              <span className="font-mono text-red">{years} {years === 1 ? "Year" : "Years"}</span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-red"
            />
          </div>

          <div className="bg-off rounded-xl p-5 text-center">
            <div className="text-xs uppercase tracking-wider text-gray font-bold mb-1.5">
              Estimated Monthly Installment
            </div>
            <div className="font-mono font-bold text-red text-3xl">{fmtPKR(emi)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
