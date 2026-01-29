import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteMongoNote } from "@/lib/queries/notes"
import { Note } from "@/lib/types/notes"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Loader, Trash2, Trash2Icon } from "lucide-react"

export function AlertDialogDelete({ note }: { note: Note }) {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { mutate: deleteMongoNote, isPending } = useDeleteMongoNote(queryClient)

	const handleDelete = async () => {
		deleteMongoNote(
			{ data: { id: note.id } },
			{
				onSuccess: () => {
					navigate({ to: "/mongodb", replace: true })
					// sonner mesage goes here
				},
				onError: error => {
					alert(`COMPONENT: ${error}`)
					// sonner error message goes here
				},
			}
		)
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button className="cursor-pointer">
					<Trash2 size={20} />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent
				size="sm"
				className={"bg-blue-950 border border-blue-900"}
			>
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle>¿ Eliminar {note.title} ?</AlertDialogTitle>
					<AlertDialogDescription></AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						variant="outline"
						className="bg-blue-900 text-white border border-blue-900"
					>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={handleDelete}>
						{isPending ? (
							<Loader size={20} className="animate-spin" />
						) : (
							"Eliminar"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
