import Heading from "./Heading";
import ProductCard from "./ProductCard";
import { type OutputElementType } from "~/utils/helper.server";

export default function Products({
  hydrateProducts,
  sectionName,
  sectionDesc,
}: {
  hydrateProducts: OutputElementType[];
  sectionName: string;
  sectionDesc: string;
}) {
  return (
    <div className="pt-10">
      <Heading sectionTitle={sectionName} sectionDesc={sectionDesc} />
      <div className="grid lg:grid-cols-3 grid-flow-col-dense gap-6 overflow-scroll lg:overflow-hidden overflow-y-hidden">
        {hydrateProducts
          .filter((hydrateProduct) => {
            return hydrateProduct.category_name === sectionName;
          })
          .map((hydrateProduct) => {
            return (
              <ProductCard
                productData={hydrateProduct}
                key={hydrateProduct.id}
              />
            );
          })}
      </div>
    </div>
  );
}
