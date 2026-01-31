import Link from "next/link";

export function Profile() {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<img src="/hirokiyn.png" alt="logo" className="w-12 rounded-full" />
				<div className="grid">
					<span className="text-xl font-bold">Hiroki</span>
					<div>
						<span>Founder of </span>
						<Link
							href="https://about.epismo.ai/en"
							target="_blank"
							className="underline"
						>
							<span>Epismo</span>
						</Link>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<Link
					href="https://www.twitter.com/hirokiyn"
					target="_blank"
					aria-label="X (Twitter)"
					className="inline-flex h-8 w-8 items-center justify-center rounded-md border"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="h-4 w-4"
						aria-hidden="true"
					>
						<path d="M18.244 2H21l-6.507 7.437L22.5 22h-6.616l-5.18-7.488L4.5 22H1.744l7.016-8.02L1.5 2h6.78l4.692 6.854L18.244 2zM16.9 19.77h1.472L7.2 4.13H5.62l11.28 15.64z" />
					</svg>
				</Link>
				<Link
					href="https://www.linkedin.com/in/hirokiyn"
					target="_blank"
					aria-label="LinkedIn"
					className="inline-flex h-8 w-8 items-center justify-center rounded-md border"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="h-4 w-4"
						aria-hidden="true"
					>
						<path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 8.98h3.96V21H3V8.98zm7.5 0H14v1.64h.05c.49-.93 1.69-1.9 3.48-1.9 3.72 0 4.41 2.45 4.41 5.64V21H18v-5.04c0-1.2-.02-2.75-1.68-2.75-1.68 0-1.94 1.31-1.94 2.66V21H10.5V8.98z" />
					</svg>
				</Link>
			</div>
		</div>
	);
}
