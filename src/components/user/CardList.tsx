import "./cardList.scss";
import {useEffect, useState} from "react";
import {Users} from "type";
//Components
import {Card} from "./Card";
import { Button } from "components/button/Button";
export const CardList = () =>{
	const [users, setUsers] = useState<Users>([]);

	useEffect(() =>{
		const loadUsers = async () =>{
			const reponse = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`);
			const data = await reponse.json();
			setUsers(data.users);
		}
		loadUsers();
	}, [])
	return (
		<section className="card">
			<h2 className="card__title">
				Working with GET request
			</h2>
			<div className="card__list">
				{
					users.map((user) => <Card key={user.id} {...user}/>)
				}
			</div>
			<div className="card__show-more">
				<Button title="Show more"/>
			</div>
		</section>
	)
}