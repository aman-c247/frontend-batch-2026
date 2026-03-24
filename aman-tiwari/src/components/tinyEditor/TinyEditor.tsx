import { Editor } from '@tinymce/tinymce-react'

interface TinyEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
  height?: number
  width?: string | number
}

export default function TinyEditor({
  value,
  onChange,
  placeholder = 'Write here...',
  height = 300,
  width = 'auto',
}: TinyEditorProps) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height,
        width,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'preview',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | bold italic forecolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        placeholder,
      }}
    />
  )
}
