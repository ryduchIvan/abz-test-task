export type PositonsApi = {
	success: boolean,
	positions: Position[]
}

type Position = {
	id: number, 
	name: string
}