//img
import Cover from  "assets/images/cover.jpg";
import { Button } from "components/button/Button";
//CSS
import "./main.scss";
//Components
import {CardList} from "components/user/CardList";
export const Main = () =>(
	(
		<main className="main">
			<div className="main__container container">
				<div className="cover">
					<div className="cover__content">
					<h1 className="cover__title">
						Test assignment for front-end developer
					</h1>
					<div className="cover__text">
						What defines a good front-end developer is one that has 
						skilled knowledge of HTML, CSS, JS with a vast understanding 
						of User design thinking as they'll be building web interfaces 
						with accessibility in mind. They should also be excited to learn, 
						as the world of Front-End Development keeps evolving.
					</div>
					<div className="cover__btn">
						<Button title="Sign up"/>
					</div>
					</div>
				</div>
				<CardList/>
			</div>
		</main>
	)
)