import React,  { Component }  from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';

const timer = require('react-native-timer');

var players = ["Justice Bartley", "Mamadi Diakite", "Trevon Gross Jr.", "Kyle Guy", "Devon Hall",
"Jay Huff", "De'Andre Hunter", "Ty Jerome", "Jack Salt", "Isaiah Wilkins"];

var playerList = [
{name: "Justice Bartley", img: require('./image/bartley.jpg')},
{name: "Mamadi Diakite", img: require('./image/mamadi.jpg')},
{name: "Trevon Gross Jr.", img: require('./image/Gross.jpg')},
{name: "Kyle Guy", img: require('./image/kyleGuy.jpg')},
{name: "Devon Hall", img: require('./image/hall.jpg')},
{name: "Jay Huff", img: require('./image/huff.jpg')},
{name: "De'Andre Hunter", img: require('./image/hunter.jpg')},
{name: "Ty Jerome", img: require('./image/jerome.jpg')},
{name: "Jack Salt", img: require('./image/salt.jpg')},
{name: "Isaiah Wilkins", img: require('./image/wilkins.jpg')},
]

var indexes = [0,1,2,3]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      button1text: "Justice Bartley",
      button1color: '#2E9298',
      button2text:"Mamadi Diakite",
      button2color: '#2E9298',
      button3text: "Trevon Gross Jr.",
      button3color: '#2E9298',
      button4text:"Kyle Guy",
      button4color: '#2E9298',
      count: 0,
      correctIndex: 0,
      correctButton: 0,
      isDisabled: false
    }
    this.buttonClicked = this.buttonClicked.bind(this)
  }

  buttonClicked(buttonNum) {
    this.setState(function () {
       return {
         isDisabled: true
       }
     });
    console.log("Hit: " + buttonNum + " Correct: " + this.state.correctButton);

    var correct = false
    var increment = 0;
    if (buttonNum == this.state.correctButton) {
      console.log("correct!")
      correct = true
      increment = 1;
    }
    this.changeColors(buttonNum, correct)

    setTimeout(
      () => { this.changeButtons(increment) },
      1000
    )
    //this.changeButtons(increment)
  }

  changeColors(buttonNum, wasCorrect) {

    if (wasCorrect){
      if (buttonNum == 0) {
        this.setState(function () {
           return {
             button1color: '#00FF00',
           }
         });
      }
      if (buttonNum == 1) {
        this.setState(function () {
           return {
             button2color: '#00FF00',
           }
         });
      }
      if (buttonNum == 2) {
        this.setState(function () {
           return {
             button3color: '#00FF00',
           }
         });
      }
      if (buttonNum == 3) {
        this.setState(function () {
           return {
             button4color: '#00FF00',
           }
         });
      }
    }

    else {
      if (buttonNum == 0) {
        this.setState(function () {
           return {
             button1color: '#FF0000',
           }
         });
      }
      if (buttonNum == 1) {
        this.setState(function () {
           return {
             button2color: '#FF0000',
           }
         });
      }
      if (buttonNum == 2) {
        this.setState(function () {
           return {
             button3color: '#FF0000',
           }
         });
      }
      if (buttonNum == 3) {
        this.setState(function () {
           return {
             button4color: '#FF0000',
           }
         });
      }
    }
  }

  changeButtons(increment) {
    var tempArray = []
    for (var i = 0; i < playerList.length; i++) {
      tempArray[i] = i
    }

    var set = []
    i = 0
    var randomButton = getRandomInt(0, 3);
    console.log("arrayLength: " + tempArray.length)

    while (set.length < 4) {
      var number = getRandomInt(0, tempArray.length -1);
      set[i] = tempArray[number];
      tempArray.splice(number, 1)
      i += 1;
    }

    this.setState(function () {
       return {
         button1color:'#2E9298',
         button2color:'#2E9298',
         button3color:'#2E9298',
         button4color:'#2E9298',
         button1text: playerList[set[0]].name,
         button2text: playerList[set[1]].name,
         button3text: playerList[set[2]].name,
         button4text: playerList[set[3]].name,
         count: this.state.count + increment,
         correctIndex: set[randomButton],
         correctButton: randomButton,
         isDisabled: false
       }
     });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{top: -100}}>
          <Image source= { playerList[this.state.correctIndex].img }/>
        </View>

        <View style = {styles.counterContainer}>
          <Text >number correct:</Text>
          <Text style = {[styles.counter]}>         {this.state.count} </Text>
        </View>

        <View style={[styles.buttonContainer, {backgroundColor: this.state.button4color}]}>
          <Button onPress={this.buttonClicked.bind(null, 3)} title={this.state.button4text} color="#FFFFFF" accessibilityLabel="Button1" disabled={this.state.isDisabled}/>
        </View>
        <View style={[styles.buttonContainer, {bottom: 70, backgroundColor: this.state.button3color}]}>
          <Button onPress={this.buttonClicked.bind(null, 2)} title={this.state.button3text}  color="#FFFFFF" accessibilityLabel="Button1" disabled={this.state.isDisabled}/>
        </View>
        <View style={[styles.buttonContainer, {bottom: 120, backgroundColor: this.state.button2color}]}>
          <Button onPress={this.buttonClicked.bind(null, 1)} title={this.state.button2text}  color="#FFFFFF" accessibilityLabel="Button1" disabled={this.state.isDisabled}/>
        </View>
        <View style={[styles.buttonContainer, {bottom: 170, backgroundColor: this.state.button1color}]}>
          <Button onPress={this.buttonClicked.bind(null, 0)} title={this.state.button1text}  color="#FFFFFF" accessibilityLabel="Button1" disabled={this.state.isDisabled}/>
        </View>
        
      </View>

    );
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Counter extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  render() {
    return(
      <Text style={styles.counter}> {this.state.count} </Text>
    );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 300,
    height: 40,
    backgroundColor: '#2E9298',
    // borderRadius: 10,
    // padding: 10,
    position: 'absolute',
    bottom: 20,
  },
  counter: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  counterContainer: {
    position: 'absolute',
    top: 400,
  },

});
