import * as React from "react";
import "@/components/admin/admin-panel/text-editor/styles/index.css";
import type { Content, Editor } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "@/hooks/text-editor/use-minimal-editor";
import { Separator } from "@/components/ui/separator";
import {
  SectionFour,
  SectionOne,
  SectionThree,
  SectionTwo,
} from "@/components/admin/admin-panel/text-editor/text-editor-sections";
export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const ToolbarForBlog = ({ editor }: { editor: Editor }) => (
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

export default ToolbarForBlog