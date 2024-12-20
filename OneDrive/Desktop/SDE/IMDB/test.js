async function fetchData(){
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        const responseJson =await response.json();

        console.log(responseJson.phone)

    } catch (error) {
        console.log("error")
    }
}

fetchData()