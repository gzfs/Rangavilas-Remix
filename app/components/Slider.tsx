import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SVGProps,
  useEffect,
} from "react";

export function PhArrowLeftLight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M222 128a6 6 0 0 1-6 6H54.49l61.75 61.76a6 6 0 1 1-8.48 8.48l-72-72a6 6 0 0 1 0-8.48l72-72a6 6 0 0 1 8.48 8.48L54.49 122H216a6 6 0 0 1 6 6Z"
      ></path>
    </svg>
  );
}

export function PhArrowRightLight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="m220.24 132.24l-72 72a6 6 0 0 1-8.48-8.48L201.51 134H40a6 6 0 0 1 0-12h161.51l-61.75-61.76a6 6 0 0 1 8.48-8.48l72 72a6 6 0 0 1 0 8.48Z"
      ></path>
    </svg>
  );
}

export default function Slider({
  sliderImages,
  isRounded,
  triggerAction,
}: {
  sliderImages: string[];
  isRounded: boolean;
  triggerAction?: Dispatch<SetStateAction<string>>;
}) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      if (imageIndex < sliderImages.length - 1) {
        setImageIndex(imageIndex + 1);
        if (triggerAction) triggerAction(sliderImages[imageIndex]);
      } else {
        setImageIndex(0);
        if (triggerAction) triggerAction(sliderImages[imageIndex]);
      }
    }, 3000);

    return () => {
      clearInterval(autoPlayInterval);
    };
  });

  return (
    <div className="mx-auto md:max-w-[1000px] relative h-[40vh] sm:h-[400px] overflow-hidden w-full sm:mb-2">
      <div
        style={{
          backgroundImage: `url(${sliderImages[imageIndex]})`,
          borderRadius: isRounded ? "10px" : "0px",
          overflow: "hidden",
        }}
        className="bg-center bg-cover w-full h-full duration-500"
      ></div>
      <button
        className="absolute top-[50%] p-3 -translate-x-0 translate-y-[-50%] left-5 text-xl text-black font-bold bg-white rounded-full cursor-pointer"
        onClick={() => {
          if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
            if (triggerAction)
              triggerAction(sliderImages[imageIndex]);
          } else {
            setImageIndex(sliderImages.length - 1);
            if (triggerAction)
              triggerAction(sliderImages[imageIndex]);
          }
        }}
      >
        <PhArrowLeftLight />
      </button>
      <button
        className="absolute top-[50%] p-3 -translate-x-0 translate-y-[-50%] right-5 text-xl text-black font-bold bg-white rounded-full cursor-pointer"
        onClick={() => {
          if (imageIndex < sliderImages.length - 1) {
            setImageIndex(imageIndex + 1);
            if (triggerAction)
              triggerAction(sliderImages[imageIndex]);
          } else {
            setImageIndex(0);
            if (triggerAction)
              triggerAction(sliderImages[imageIndex]);
          }
        }}
      >
        <PhArrowRightLight />
      </button>
    </div>
  );
}
