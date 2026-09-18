import { Card } from '../components/ui/Card'

export function MatchesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[32px] font-bold leading-10">Matches</h1>
      <Card className="flex h-40 items-center justify-center text-gray-70">
        Your matches will show up here
      </Card>
    </div>
  )
}
