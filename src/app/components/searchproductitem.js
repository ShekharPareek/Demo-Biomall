import Image from "next/image";

const searchItems = {
  product: [
    { name: "Chemicals", img: "/image 152.png" },
    { name: "Microbiology", img: "/image 153 (1).png" },
    { name: "Pharmaceutical", img: "/image 154.png" },
    { name: "Diagnostic Products", img: "/image 155.png" },
    { name: "General Lab Supplies", img: "/image 156.png" },
  ],
  services: [
    { name: "Antibody and Protein Services", img: "/image 154.png" },
    { name: "Recombinant Protein Expression", img: "/image 158.png" },
    { name: "Endotoxin Removal Service", img: "/image 154.png" },
    { name: "Enzyme Activity Assays", img: "/image 153 (1).png" }, // fixed
    { name: "Enzyme Activity Assays", img: "/image 160.png" },
  ],
  jobs: [
    { name: "Research Scientist", img: "/image 152.png" },
    { name: "Junior Microbiologist", img: "/image 154.png" },
    { name: "Chemical Engineer", img: "/image 152.png" },
    { name: "Nanotechnologist", img: "/image 152.png" },
    { name: "Biologist", img: "/image 158.png" },
  ],
};

const Card = ({ title, items }) => (
  <div className="bg-white rounded-xl shadow-md p-5 w-full  border border-gray-100">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded overflow-hidden">
            <Image src={item.img} alt={item.name} width={40} height={40} className="object-cover w-full h-full" />
          </div>
          <span className="text-sm">{item.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function SearchSection() {
  return (
    <div className="p-6 flex justify-center items-start">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-stretch gap-6 w-full">
        <Card title="🔬 Product search" items={searchItems.product} className="flex-1" />
        <Card title="🧪 Services search" items={searchItems.services} className="flex-1" />
        <Card title="📄 Job search" items={searchItems.jobs} className="flex-1" />
      </div>
    </div>

  );
}
