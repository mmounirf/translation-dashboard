interface Props {
    children: string | JSX.Element;
    className?: string;
}

function Chip({ children, className = '' }: Props): JSX.Element {
    const chipClass = `chip ${className}`
    return (
        <div className={chipClass}>{children}</div>
    )
}

export default Chip;