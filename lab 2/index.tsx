import { Text, View, StyleSheet, TouchableOpacity,TextInput, Modal, ImageBackground,Image, Animated, Easing } from "react-native";
import React, { useState,useRef } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";

const App = () => {
  const [selected, setSelected] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardDateY, setCardDateY] = useState("");
  const [cardDateM, setCardDateM ] = useState("");
  const [cardLogo, setCardLogo] = useState(require('../assets/images/visa.png'));
  const [cardFlip, setcardFlip] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [cvv, setCvv] = useState("");

const flipAnim = useRef(new Animated.Value(0)).current

  const formatCardNumber = (number: string) => {
   return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }
  
  const handleCardNumberChange = (text: string) => {
    // Limit to 16 digits and format the input
    const sanitizedText = text.replace(/[^0-9]/g, "").slice(0, 16);

    checkCardType(sanitizedText);
    setCardNumber(formatCardNumber(sanitizedText));
  };

  const handleCardNameChange = (text: string) => {
    setCardName(text); 
  };

  const getUppercaseCardName = (name: string): string => {
    return name.toUpperCase();
  };

  const formatYear = (year: string): string => {

    return year.slice(-2);
  }

  const checkCardType = (cardNumber: string) => {

    if(cardNumber.startsWith('5')){
      setCardLogo(require('../assets/images/mastercard.png'));
    }else if(cardNumber.startsWith('35')){
      setCardLogo(require('../assets/images/jcb.png'));
    }else if (cardNumber.startsWith('34') || cardNumber.startsWith('37') ){
      setCardLogo(require('../assets/images/amex.png'));
    }else if (cardNumber.startsWith('6')){
      setCardLogo(require('../assets/images/discover.png'));
    }else if (cardNumber.startsWith('9792')){
      setCardLogo(require('../assets/images/troy.png'));
    }else if (cardNumber.startsWith('3')){
      setCardLogo(require('../assets/images/dinersclub.png'));
    }else if (cardNumber.startsWith('62')){
      setCardLogo(require('../assets/images/unionpay.png'));
    }else{
      setCardLogo(require('../assets/images/visa.png'));
    }  
  }

  const handleFocus = () => {
    
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    setTimeout(() => {
      setcardFlip(true);
    }, 250);
  };

  const handleBlur = () => {
    
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    setTimeout(() => {
      setcardFlip(false);
    }, 250);
  };

  const interpolateFlip = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const scaleX = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1], 
  });

  const flipStyle = {
    transform: [{ rotateY: interpolateFlip }, { scaleX: scaleX },],
  };


  const handleCvv =(cvv: string) => {
    
    cvv = cvv.slice(0,3);
    setCvv(cvv);
  }

const months = [
  { key: '01', value: '01' },
  { key: '02', value: '02' },
  { key: '03', value: '03' },
  { key: '04', value: '04' },
  { key: '05', value: '05' },
  { key: '06', value: '06' },
  { key: '07', value: '07' },
  { key: '08', value: '08' },
  { key: '09', value: '09' },
  { key: '10', value: '10' },
  { key: '11', value: '11' },
  { key: '12', value: '12' },

];

const years = [
  { key: '2024', value: '2024' },
  { key: '2025', value: '2025' },
  { key: '2026', value: '2026' },
  { key: '2027', value: '2027' },
  { key: '2028', value: '2028' },
  { key: '2029', value: '2029' },
  { key: '2030', value: '2030' },
  { key: '2031', value: '2031' },

];

const backgroundImage = require('../assets/images/23.jpeg');
//const backgroundImage = require('.Users/karls/OneDrive/Skrivbord/Skola/TDDC73/lab2/my-app/images/23.jpeg');


//export default function Index() {
  return (
    <View style={styles.body}>
      
      <View style={styles.cardForm}>
      <Animated.View style ={[styles.cardFront,flipStyle]} >
        <ImageBackground 
        source = {backgroundImage}
        style = {styles.cardImage}
        imageStyle={{ borderRadius: 10 }}
        >
         
            <View style = {[cardFlip ? styles.cardBack : styles.cardFront]}>
            {!cardFlip ? ( <>
              <Image
                source = {cardLogo}
                style = {styles.cardType}  
              >
              </Image>
              <Image
                source = {require('../assets/images/chip.png')}
                style = {styles.chip}
                >
              </Image>
              <Text style = {styles.cardNumber}>
                {cardNumber || '#### #### #### ####'}
              </Text>
              <View style = {styles.cardTextContainer}>
                <Text style = {styles.textOnCard} > Card Holder </Text>
                <Text style = {styles.textOnCard} > Expires </Text>
              </View>
              <View style = {[styles.cardTextContainer, {marginTop: -5}]}>
                <Text  style = {styles.textOnCard}> {getUppercaseCardName(cardName)|| 'AD SOYAD'}</Text>
                <Text style = {styles.textOnCard}> {cardDateM + '/'+formatYear(cardDateY) || 'MM/YY'} </Text>
              </View>
              
              
            </>
              
        ) : (
          <>
          
          <View style={styles.blackLine}></View>
          <View style= {styles.whiteLine}> 
            <Text> {cvv}</Text>
          </View>

          </>
        )}
          </View>
          </ImageBackground>
        </Animated.View>

        <View style={styles.cardItems}>
        

          <View style={styles.cardInput}>
            <Text style={styles.cardLabel}>
              Card Number
            </Text>
            <TextInput style={styles.textInput}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              //onFocus={() => handleFocus('cardNumber')}
              //onBlur={handleBlur}
            />
          </View>

          <View style={styles.cardInput}>
            <Text style={styles.cardLabel}>
              Card Holder
            </Text>
            <TextInput style={styles.textInput}
              value = {cardName}
              onChangeText={handleCardNameChange}
              //onFocus={() => handleFocus('cardName')}
              //onBlur={handleBlur}
            >
              
            </TextInput>
          </View>

          <View style={styles.cardInput}>

            <Text style={styles.cardLabel}>
              Expiration date
            </Text>

              <View style= {styles.expirationContainer}>
              <SelectList
                setSelected={setCardDateM}
                data={months}
                save="value"
                placeholder="Month"
                boxStyles={styles.dropdown}
                dropdownItemStyles={styles.listItem}
                search = {false}
              />
              <SelectList
                setSelected={setCardDateY}
                data={years}
                save="value"
                placeholder="Year"
                boxStyles={styles.dropdown}
                dropdownItemStyles={styles.listItem}
                search = {false}
              /> 
              <TextInput style={[styles.textInput, {width: '30%'}]}
                value = {cvv}
                onChangeText={handleCvv}
                onFocus={() => handleFocus()}
                onBlur={handleBlur}
                >
             </TextInput>
            </View>     
          </View>          
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ddeefc",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    padding: 0
  },
  cardForm: {
    backgroundColor: "#fff",
    maxWidth: 320,
    maxHeight: 700,
    width: '80%',
    height: '70%',
    borderRadius: 10,
    padding: 25,
    paddingBottom: 0,
    margin: 0,
    shadowColor: "#000",
    shadowRadius: 20,
    shadowOpacity: 0.8, //venne skuggan funkar ej på min telefon
    //shadowOffset: {width: 10, height: 10},
    elevation: 5, //for android
    zIndex: 1,
    

  },
  cardInput: {
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 14,
    color: '#1a3b5d',
    marginBottom: 5,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    boxShadow: 'none',
    borderWidth: 1,
    borderColor: '#ced6e0',
    fontSize: 18,
    paddingVertical:5,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    
    
  },
  cardItems:{
    marginTop: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    width: '100%',
    

  },
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  expirationContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  dropdown: {
    width: 70,
    height: 50,
    borderColor: '#ced6e0',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: '#fff',
  },
  cardImage: {
    height: 150,
    marginTop: -100,
    overflow: 'visible',
    backgroundColor: '#FFF',
    color: '#FFF',
    zIndex: 2,
    shadowColor: "#000",
    shadowRadius: 10, //har problem med skuggar här oxå med min telefon, idk :/
    shadowOpacity: 0.8,
    //shadowOffset: {width: 10, height: 10},
    elevation: 5, //for android
    borderRadius: 10,// trodde det här skulle göra så att kortet blir "runt"
    

  },
  cardType:{
    width: 50, 
    height: 30, 
    resizeMode: 'contain', 
    alignSelf: 'flex-end', 
    marginRight: 10,
    marginTop: 5
  },
  chip:{
    width: 30, 
    height: 20,     
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: -25
  },
  cardInfo:{
    flexDirection: 'row',
    //width: '90%',
    justifyContent: 'space-between',
    position: 'absolute',


  },
  cardTextContainer:{
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 10

  },
  textOnCard:{
    color: '#ddd',
    position: 'relative',
    marginBottom: 10,
    padding: 0,
    fontSize: 13,
  },
  cardNumber: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 30,
    marginLeft: 10
  },
   cardBack:{
    justifyContent: 'flex-start',
    flex: 1,

  }, cardFront:{

  }, 
  blackLine:{
    height: 40, 
    width: '100%',
    backgroundColor: '#000', 
    marginRight: 0,
    marginTop:10,
    zIndex: 1
  }, 
  whiteLine:{
    backgroundColor:'#FFF',
    height: 25,
    width: '90%',
    marginTop:20,
    marginLeft: 10,
    zIndex: 2,
    alignItems: 'flex-end', 
    borderRadius: 5,
    

  }

 

})