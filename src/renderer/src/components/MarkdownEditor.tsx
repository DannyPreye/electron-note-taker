import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin
} from '@mdxeditor/editor'
import { useMarkdown } from '@renderer/hooks/useMarkdown'

export const MarkdownEditor = () => {
  const { selectedNote, editorRef, handleAutoSave, handleBlur } = useMarkdown()

  if (!selectedNote) return null
  return (
    <MDXEditor
      ref={editorRef}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      markdown={selectedNote.content}
      onChange={handleAutoSave}
      key={selectedNote.title}
      onBlur={handleBlur}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed  prose-heading:my-4 prose-blockquote:my-4 prose-ul: prose-li: my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content=['`'] prose-code:after:content-['`']"
    />
  )
}
