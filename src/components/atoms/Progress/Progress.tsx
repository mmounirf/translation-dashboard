import './Progress.scss';

interface Props {
    value: number;
    maxValue?: number;
}

function Progress({ value, maxValue = 100 }: Props): JSX.Element {
    const progressPercentage = Number(((value * maxValue) / 100).toFixed(2));

    const progressClass = (): string => {
        switch (true) {
            case progressPercentage < 45:
                return 'danger';
            case progressPercentage < 67:
                return 'moderate';
            case progressPercentage >= 67:
                return 'success';
            default:
                return 'success';
        }
    };

    return (
        <div className="progress">
            <span className={`progress__fill progress__fill--${progressClass()}`} style={{ width: `${progressPercentage}%` }} />
        </div>
    );
}

export default Progress;
