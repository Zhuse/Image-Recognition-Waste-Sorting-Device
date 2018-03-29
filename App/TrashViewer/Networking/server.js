const apiInsertCommand = 'http://localhost:3001/insert_command';

//send post request to insert new data
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

export {insertCommand};