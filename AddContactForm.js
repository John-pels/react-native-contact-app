import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import PropTypes from "prop-types";
import constants from "expo-constants";

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
  container: {
    flex: 1,
    margin: 10,
    paddingTop: constants.statusBarHeight,
    justifyContent: "center",
  },
});

export default class AddContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func,
  };

  state = {
    name: "",
    phone: "",
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.name !== prevState.name ||
      this.state.phone !== prevState.phone
    ) {
      this.validateForm();
    }
  }

  getHandler = (key) => (val) => {
    this.setState({ [key]: val });
  };

  handlePhoneChange = (phone) => {
    if (+phone >= 0 && phone.length <= 10) {
      this.setState({ phone });
    }
  };

  validateForm = () => {
    const names = this.state.name.split(" ");
    if (
      +this.state.phone >= 0 &&
      this.state.phone.length === 10 &&
      names.length >= 2 &&
      names[0] &&
      names[1]
    ) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          value={this.state.name}
          style={styles.input}
          onChangeText={this.getHandler("name")}
          placeholder="Name"
        />

        <TextInput
          value={this.state.phone}
          style={styles.input}
          onChangeText={this.getHandler("phone")}
          keyboardType="numeric"
          placeholder="Phone"
        />

        <Button
          title="Submit"
          onPress={this.handleSubmit}
          disabled={!this.state.isFormValid}
        />
      </KeyboardAvoidingView>
    );
  }
}
