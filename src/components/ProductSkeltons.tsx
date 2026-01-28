export function ProductsSkeleton({ qnt = 5 }: { qnt?: number }) {
	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-wrap gap-4 my-10">
				{Array.from({ length: qnt }).map((_, i) => (
					<div
						key={i}
						className="w-40 h-40 bg-blue-800/30 animate-pulse rounded-xl"
					/>
				))}
			</div>
		</div>
	)
}
