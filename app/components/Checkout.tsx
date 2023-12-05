export default function Checkout() {
  return (
    <div className="px-10 py-5 bg-white grid gap-4 grid-cols-12 fixed bottom-0 w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
      <div className="bg-[#DEDEDE] text-xs text-[#333333] col-span-5 w-full font-Montserrat rounded-3xl py-5 px-10">
        <p className="font-bold">Shipping To: </p>
        <p>3/2 Chengalvarayan Street, Triplicane, Chennai - 600005</p>
      </div>
      <button className="grid place-items-center bg-[#DEDEDE] text-sm text-[#333333] col-span-2 w-full font-Montserrat rounded-3xl py-5 px-10">
        Change Address
      </button>
    </div>
  );
}
