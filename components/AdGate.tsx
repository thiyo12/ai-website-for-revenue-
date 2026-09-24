"use client";

export default function AdGate({
  onAction,
  className = "",
  children,
}: {
  onAction: () => void;
  seconds?: number;
  buttonLabel?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onAction} className={className}>
      {children}
    </button>
  );
}
