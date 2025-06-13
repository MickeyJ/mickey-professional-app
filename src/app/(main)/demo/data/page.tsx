import FeaturesSection from '@/_components/sections/features';
import { FoodPricesIcon, NutritionIcon } from '@/_components/ui/icons';

export default function DataPage() {
  return (
    <div className="mx-auto p-4">
      <FeaturesSection
        title="Explore Food Data"
        subTitle="Interactive charts and graphs powered by real APIs"
        features={[
          {
            icon: <FoodPricesIcon />, // Replace with an appropriate icon if needed
            title: 'FAO Commodity Prices',
            description: `
              Try out a custom REST API version of the Food and Agriculture Organization (FAO) Prices dataset.
              This demo allows you to compare food prices across different commodities and countries.
            `,
            href: '/demo/data/food-prices',
            linkText: 'Compare',
            additionalLink: {
              text: 'More Demos Here',
              href: '/explore-fao/dashboard',
            },
            colorScheme: 'purple' as const,
          },
          {
            icon: <NutritionIcon />,
            title: 'Food Nutrition',
            description:
              'Explore nutritional information of various food items using the USDA API. Compare and analyze nutritional values.',
            href: '/demo/data/food-nutrition',
            linkText: 'Learn',
            colorScheme: 'blue' as const,
          },
        ]}
      />
      <div className="rounded-md bg-base-200 p-4 mx-4 mt-4">
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
