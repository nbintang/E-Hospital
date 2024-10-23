import * as React from "react";
import ToolbarForBlog, { MinimalTiptapProps } from "./toolbar-editor";
import {useMinimalEditor} from "@/hooks/text-editor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import { ImageBubbleMenu, LinkBubbleMenu } from "../../../admin-panel/text-editor/bubble-menu";

export const BlogEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider>
      <div
        ref={ref}
        className={cn(
          "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
          className
        )}
      >
        <ToolbarForBlog editor={editor} />
        <EditorContent
          editor={editor}
          className={cn("minimal-tiptap-editor", editorContentClassName)}
        />
        <LinkBubbleMenu editor={editor} />
        <ImageBubbleMenu editor={editor} />
      </div>
    </TooltipProvider>
  );
});

BlogEditor.displayName = "BlogEditor";

export default BlogEditor;
