import { useEffect, useState } from "react";

export default function SuccessAlert({ success }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;
    let progressTimer;

    if (success) {
      setVisible(true);
      setProgress(100);

      progressTimer = setInterval(() => {
        setProgress((prev) => {
          const next = prev - 1;
          return next >= 0 ? next : 0;
        });
      }, 30); // 3 detik total (30ms * 100)

      timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [success]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {success && (
        <div className="relative p-4 mb-4 overflow-hidden text-sm text-green-800 bg-green-100 rounded-lg shadow-md dark:bg-green-900 dark:text-green-300">
          <span className="font-medium">Success!</span> {success}

          {/* Border-bottom progress bar */}
          <span
            className="absolute bottom-0 left-0 h-1 bg-green-600"
            style={{ width: `${progress}%`, transition: "width 30ms linear" }}
          ></span>
        </div>
      )}
    </div>
  );
}

