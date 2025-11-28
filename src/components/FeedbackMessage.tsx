interface Props {
  type: 'error' | 'success' | null;
  message: string;
  correctAnswer?: string;
}

export function FeedbackMessage({ type, message, correctAnswer }: Props) {
  if (!type || !message) {
    return null;
  }

  const bgColor = type === 'success' ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';

  return (
    <div
      className={`${bgColor} ${textColor} border-2 rounded-lg px-4 py-3 text-center font-medium transition-all animate-fadeIn`}
      role="alert"
    >
      <div>{message}</div>
      {type === 'error' && correctAnswer && (
        <div className="mt-2 text-sm">
          Correct answer: <span className="font-bold">{correctAnswer}</span>
        </div>
      )}
    </div>
  );
}
