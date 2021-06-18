import './SvgIcon.scss'

interface Props {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    width?: number;
    height?: number;
    color?: string;
}

function SvgIcon({ Icon, width = 10, height = 10, color = 'black', ...rest }: Props) {
    return (
        <div className="svg-icon-container" style={{width, height}}>
            <Icon width={width} height={height} fill={color} />
        </div>
    )
}

export default SvgIcon;
