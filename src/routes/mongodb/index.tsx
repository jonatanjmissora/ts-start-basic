import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mongodb/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mongodb/"!</div>
}
