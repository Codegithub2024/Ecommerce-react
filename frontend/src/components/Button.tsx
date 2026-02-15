import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  type?: "button" | "submit";
  loading?: boolean;
  class?: string;
  variant?: "primary" | "secondary" | "white";
  children?: React.ReactNode;
}

export default function Button({
  text,
  type,
  loading,
  variant,
  class: className,
  children,
  ...props
}: Props) {
  const variation = {
    primary:
      "bg-primary min-h-8 gap-2 flex justify-center items-center capitalize transition-all duration-200 hover:bg-amber-400 font-semibold rounded-full cursor-pointer px-3 text-xs leading-none " +
      (className ? className : ""),
    secondary:
      "bg-black min-h-8 gap-2 flex text-white justify-center items-center capitalize transition-all duration-200 hover:bg-neutral-800 font-semibold rounded-full cursor-pointer px-3 text-xs leading-none " +
      (className ? className : ""),
    white:
      "bg-white min-h-8 gap-2 flex text-black justify-center items-center capitalize transition-all duration-200 font-semibold rounded-full cursor-pointer px-3 shadow-card-sm text-xs leading-none " +
      (className ? className : ""),
  };
  const variantClass = variant ? variation[variant] : variation.primary;
  return (
    <button {...props} type={type} className={variantClass}>
      {loading ? <Loader2 className="animate-spin" size={16} /> : null}
      <span className="flex gap-1 items-center">
        {children}
        {text}
      </span>
    </button>
  );
}
