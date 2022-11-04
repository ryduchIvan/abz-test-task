import {Links, Users} from "./index";
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