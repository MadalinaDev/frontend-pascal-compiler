import {
  getAllProblems,
  getProblemBySlug,
  getChapterOfProblem,
} from "@/lib/content";
import { notFound } from "next/navigation";
import ProblemClient from "@/app/problem/[slug]/ProblemClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProblems().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  return {
    title: problem ? `${problem.title} — C++ Judge` : "Problem Not Found",
  };
}

export default async function ProblemPage({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  const chapter = getChapterOfProblem(slug);

  // Serialize the problem data to pass to client component
  return (
    <ProblemClient
      problem={problem}
      chapterTitle={chapter?.title ?? null}
    />
  );
}
