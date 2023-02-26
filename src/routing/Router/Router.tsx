import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LessonPage from '../../pages/LessonPage/LessonPage';
import LessonsPage from '../../pages/LessonsPage/LessonsPage';
import { IRoute, routes } from '../routes';

export default function Router() {
  return (
    <>
      <Routes>
        {routes.map(createRoutes)}
        <Route path="lessons">
          <Route index element={<LessonsPage />} />
          <Route path=":lessonId" element={<LessonPage />} />
        </Route>
      </Routes>
    </>
  );
}

function createRoutes(props: IRoute) {
  const {
    title,
    path, //
    element,
  } = props;
  return <Route key={title} path={path} element={element} />;
}
