import { sanitizeContent } from "@/helper/common/sanitize-content";
import { cn } from "@/lib/utils";

const ContentHTML = ({
  content,
  className,
 transformContent,
}: {
  content: string;
  className?: string;
  transformContent?: (content: string) => string;
}) => (
  <div
    className={cn("prose", className)}
    dangerouslySetInnerHTML={{
      __html: sanitizeContent(transformContent ?  transformContent(content) : content),
    }}
  />
);

export default ContentHTML;
