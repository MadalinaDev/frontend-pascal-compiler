import { problems, slugify, getProblemBySlug } from "@/lib/testcases";
import { notFound } from "next/navigation";
import ProblemClient from "@/app/problem/[slug]/ProblemClient";
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return problems.map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  return {
    title: problem ? `${problem.title} — Pascal Judge` : "Problem Not Found",
  };
}

export default async function ProblemPage({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  // Serialize the problem data to pass to client component
  return <ProblemClient problem={problem} />;
}
