export default function ToolSeoText({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const blocks = text
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <section aria-label="About this tool" className="prose mt-12">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-gray-600">
        {blocks.map((block, i) =>
          block.startsWith("## ") ? (
            <h3
              key={i}
              className="pt-3 text-lg font-semibold tracking-tight text-gray-900"
            >
              {block.slice(3)}
            </h3>
          ) : (
            <p key={i}>{block}</p>
          )
        )}
      </div>
    </section>
  );
}
