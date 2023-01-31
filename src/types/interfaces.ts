export interface IFeature {
  id: number;
  src: string;
  title: string;
  description: string;
}

export interface IRoute {
  path: string;
  element: React.ReactNode;
}

export interface ITitle {
  [key: string]: string;
}
