import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from 'styled-components';

import * as firebase from 'firebase';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT = 'https://react-native-test-e16b0.firebaseio.com/';

import { Button } from "react-native-elements";


const Root = styled.View`
    flex: 1;
    background-color: papayawhip;
    justify-content: center;
    align-items: center;
`;

interface Props {

}

export function RegisterPushTokenAccess(props: Props) {
    const [token, setToken] = React.useState();

    useEffect(() => {
        registerForPushNotifications();
      }, [token])

    const registerForPushNotifications = async() => {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = status;

        if (status !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') return;

        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token, 'token');

        let uuid = firebase.auth().currentUser.uuid;
        firebase.database().ref('users').child(uuid).update({
            expoPushToken: token,
        })

        setToken(token);
    }

    const sendNotification = () => {
        console.log('lol')
        console.log("@@", token);
        const tempToken = 'ExponentPushToken[zc-IpdNzO-jZBEfYG8d7wW]';

        let response = fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              to: tempToken,
              sound: 'default',
              title: 'Demo',
              body: 'Demo notificaiton'
            })
          });
          console.log('response', response);
    }

  return (
    <Root>
        <View>
            <Button title="send push" onPress={sendNotification} />
        </View>
    </Root>
  );
}


