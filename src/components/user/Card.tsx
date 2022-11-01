import { User } from "type";
import "./card.scss";

export const Card = ({id, name, email, phone, position, position_id, registration_timestamp, photo}: User) =>{

	return (
		<div className="card__item">
			<img src={photo} alt="avatar" className="card__img" />
			<p className="card__name card-text">{name.substring(0,10)}</p>
			<p className="card__positon card-text">{position}</p>
			<p className="card__email card-text">{email.substring(0,10)}</p>
			<p className="card__phone card-text">{phone}</p>
		</div>
	)
}