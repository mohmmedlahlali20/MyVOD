import { useEffect } from "react";
import { io } from "socket.io-client";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

const socket = io("http://192.168.1.28:9220", {
  transports: ["websocket"],
  forceNew: true,
});

const useWebSocketNotifications = () => {
  useEffect(() => {
    console.log("🔌 Connexion WebSocket en cours...");
    socket.on("connect", () => {
      console.log("✅ Connexion WebSocket réussie!");
    });
  
    socket.on("notification", async (data) => {
      console.log("🛑 Notification WebSocket reçue →", data); // Log la notification reçue
  
      if (data) {
        Alert.alert(data.title, data.message); // Affiche la notification avec un message
        console.log("💬 Notification envoyée:", data.title, data.message); // Log les valeurs de la notification envoyée
  
        await Notifications.scheduleNotificationAsync({
          content: {
            title: data.title,
            body: data.message,
            sound: "default",
          },
          trigger: { seconds: 60 }, // Déclenche la notification après 1 seconde
        });
      }
    });
  
    return () => {
      socket.off("notification");
    };
  }, []);
  
  
  
};

export default useWebSocketNotifications;
