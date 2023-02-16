import React from 'react';

interface ProgressCircleProps {
  percent: number;
}

const circleDiameter = '120';

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percent }) => {
  return (
    <div className="progress-bar__content" style={{ margin: '2em' }}>
      <div className="progress-bar__wrapper">
        <svg>
          <circle cx={circleDiameter} cy={circleDiameter} r={circleDiameter} />
          <circle
            cx={circleDiameter}
            cy={circleDiameter}
            r={circleDiameter}
            style={{
              strokeDashoffset: `calc(750 - (750 * ${percent})/100)`,
              stroke: '#3a57a8',
            }}
          />
        </svg>
        <div className="progress-bar__number">
          <div className="progress-bar__title">
            {percent || 0}
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
