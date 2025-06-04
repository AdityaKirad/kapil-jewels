import { DialogTitle } from "@radix-ui/react-dialog";
import { SearchIcon, XIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

export default function Search() {
  return (
    <Dialog>
      <DialogTrigger>
        <SearchIcon strokeWidth={1.5} aria-hidden={true} />
        <span className="sr-only">Search</span>
      </DialogTrigger>
      <DialogContent className="px-20 py-[4.1rem]">
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        <div className="flex items-center gap-2">
          <SearchIcon strokeWidth={1.5} />
          <Input
            className="border-none p-0 placeholder:font-medium placeholder:text-green-950"
            type="text"
            placeholder="Search"
          />
          <DialogClose>
            <XIcon
              className="transition-[rotate] group-hover:rotate-90 group-focus-visible:rotate-90"
              strokeWidth={1.5}
              aria-hidden={true}
            />
            <span className="sr-only">close</span>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
