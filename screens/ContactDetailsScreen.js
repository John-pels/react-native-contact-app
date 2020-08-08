import React from "react";
import { Button, Text, View } from "react-native";

export default class ContactDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("name"),
      headerRight: (
        <Button
          title="Contact List"
          onPress={() => navigation.navigate("ContactList")}
        />
      ),
    };
  };

  render() {
    return (
      <View>
        <Text>{this.props.navigation.getParam("phone")}</Text>
        <Button
          title="Go to random contact"
          onPress={this._goToRandomContact}
        />
      </View>
    );
  }

  _goToRandomContact = () => {
    const contacts = this.props.screenProps.contacts;
    const phone = this.props.navigation.getParam("phone");
    let randomContact;
    while (!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if (contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    }

    // this.props.navigation.navigate('ContactDetails', {
    //   ...randomContact,
    // });
    this.props.navigation.push("ContactDetails", {
      ...randomContact,
    });
  };
}
