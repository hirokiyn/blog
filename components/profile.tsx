import Link from "next/link";

import { USER_ID } from "@/lib/constants";

export function Profile({ link = true }) {
	return (
		<div className="flex items-center space-x-2">
			<img src="/logo.png" alt="logo" className="w-10 rounded-full" />
			<span className="text-xl font-bold">hiroki</span>
			{link && (
				<Link
					href={`https://x.com/${USER_ID}`}
					target="_blank"
					className="text-base text-slate-500 dark:text-slate-400"
				>
					@{USER_ID}
				</Link>
			)}
		</div>
	);
}
