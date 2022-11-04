import { User } from "types/index";
import "./card.scss";

export const Card = ({id, name, email, phone, position, position_id, registration_timestamp, photo} : User) =>{


	return (
		<div className="card__item">
			<img src={photo} alt="avatar" className="card__img" />
			<p className="card__name card-text">{name}</p>
			<p className="card__positon card-text">{position}</p>
			<p className="card__email card-text">{email}
				<span className="card__email-popup">{email}</span>
			</p>
			<p className="card__phone card-text">{phone}</p>
		</div>
	)
}