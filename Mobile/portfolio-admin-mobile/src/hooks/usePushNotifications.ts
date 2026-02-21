import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState => {

  // handler global
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: true,

    // NOUVEAUX champs obligatoires
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken>();

  const [notification, setNotification] =
    useState<Notifications.Notification>();

  const notificationListener =
    useRef<Notifications.EventSubscription | null>(null);

  const responseListener =
    useRef<Notifications.EventSubscription | null>(null);

  const isNavigatingRef = useRef(false);

  const router = useRouter();


  async function registerForPushNotificationsAsync():
    Promise<Notifications.ExpoPushToken | undefined> {

    if (!Device.isDevice) {
      console.log("Doit être testé sur un vrai téléphone");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permission refusée");
      return;
    }

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId;

    if (!projectId) {
      console.error("projectId manquant dans app.json");
      return;
    }

    try {

      const token =
        await Notifications.getExpoPushTokenAsync({
          projectId,
        });

      if (Platform.OS === "android") {

        await Notifications.setNotificationChannelAsync(
          "default",
          {
            name: "default",
            importance:
              Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          }
        );
      }

      return token;

    } catch (error) {

      console.error(
        "Error getting push token:",
        error
      );

      return;
    }
  }


  const handleNotificationResponse = useCallback(
    async (
      response: Notifications.NotificationResponse
    ) => {

      if (isNavigatingRef.current) return;

      const data =
        response.notification.request.content.data as any;

      if (!data?.screen) return;

      isNavigatingRef.current = true;

      try {

        router.push({
          pathname: data.screen,
          params: data.params || {},
        });

      } catch (error) {

        console.error(
          "Error handling notification tap:",
          error
        );

      } finally {

        setTimeout(() => {

          isNavigatingRef.current = false;

        }, 1000);
      }
    },
    [router]
  );


  useEffect(() => {

    registerForPushNotificationsAsync()
      .then(token => {

        if (token)
          setExpoPushToken(token);

      });


    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        notification => {

          setNotification(notification);

        });


    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );


    return () => {
        notificationListener.current?.remove();
        responseListener.current?.remove();
    };

  }, [handleNotificationResponse]);


  return {
    expoPushToken,
    notification,
  };
};