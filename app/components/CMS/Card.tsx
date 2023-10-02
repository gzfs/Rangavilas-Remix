import { type ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 py-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl w-full">
      {children}
    </div>
  );
}
