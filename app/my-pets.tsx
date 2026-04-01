import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const myPets = [
  {
    id: 1,
    name: "토끼",
    image: require("../assets/icons/rabbit.jpg"),
  },
];

export default function MyPetsScreen() {
  const selectedPet = myPets[0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.petSection}>
        <Pressable
          style={styles.petCard}
          onPress={() =>
            router.push({
              pathname: "/welcome",
              params: {
                petName: selectedPet.name,
                petId: String(selectedPet.id),
              },
            })
          }
        >
          <Image source={selectedPet.image} style={styles.petImage} />
        </Pressable>

        <Text style={styles.description}>내가 키우는 동물</Text>
      </View>

      <View style={styles.addSection}>
        <Pressable
          style={styles.addButton}
          onPress={() => console.log("add pet")}
        >
          <Text style={styles.addButtonText}>동물 추가</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },

  header: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 65,
  },

  logoImage: {
    width: 280,
    height: 150,
    resizeMode: "contain",
  },

  petSection: {
    alignItems: "center",
  },

  petCard: {
    width: 100,
    height: 115,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1.5,
    marginBottom: 40,
  },

  petImage: {
    width: 95,
    height: 95,
    resizeMode: "contain",
  },

  description: {
    fontSize: 16,
    color: "#8E8E8E",
    fontWeight: "400",
  },

  addSection: {
    position: "absolute",
    right: 30,
    bottom: 130,
  },

  addButton: {
    minWidth: 88,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#828282",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});