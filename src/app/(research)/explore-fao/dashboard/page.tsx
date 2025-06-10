export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-1-bg">
      {/* Header */}
      <header className="bg-base-3-bg shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-base-content">
            FAO Global Agricultural Data Explorer
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-base-2-bg shadow-xs rounded-lg p-6">
              <h3 className="font-medium text-base-2-txt mb-4">Data Categories</h3>
              {/* Navigation items */}
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            <div className="bg-base-3-bg shadow-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-base-content mb-4">
                Global Agricultural Insights
              </h2>
              <p className="text-base-3-txt mb-6">
                Explore comprehensive data across 84 FAO datasets
              </p>
              {/* Charts/content here */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
