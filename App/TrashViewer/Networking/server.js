const apiInsertCommand = 'http://34.218.219.101:3000/setMode'; //TODO change this
const apigetItemHistory = 'http://34.218.219.101:3000/history';//TODO change this
const apiFetchCommand = 'http://localhost:3001/fetch_command';

//send POST request to insert new data
async function insertCommand(command) {
    try {
        console.log(`Open function waiting for response`);

        let response = await fetch(apiInsertCommand, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command)
        });

        let responseJson = await response.json();
        console.log(`Open function response is`);
        console.log(`${JSON.stringify(responseJson)}`);

        return responseJson.json;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

//send POST request to get trashcan history
async function getItemHistory(command) {
    try {
        console.log(`History waiting for response`);

        let response = await fetch(apigetItemHistory, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command)
        });

        let responseJson = await response.json();
        console.log(`History response is`);
        console.log(`${JSON.stringify(responseJson)}`);

        return responseJson.json;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

//send GET request to fetch data
async function fetchItemData() {
    try {
        let response = await fetch(apiFetchCommand);
        let responseJson = await response.json();
        return responseJson.json;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

export {insertCommand};
export {getItemHistory};
export {fetchItemData};
