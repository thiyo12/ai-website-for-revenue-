import Link from "next/link";
import GameSeoText from "./GameSeoText";
import GamesRelated from "./GamesRelated";
import MuteButton from "./MuteButton";

export default function GameLayout({
  title,
  description,
  seoTitle,
  seoText,
  children,
}: {
  title: string;
  description: string;
  seoTitle: string;
  seoText: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8">

      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <Link href="/" className="text-accent-600 hover:underline">
          Home
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <Link href="/games" className="text-accent-600 hover:underline">
          Games
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-500">{title}</span>
      </nav>

      <header className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <MuteButton />
        </div>
        <p className="max-w-2xl text-base text-gray-600">{description}</p>
      </header>


      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        {children}
      </div>


      <GameSeoText title={seoTitle} text={seoText} />


      <GamesRelated />
    </article>
  );
}
