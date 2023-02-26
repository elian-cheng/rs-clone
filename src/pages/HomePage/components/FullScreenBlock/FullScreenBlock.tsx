import { Link } from 'react-router-dom';

export default function FullScreenBlock() {
  return (
    <div className="full-screen-block">
      <div className="full-screen-block__container">
        <h2 className="full-screen-block__title">TypeScript Developer Course</h2>
        <ul className="full-screen-block__list">
          <li className="full-screen-block__list-item">TypeScript lessons</li>
          <li className="full-screen-block__list-item">Online education</li>
          <li className="full-screen-block__list-item">Theory and practice</li>
        </ul>
        <Link to="/lessons" className="full-screen-block__button button">
          Start Learning
        </Link>
      </div>
    </div>
  );
}
