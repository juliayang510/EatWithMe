import { Chip } from './Chip'

interface ChipGroupProps<T extends string> {
  options: readonly T[]
  selected: T[]
  onToggle: (value: T) => void
  labelFor?: (value: T) => string
}

export function ChipGroup<T extends string>({
  options,
  selected,
  onToggle,
  labelFor,
}: ChipGroupProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip
          key={option}
          selected={selected.includes(option)}
          onClick={() => onToggle(option)}
        >
          {labelFor ? labelFor(option) : option}
        </Chip>
      ))}
    </div>
  )
}
