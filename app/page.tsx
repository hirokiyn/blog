import { allPosts } from "contentlayer/generated";

import Link from "next/link";
import { Profile } from "@/components/profile";

export default function Home() {
	const posts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

	return (
		<>
			<h1 className="pt-10">
				<Profile />
			</h1>
			<div className="prose dark:prose-invert">
				{posts.map((post) => (
					<article key={post._id}>
						<Link href={post.slug}>
							<h2>{post.title}</h2>
						</Link>
						{post.description && <p>{post.description}</p>}
					</article>
				))}
			</div>
		</>
	);
}
