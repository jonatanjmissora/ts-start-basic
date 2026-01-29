import { NoteSkeletons } from "@/components/NoteSkeltons"
import {
	notesQueryOptions,
	useSuspenseFilteredNotes,
} from "@/lib/queries/notes"
import { Note, searchNotesSchema } from "@/lib/types/notes"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Edit, Plus } from "lucide-react"
import { Suspense } from "react"
import Filters from "./-components/filters"
import { PinnedButton } from "./-components/pinned"
import { AlertDialogDelete } from "./-components/alert-dialog-delete"

export const Route = createFileRoute("/mongodb/")({
	validateSearch: searchNotesSchema,
	component: RouteComponent,
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(notesQueryOptions)
	},
})

function RouteComponent() {
	const { filter, sort } = Route.useSearch()
	return (
		<article className="flex-1 w-full p-10 ">
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">NOTES PAGE</span>
				<Filters />
				<Link
					to="/mongodb/create"
					search={{
						filter,
						sort,
					}}
					className="bg-blue-500/30 rounded px-3 py-1 min-w-20 flex items-center justify-center gap-3"
				>
					nueva nota <Plus size={20} />
				</Link>
			</div>

			<Suspense fallback={<NoteSkeletons />}>
				<NotesList />
			</Suspense>
		</article>
	)
}

export default function NotesList() {
	const { filter, sort } = Route.useSearch()
	const notes = useSuspenseFilteredNotes({ filter, sort }).data

	return (
		<div className="flex flex-wrap gap-4 my-10">
			{notes.map((note: Note) => (
				<div key={note.id}>
					<NoteElement note={note} />
				</div>
			))}
		</div>
	)
}

const NoteElement = ({ note }: { note: Note }) => {
	return (
		<div
			className={`flex flex-col justify-between gap-2 rounded-lg ${note.pinned ? "bg-yellow-800" : "bg-blue-800/30"} w-90 h-50 p-4 shadow-lg`}
		>
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold">{note.title.toUpperCase()}</h2>
				<Edit size={20} />
			</div>
			<p className="text-center">{note.content}</p>
			<div className="flex items-center justify-between">
				<PinnedButton note={note} />
				<AlertDialogDelete note={note} />
			</div>
		</div>
	)
}
