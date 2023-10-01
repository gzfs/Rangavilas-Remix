export default function Heading({
  sectionTitle,
  sectionDesc,
}: {
  sectionTitle: string;
  sectionDesc: string;
}) {
  return (
    <div className="py-10 text-[#C1224F]">
      <p className="font-Veshion text-3xl text-center">
        {sectionTitle}
      </p>
      <p className="text-center font-Montserrat text-xs py-5">
        {sectionDesc}
      </p>
    </div>
  );
}
