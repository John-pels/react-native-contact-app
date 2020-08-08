import React from "react";
import { Button, View, StyleSheet } from "react-native";

import SectionListContacts from "../sectionListContacts";

export default class ContactListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Contacts",
      headerRight: (
        <Button
          title="Add"
          onPress={() => {
            navigation.navigate("AddContact");
          }}
        />
      ),
    };
  };

  state = {
    showContacts: true,
  };

  toggleContacts = () => {
    this.setState((prevState) => ({ showContacts: !prevState.showContacts }));
  };

  showForm = () => {
    this.props.navigation.navigate("AddContact");
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.showContacts && (
          <SectionListContacts
            contacts={this.props.screenProps.contacts}
            onSelectContact={(contact) => {
              this.props.navigation.navigate("ContactDetails", {
                phone: contact.number,
                name: contact.name,
              });
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
