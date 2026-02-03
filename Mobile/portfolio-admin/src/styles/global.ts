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
  }
});
