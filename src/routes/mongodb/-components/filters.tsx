import { Link, useSearch } from "@tanstack/react-router"
import { Star } from "lucide-react"

export default function Filters() {
	const { filter, sort } = useSearch({ from: "/mongodb/" })

	return (
		<article className="flex items-center gap-12">
			<Link
				className="bg-blue-500/5 rounded px-3 py-1 min-w-20 text-center"
				to="/mongodb"
				search={{ filter: "all", sort }}
				activeProps={{ className: "bg-blue-500/20" }}
			>
				all
			</Link>
			<Link
				className="bg-blue-500/5 rounded px-3 py-1 min-w-20 text-center flex items-center justify-center"
				to="/mongodb"
				search={{ filter: "favorites", sort }}
				activeProps={{ className: "bg-blue-500/20" }}
			>
				<Star size={20} />
			</Link>
			<Link
				className="bg-blue-500/5 rounded px-3 py-1 min-w-20 text-center"
				to="/mongodb"
				search={{ filter, sort: "asc" }}
				activeProps={{ className: "bg-blue-500/20" }}
			>
				asc
			</Link>
			<Link
				className="bg-blue-500/5 rounded px-3 py-1 min-w-20 text-center"
				to="/mongodb"
				search={{ filter, sort: "desc" }}
				activeProps={{ className: "bg-blue-500/20" }}
			>
				desc
			</Link>
		</article>
	)
}
