import "./cardList.scss";
//Components
import {Card} from "./Card";
import { Button } from "components/button/Button";
import Preload from "assets/images/preload.svg";
import { Title } from "components/title/Title";
import {Users, Status} from "type";
interface CardListProps {
	users: Users,
	page: number,
	status: Status,
	nextPage: () => void
}
export const CardList = ({users, page, status, nextPage}: CardListProps) =>{

	return (
			<>
			<Title title="Working with GET request"/>
			<div className="card__list">
				{
					status === "loading" ? 
					
					<img src={Preload} alt="preload" className="card__preload"/> : 
					
					users.map((user) => <Card key={user.id} {...user} />)
				}
			</div>
			{
				page !== 8 ? <div className="card__show-more" onClick={() =>{
					nextPage();
				}}>
					<Button title="Show more"/>
				</div> : null
			}
			</>
	)
}