import { useEffect } from "react";
import { CircleCheck } from "lucide-react";
import "./Toast.css";

export default function Toast({ message, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3200);
    return () => clearTimeout(timer);
  }, [message, onDone]);

  return (
    <div className="toast" role="status" aria-live="polite">
      <CircleCheck size={18} aria-hidden="true" />
      {message}
    </div>
  );
}
