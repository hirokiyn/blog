import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { parseISO, format } from "date-fns";

import Link from "next/link";
import { Mdx } from "@/components/mdx-components";
import { Profile } from "@/components/profile";

interface PostProps {
	params: {
		slug: string[];
	};
}

async function getPostFromParams(params: PostProps["params"]) {
	const slug = params?.slug?.join("/");
	const post = allPosts.find((post) => post.slugAsParams === slug);

	if (!post) {
		null;
	}

	return post;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
	const post = await getPostFromParams(params);

	if (!post) {
		return {};
	}

	return {
		title: post.title,
		description: post.description
	};
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
	return allPosts.map((post) => ({
		slug: post.slugAsParams.split("/")
	}));
}

export default async function PostPage({ params }: PostProps) {
	const post = await getPostFromParams(params);

	if (!post) {
		notFound();
	}

	const count = 2; // Number of more posts
	const posts = allPosts
		.filter((a) => a.title !== post.title)
		.sort(() => (Math.random() > 0.5 ? 1 : -1))
		.slice(0, count);

	return (
		<>
			<article className="prose dark:prose-invert py-6">
				<h1 className="mb-2">{post.title}</h1>
				{post.description && (
					<p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
						{post.description}
					</p>
				)}
				{post.date && (
					<time dateTime={post.date}>{format(parseISO(post.date), "LLLL	d, yyyy")}</time>
				)}
				<hr className="my-4" />
				<Mdx code={post.body.code} />
				<Profile />
			</article>
			<div className="prose dark:prose-invert">
				<h2>More posts</h2>
				{posts.map((post) => (
					<article key={post._id}>
						<Link href={post.slug}>
							<h3>{post.title}</h3>
						</Link>
						{post.description && <p>{post.description}</p>}
					</article>
				))}
			</div>
		</>
	);
}
