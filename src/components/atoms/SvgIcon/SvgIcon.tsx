import './SvgIcon.scss'

interface Props {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    width?: number;
    height?: number;
    color?: string;
    className?: string;
}

function SvgIcon({ Icon, width = 10, height = 10, color = 'black', className = '' }: Props) {
    const iconContainerClass = `svg-icon-container ${className}`
    return (
        <div className={iconContainerClass}>
            <Icon width={width} height={height} fill={color} />
        </div>
    )
}

export default SvgIcon;
