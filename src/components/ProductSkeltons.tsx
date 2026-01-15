export function ProductsSkeleton() {
	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-wrap gap-4 my-10">
				{Array.from({ length: 8 }).map((_, i) => (
					<div
						key={i}
						className="w-80 h-80 bg-blue-800/30 animate-pulse rounded-xl"
					/>
				))}
			</div>
		</div>
	)
}
