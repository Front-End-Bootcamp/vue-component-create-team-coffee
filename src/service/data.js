const url = "/src/assets/data/data.json"

export async function fetchData(){
	const data = await fetch(url).then(response => response.json()).then(response => response)
	return data
}