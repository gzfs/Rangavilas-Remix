import { type SVGProps } from "react";

export default function CategoriesCard({
  categoryHeading,
  categoryDesc,
  linkToCategory,
}: {
  categoryHeading: string;
  categoryDesc: string;
  linkToCategory: string;
}) {
  return (
    <div className="flex w-full bg-[#E8DC40] rounded-xl overflow-hidden">
      <div
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1685825631222-6bfdc760d39c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80)`,
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
