import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignupScreen() {
    const [userId, setUserId] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const isSignupEnabled = userId.trim() !== "" && nickname.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "";

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/icons/logo.png")}
            style={styles.logoImage}
          />
        </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <TextInput
            placeholder="아이디"
            placeholderTextColor="#BDBDBD"
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
          />
          <TextInput
            placeholder="닉네임"
            placeholderTextColor="#BDBDBD"
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
          />
          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#BDBDBD"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="비밀번호 확인"
            placeholderTextColor="#BDBDBD"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
  
        {/* 
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
        */}
        <Pressable 
          style={[
            styles.signupButton,
            isSignupEnabled && styles.signupButtonActive,
          ]} 
          onPress={() => {
            if (!isSignupEnabled) return;
            router.push("./login");
          }}
        >
          <Text style={styles.signupText}>회원가입</Text>
        </Pressable>
      </View>
    </View>
    );
  }
  
  // CSS
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginTop: 124,
    marginBottom: 30,
  },
  content: {
    marginTop: 10,
  },
  logoImage: {
    width: 280,
    height: 150,
    resizeMode: "contain",
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    color: "#333333",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  signupButton: {
    backgroundColor: "#D5D5D5",
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 45,
  },
  signupButtonActive: {
    backgroundColor: "#5e5e5e",
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
  },
});