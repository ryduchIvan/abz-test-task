//CSS
import "./header.scss";
//img
import Logo from "assets/images/logo.svg";
//components
import {Button} from "components/button/Button";
export const Header = () =>(
		<header className="header">
			<div className="header__container container">
				<div className="header__row">
					<div className="header__logo">
						<img src={Logo} alt="" className="header__logo-img" />
						<span className="header__logo-title">Testtask</span>
					</div>
					<div className="header__buttons">
						<Button title="Users"/>
						<Button title="Sign up"/>
					</div>
				</div>
			</div>
		</header>
)