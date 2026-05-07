import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const socialLoginProviders = [
  { id: 1, key: "naver", icon: require("../assets/icons/naver.png") },
  { id: 2, key: "google", icon: require("../assets/icons/google.png") },
  { id: 3, key: "kakao", icon: require("../assets/icons/kakao.png") },
];

export default function LoginScreen() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const isLoginEnabled = userId.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
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
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollTo({ y: 40, animated: true });
                  }, 150);
                }}
              />
              <TextInput
                placeholder="비밀번호"
                placeholderTextColor="#BDBDBD"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollTo({ y: 110, animated: true });
                  }, 150);
                }}
              />
            </View>

            <Pressable
              style={styles.keepLoginRow}
              onPress={() => setKeepLoggedIn((prev) => !prev)}
            >
            <View
              style={[
                styles.checkbox,
                keepLoggedIn && styles.checkboxChecked,
              ]}
            >
              {keepLoggedIn && (
                <View style={styles.checkWrapper}>
                  <View style={styles.checkLeft} />
                  <View style={styles.checkRight} />
                </View>
              )}
            </View>
              <Text style={styles.keepLoginText}>로그인 상태 유지</Text>
            </Pressable>

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
              <Pressable onPress={() => router.push("./signup-agreement")}>
                <Text style={styles.signup}>가입하기</Text>
              </Pressable>
            </View>

            <View style={{ height: keyboardHeight }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    padding: 24,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    marginTop: 75,
    marginBottom: 40,
  },

  logoImage: {
    width: 280,
    height: 150,
    resizeMode: "contain",
  },

  form: {
    gap: 16,
    marginBottom: 14,
  },

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

  keepLoginRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingLeft: 2,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.3,
    borderColor: "#CFCFCF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  checkWrapper: {
    width: 12,
    height: 10,
    position: "relative",
  },

  checkLeft: {
    position: "absolute",
    width: 5.5,
    height: 2.2,
    backgroundColor: "#9E9E9E",
    borderRadius: 999,
    left: 1,
    bottom: 2,
    transform: [{ rotate: "45deg" }],
  },

  checkRight: {
    position: "absolute",
    width: 9,
    height: 2.2,
    backgroundColor: "#9E9E9E",
    borderRadius: 999,
    left: 4,
    bottom: 3.5,
    transform: [{ rotate: "-45deg" }],
  },

  checkboxChecked: {
    borderColor: "#C4C4C4",
  },

  keepLoginText: {
    color: "#7A7A7A",
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: "#D5D5D5",
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 45,
  },

  loginButtonActive: {
    backgroundColor: "#FF9544",
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },

  social: {
    alignItems: "center",
    marginBottom: 48,
  },

  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },

  socialButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

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