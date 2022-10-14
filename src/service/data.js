import { httpService } from "./baseHttp"

export async function fetchData(){
	const data = await httpService("entries").then(response => response.data.entries)
	return data
}

export function filterBySearchInput (data, searchInput) {
	const filteredData = data.filter(item => item.API.toLowerCase().includes(searchInput.toLowerCase()))
	return filteredData
}