import "./cardList.scss";
//Components
import {Card} from "./Card";
import { Button } from "components/button/Button";
import Preload from "assets/images/preload.svg";
import { Title } from "components/title/Title";
import {Users, Status} from "types/index";
interface CardListProps {
	users: Users,
	page: number,
	status: Status,
	nextPage: () => void,
	nextUrl: null | string
}
export const CardList = ({users, page, status, nextPage, nextUrl}: CardListProps) =>{
	let lastPage = users.length / 6;

	return (
			<>
			<Title title="Working with GET request"/>
			<div className="card__list">
				{
					status === "loading" ? <img src={Preload} alt="preload" className="card__preload"/> : null 
					
				}
				{
					status === "rejected" ? <h2 className="card__error">Someting went wrong. Please reload site</h2> : null
				}
				{
					status === "received" ? users.map((user) => <Card key={user.id} {...user} />) : null
				}
			</div>
			{/*hide button when we on last page*/
				nextUrl  ? <div className="card__show-more" >
					<Button title="Show more" onClick={() =>{
					nextPage();
				}}/>
				</div> : null
			}
			</>
	)
}