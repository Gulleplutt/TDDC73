import { Text, View, StyleSheet,TextInput } from "react-native";
import React, { useState } from 'react';
import Password from "@/components/password";
import Carousel from "@/components/carousel";
const App = () => {
  const images = [require("@/assets/images/KungFuPanda.jpg"), 
    require("@/assets/images/lotr.jpg"), 
    require("@/assets/images/backTotheFuture.jpg")];
    const titles = ["Movie 1", "Movie 2", "Movie 3"];

    const [password, setPassword] = useState("");

    const handlePasswordChange = (newPassword: string) => {
      setPassword(newPassword);  // Update parent state
    };

    return (
      <View style={styles.container}>
        
        <Carousel images={images} displayN={3} imageWidth={90} imageHeight={170} />

        <Password minChecks={2} barWidth={250} returnedPassword={handlePasswordChange}/>
        
        {/* testing */}
        <Text>{password}</Text>

      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
  });

export default App;