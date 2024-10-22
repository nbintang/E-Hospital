import * as React from "react";
import "@/components/admin/admin-panel/text-editor/styles/index.css";

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
} from "@/components/admin/admin-panel/text-editor/text-editor-sections";
import {
  ImageBubbleMenu,
  LinkBubbleMenu,
} from "@/components/admin/admin-panel/text-editor/bubble-menu";
import { useMinimalEditor } from "@/hooks/use-minimal-editor";
import { TooltipProvider } from "@/components/ui/tooltip";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const ToolbarForAnswer = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3]} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={["bold", "strikethrough", ]}
        mainActionCount={2}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree
        editor={editor}
        activeActions={["orderedList", "bulletList"]}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />
    </div>
  </div>
);

export default ToolbarForAnswer