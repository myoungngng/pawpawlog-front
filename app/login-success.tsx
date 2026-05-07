import { StyleSheet, Text, View } from "react-native";
import SuccessLogo from "../assets/icons/success-logo.svg";

export default function LoginSuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SuccessLogo width={96} height={96} style={styles.logo} />

        <Text style={styles.text}>로그인 성공!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",   
    alignItems: "center",      
  },

  content: {
    alignItems: "center",
    marginBottom: 80, 
  },

  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 30,
  },

  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4A4A4A",
  },
  
  logo: {
    marginBottom: 20,
  },
});