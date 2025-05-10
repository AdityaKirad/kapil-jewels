import { DialogTitle } from "@radix-ui/react-dialog";
import { SearchIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

export default function Search() {
  return (
    <Dialog>
      <DialogTrigger>
        <SearchIcon aria-hidden={true} strokeWidth={1} />
        <span className="sr-only">Search</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        <div className="flex items-center">
          <SearchIcon />
          <Input type="text" placeholder="Search" />
          <Button className="group" variant="ghost" size="icon">
            <X
              className="transition-[rotate] group-hover:rotate-90 group-focus-visible:rotate-90"
              aria-hidden={true}
            />
            <span className="sr-only">Clear</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
