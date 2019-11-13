componentWillMount() {
    let result = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (result.status === "granted" && this.state.switchStatus) {
    // i add this :
      if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('chat-messages', {
                name: 'Chat messages',
                sound: true,
                vibrate: true,
            });
        }
      console.log("Notification permissions granted.");

      this.setNotifications();
    } else {
      console.log("No Permission", Constants.lisDevice);
    }

    this.listenForNotifications(); 
  }

  getNotification(date) {

    const localNotification = {
      title: `Notification at ${date.toLocaleTimeString()}`,
      body: "N'oubliez pas de prendre tes medicament", 
      ios: {

        sound: true 
      },

      android: {
       "channelId": "chat-messages" //and this
            }
    };
    return localNotification;
  }
  setNotifications() {
    Notifications.cancelAllScheduledNotificationsAsync();

    for (let i = 0; i < 64; i++) {
      //Maximum schedule notification is 64 on ios.
      let t = new Date();
      if (i === 0) {
        t.setSeconds(t.getSeconds() + 1);
      } else {
        t.setMinutes(t.getMinutes() + 1 + i * 1); // 15 Minutes
      }
      const schedulingOptions = {
        time: t 
      };
      Notifications.scheduleLocalNotificationAsync(
        this.getNotification(t),
        schedulingOptions
      );
    }
  }
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      console.log("received notification", notification);
    });
  };