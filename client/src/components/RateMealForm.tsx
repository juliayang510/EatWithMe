import { useState } from 'react'
import { Button } from './ui/Button'
import { StarPicker } from './ui/StarPicker'

export function RateMealForm({
  otherName,
  onSubmit,
  onCancel,
}: {
  otherName: string
  onSubmit: (companion: number, venue: number) => void
  onCancel: () => void
}) {
  const [companion, setCompanion] = useState(0)
  const [venue, setVenue] = useState(0)
  const canSubmit = companion > 0 && venue > 0

  return (
    <div className="flex flex-col gap-3 border-t border-gray-30 pt-3">
      <StarPicker
        label={`How reliable and easy to talk to was ${otherName}?`}
        value={companion}
        onChange={setCompanion}
      />
      <StarPicker
        label="Was this a good place to meet? Would you come back?"
        value={venue}
        onChange={setVenue}
      />
      <div className="flex gap-2">
        <Button
          className="flex-1"
          disabled={!canSubmit}
          onClick={() => onSubmit(companion, venue)}
        >
          Submit rating
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
