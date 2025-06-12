export default function HomePage() {
  return (
    <div className="dashboard-content">
      {/* Welcome Section */}
      <section>
        <h1 className="section-header mb-4">Welcome to the FAO Data Explorer</h1>
        <p className="section-description max-w-3xl">
          This platform provides streamlined access to the Food and Agriculture Organization's
          comprehensive agricultural datasets through modern visualization tools and a powerful API.
        </p>
      </section>

      {/* Purpose Section */}
      <section className="section-spacing">
        <div className="info-box">
          <h2 className="chart-title">Why This Platform Exists</h2>
          <div className="space-y-3 text-base-3-txt">
            <p>
              <strong className="text-base-content">Providing easy access to powerful data:</strong>{' '}
              The FAO maintains one of the world's most comprehensive agricultural databases, but
              accessing this data programmatically has been a challenge.
            </p>
            <p>
              <strong className="text-base-content">No obvious public FAO API:</strong> Despite the
              wealth of data, there's no readily available public API for developers and researchers
              who need programmatic access.
            </p>
            <p>
              <strong className="text-base-content">The FAOSTAT API is unmaintained:</strong> The
              official FAOSTAT API has been{' '}
              <a
                href="https://github.com/FAOSTAT/faostat-api"
                target="_blank"
                rel="noopener noreferrer"
                className="link-primary"
              >
                abandoned since 2015
              </a>
              , leaving a gap in data accessibility.
            </p>
            <p>
              <strong className="text-base-content">Enhanced visualizations:</strong> This platform
              provides modern, interactive data visualizations that make it easier to explore
              patterns and insights across multiple datasets.
            </p>
          </div>
        </div>
      </section>

      {/* Current FAO Accessibility */}
      <section className="section-spacing">
        <h2 className="chart-title mb-4">FAO Data Access Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="simple-card-container">
            <h3 className="font-medium text-base-content mb-2">Official FAO Resources</h3>
            <ul className="space-y-2 text-sm text-base-3-txt">
              <li>
                •{' '}
                <a
                  href="https://www.fao.org/faostat/en/#data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-secondary"
                >
                  FAOSTAT Data Portal
                </a>{' '}
                - Browse data, basic charts, CSV downloads
              </li>
              <li>
                •{' '}
                <a
                  href="https://www.fao.org/faostat/en/#compare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-secondary"
                >
                  FAO Compare Tool
                </a>{' '}
                - Simple comparison visualizations
              </li>
              <li>
                •{' '}
                <a
                  href="https://github.com/FAOSTAT/faostat-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-3-txt hover:text-base-content underline line-through"
                >
                  FAOSTAT API
                </a>{' '}
                - Defunct, no longer maintained
              </li>
            </ul>
          </div>

          <div className="simple-card-container">
            <h3 className="font-medium text-base-content mb-2">New API & Tools</h3>
            <ul className="space-y-2 text-sm text-base-3-txt">
              <li>
                •{' '}
                <a
                  href="https://github.com/MickeyJ/fao-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-primary font-medium"
                >
                  FAO API on GitHub
                </a>{' '}
                - Modern REST API implementation
              </li>
              <li>
                •{' '}
                <a
                  href="https://zs39isn4zj.us-west-2.awsapprunner.com/docs#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-primary"
                >
                  API Documentation
                </a>{' '}
                - Interactive docs (work in progress)
              </li>
              <li>
                • <span className="text-base-content">This Dashboard</span> - Enhanced
                visualizations and cross-dataset analysis
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="section-spacing">
        <h2 className="chart-title mb-4">Database Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="stat-number">84</div>
            <div className="stat-label">FAO Datasets</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">195+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">15M+</div>
            <div className="stat-label">Data Points</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1961-2024</div>
            <div className="stat-label">Time Range</div>
          </div>
        </div>
      </section>

      {/* Most Useful Datasets */}
      <section className="section-spacing">
        <h2 className="chart-title mb-4">Popular Datasets</h2>
        <div className="dashboard-grid">
          <div className="dataset-card">
            <h3 className="dataset-title">Producer Prices</h3>
            <p className="dataset-description">
              Monthly and annual producer prices for agricultural commodities across all countries.
            </p>
            <div className="dataset-meta">
              <span className="dataset-code">PP</span>
              <span>3.2M records</span>
            </div>
          </div>

          <div className="dataset-card">
            <h3 className="dataset-title">Food Balance Sheets</h3>
            <p className="dataset-description">
              Comprehensive food supply and utilization accounts by commodity and country.
            </p>
            <div className="dataset-meta">
              <span className="dataset-code">FBS</span>
              <span>5.7M records</span>
            </div>
          </div>

          <div className="dataset-card">
            <h3 className="dataset-title">Trade Matrix</h3>
            <p className="dataset-description">
              Detailed bilateral trade flows showing imports and exports between all countries.
            </p>
            <div className="dataset-meta">
              <span className="dataset-code">TM</span>
              <span>23.4M records</span>
            </div>
          </div>

          <div className="dataset-card">
            <h3 className="dataset-title">Production Quantities</h3>
            <p className="dataset-description">
              Annual production data for crops and livestock products by country.
            </p>
            <div className="dataset-meta">
              <span className="dataset-code">QCL</span>
              <span>1.9M records</span>
            </div>
          </div>

          <div className="dataset-card">
            <h3 className="dataset-title">Climate Change</h3>
            <p className="dataset-description">
              Temperature changes, emissions, and environmental indicators by country.
            </p>
            <div className="dataset-meta">
              <span className="dataset-code">ET</span>
              <span>245K records</span>
            </div>
          </div>

          <div className="dataset-card">
            <h3 className="dataset-title">Food Security</h3>
            <p className="dataset-description">
              Nutrition indicators, food availability, and dietary energy supply data.
            </p>
            <div className="dataset-meta">
              <span className="dataset-code">FS</span>
              <span>37K records</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="section-spacing">
        <div className="callout-box">
          <h2 className="chart-title">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-accent-1-primary mb-2">1. Explore Visualizations</h3>
              <p className="text-sm text-base-3-txt">
                Use the sidebar to navigate to different analysis tools - from price comparisons to
                trade flow networks.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-accent-1-primary mb-2">2. Access the API</h3>
              <p className="text-sm text-base-3-txt">
                Check the{' '}
                <a
                  href="https://github.com/MickeyJ/fao-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent-700"
                >
                  GitHub repository
                </a>{' '}
                for API setup instructions and examples.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-accent-1-primary mb-2">3. Download Data</h3>
              <p className="text-sm text-base-3-txt">
                Each visualization includes options to export data in various formats for further
                analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section>
        <h2 className="chart-title mb-4">Recent Platform Updates</h2>
        <div className="simple-card-container">
          <ul className="space-y-2 text-sm text-base-3-txt">
            <li className="flex items-start">
              <span className="text-accent-2-primary mr-2">•</span>
              <span>
                <strong className="text-base-content">Cross-dataset analysis:</strong> New tools for
                comparing climate data with production trends
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-2-primary mr-2">•</span>
              <span>
                <strong className="text-base-content">Market integration:</strong> Advanced
                correlation analysis between regional markets
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-2-primary mr-2">•</span>
              <span>
                <strong className="text-base-content">API v1 release:</strong> REST endpoints for
                all 84 FAO datasets with filtering and pagination
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
