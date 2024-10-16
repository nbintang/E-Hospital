import * as React from "react";
import "@/components/text-editor-toolbar-setup/partials/index.css";

import type { Content, Editor } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "@/hooks/use-minimal-editor";
import { EditorContent } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  SectionFour,
  SectionOne,
  SectionThree,
  SectionTwo,
} from "@/components/text-editor-toolbar-setup/text-editor-sections";
import {
  ImageBubbleMenu,
  LinkBubbleMenu,
} from "@/components/text-editor-toolbar-setup/bubble-menu";
import { useMinimalTiptapEditor } from "@/hooks/use-minimal-editor";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={["bold", "italic", "strikethrough", "clearFormatting"]}
        mainActionCount={2}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree
        editor={editor}
        activeActions={["orderedList", "bulletList"]}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={["blockquote", "horizontalRule"]}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />
    </div>
  </div>
);

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
        className
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={cn("minimal-tiptap-editor", editorContentClassName)}
      />
      <LinkBubbleMenu editor={editor} />
      <ImageBubbleMenu editor={editor} />
    </div>
  );
});

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;
