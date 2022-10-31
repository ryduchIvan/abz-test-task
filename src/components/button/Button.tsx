import "./button.scss";
interface ButtonProps {
	title: string
}
export const Button = ({title}: ButtonProps) =>{
	return (
		<button className="button">
			{title}
		</button>
	)
}