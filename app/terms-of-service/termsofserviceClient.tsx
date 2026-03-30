'use client';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-slate-700">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using syntixgear.com (the "Site"), you agree to be bound by these 
            Terms of Service. If you do not agree with any part of these terms, you must 
            discontinue use of our tools and services immediately.
          </p>
        </div>

        <div className="border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-4 rounded-r-lg">
          <h2 className="text-xl font-bold mb-2">2. Financial Disclaimer (CalcVault)</h2>
          <p className="mb-4">
            The calculators and tools provided on this Site (collectively, "CalcVault") are for 
            <strong> informational and educational purposes only</strong>. They do not constitute 
            investment, tax, legal, or financial advice.
          </p>
          <ul className="list-disc ml-6 space-y-2 italic">
            <li><strong>No Professional Relationship:</strong> Your use of these tools does not create a fiduciary or professional relationship between you and SyntixGear.</li>
            <li><strong>Accuracy of Results:</strong> Calculations are based on user-provided data and general mathematical formulas. Results are estimates and may not reflect actual financial outcomes or real-world market conditions.</li>
            <li><strong>Seek Professional Advice:</strong> We strongly recommend consulting with a qualified financial advisor, accountant, or attorney before making any significant financial decisions based on these results.</li>
            <li><strong>Local Processing:</strong> All calculations are processed locally in your browser; we do not verify the inputs or results for accuracy or completeness.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">3. Intellectual Property</h2>
          <p>
            All content, including calculator logic, site code, and design elements, is the 
            exclusive property of SyntixGear. You may not reproduce, modify, or commercially 
            exploit any portion of the Site without express written consent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">4. Disclaimer of Warranties</h2>
          <p>
            The Site and its tools are provided "as is" and "as available." SyntixGear disclaims 
            all warranties, express or implied, including warranties of merchantability or 
            fitness for a particular purpose. We do not guarantee that the tools will be 
            uninterrupted, secure, or error-free.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, SyntixGear shall not be liable for any 
            direct, indirect, or consequential losses or damages arising from your reliance on 
            calculations or information provided by our tools. You assume sole responsibility 
            for the risks associated with your financial decisions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">6. Advertisements and Cookies</h2>
          <p>
            This Site displays ads via Google AdSense. As noted in our Privacy Policy, these 
            third parties may use cookies to serve personalized content. We have no control 
            over the content or reliability of third-party advertisements or external links.
          </p>
        </div>

        <div className="p-4 bg-slate-100 rounded-lg text-sm italic">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </section>
    </div>
  );
}
