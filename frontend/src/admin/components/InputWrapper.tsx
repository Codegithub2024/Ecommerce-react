interface InputWrapperProps {
  className?: string;
  label?: string;
  children?: React.ReactNode;
  htmlFor?: string;
}

export default function InputWrapper({
  className: className,
  children,
  htmlFor,
  label,
}: InputWrapperProps) {
  return (
    <div
      className={`grid gap-1.5 items-start content-start flex-1 ${className || ""}`}
    >
      {htmlFor ? (
        <label
          className="text-sm tracking-tight font-semibold ml-4 text-neutral-700 leading-none"
          htmlFor={htmlFor}
        >
          {label}
        </label>
      ) : (
        <p className="text-sm tracking-tight font-semibold ml-4 text-neutral-700 leading-none">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
