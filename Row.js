import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  row: {
    padding: 20,
  },
});

export const Row = (props) => (
  <TouchableOpacity
    style={styles.row}
    onPress={() => {
      props.onSelectContact(props);
    }}
  >
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </TouchableOpacity>
);
