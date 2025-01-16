import { Text, View, StyleSheet,TextInput } from "react-native";
import React, { useState, useEffect } from "react";


interface passWordStrengthParameters{
    minChecks?: number;
    barWidth?: number;
    returnedPassword?: (password: string) => void;
}

const Password: React.FC<passWordStrengthParameters> = ({
  minChecks = 5,
  barWidth = 200,
  returnedPassword,
}) => {
    const [password, setPassword] = useState("");
    const [passCount, setPassCount] = useState(0); 
    
    //checks length, Upper and lower case, num,bers and special
    const checks = [
        (password: string) => password.length >= 8, 
        (password: string) => /[A-Z]/.test(password), 
        (password: string) => /[a-z]/.test(password), 
        (password: string) => /\d/.test(password), 
        (password: string) => /[!@#Â¤%&?*%]/.test(password), 
      ];
    
      useEffect(() => {
        let count = 0;
        for (let i = 0; i < checks.length; i++) {
          if (checks[i](password)) {
            count += 1; // Increment count for each passed check
          }
        }
        setPassCount(count);
        if (returnedPassword) {
          returnedPassword(password); // Directly notify the parent when password changes
        }
      }, [password]); //updates when password changes

      // using percentage so the user can change the minchecks value and still get correct output
      const getStrengthColor = () => {
        const percentage = (passCount / minChecks) * 100;
        if (percentage >= 100) return "green"; 
        if (percentage === 0) return "red"; 
        if (percentage >= 75) return "blue";
        if (percentage >= 50) return "yellow"; 
        if (percentage >= 25) return "orange"; 
        return "red";
      };

      const getWidth = () =>{
        const percentage = (passCount / minChecks) * 100;
        if (percentage >= 100) return 50;
        if (percentage >= 75) return 40;
        if (percentage >= 50) return 30;
        if (percentage >= 25) return 20;
        if (percentage === 0) return 10;
        return 10;
      }

      const styles = StyleSheet.create({
        container: {
            padding: 20,
            alignItems: "center",
          },
          progressBar: {
            height: 20,
            borderRadius: 5,
            backgroundColor: "#000000",
            width: 200,
          },
          input: {
          borderColor: "#999",
          borderWidth: 2,
          backgroundColor: "#FFF",
          height: 20,
          width: 200,
          padding: 15,
          margin: 5
          }
      })

      return(
        <View style = {styles.container}>
            <Text> Enter password</Text>
            <TextInput
                value = {password}
                onChangeText = {setPassword}
                placeholder = ""
                style = {styles.input}
            >
            </TextInput>
           
            <View style= {[styles.progressBar,{backgroundColor: getStrengthColor(), width: barWidth * (getWidth())/50}]}></View>            
        </View>
        
      ); 
    
    };

export default Password;