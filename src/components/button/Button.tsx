import "./button.scss";

interface ButtonProps {
	title: string,
	onClick?: () => void
}

/*you need push title , and if you need callback function without paremeters*/

export const Button = ({title, onClick}: ButtonProps) =>{
	return (
		<button className="button" onClick={() =>{
			if (onClick) {
				onClick();
			}
		}}>
			{title}
		</button>
	)
}