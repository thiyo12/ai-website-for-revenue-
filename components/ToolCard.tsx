import Link from "next/link";

export default function ToolCard({
  href,
  icon,
  name,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  name: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-300 hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-600 group-hover:text-white">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </Link>
  );
}
