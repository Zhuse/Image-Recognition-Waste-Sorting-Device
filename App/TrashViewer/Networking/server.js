const apiInsertCommand = 'http://localhost:3001/insert_command';
const apiFetchCommand = 'http://localhost:3001/fetch_command';

//send POST request to insert new data
async function insertCommand(command) {
    try {
        let response = await fetch(apiInsertCommand, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command)
        });

        let responseJson = await response.json();
        return responseJson.result;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

//send GET request to fetch data
async function fetchItemData() {
    try {
        let response = await fetch(apiFetchCommand);
        let responseJson = await response.json();
        return responseJson.data; //list of foods
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

export {insertCommand};
export {fetchItemData};