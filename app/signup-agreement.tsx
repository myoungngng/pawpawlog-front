import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type AgreementKey = "service" | "privacy" | "age" | "marketing";

export default function SignupAgreementScreen() {
  const [agreements, setAgreements] = useState<Record<AgreementKey, boolean>>({
    service: false,
    privacy: false,
    age: false,
    marketing: false,
  });

  const isAllChecked = useMemo(() => {
    return (
      agreements.service &&
      agreements.privacy &&
      agreements.age &&
      agreements.marketing
    );
  }, [agreements]);

  const isRequiredChecked = useMemo(() => {
    return agreements.service && agreements.privacy && agreements.age;
  }, [agreements]);

  const toggleAll = () => {
    const nextValue = !isAllChecked;

    setAgreements({
      service: nextValue,
      privacy: nextValue,
      age: nextValue,
      marketing: nextValue,
    });
  };

  const toggleItem = (key: AgreementKey) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>소동물 집사님!</Text>
          <Text style={styles.title}>반가워요!</Text>
        </View>

        <View style={styles.contentWrap}>
          <View style={styles.allAgreementSection}>
            <View style={styles.divider} />

            <AgreementRow
              variant="all"
              label="전체동의"
              checked={isAllChecked}
              onPress={toggleAll}
            />

            <View style={styles.divider} />
          </View>

          <View style={styles.detailAgreementSection}>
            <AgreementRow
              variant="required"
              prefix="필수"
              label="서비스 이용약관"
              checked={agreements.service}
              onPress={() => toggleItem("service")}
            />

            <AgreementRow
              variant="required"
              prefix="필수"
              label="개인정보 처리방침"
              checked={agreements.privacy}
              onPress={() => toggleItem("privacy")}
            />

            <AgreementRow
              variant="required"
              prefix="필수"
              label="만 14세 이상"
              checked={agreements.age}
              onPress={() => toggleItem("age")}
            />

            <AgreementRow
              variant="optional"
              prefix="선택"
              label="마케팅"
              checked={agreements.marketing}
              onPress={() => toggleItem("marketing")}
            />
          </View>
        </View>

        <Pressable
          style={[
            styles.nextButton,
            isRequiredChecked && styles.nextButtonActive,
          ]}
          onPress={() => {
            if (!isRequiredChecked) return;
            router.push("./signup");
          }}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

type AgreementRowProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
  prefix?: string;
  variant: "all" | "required" | "optional";
};

function AgreementRow({
  label,
  checked,
  onPress,
  prefix,
  variant,
}: AgreementRowProps) {
  const isAll = variant === "all";
  const isRequired = variant === "required";
  const isOptional = variant === "optional";

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        {prefix ? (
          <Text
            style={[
              styles.prefixText,
              isRequired && styles.requiredText,
              isOptional && styles.optionalText,
            ]}
          >
            {prefix}
          </Text>
        ) : null}

        <Text
          style={[
            isAll && styles.allLabel,
            isRequired && styles.requiredLabel,
            isOptional && styles.optionalLabel,
          ]}
        >
          {label}
        </Text>
      </View>

      <View style={[styles.radio, checked && styles.radioChecked]}>
        {checked ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
}

const HORIZONTAL_MARGIN = 22;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 150,
    paddingBottom: 120,
  },

  titleWrap: {
    marginLeft: HORIZONTAL_MARGIN,
    marginBottom: 110,
  },

  contentWrap: {
    marginBottom: "auto",
  },

  allAgreementSection: {
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: -24,
  },

  detailAgreementSection: {
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    lineHeight: 30,
    color: "#5C5C5C",
    fontWeight: "400",
    paddingLeft: 10,
  },

  divider: {
    borderTopWidth: 1,
    borderTopColor: "#B5B5B5",
  },

  row: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  prefixText: {
    fontSize: 11,
    lineHeight: 16,
    marginRight: 8,
    fontWeight: "400",
    paddingLeft: 10,
  },

  allLabel: {
    fontSize: 17,
    color: "#5C5C5C",
    fontWeight: "600",
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 10,
  },

  requiredText: {
    fontSize: 14,
    color: "#FF9544",
    fontWeight: "400",
    paddingRight: 38,
  },

  requiredLabel: {
    fontSize: 14,
    color: "#FF9544",
    fontWeight: "400",
  },

  optionalText: {
    fontSize: 14,
    color: "#B6B6B6",
    fontWeight: "400",
    paddingRight: 38,
  },

  optionalLabel: {
    fontSize: 14,
    color: "#B6B6B6",
    fontWeight: "400",
  },

  radio: {
    width: 17,
    height: 17,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#B5B5B5",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },

  radioChecked: {
    borderColor: "#B5B5B5",
    backgroundColor: "#FFFFFF",
  },

  radioInner: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#FF9544",
  },

  nextButton: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#D5D5D5",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 18,
    marginTop: 28,
  },

  nextButtonActive: {
    backgroundColor: "#FF9544",
  },

  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});