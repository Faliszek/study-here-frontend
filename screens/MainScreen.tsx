import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { useNavigation } from "react-navigation-hooks";
import { Divider, Overlay, Button, Input } from "react-native-elements";
import Layout from "../constants/Layout";

export default function MainScreen() {
  //   const { navigate } = useNavigation();
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.barTitle}>iStudyHere</Text>
      </View>
      <ScrollView style={styles.main}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          semper, lectus sit amet scelerisque euismod, tortor libero luctus
          turpis, quis efficitur lectus augue id ante. Praesent venenatis varius
          placerat. Fusce neque metus, hendrerit at justo in, accumsan ultrices
          sapien. Aliquam erat volutpat. Integer varius fringilla facilisis.
          Vivamus a placerat justo. Donec lorem augue, egestas at consequat sed,
          iaculis in justo. Maecenas tellus tellus, venenatis eget lobortis et,
          venenatis id justo. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Curabitur pharetra urna id
          ligula aliquet eleifend. Curabitur ac ultricies magna, eget accumsan
          nisi. Quisque feugiat blandit felis nec fringilla. Curabitur
          ullamcorper sagittis felis, eget porttitor mi rhoncus in. Aenean et
          sapien eu quam sollicitudin tempus vitae vitae diam. In sed pretium
          est. Ut a urna sit amet turpis gravida porttitor id non augue.
          Praesent molestie pharetra sodales. Sed semper hendrerit nulla. Cras
          rutrum velit non est interdum, mollis aliquet diam imperdiet.
          Suspendisse potenti. Donec nisi tortor, lacinia vitae viverra in,
          pulvinar non tellus. Praesent nibh ante, pellentesque in condimentum
          mollis, hendrerit at leo. Nullam eget nibh dapibus, congue libero id,
          interdum erat. Sed mollis justo nec lacus cursus pulvinar. Phasellus
          nec ligula euismod, dapibus dolor eu, mollis libero. Cras a diam enim.
          Proin posuere aliquet tincidunt. Donec est ipsum, elementum porttitor
          urna ut, dapibus posuere nisi. Quisque convallis sem vel facilisis
          eleifend. Donec quis velit eu dolor egestas mattis. Fusce eget tellus
          rutrum, malesuada erat semper, sodales justo. Quisque quam risus,
          fringilla ut tristique non, varius ac orci. Duis vitae condimentum mi.
          Nunc in diam vel enim hendrerit maximus non vitae lorem. Donec
          consequat erat eu libero rutrum varius. In pulvinar pretium nisl, vel
          dapibus quam scelerisque eget. Ut eget nulla vel magna cursus
          ultricies. Vivamus lectus elit, congue quis placerat non, iaculis a
          est. Nullam quis dapibus orci, at pellentesque sapien. Suspendisse
          lacus tellus, mattis eget interdum eget, fermentum non augue.
          Curabitur sit amet molestie dui. Aliquam ultrices lectus mauris. Duis
          felis libero, ornare ut ornare non, vulputate id mi. Duis non lacus
          nulla. Donec semper dolor non mi rutrum, at tempor massa auctor.
          Vestibulum eleifend eu neque a ornare. Fusce vehicula urna elit, non
          hendrerit odio convallis at. Etiam ac vulputate nulla. Vestibulum
          tristique nulla at leo fermentum faucibus. Donec luctus congue justo
          nec porta. Pellentesque nisl eros, hendrerit sit amet euismod non,
          bibendum in mauris. Duis fringilla at purus a congue. Vestibulum
          interdum elit tortor, in consectetur risus facilisis non. Morbi
          vulputate, est ut pharetra molestie, est lectus dapibus lectus, quis
          interdum enim turpis et mi. Vivamus vel metus sit amet quam auctor
          vestibulum eget quis arcu. Suspendisse ut lacus vel quam auctor
          egestas. Donec quis euismod arcu. Vestibulum non mollis velit, a
          auctor tellus. In eleifend ipsum eu sem sodales interdum. Suspendisse
          facilisis euismod nisi. Phasellus facilisis eros et eros commodo, vel
          volutpat est feugiat. Etiam condimentum, risus a finibus sodales,
          lacus ipsum maximus arcu, sed aliquet ipsum metus quis nibh.
          Pellentesque dictum ac dolor non sollicitudin. Proin ut nulla cursus,
          vulputate quam vitae, feugiat enim. Pellentesque eget nulla quam.
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={_ => setVisible(_ => true)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
      {visible && (
        <Overlay
          isVisible={visible}
          height={300}
          onBackdropPress={e => setVisible(false)}
        >
          <View>
            <Text style={styles.modalTitle}>Utwórz post</Text>
            <Input
              multiline={true}
              placeholder="Wprowadź treść"
              inputStyle={{ height: 120 }}
            />
            <View style={styles.space} />
            <View style={styles.btnRow}>
              <Button
                title="Dodaj post"
                onPress={_ => setVisible(false)}
              ></Button>
            </View>
          </View>
        </Overlay>
      )}
    </View>
  );
}

MainScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  btnRow: {
    paddingHorizontal: 20,
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    padding: 16
  },
  modal: {},
  inputWrap: {
    flex: 1
  },
  main: {
    height: Layout.height
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    flex: 1
  },

  space: {
    height: 20
  },

  bar: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff"
  },

  barTitle: {
    fontSize: 24
  },

  roundButton: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(65,135,220)",
    borderRadius: 9999
  },
  btnText: {
    fontSize: 36,
    color: "white"
  },
  footer: {
    paddingHorizontal: 20,
    height: 96,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});
