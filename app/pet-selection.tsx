import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const petOptions = [
  {
    id: 1,
    name: "토끼",
    image: require("../assets/icons/rabbit.jpg"),
  },
  {
    id: 2,
    name: "햄스터",
    image: require("../assets/icons/hamster.jpg"),
  },
  {
    id: 3,
    name: "앵무새",
    image: require("../assets/icons/parrot.jpg"),
  },
];

export default function PetSelectionScreen() {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [lastPressTime, setLastPressTime] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.petList}>
        {petOptions.map((pet) => {
          const isSelected = selectedPetId === pet.id;

          return (
            <Pressable
              key={pet.id}
              style={[
                styles.petCard,
                isSelected && styles.selectedPetCard
              ]}
              onPress={() => {
                const now = Date.now();

                if (now - lastPressTime < 300 && selectedPetId === pet.id) {
                  router.push("/welcome");
                } else {
                  setSelectedPetId(pet.id);
                }

                setLastPressTime(now);
              }}
            >
              <Image source={pet.image} style={styles.petImage} />
            </Pressable>
          );
        })}
      </View>

      <View style={styles.descriptionWrapper}>
        <Text style={styles.description}>
          당신의 반려 동물을 <Text style={styles.descriptionBold}>더블 클릭</Text>해주세요.
        </Text>
      </View>

      {/* <View style={styles.addSection}>
        <Pressable style={styles.addButton} onPress={() => console.log("add pet")}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
        <Text style={styles.addText}>반려동물 추가</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    marginTop: 98,
    marginBottom: 50,
  },

  logoImage: {
    width: 280,
    height: 150,
    resizeMode: "contain",
  },

  petList: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 30,
  },

  petCard: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
  },

  selectedPetCard: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1.5,
  },

  petImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },

  petName: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "500",
  },

  selectedPetName: {
    fontWeight: "700",
  },

  descriptionWrapper: {
    alignItems: "center",
    marginTop: 10,
  },

  description: {
    textAlign: "center",
    color: "#8E8E8E",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },

  descriptionBold: {
    color: "#000000",
    fontWeight: "500",
  },

  // addSection: {
  //   alignItems: "center",
  //   marginTop: 40,
  // },

  // addButton: {
  //   width: 56,
  //   height: 56,
  //   borderRadius: 28,
  //   backgroundColor: "#FFFFFF",
  //   borderWidth: 0.5,
  //   borderColor: "#E8E8E8",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   shadowColor: "#000000",
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.08,
  //   shadowRadius: 3,
  //   elevation: 2,
  //   marginBottom: 8,
  // },

  // addButtonText: {
  //   fontSize: 28,
  //   color: "#4A4A4A",
  //   fontWeight: "400",
  //   lineHeight: 30,
  // },

  // addText: {
  //   fontSize: 14,
  //   color: "#888888",
  // },
});