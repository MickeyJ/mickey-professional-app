import * as Slider from '@radix-ui/react-slider';

interface YearRangeSliderProps {
  startYear: number;
  endYear: number;
  setStartYear: (year: number) => void;
  setEndYear: (year: number) => void;
}

export function YearRangeSlider({
  startYear,
  endYear,
  setStartYear,
  setEndYear,
}: YearRangeSliderProps) {
  return (
    <div className="w-full">
      {/* Year labels */}
      <div className="flex justify-between text-xs text-gray-200">
        <span>{startYear}</span>

        <span>{endYear}</span>
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-7 touch-none select-none"
        min={1990}
        max={2023}
        step={1}
        value={[startYear, endYear]}
        onValueChange={([start, end]) => {
          setStartYear(start);
          setEndYear(end);
        }}
      >
        <Slider.Track className="relative h-2 w-full grow rounded-full bg-gray-800">
          <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-feature-1-600 to-feature-1-800" />
        </Slider.Track>

        <Slider.Thumb
          className="block h-5 w-5 rounded-full border-2 border-feature-1-300 bg-gray-900 
                                 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors
                                 cursor-grab active:cursor-grabbing shadow-xl"
        />

        <Slider.Thumb
          className="block h-5 w-5 rounded-full border-2 border-feature-1-300 bg-gray-900 
                                 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors
                                 cursor-grab active:cursor-grabbing shadow-xl"
        />
      </Slider.Root>
    </div>
  );
}
