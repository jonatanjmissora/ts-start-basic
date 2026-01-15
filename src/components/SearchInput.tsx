import { useNavigate, useSearch } from "@tanstack/react-router"
import { useState } from "react"

export function SearchInput() {
	const navigate = useNavigate({ from: "/fake-api" })
	const { q } = useSearch({ from: "/fake-api/" })
	const [inputValue, setInputValue] = useState(q ?? "")
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		navigate({
			search: prev => ({ ...prev, q: e.target.value ?? undefined }),
			replace: true,
		})
	}
	const resetInput = () => {
		setInputValue("")
		navigate({
			search: prev => ({ ...prev, q: undefined }),
			replace: true,
		})
	}
	return (
		<div className="flex items-center gap-4">
			<input
				type="text"
				value={inputValue}
				onChange={handleChange}
				placeholder="Buscar"
				className="border border-gray-300 rounded px-2 py-1"
			/>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded"
				onClick={resetInput}
			>
				Clear
			</button>
		</div>
	)
}
