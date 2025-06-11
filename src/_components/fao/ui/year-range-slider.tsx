import * as Slider from '@radix-ui/react-slider';

interface YearRangeSliderProps {
  startYear: number;
  endYear: number;
  setStartYear: (year: number) => void;
  setEndYear: (year: number) => void;
  minYear?: number;
  maxYear?: number;
}

export function YearRangeSlider({
  startYear,
  endYear,
  setStartYear,
  setEndYear,
  minYear = 1990,
  maxYear = 2023,
}: YearRangeSliderProps) {
  return (
    <div className="slider-container">
      <div className="slider-labels">
        <span>{startYear}</span>
        <span>{endYear}</span>
      </div>

      <Slider.Root
        className="slider-root"
        min={minYear}
        max={maxYear}
        step={1}
        value={[startYear, endYear]}
        onValueChange={([start, end]) => {
          setStartYear(start);
          setEndYear(end);
        }}
      >
        <Slider.Track className="slider-track">
          <Slider.Range className="slider-range" />
        </Slider.Track>

        <Slider.Thumb className="slider-thumb" />
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
    </div>
  );
}
