import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { Profile } from "@/components/profile";
import { getCategorizedPosts, getAllCategories } from "@/lib/api/posts";
import { TITLE } from "@/lib/constants";

type CategoryProps = {
	params: Promise<{
		tag: string;
	}>;
};

export async function generateMetadata({ params }: CategoryProps): Promise<Metadata> {
	const category = (await params)?.tag;

	if (!category) {
		return notFound();
	}

	return {
		title: `${TITLE} - #${category}`
	};
}

export function generateStaticParams(): CategoryProps["params"][] {
	const categories = getAllCategories();

	return categories.map((category) =>
		Promise.resolve({
			tag: category
		})
	);
}

export default async function Category({ params }: CategoryProps) {
	const category = (await params)?.tag;
	const posts = getCategorizedPosts(category);

	return (
		<>
			<h1 className="flex items-center justify-between pt-10">
				<Profile link={false} />
				<span>#{category}</span>
			</h1>
			<div className="prose dark:prose-invert">
				{posts.map((post) => (
					<article key={post.slug}>
						<Link href={`/posts/${post.slug}`}>
							<h2>{post.title}</h2>
						</Link>
						{post.description && <p>{post.description}</p>}
					</article>
				))}
			</div>
		</>
	);
}
