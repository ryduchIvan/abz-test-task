import { Title } from "components/title/Title";
import "./popup.scss";
interface PopupProps {
	closePopup: () => void
	src: string,
	title?: string
}

export const Popup = ({src, title = "", closePopup}: PopupProps) =>{

	return (
		<div className="popup" onClick={closePopup}>
			<div className="poput__title">
				<Title title={title}/>
			</div>
			<img src={src} alt="success" className="popup__images"  style={title ? {marginTop: "50px"} : {}} />
		</div>
	)
}