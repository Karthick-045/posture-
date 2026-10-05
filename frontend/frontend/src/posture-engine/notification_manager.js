export function sendNotification(
    message
) {

    if(
        Notification.permission
        === "granted"
    ) {

        new Notification(
            message
        );

    }
}