import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Post() {
  return (
    <div className="min-w-96 max-w-80 h-72 rounded-md bg-white shadow flex flex-col justify-between gap-3">
      <div className="w-full h-64 overflow-hidden rounded-t-md">
        <Image
          src={"/img/akjgmw.jpeg"}
          alt="test-image"
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col px-5 py-4">
        <div className="flex items-center justify-between">
          <h1>Judul lorem</h1>
          <Badge variant={"secondary"}>Category</Badge>
        </div>
        <div>
          <p className="text-sm truncate">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
            voluptatem culpa iusto harum, explicabo ad? Possimus placeat quis
            saepe at perferendis modi inventore dolores? Expedita ipsa beatae ex
            corporis pariatur voluptates quidem!
          </p>
        </div>
      </div>
    </div>
  );
}
