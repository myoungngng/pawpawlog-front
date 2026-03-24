import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const socialLoginProviders = [
  { id: 1, key: "naver", icon: require("../assets/icons/naver.png") },
  { id: 2, key: "google", icon: require("../assets/icons/google.png") },
  { id: 3, key: "kakao", icon: require("../assets/icons/kakao.png") },
];

export default function LoginScreen() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const isLoginEnabled = userId.trim() !== "" && password.trim() !== "";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="아이디"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
          value={userId}
          onChangeText={setUserId}
        />
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="#BDBDBD"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Pressable 
        style={[
          styles.loginButton,
          isLoginEnabled && styles.loginButtonActive,
        ]} 
        onPress={() => {
          if (!isLoginEnabled) return;
          router.push("./login-success");
        }}
      >
        <Text style={styles.loginText}>로그인</Text>
      </Pressable>

      <View style={styles.social}>
        <View style={styles.socialIcons}>
          {socialLoginProviders.map((provider) => (
            <Pressable
              key={provider.id}
              style={styles.socialButton}
              onPress={() => {
                console.log(`${provider.key} login`);
              }}
            >
              <Image source={provider.icon} style={styles.socialIcon} />
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>계정이 없으신가요?</Text>
        <Pressable onPress={() => router.push("./signup")}>
          <Text style={styles.signup}>가입하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  // 로고
  logoImage: {
    width: 280,
    height: 150,
    resizeMode: "contain",
  },

  form: {
    gap: 16,
    marginBottom: 20,
  },

  // input 박스
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.3,
    borderColor: "#e8e8e838",
    color: "#333333",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  loginButton: {
    backgroundColor: "#D5D5D5",
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 45,
  },
  loginButtonActive: {
    backgroundColor: "#5e5e5e",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // 소셜 로그인
  social: {
    alignItems: "center",
    marginBottom: 48,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  socialButton: {
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.3,
    borderColor: "#e8e8e838",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  // 회원가입
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  signupText: {
    color: "#888",
  },
  signup: {
    color: "#4A4A4A",
    fontWeight: "500",
  },
});