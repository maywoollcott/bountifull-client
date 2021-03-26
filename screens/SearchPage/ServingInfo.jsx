import React, { useState } from 'react';
import { Platform, StyleSheet, FlatList, Alert, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { COLORS } from '../../globalStyles';
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { Title, Subheading, Paragraph, Headline } from 'react-native-paper';

export default function ServingInfo() {

  return (
      <View style={{alignItems: 'center', color: COLORS.darkblue}}>
        <Title style={styles.mainHeader}>What counts as one serving?</Title>

        {/* <Paragraph style={{alignItems: 'center', margin:10, color: COLORS.darkblue}}>
           You may have noticed that we do not use specific measurements for servings.
          We do not focus on restrictive eating, but rather on making sure you are
          getting enough of what you need.  
          <Subheading style={styles.titleStyle}> 
            How to roughly estimate a serving
          </Subheading>
        </Paragraph> */}

        <View style={styles.itemSection}> 
          <Title style={styles.titleStyle}> 
           Packaged Items
          </Title>
        </View>
        <View> 
          {/* <MaterialCommunityIcons name="food-apple" size={20} color="black" /> */}
          <Text style={styles.detailsParagraph}> 
            This one is easy, just checkout the label to see the serving size!
          </Text>
        </View>
        <Image source={require('../../assets/icons/chocolate.png')} style={styles.breadIcon} />

        <View style={styles.itemSection}> 
          <Title style={styles.titleStyle}> 
            Fruits 
          </Title>
        </View>
        <View> 
          {/* <MaterialCommunityIcons name="food-apple" size={20} color="black" /> */}
          <Text style={styles.detailsParagraph}> 
            One cup of fruit, or a small piece of fruit
          </Text>
        </View>
        <Image source={require('../../assets/icons/fruits.png')} style={styles.iconImg} />

        <View style={styles.itemSection}> 
          <Title style={styles.titleStyle}> 
            Vegetables 
          </Title>
        </View>
        <View> 
          {/* <MaterialCommunityIcons name="food-apple" size={20} color="black" /> */}
          <Text style={styles.detailsParagraph}> 
            One cup of raw or cooked vegetables, or two cups of raw leafy salad
          </Text>
        </View>
        <Image source={require('../../assets/icons/salad.png')} style={styles.iconImg} />

        <View style={styles.itemSection}> 
          <Title style={styles.titleStyle}> 
            Meats & Other Proteins
          </Title>
        </View>
        <View> 
          {/* <MaterialCommunityIcons name="food-apple" size={20} color="black" /> */}
          <Text style={styles.detailsParagraph}> 
            A small chicken breast, a small steak, or a small handfull of nuts
          </Text>
        </View>
        <Image source={require('../../assets/icons/nuts.png')} style={styles.iconImg} />

        <View style={styles.itemSection}> 
          <Title style={styles.titleStyle}> 
            Grains
          </Title>
        </View>
        <View> 
          {/* <MaterialCommunityIcons name="food-apple" size={20} color="black" /> */}
          <Text style={styles.detailsParagraph}> 
            One slice of bread, half a cup of rice or cooked pasta
          </Text>
        </View>
        <Image source={require('../../assets/icons/bread.png')} style={styles.breadIcon} />

    </View>
  );
}

const styles = StyleSheet.create({
  mainHeader : {
    color: COLORS.darkblue,
    fontWeight: 'bold',
    fontSize: 24, 
    marginVertical:15
  },
  breadIcon: {
    marginHorizontal:125,
    height: 40, 
    width:40
  },
  container : {
    color: COLORS.darkblue
  },
  iconImg: {
    marginHorizontal:125,
    height: 50, 
    width:50
  },
  itemSection: {
    width: 310
  },
  titleStyle : {
    color: COLORS.darkblue,
    fontSize:17
  },
  detailsParagraph: {
    marginHorizontal:10,
    marginHorizontal:20,
    color: COLORS.darkblue,
    width: 290
  }
});