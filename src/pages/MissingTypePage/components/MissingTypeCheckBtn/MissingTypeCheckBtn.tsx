export default function MissingTypeCheckBtn({
  answer,
  trueAnswer,
}: {
  answer: string;
  trueAnswer: string;
}) {
  return (
    <button className={`missing-type__btn ${answer != '_____?' ? 'missing-type__btn_active' : ''}`}>
      Check {'&&'} Next
      <p style={{ color: 'red' }}>{answer === trueAnswer ? 'true' : 'false'}</p>
    </button>
  );
}
