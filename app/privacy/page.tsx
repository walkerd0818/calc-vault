import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-slate-700">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">1. Data Collection</h2>
          <p>
            CalcVault does not collect or store personal financial data. All calculations 
            performed in our tools (such as mortgage amounts or interest rates) are 
            processed locally in your browser.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">2. Google AdSense & Cookies</h2>
          <p>
            We use third-party advertising companies to serve ads when you visit our website. 
            These companies may use information (not including your name, address, or email) 
            about your visits to this and other websites in order to provide advertisements 
            about goods and services of interest to you.
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Google, as a third-party vendor, uses cookies to serve ads on this site.</li>
            <li>Google's use of the DART cookie enables it to serve ads based on your visit to this site and other sites on the Internet.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">3. External Links</h2>
          <p>
            Our site may contain links to other websites. We are not responsible for the 
            privacy practices or content of such websites.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">4. Log Files</h2>
          <p>
            Like many other Web sites, CalcVault makes use of log files. The information 
            inside the log files includes internet protocol (IP) addresses, type of browser, 
            and date/time stamps.
          </p>
        </div>

        <div className="p-4 bg-slate-100 rounded-lg text-sm italic">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </section>
    </div>
  );
}