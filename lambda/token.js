const data = JSON.parse(event.body);
try {
    console.log(data);
    await axios({
        method: 'post',
        url: 'https://api.notifymyecho.com/v1/NotifyMe',
        data: {
            accessCode: 'ACCESS CODE',
            notification: `Message: ${data.event.text}`
        }
    });
} catch (err) {
    console.log(err);
} finally {
    const response = {
        statusCode: 200,
        body: 'User notified'
    };
    return response;
}