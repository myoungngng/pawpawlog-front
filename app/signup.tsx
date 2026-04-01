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

export default function SignupScreen() {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  const nicknameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const isSignupEnabled =
    userId.trim() !== "" &&
    nickname.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

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

            <View style={styles.content}>
              <View style={styles.form}>
                <TextInput
                  placeholder="아이디"
                  placeholderTextColor="#BDBDBD"
                  style={styles.input}
                  value={userId}
                  onChangeText={setUserId}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollRef.current?.scrollTo({ y: 40, animated: true });
                    }, 150);
                  }}
                  onSubmitEditing={() => {
                    nicknameRef.current?.focus();
                  }}
                />

                <TextInput
                  ref={nicknameRef}
                  placeholder="닉네임"
                  placeholderTextColor="#BDBDBD"
                  style={styles.input}
                  value={nickname}
                  onChangeText={setNickname}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollRef.current?.scrollTo({ y: 90, animated: true });
                    }, 150);
                  }}
                  onSubmitEditing={() => {
                    passwordRef.current?.focus();
                  }}
                />

                <TextInput
                  ref={passwordRef}
                  placeholder="비밀번호"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollRef.current?.scrollTo({ y: 150, animated: true });
                    }, 150);
                  }}
                  onSubmitEditing={() => {
                    confirmPasswordRef.current?.focus();
                  }}
                />

                <TextInput
                  ref={confirmPasswordRef}
                  placeholder="비밀번호 확인"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onFocus={() => {
                    setTimeout(() => {
                      scrollRef.current?.scrollTo({ y: 210, animated: true });
                    }, 150);
                  }}
                />
              </View>

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
                <Text style={styles.signupButtonText}>회원가입</Text>
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
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 40,
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
    gap: 18,
    marginBottom: 20,
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

  signupButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});