// TODO: use environment variables for HOST, PROJECT, ACTIVITY
// It's a pain to set up and i tried for several hours to get it working
// The docker containers had it but the code wouldn't read them, thanks react-native
let HOST = 'http://192.168.1.20:8001';
let PROJECT = 1;
let ACTIVITY = 1;

export async function ping(username, password) {
    try {
        const response = await fetch(HOST + '/api/ping', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-USER': username,
                'X-AUTH-TOKEN': password,
            }
        });
        return response.ok;
    } catch (e) {
        console.error('Error pinging server:', e);
        return false;
    }
}

export async function startTimer(username, password) {
    try {
        const data = {
            project: PROJECT,
            activity: ACTIVITY
        };

        const response = await fetch(HOST + '/api/timesheets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-USER': username,
                'X-AUTH-TOKEN': password
            },
            body: JSON.stringify(data)
        });
        return response.status;
    } catch (error) {
        console.error('Error starting timer:', error);
    }
}


export async function getActiveTimer(username, password) {
    try {
        const response = await fetch(HOST + '/api/timesheets/active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-USER': username,
                'X-AUTH-TOKEN': password
            }
        });

        return await response.json();
    } catch (e) {
        console.error('Error getting active timer:', e);
    }
}

export async function stopTimer(username, password, id) {
    try {
        const response = await fetch(HOST + '/api/timesheets/' + id + '/stop', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-USER': username,
                'X-AUTH-TOKEN': password
            },
        });
    } catch (e) {
        console.error('Error stopping timer:', e);
    }
}
