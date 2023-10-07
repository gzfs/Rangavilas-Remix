import { useFetcher } from "@remix-run/react";
import {
  type SVGProps,
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import type { ImgurResponse } from "~/services/imgur.server";

export function MaterialSymbolsUpload(
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
        d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16h-2Zm-5 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
      ></path>
    </svg>
  );
}

type ImageFetcherResponse = {
  imageUrl: ImgurResponse;
};

export default function ImageUpload({
  setImageImgurUrl,
}: {
  setImageImgurUrl: Dispatch<SetStateAction<string | undefined>>;
}) {
  const imageFetcher = useFetcher<ImageFetcherResponse>();

  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (imageFetcher.data)
      setImageImgurUrl(imageFetcher.data.imageUrl.data.link);
  }, [imageFetcher.data]);

  return (
    <imageFetcher.Form
      method="POST"
      encType="multipart/form-data"
      action="/admin/image/create"
      className="w-full col-span-full sm:col-span-1 rounded-xl border-dashed border border-[#333333] h-[200px] relative flex justify-center items-center"
    >
      <div
        className="overflow-hidden h-full w-full rounded-xl"
        style={{
          display: !imageUrl ? "none" : "block",
        }}
      >
        {imageUrl ? <img src={imageUrl} alt="Product" /> : ""}
      </div>
      <input
        type="file"
        name="image"
        className="absolute m-0 p-0 w-full h-full opacity-0 outline-none"
        style={{
          display: imageUrl ? "none" : "block",
        }}
        onChange={(eV) => {
          if (eV.target.files)
            setImageUrl(URL.createObjectURL(eV.target.files[0]));
        }}
      ></input>
      <p
        className="font-Montserrat text-xs"
        style={{
          display: imageUrl ? "none" : "block",
        }}
      >
        Drag your images here or click in this Area
      </p>
      <button className="z-50 absolute bottom-[-10px] right-[-10px] bg-[#333333] p-3 rounded-full">
        {imageFetcher.state !== "submitting" ? (
          <MaterialSymbolsUpload className="text-xl text-white" />
        ) : (
          <div className="w-[20px] h-[20px] border border-white border-dashed rounded-xl animate-spin"></div>
        )}
      </button>
    </imageFetcher.Form>
  );
}
