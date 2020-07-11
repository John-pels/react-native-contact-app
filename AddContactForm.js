import React, { Component } from "react";
import { TextInput, StyleSheet, View, Button } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
});

export default class AddContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func,
  };

  state = {
    name: "",
    phone: "",
  };

  handleNameChange = (name) => {
    this.setState({ name });
  };

  handlePhoneChange = (phone) => {
    if (+phone >= 0) {
      this.setState({ phone });
    }
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.name}
          style={styles.input}
          onChangeText={this.handleNameChange}
          placeholder="Name"
        />

        <TextInput
          value={this.state.phone}
          style={styles.input}
          onChangeText={this.handlePhoneChange}
          keyboardType="numeric"
          placeholder="Phone"
        />

        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}
