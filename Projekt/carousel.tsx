import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  images: ImageSourcePropType[];
  displayN?: number;
  imageWidth?: number;
  imageHeight?: number;
};


const Carousel = ({
  images,
  displayN = 3,
  imageWidth = 400,
  imageHeight = 200,
}: Props) => {
  useEffect(() => {
    if (images.length < 3)
      console.log("Warning: few objects in Carousel. Might behave irregularly.")
  }, [images]);


  const imageMargin = Math.floor(imageWidth/20);
  const totalWidth = Math.floor((imageWidth + imageMargin) * displayN);
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateXValue = imageWidth + 2 * imageMargin;
  const animationTime = 300;

  useEffect(() => {
    translateX.value = 0;
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const getImageIndex = (index: number) => {
    return (index + images.length) % images.length;
  };


  const scrollNext = () => {
    translateX.value = withTiming(
      -translateXValue,
      { duration: animationTime },
      () => {
        setCurrentIndex(
          (prevCurrentIndex) => (prevCurrentIndex + 1) % images.length
        );
      }
    );
  };

  const scrollBack = () => {
    translateX.value = withTiming(
      translateXValue,
      { duration: animationTime },
      () => {
        setCurrentIndex(
          (prevCurrentIndex) =>
            (prevCurrentIndex - 1 + images.length) % images.length
        );
      }
    );
  };

  const styles = StyleSheet.create({

    wrapper: {
      maxWidth: totalWidth,
    },

    image: {
      height: imageHeight,
      width: imageWidth,
      margin: imageMargin,
    },

    carouselContainer: {
      overflow: "hidden",
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },

    animatedImageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },

    buttonWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },

    buttonContainter: {
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      height: "100%",
      position: "absolute",
      flexDirection: "row",
    },

    button: {
      backgroundColor: "#FFF",
      opacity: 0.8,
      justifyContent: "center",
      alignItems: "center",
      width: 45,
      height: 45,
      borderRadius: "50%",
      overflow: "hidden",
    },

    buttonIcon: {
      color: "#999",
    },
  });


  let numVisibleImages;
  if (!displayN) {
    numVisibleImages = 4;
  }
  else {
    numVisibleImages = displayN;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.carouselContainer}>
        <Animated.View style={[styles.animatedImageContainer, animatedStyle]}>
          {[...Array(numVisibleImages)].map((_, i) => {
            const offset = Math.floor(numVisibleImages / 2);  // Center the current index
            const index = getImageIndex(currentIndex - offset + i);
            //console.log(index);
            return (
              <Image
                key={i}
                source={images[index]}
                style={styles.image}
              />
            );
          })}
        </Animated.View>
      </View>
      <View style={styles.buttonContainter}>
        <TouchableOpacity style={styles.button} onPress={scrollBack}>
          <Text style={styles.buttonIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={scrollNext}>
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Carousel;