import CategoriesCard from "./CategoriesCard";
import Heading from "./Heading";

export default function Categories() {
  return (
    <div className="text-[#C1224F]">
      <Heading
        sectionTitle="Categories"
        sectionDesc="We are also known for our Indian snacks, savories ( Farsan And Namkeen), Fast Foods, Chaats, Punjabi and South Indian cuisines and delicious Lassi"
      />
      <div className="grid lg:grid-cols-2 gap-6 grid-cols-1">
        <CategoriesCard
          categoryHeading="Murukku"
          categoryDesc="These crunchy noodles are traditional Indian snack food. Janthikalu goes perfectly with coffee and is almost impossible to stop eating."
          linkToCategory="/murukku"
        />
        <CategoriesCard
          categoryHeading="Murukku"
          categoryDesc="These crunchy noodles are traditional Indian snack food. Janthikalu goes perfectly with coffee and is almost impossible to stop eating."
          linkToCategory="#"
        />
        <CategoriesCard
          categoryHeading="Murukku"
          categoryDesc="These crunchy noodles are traditional Indian snack food. Janthikalu goes perfectly with coffee and is almost impossible to stop eating."
          linkToCategory="#"
        />
        <CategoriesCard
          categoryHeading="Murukku"
          categoryDesc="These crunchy noodles are traditional Indian snack food. Janthikalu goes perfectly with coffee and is almost impossible to stop eating."
          linkToCategory="#"
        />
      </div>
    </div>
  );
}
