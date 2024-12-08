import { sanitizeContent } from "@/helper/common/sanitize-content";
import { cn } from "@/lib/utils";

const ContentHTML = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => (
  <div
    className={cn("prose", className)}
    dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }}
  />
);

export default ContentHTML;
