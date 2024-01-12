import './icon.css'


type IconProps = {
  img: string,
  alt: string,
}
const Icon: React.FC<IconProps>= (props) => {
  return <div className="icon">
    <img src={props.img} alt={props.alt} />
  </div>
}

export default Icon