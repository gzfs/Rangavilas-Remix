import CategoriesCard from "./CategoriesCard";
import Heading from "./Heading";

export default function Categories({
  prouctCategories,
}: {
  prouctCategories: {
    name: string | null;
    description: string | null;
    url: string;
  }[];
}) {
  return (
    <div className="text-[#C1224F]">
      <Heading
        sectionTitle="Categories"
        sectionDesc="We are also known for our Indian snacks, savories ( Farsan And Namkeen), Fast Foods, Chaats, Punjabi and South Indian cuisines and delicious Lassi"
      />
      <div className="grid lg:grid-cols-2 gap-6 grid-cols-1">
        {prouctCategories.map((prouctCategory) => {
          return (
            <CategoriesCard
              key={prouctCategory.name}
              categoryDesc={prouctCategory.description as string}
              categoryHeading={prouctCategory.name as string}
              linkToCategory={`/${prouctCategory.name?.toLowerCase()}`}
              categoryImage={prouctCategory.url}
            />
          );
        })}
      </div>
    </div>
  );
}
