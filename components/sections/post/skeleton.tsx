
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";
  import { Skeleton } from "@/components/ui/skeleton";
  import { cn } from "@/lib/utils";
export const SkeletonCard = ({ className }: { className?: string }) => (
    <Card className={cn("w-full rounded-md", className)}>
      <div className="relative h-48 overflow-hidden rounded-t-md">
        <Skeleton className="absolute inset-0" />
        <Skeleton className="absolute left-2 top-2 h-5 w-20 z-10" />
        <Skeleton className="absolute right-2 top-2 h-6 w-6 rounded-full z-10" />
      </div>
      <div className="flex flex-col justify-between">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </CardContent>
        <CardFooter className="flex justify-between items-end">
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
          </div>
          <Skeleton className="h-4 w-24" />
        </CardFooter>
      </div>
    </Card>
  );
  