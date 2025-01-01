import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";

export default function Index() {
    {/* npx expo start, sen a */}
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: "#2E8877",
          height: "4rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            marginLeft: "1rem",
            fontSize: "2rem",
            color: "#FFFFFF",
            fontWeight: "500",
          }}
          >Example 1
        </Text>
      </View>

      {/* Image */}
      <Image
        source={require("../assets/images/react-logo.png")}
      />
      
      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
      </View>

      {/* Text Input */}
      <View style={styles.inputCont}>
        <Text style={{top:"1rem",color:"#AAAAAA",float:"left"}}>Email</Text>
        <TextInput style={styles.input}
          placeholder=""
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    marginTop: "1rem",
    width:"60%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
  },
  button: {
    backgroundColor: "#CFCFCF",
    padding: "0.7rem",
  },
  buttonText: {
    fontWeight: "500",
  },
  input:{
    marginTop: "2rem",
    borderWidth:"1px",
    padding: "0.3rem",
  }, 
  inputCont:{
    display:"flex",
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-evenly",
    alignItems:"center",
  },
});
