import {
  LeafIcon,
  PaintbrushIcon,
  ScissorsIcon,
  SparklesIcon,
} from "lucide-react";

type CategoryDataProps = {
  data: {
    categoryName: string;
    totalBookings: number;
  }[];
};

const CategoryData = ({ data }: CategoryDataProps) => {
  const totalBooking = data.reduce((acc, item) => {
    return acc + item.totalBookings;
  }, 0);

  let percentages = data.map(
    (item) => (item.totalBookings / totalBooking) * 100,
  );
  percentages = percentages.map((percentage) => Math.round(percentage));

  return (
    <div className="flex w-full flex-col items-center justify-around gap-5 md:flex-row">
      {data.map((item, index) => {
        return (
          <div
            className="flex items-center justify-center space-x-4"
            key={index}
          >
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {item.categoryName === "Cut and Blow Dry" ? (
                  <ScissorsIcon className="h-8 w-8" />
                ) : item.categoryName === "Treatment" ? (
                  <SparklesIcon className="h-8 w-8" />
                ) : item.categoryName === "Coloring" ? (
                  <PaintbrushIcon className="h-8 w-8" />
                ) : (
                  <LeafIcon className="h-8 w-8" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">
                {item.categoryName}
              </span>
              <span className="text-lg text-muted-foreground">
                {percentages[index]}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryData;
