import type {
  Dispatch,
  ReactNode,
  SetStateAction,
  SVGProps,
} from "react";

export function IcBaselineCancel(props: SVGProps<SVGSVGElement>) {
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
        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
      ></path>
    </svg>
  );
}

export default function Modal({
  modalState,
  setModalState,
  children,
}: {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <>
      {modalState ? (
        <div
          className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex justify-center items-center z-[100]"
          key={modalState.toString()}
        >
          <div className="bg-white rounded-xl w-[350px] relative">
            <div
              onClick={() => {
                setModalState(false);
              }}
              className="cursor-pointer"
            >
              <IcBaselineCancel className="text-3xl absolute top-[-10px] right-[-10px] text-red-600 bg-white rounded-full cursor-pointer" />
            </div>
            {children}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
