import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fake-api/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/fake-api/$productId"!</div>
}
