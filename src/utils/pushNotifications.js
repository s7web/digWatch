import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { ApiRequests } from '../api/requests';
import { Platform } from 'react-native';

export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  } else {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('news-notify', {
        name: 'news-notify',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }

    Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  ApiRequests.saveToken(token).then(res => {
    //if we want anything to say about this we do it here
  });
}
