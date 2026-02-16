import { ComponentProps } from 'react'

import { NotePreview } from '@/components'
import { useNoteList } from '@renderer/hooks/useNoteList'
import { twMerge } from 'tailwind-merge'

type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ className, onSelect, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNoteList({})
  if (notes?.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4 ', className)} {...props}>
        <span>No Notes found</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notes?.map((note, index) => (
        <NotePreview
          key={index}
          onSelect={onSelect}
          {...note}
          onClick={() => handleNoteSelect(index)}
          isActive={index === selectedNoteIndex}
        />
      ))}
    </ul>
  )
}
