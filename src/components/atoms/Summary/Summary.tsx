import React from 'react';
import './Summary.scss';

interface SummaryItemProps {
    label: string;
    value: number;
    isPercentage?: boolean;
    linkTo?: string;
}

type Props = Array<SummaryItemProps>;

export function SummaryItem({ label, value, isPercentage, linkTo }: SummaryItemProps) {
    const renderValueText = isPercentage ? `${Math.round(value)}%` : value;
    const renderValueElement = (valueText: string | number) =>
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
            {renderValueElement(renderValueText)}
        </div>
    );
}

function Summary(props: Props) {
    return (
        <div className="summary">
            {props.map((item, index) => {
                const key = `${item.label}_${index}`;
                return <SummaryItem key={key} {...item} />;
            })}
        </div>
    );
}

export default Summary;
