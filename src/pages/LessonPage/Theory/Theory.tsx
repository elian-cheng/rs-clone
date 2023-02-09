export interface ILesson {
  id: string;
  title: string;
  theme: string;
  description: string[];
  examples: string[];
}
export default function Theory({ lesson }: { lesson: ILesson | null }) {
  return (
    <section className="lesson__theory">
      <h1 className="lesson__theme">{lesson?.theme}</h1>
      <h2 className="lesson__title">{lesson?.title}</h2>
      {lesson?.description.map((item, i) => (
        <p className="lesson__paragraph" key={i}>
          {item}
        </p>
      ))}
    </section>
  );
}
