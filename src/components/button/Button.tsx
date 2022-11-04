import "./button.scss";

interface ButtonProps {
	title: string,
	onClick?: () => void,
	disabled?: boolean
}

/*you need push title , and if you need callback function without paremeters*/

export const Button = ({title, onClick, disabled}: ButtonProps) =>{
	return (
		<button  className={`${disabled ? "disabled ": " "}button`} onClick={() =>{
			if (onClick) {
				onClick();
			}
		}}>
			{title}
		</button>
	)
}