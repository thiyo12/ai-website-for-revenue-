export default function ToolSeoText({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section aria-label="About this tool" className="prose mt-12">
      <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-gray-600">
        {text.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
