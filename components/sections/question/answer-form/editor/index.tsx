import * as React from "react";
import { MinimalTiptapProps } from "./toolbar-editor";
import { useMinimalEditor } from "@/hooks/text-editor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import ToolbarForAnswer from "./toolbar-editor";

export const AnswerEditor = React.forwardRef<
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
          "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary bg-white",
          className
        )}
      >
        <ToolbarForAnswer editor={editor} />
        <EditorContent
          editor={editor}
          className={cn("minimal-tiptap-editor", editorContentClassName)}
        />
      </div>
    </TooltipProvider>
  );
});

AnswerEditor.displayName = "AnswerEditor";

export default AnswerEditor;
