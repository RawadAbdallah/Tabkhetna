import "./icon.css";

type IconProps = {
    img: string;
    alt: string;
    noBackground?: boolean;
};
const Icon: React.FC<IconProps> = ({img, alt, noBackground = false}) => {
    return (
        <div className={noBackground ? "icon transparent-icon" : "icon"}>
            <img src={img} alt={alt} />
        </div>
    );
};

export default Icon;
