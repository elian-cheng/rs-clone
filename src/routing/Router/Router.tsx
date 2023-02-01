import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { IRoute, routes } from '../routes';

export default function Router() {
  return (
    <>
      <Routes>{routes.map(createRoutes)}</Routes>
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
