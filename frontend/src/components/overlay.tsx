import { Pencil } from "lucide-react";

type OverlayProps = {
    rounded?: string;
    size?: number;
}

export default function Overlay({rounded, size}: OverlayProps) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100 ${rounded}`}>
      <div className="rounded-lg bg-black/70 p-2">
        <Pencil size={size} className="text-white" />
      </div>
    </div>
  );
}
