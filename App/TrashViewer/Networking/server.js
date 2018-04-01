const apiInsertCommand = 'http://34.218.219.101:3000/setMode'; //TODO change this
const apigetItemHistory = 'http://httpbin.org/post';//TODO change this
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

        console.log(`Response is`);
        console.log(`${JSON.stringify(responseJson)}`);
/*
        console.log(`${responseJson.json.success}`);
*/
        //TODO change this. The current test server's response just echoes back the JSON sent in the POST request into responseJson.json
        return responseJson.json;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

//send POST request to get trashcan history
async function getItemHistory(command) {
    try {
        let response = await fetch(apigetItemHistory, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command)
        });

        let responseJson = await response.json();

        /*        console.log(`${JSON.stringify(responseJson)}`);
                console.log(`Response is`);
                console.log(`${responseJson.json.openGarbage}`);*/
        //TODO change this. The current test server's response just echoes back the JSON sent in the POST request into responseJson.json
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
