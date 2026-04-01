import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Pet = {
  id: number;
  name: string;
  image: any;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
};

const petOptions: Pet[] = [
  {
    id: 1,
    name: "토끼",
    image: require("../assets/icons/rabbit.jpg"),
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  },
  {
    id: 2,
    name: "햄스터",
    image: require("../assets/icons/hamster.jpg"),
    offsetX: 0,
    offsetY: 2,
    scale: 1,
  },
  {
    id: 3,
    name: "앵무새",
    image: require("../assets/icons/parrot.jpg"),
    offsetX: 0,
    offsetY: 1,
    scale: 1,
  },
];

const { width: screenWidth } = Dimensions.get("window");

const FRAME_WIDTH = 100;
const FRAME_HEIGHT = 115;

const ITEM_WIDTH = FRAME_WIDTH;
const ITEM_HEIGHT = FRAME_HEIGHT;
const ITEM_GAP = 8;
const SNAP_SIZE = ITEM_WIDTH + ITEM_GAP;
const HORIZONTAL_SCREEN_PADDING = 24;

export default function PetSelectionScreen() {
  const flatListRef = useRef<FlatList<Pet>>(null);

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [confirmedPet, setConfirmedPet] = useState<Pet | null>(null);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [listWidth, setListWidth] = useState(
    screenWidth - HORIZONTAL_SCREEN_PADDING * 2
  );

  const sidePadding = Math.max((listWidth - ITEM_WIDTH) / 2, 0);

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SNAP_SIZE);
    setSelectedIndex(newIndex);
    setConfirmedPet(null);
  };

  const handlePetPress = (index: number) => {
    if (index !== selectedIndex) {
      flatListRef.current?.scrollToOffset({
        offset: index * SNAP_SIZE,
        animated: true,
      });
      return;
    }

    const now = Date.now();

    if (now - lastTapTime < 300) {
      setConfirmedPet(petOptions[index]);
    }

    setLastTapTime(now);
  };

  const handleConfirm = () => {
    if (!confirmedPet) return;
    router.push("/welcome");
  };

  const handleReset = () => {
    setConfirmedPet(null);
  };

  const handleListLayout = (event: LayoutChangeEvent) => {
    setListWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.selectorSection}>
        <View
          pointerEvents="none"
          style={[
            styles.centerFrame,
            confirmedPet && styles.centerFrameConfirmed,
          ]}
        />

        <View style={styles.listFullWidth} onLayout={handleListLayout}>
          <FlatList
            ref={flatListRef}
            data={petOptions}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            snapToInterval={SNAP_SIZE}
            snapToAlignment="start"
            disableIntervalMomentum={true}
            decelerationRate="fast"
            contentContainerStyle={[
              styles.petListContent,
              { paddingHorizontal: sidePadding },
            ]}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onMomentumScrollEnd={handleMomentumEnd}
            initialScrollIndex={1}
            getItemLayout={(_, index) => ({
              length: SNAP_SIZE,
              offset: SNAP_SIZE * index,
              index,
            })}
            renderItem={({ item, index }) => {
              const isSelected = index === selectedIndex;

              const imageTransform: ImageStyle["transform"] = [
                { translateX: item.offsetX ?? 0 },
                { translateY: item.offsetY ?? 0 },
                { 
                  scale: isSelected
                    ? (item.scale ?? 1)
                    : (item.scale ?? 1) * 0.7 // 미선택 펫 카드 크기 약간 축소
                },
              ];

              return (
                <Pressable
                  onPress={() => handlePetPress(index)}
                  style={styles.petItem}
                >
                  <View style={styles.imageBox}>
                    <Image
                      source={item.image}
                      style={[
                        styles.petImage,
                        { transform: imageTransform },
                        !isSelected && styles.petImageDimmed,
                      ]}
                    />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>

        {!confirmedPet && (
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              당신의 반려 동물을{" "}
              <Text style={styles.descriptionBold}>터치</Text>
              해주세요.
            </Text>
          </View>
        )}

        {confirmedPet && (
          <View style={styles.confirmSection}>
            <Text style={styles.confirmText}>
              "{confirmedPet.name}"로 결정하시겠습니까?
            </Text>

            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>네</Text>
            </Pressable>

            <Pressable style={styles.retryButton} onPress={handleReset}>
              <Text style={styles.retryButtonText}>아니요</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: HORIZONTAL_SCREEN_PADDING,
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

  selectorSection: {
    width: "100%",
    alignItems: "center",
  },

  listFullWidth: {
    width: "100%",
    zIndex: 1,
  },

  centerFrame: {
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -FRAME_WIDTH / 2,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    borderRadius: 5,
    zIndex: 0,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1.5,
  },

  centerFrameConfirmed: {
    borderColor: "#29F117",
    borderWidth: 1,
  },

  petListContent: {
    alignItems: "center",
  },

  separator: {
    width: ITEM_GAP,
  },

  petItem: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  imageBox: {
    width: 84,
    height: 84,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },

  petImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  petImageDimmed: {
    opacity: 0.45,
  },

  descriptionWrapper: {
    marginTop: 40,
    alignItems: "center",
  },

  description: {
    fontSize: 16,
    color: "#8E8E8E",
    textAlign: "center",
    fontWeight: "400",
  },

  descriptionBold: {
    color: "#2F2F2F",
    fontWeight: "400",
    fontSize: 16,
  },

  confirmSection: {
    alignItems: "center",
    marginTop: 40,
  },

  confirmText: {
    fontSize: 16,
    color: "#6F6F6F",
    marginBottom: 50,
  },

  confirmButton: {
    width: 94,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#828282",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },

  retryButton: {
    width: 94,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D0CCCC",
    justifyContent: "center",
    alignItems: "center",
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});