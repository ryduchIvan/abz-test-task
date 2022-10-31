//img
import Cover from  "assets/images/cover.jpg";
//CSS
import "./main.scss";

export const Main = () =>{


	return (
		<main className="main">
			<div className="main__container container">
				<div className="cover">
					<img src={Cover} alt="cover" />
				</div>
			</div>
		</main>
	)
}