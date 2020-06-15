import { StyleSheet } from "react-native";

const color = "#ff8400";

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color,
  },

  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },

  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },

  input: {
    marginTop: 5,
    marginBottom: 20,
  },

  button: {
    marginTop: 20,
  },

  error: {
    fontSize: 14,
  },
});

export default myStyles;
