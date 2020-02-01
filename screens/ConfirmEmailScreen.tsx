import React from "react";
import { View } from "react-native";
import { Avatar, Button, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmEmailScreen() {
    const nav = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Avatar.Icon
                    icon="chat-alert"
                    size={128}
                    style={{ justifyContent: "center" }}
                />
                <View style={{ height: 40 }} />
                <Title style={{ textAlign: "center" }}>Ważna informacja!</Title>
                <View style={{ height: 15 }} />
                <Paragraph style={{ textAlign: "center" }}>
                    Dostałeś wiadomość email, aby zweryfikować swoje konto, zaloguj się po potwierdzeniu
                </Paragraph>
                <View style={{ height: 40 }} />
                <Button mode="outlined" onPress={() => nav.navigate("Login")}>
                    Logowanie
                </Button>
            </View>
        </View>
    );
}
