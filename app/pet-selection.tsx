import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CancelButtonIcon from "../assets/icons/cancel-button.svg";
import ConfirmButtonIcon from "../assets/icons/confirm-button.svg";

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
    image: require("../assets/icons/rabbit.png"),
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  },
  {
    id: 2,
    name: "햄스터",
    image: require("../assets/icons/hamster.png"),
    offsetX: 0,
    offsetY: 2,
    scale: 1,
  },
  {
    id: 3,
    name: "앵무새",
    image: require("../assets/icons/parrot.png"),
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
const SHADOW_PADDING = 18;

const LOOP_MULTIPLIER = 200;

export default function PetSelectionScreen() {
  const flatListRef = useRef<Animated.FlatList<Pet>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const loopedPetOptions = useMemo(
    () => Array.from({ length: LOOP_MULTIPLIER }, () => petOptions).flat(),
    []
  );

  const middleBaseIndex =
    Math.floor(loopedPetOptions.length / 2 / petOptions.length) *
    petOptions.length;

  const initialIndex = middleBaseIndex + 1;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [confirmedPet, setConfirmedPet] = useState<Pet | null>(null);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [listWidth, setListWidth] = useState(
    screenWidth - HORIZONTAL_SCREEN_PADDING * 2
  );

  const sidePadding = Math.max((listWidth - ITEM_WIDTH) / 2, 0);

  const getRealPetIndex = (index: number) => {
    const mod = index % petOptions.length;
    return mod < 0 ? mod + petOptions.length : mod;
  };

  const getRealPet = (index: number) => petOptions[getRealPetIndex(index)];

  const resetToMiddleIfNeeded = (index: number) => {
    const edgeBuffer = petOptions.length * 6;

    if (index > edgeBuffer && index < loopedPetOptions.length - edgeBuffer) {
      return;
    }

    const realIndex = getRealPetIndex(index);
    const targetIndex = middleBaseIndex + realIndex;

    flatListRef.current?.scrollToOffset({
      offset: targetIndex * SNAP_SIZE,
      animated: false,
    });

    setSelectedIndex(targetIndex);
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SNAP_SIZE);

    setSelectedIndex(newIndex);
    setConfirmedPet(null);

    requestAnimationFrame(() => {
      resetToMiddleIfNeeded(newIndex);
    });
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
    const selectedPet = getRealPet(index);

    if (now - lastTapTime < 300) {
      setConfirmedPet(selectedPet);
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

  useEffect(() => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: initialIndex * SNAP_SIZE,
        animated: false,
      });
    });
  }, [initialIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.selectorSection}>
        <View style={styles.listFullWidth} onLayout={handleListLayout}>
          <View pointerEvents="none" style={styles.centerFrameShadow} />

          <Animated.FlatList
            ref={flatListRef}
            style={styles.petList}
            data={loopedPetOptions}
            keyExtractor={(_, index) => `pet-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            snapToInterval={SNAP_SIZE}
            snapToAlignment="start"
            decelerationRate="fast"
            scrollEventThrottle={16}
            contentContainerStyle={[
              styles.petListContent,
              { paddingHorizontal: sidePadding },
            ]}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onMomentumScrollEnd={handleMomentumEnd}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            initialScrollIndex={initialIndex}
            getItemLayout={(_, index) => ({
              length: SNAP_SIZE,
              offset: SNAP_SIZE * index,
              index,
            })}
            renderItem={({ index }) => {
              const realPet = getRealPet(index);

              const inputRange = [
                (index - 1) * SNAP_SIZE,
                index * SNAP_SIZE,
                (index + 1) * SNAP_SIZE,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.82, realPet.scale ?? 1, 0.82],
                extrapolate: "clamp",
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: "clamp",
              });

              return (
                <Pressable
                  onPress={() => handlePetPress(index)}
                  style={styles.petItem}
                >
                  <Animated.View style={[styles.imageBox]}>
                    <Animated.Image
                      source={realPet.image}
                      style={[
                        styles.petImage,
                        {
                          opacity,
                          transform: [
                            { translateX: realPet.offsetX ?? 0 },
                            { translateY: realPet.offsetY ?? 0 },
                            { scale },
                          ],
                        },
                      ]}
                    />
                  </Animated.View>
                </Pressable>
              );
            }}
          />

          <View
            pointerEvents="none"
            style={[
              styles.centerFrameBorder,
              confirmedPet && styles.centerFrameBorderConfirmed,
            ]}
          />
        </View>

        {!confirmedPet && (
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              당신의 반려 동물을 <Text style={styles.descriptionBold}>터치</Text>
              해주세요.
            </Text>
          </View>
        )}

        {confirmedPet && (
          <View style={styles.confirmSection}>
            <Text style={styles.confirmText}>
              "{confirmedPet.name}"로 결정하시겠습니까?
            </Text>

            <View style={styles.confirmButtonRow}>
              <Pressable onPress={handleReset} style={styles.iconButton}>
                  <CancelButtonIcon width={60} height={60} />
              </Pressable>

              <Pressable onPress={handleConfirm} style={styles.iconButton}>
                  <ConfirmButtonIcon width={43} height={43} />
              </Pressable>
            </View>
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
    height: FRAME_HEIGHT + SHADOW_PADDING * 2,
    position: "relative",
    marginTop: -SHADOW_PADDING,
  },

  centerFrameShadow: {
    position: "absolute",
    top: SHADOW_PADDING,
    left: "50%",
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    marginLeft: -FRAME_WIDTH / 2,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 0,
  },

  petList: {
    zIndex: 5,
    elevation: 8,
  },

  petListContent: {
    alignItems: "center",
    paddingVertical: SHADOW_PADDING,
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

  centerFrameBorder: {
    position: "absolute",
    top: SHADOW_PADDING,
    left: "50%",
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    marginLeft: -FRAME_WIDTH / 2,
    borderRadius: 5,
    borderWidth: 1.2,
    borderColor: "#BFBFBF",
    backgroundColor: "transparent",
    zIndex: 20,
  },

  centerFrameBorderConfirmed: {
    borderWidth: 1.5,
    borderColor: "#FF9544",
  },

  descriptionWrapper: {
    marginTop: 20,
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
    marginBottom: 24,
  },

  confirmButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});