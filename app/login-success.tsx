import { Image, StyleSheet, Text, View } from "react-native";

export default function LoginSuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/icons/success-logo.png")}
          style={styles.image}
        />

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
});