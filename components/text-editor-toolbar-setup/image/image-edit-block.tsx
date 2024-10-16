import * as React from 'react'
import type { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { readFileAsDataURL } from '@/lib/tiptap-utils'

interface ImageEditBlockProps {
  editor: Editor
  close: () => void
}

export const ImageEditBlock: React.FC<ImageEditBlockProps> = ({ editor, close }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [link, setLink] = React.useState('')

  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleLink = React.useCallback(() => {
    if (link) {
      editor.chain().focus().setImage({ src: link }).run()
      close()
    }
  }, [editor, link, close])

  const handleFile = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files?.length) return

      const insertImages = async () => {
        for (const file of files) {
          try {
            const dataUrl = await readFileAsDataURL(file)
            editor
              .chain()
              .focus()
              .insertContent([{ type: 'image', attrs: { src: dataUrl } }, { type: 'paragraph' }])
              .run()
          } catch (error) {
            console.error('Failed to read file:', error)
          }
        }
      }

      await insertImages()
      close()
    },
    [editor, close]
  )

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleLink()
    },
    [handleLink]
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        {/* <Label htmlFor="image-link">Attach an image link</Label>
        <div className="flex">
          <Input
            id="image-link"
            type="url"
            required
            placeholder="https://example.com"
            value={link}
            className="grow"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
          />
          <Button type="submit" className="ml-2">
            Submit
          </Button>
        </div> */}
      </div>
      <Button type="button" className="w-full" onClick={handleClick}>
        Upload from your computer
      </Button>
      <input type="file" accept="image/*" ref={fileInputRef} multiple className="hidden" onChange={handleFile} />
    </form>
  )
}

export default ImageEditBlock