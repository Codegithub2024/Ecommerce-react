interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="text-red-900 bg-red-100 font-semibold py-1 px-2 rounded-full leading-none tracking-tight text-xs">
      {message}
    </p>
  );
}
