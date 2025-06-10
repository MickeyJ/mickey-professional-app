import { CardSimple } from '@/_components/fao/components/card-simple';

export default function FAOExplorerLandingPage() {
  return (
    <div className="min-h-screen bg-base-1-bg">
      {/* Hero Section */}
      <section className="bg-base-3-bg border-b border-base-2-brdr section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6 md:mb-8">
            FAO Global Agricultural Data Explorer
          </h1>
          <p className="text-lg md:text-xl text-base-3-txt mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed">
            Comprehensive access to 84 Food and Agriculture Organization datasets spanning
            production, trade, environmental indicators, and food security metrics from 1961 to
            2024.
          </p>
          <button className="btn-primary-research">Explore Now</button>
        </div>
      </section>

      {/* Data Scope Overview */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding">
          <h2 className="text-2xl md:text-3xl font-bold text-base-content text-center mb-8 md:mb-12 lg:mb-16">
            Research-Grade Agricultural Intelligence
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-10 mb-12 md:mb-16 lg:mb-20">
            <div className="stat-card">
              <div className="stat-number">84</div>
              <div className="stat-label">Integrated Datasets</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">195+</div>
              <div className="stat-label">Countries & Territories</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">60+</div>
              <div className="stat-label">Years of Historical Data</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15M+</div>
              <div className="stat-label">Data Points</div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Applications */}
      <section className="section-spacing bg-base-2-bg">
        <div className="max-w-6xl mx-auto container-padding">
          <h2 className="text-2xl md:text-3xl font-bold text-base-content text-center mb-4 md:mb-6">
            Real-World Research Applications
          </h2>
          <p className="text-base md:text-lg text-base-2-txt text-center mb-8 md:mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed">
            This integrated database has proven invaluable for addressing complex questions in
            agricultural economics, environmental policy, and food security research.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {/* Use Case 1 */}
            <CardSimple
              title="Environmental Justice Litigation"
              subtitle="Agricultural Pollution Impact Assessment"
              body="Cross-referencing production intensity data with environmental emissions indicators to quantify agricultural pollution impacts in landmark legal cases, such as water quality litigation in agricultural watersheds."
              image_alt_text="Agricultural Watershed Image"
              meta_text={
                <>
                  <strong>Datasets utilized:</strong>
                  {' Production data, emissions indicators, land use patterns'}
                </>
              }
            />
            {/* Use Case 2 */}
            <CardSimple
              title="Climate Resilience Research"
              subtitle="Temperature-Yield Correlation Analysis"
              body="Analyzing the relationship between climate variables and agricultural productivity across different regions to inform adaptation strategies and policy recommendations for sustainable agriculture."
              image_alt_text="Climate Data Visualization"
              meta_text={
                <>
                  <strong>Datasets utilized:</strong>
                  {' Temperature data, crop yields, production indices'}
                </>
              }
            />

            {/* Use Case 3 */}
            <CardSimple
              title="Trade Policy Analysis"
              subtitle="Market Integration and Food Security"
              body="Examining how trade policies affect food security outcomes by analyzing the correlation between trade flows, domestic production, and nutritional indicators across developing nations."
              image_alt_text="Global Trade Flow Map"
              meta_text={
                <>
                  <strong>Datasets utilized:</strong>
                  {' Trade matrices, food security indicators, nutrition data'}
                </>
              }
            />
            {/* Use Case 4 */}
            <CardSimple
              title="Agricultural Economics"
              subtitle="Price Volatility and Market Stability"
              body="Quantifying the impact of global events on commodity price stability by comparing volatility patterns before and after major disruptions, informing risk management strategies for agricultural markets."
              image_alt_text="Price Volatility Chart"
              meta_text={
                <>
                  <strong>Datasets utilized:</strong>
                  {' Price indices, trade data, production statistics'}
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Data Categories */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding">
          <h2 className="text-2xl md:text-3xl font-bold text-base-content text-center mb-8 md:mb-12 lg:mb-16">
            Comprehensive Data Coverage
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="category-card">
              <h3 className="category-title">Production & Trade</h3>
              <ul className="category-list">
                <li>• Crop and livestock production</li>
                <li>• International trade flows</li>
                <li>• Supply utilization accounts</li>
                <li>• Production indices</li>
              </ul>
            </div>

            <div className="category-card">
              <h3 className="category-title">Environmental Impact</h3>
              <ul className="category-list">
                <li>• Greenhouse gas emissions</li>
                <li>• Land use and cover changes</li>
                <li>• Pesticide and fertilizer use</li>
                <li>• Temperature and climate data</li>
              </ul>
            </div>

            <div className="category-card">
              <h3 className="category-title">Food Security</h3>
              <ul className="category-list">
                <li>• Nutritional indicators</li>
                <li>• Food balance sheets</li>
                <li>• Household consumption data</li>
                <li>• Cost of healthy diets</li>
              </ul>
            </div>

            <div className="category-card">
              <h3 className="category-title">Economic Indicators</h3>
              <ul className="category-list">
                <li>• Producer and consumer prices</li>
                <li>• Investment in agriculture</li>
                <li>• Government expenditure</li>
                <li>• Exchange rates</li>
              </ul>
            </div>

            <div className="category-card">
              <h3 className="category-title">Demographics</h3>
              <ul className="category-list">
                <li>• Population statistics</li>
                <li>• Agricultural employment</li>
                <li>• Rural development indicators</li>
                <li>• Gender-disaggregated data</li>
              </ul>
            </div>

            <div className="category-card">
              <h3 className="category-title">Innovation & Technology</h3>
              <ul className="category-list">
                <li>• Agricultural research investment</li>
                <li>• Technology adoption rates</li>
                <li>• Machinery and equipment</li>
                <li>• Irrigation infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing bg-base-3-bg border-t border-base-2-brdr">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-6 md:mb-8">
            Begin Your Research Journey
          </h2>
          <p className="text-base md:text-lg text-base-3-txt mb-8 md:mb-10 leading-relaxed">
            Access interactive visualizations and analysis tools designed for rigorous academic
            research and policy development.
          </p>
          <button className="btn-primary-research">Explore Now</button>
        </div>
      </section>
    </div>
  );
}
