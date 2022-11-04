export type APIData = {
	success: boolean,
	total_pages: number,
	total_users: number,
	count: number, 
	page: number, 
	links: Links,
	users: Users,
	message?:string
}

export type Users = User[];//type for data from apis

export type User = {//type for one card
	id: number, 
	name: string, 
	email: string,
	phone: string, 
	position: string, 
	position_id: number, 
	registration_timestamp: number, 
	photo: string 
}
export type Status = "loading" | "received" | "rejected";

export type newUserDataFileds = {//type for new User data
  name: string, 
  email: string, 
  phone: string,
  file: any
}

export type tokenData = {
	success: boolean,
	token: string
}

export type PositonsApi = {
	success: boolean,
	positions: Position[]
}

type Position = {
	id: number, 
	name: string
}

type Links = {
	next_url: string | null,
	prev_url: string | null
}