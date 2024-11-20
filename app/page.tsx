import Link from "next/link";

import { Profile } from "@/components/profile";
import { getAllPosts } from "@/lib/api/posts";

export default function Home() {
	const posts = getAllPosts();

	return (
		<>
			<h1 className="pt-10">
				<Profile link={false} />
			</h1>
			<div className="prose dark:prose-invert">
				{posts.map((post) => (
					<article>
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
