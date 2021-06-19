import './Summary.scss';

interface SummaryItem {
    label: string;
    value: number;
    isPercentage?: boolean;
    linkTo?: string;
}

type Props = Array<SummaryItem>;

export function SummaryItem({ label, value, isPercentage, linkTo }: SummaryItem) {
    const _renderValueText = isPercentage ? `${Math.round(value)}%` : value;
    const _renderValueElement = (valueText: string | number) =>
        linkTo ? (
            <a className="value" href={linkTo}>
                {valueText}
            </a>
        ) : (
            <p className="value">{valueText}</p>
        );

    return (
        <div className="summary__item">
            <p className="label">{label}</p>
            {_renderValueElement(_renderValueText)}
        </div>
    );
}

function Summary(props: Props): JSX.Element {
    return (
        <div className="summary">
            {props.map((item, i) => (
                <SummaryItem key={`${item.label}_${i}`} {...item} />
            ))}
        </div>
    );
}

export default Summary;