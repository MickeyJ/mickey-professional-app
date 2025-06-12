import FeaturesSection from '@/_components/sections/features';
import { FoodPricesIcon, NutritionIcon } from '@/_components/ui/icons';

export default function DataPage() {
  return (
    <div className="mx-auto p-4">
      <h1 className="text-heading-lg font-bold text-center">The Food Project</h1>
      <p className="text-dim text-center">
        Food is a fundamental part of our lives, and understanding its global dynamics is essential
        for making informed decisions about nutrition, agriculture, and economics.
      </p>

      <FeaturesSection
        title="Explore Food Data"
        subTitle="Interactive charts and graphs powered by real APIs"
        features={[
          {
            icon: <FoodPricesIcon />, // Replace with an appropriate icon if needed
            title: 'Food Prices',
            description: `
              Visualize food prices across different regions and time periods.
              Discover surprising patterns, spot unusual price spikes, and explore
              how global events impact what we pay for food.
            `,
            href: '/demo/data/food-prices',
            linkText: 'Compare',
            colorScheme: 'purple' as const,
          },
          {
            icon: <NutritionIcon />,
            title: 'Food Nutrition',
            description:
              'Explore nutritional information of various food items. Compare and analyze nutritional values.',
            href: '/demo/data/food-nutrition',
            linkText: 'Learn',
            colorScheme: 'blue' as const,
          },
        ]}
      />
      <div className="mx-1 rounded-md bg-base-200 p-4 mt-4">
        <h4 className="text-heading-sm font-bold">More About the Data</h4>
        <p className="text-dim">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam laborum illum inventore
          ab, quam ea fuga sit perferendis unde cumque harum expedita sed enim hic ut eligendi
          laudantium amet non. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi velit
          unde ab officiis consectetur? In blanditiis quaerat vitae nobis perferendis repellendus
          officiis neque vero? Voluptates nostrum nobis accusamus non dolorem!
        </p>
      </div>
    </div>
  );
}
