import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { spacing } from "./spacing";

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'none',
  },
  text: {
    color: colors.text,
    fontSize: 32,
  },
  cards: {
    borderRadius: 16,
    backgroundColor: colors.primarybackground,
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
