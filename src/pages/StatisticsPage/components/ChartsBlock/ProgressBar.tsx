export default function ProgressBar({ done, total }: { done: number; total: number }) {
  return (
    <div className="progress-bar">
      <h2 className="progress-bar__header">{`All tasks progress: ${done}/${total}`}</h2>
      <div className="progress-bar__total">
        <div className="progress-bar__current" style={{ width: `${(done * 100) / total}%` }}></div>
      </div>
    </div>
  );
}
