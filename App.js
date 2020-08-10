import React from "react";
import { StyleSheet } from "react-native";
import constants from "expo-constants";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import AddContactScreen from "./screens/AddContactScreen";
import ContactListScreen from "./screens/ContactListScreen";
import ContactDetailsScreen from "./screens/ContactDetailsScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchUsers } from "./api";

const ContactsTab = createStackNavigator(
  {
    AddContact: AddContactScreen,
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen,
  },
  {
    initialRouteName: "ContactList",
    navigationOptions: {
      headerTintColor: "#a41034",
    },
  }
);

const MainNavigator = createBottomTabNavigator(
  {
    Contacts: ContactsTab,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: "Contacts",
    tabBarOptions: {
      activeTintColor: "#a41034",
    },
  }
);

ContactsTab.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-contacts${focused ? "" : "-outline"}`}
      size={25}
      color={tintColor}
    />
  ),
};

const AppNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
    Login: LoginScreen,
  },
  { initialRouteName: "Login" }
);

export default class App extends React.Component {
  state = {
    contacts: null,
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const results = await fetchUsers();
    this.setState({ contacts: results });
  };

  addContact = (newContact) => {
    this.setState((prevState) => ({
      showForm: false,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  render() {
    return (
      <AppNavigator
        screenProps={{
          contacts: this.state.contacts,
          addContact: this.addContact,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    paddingTop: constants.statusBarHeight,
  },
  button: { margin: 10 },
});
