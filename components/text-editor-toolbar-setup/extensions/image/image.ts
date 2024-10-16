import { Image as TiptapImage } from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageViewBlock } from './image-view-block'

export const Image = TiptapImage.extend({
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
        parseHTML: element => element.getAttribute('width') || 'auto',
        renderHTML: attributes => {
          return attributes.width ? { width: attributes.width } : {}
        },
      },
      height: {
        default: 'auto',
        parseHTML: element => element.getAttribute('height') || 'auto',
        renderHTML: attributes => {
          return attributes.height ? { height: attributes.height } : {}
        },
      },
    }
  },

  // Use ReactNodeViewRenderer to manage the image view
  addNodeView() {
    return ReactNodeViewRenderer(ImageViewBlock)
  },

  // Add resize logic to the node
  addProseMirrorPlugins() {
    return [
      // You can integrate plugins like prosemirror-resize here, or implement your own resizing logic
    ]
  }
})
