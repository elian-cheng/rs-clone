import React from 'react';
import { IFeature } from './Features';

export default function FeatureCard(props: IFeature) {
  const {
    id,
    src, //
    title,
    description,
  } = props;
  return (
    <div className="feature">
      <h6 className="feature__title">{title}</h6>
      <div className={`feature__content feature__content_${id}`}>
        <img src={src} alt={title} />
        <p>{description}</p>
      </div>
    </div>
  );
}
