import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import SuccessLogo from "../assets/icons/success-logo.svg";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={["#FF9544", "#FFCD5F"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <SuccessLogo width={96} height={96} style={styles.logo} />

        <Text style={styles.text}>OOO님 환영합니다!</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});