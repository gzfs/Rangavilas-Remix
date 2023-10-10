import { type SVGProps } from "react";

export default function CategoriesCard({
  categoryHeading,
  categoryDesc,
  linkToCategory,
  categoryImage,
}: {
  categoryHeading: string;
  categoryDesc: string;
  linkToCategory: string;
  categoryImage: string;
}) {
  return (
    <div className="flex w-full bg-[#E8DC40] rounded-xl overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${categoryImage})`,
        }}
        className="bg-cover bg-center w-6/12"
      ></div>
      <div className="pt-10 pb-4 w-6/12 px-4">
        <div className="font-Veshion text-2xl">{categoryHeading}</div>
        <div className="font-Montserrat text-xs py-4">
          {categoryDesc}
        </div>
        <div className="flex justify-end">
          <div className="rounded-xl p-3 bg-[#F16F6F] w-fit">
            <a href={linkToCategory} className="">
              <AkarIconsTriangleRightFill className="text-xl text-[#E8DC40]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AkarIconsTriangleRightFill(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 6a1 1 0 0 1 1.6-.8l8 6a1 1 0 0 1 0 1.6l-8 6A1 1 0 0 1 8 18V6Z"
      ></path>
    </svg>
  );
}
