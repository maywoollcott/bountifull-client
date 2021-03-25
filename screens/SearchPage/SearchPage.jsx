
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './SearchPage.style';
import React, {useState} from 'react';
import { RadioButton } from 'react-native-paper';
import {COLORS} from '../../globalStyles';
import apiService from '../../services/apiService'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/actions';
import uuid from 'react-native-uuid';
import NumericInput from 'react-native-numeric-input'


export default function SearchPage() {

  const userid = useSelector(state => state.user._id)

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    item: '',
    category: ''
  });

  const [servings, setServings] = React.useState(1);

  const [checked, setChecked] = React.useState('null')

  const [searchResults, setSearchResults] = React.useState([])

  const [display, setDisplay] = React.useState('search')

  const [buttonTextDisplay, setButtonTextDisplay] = React.useState('name')

  const [selectedButton, setSelectedButton] = React.useState('null')

  const onSubmit = async () => {
    const query = formData.item.split(' ').join('%20');
    console.log(query);
    let res = [];
    if (checked === 'branded') res = await apiService.searchNutritionApiBranded(query)
    if (checked === 'nonbranded') res = await apiService.searchNutritionApiNonBranded(query);
    if (checked === 'all') res = await apiService.searchNutritionApiAll(query);
    const itemList = res.data.foods.slice(0, 7)
    const itemListCodes = itemList.map(item => {
      const container = {};
      container.name = item.description.toUpperCase();
      container.id = item.fdcId;
      return container;
    });
    setSearchResults(itemListCodes);
    setDisplay('results')
  } 

  return (
    <KeyboardAvoidingView style={styles.container}>
      {display === 'search' &&
        <View style={styles.container}>       
          <Text style={styles.header}>Add food here:</Text>
          <View style={styles.formcontainer}>
            <TextInput 
              style={styles.input}
              placeholder='Item'
              name='item'
              onChangeText={text => setFormData({...formData, item: text})}
            />
          </View>
          <Text style={styles.radiolabeldescrip}>Try to be as descriptive as possible.</Text>
          <View style={styles.radiocontainer}>
            <View style={styles.radioitem}>
              <RadioButton
                  value="branded"
                  status={ checked === 'branded' ? 'checked' : 'unchecked' }
                  color={COLORS.turq}
                  uncheckedColor={COLORS.darkblue}
                  onPress={() => {
                    setChecked('branded');
                    setFormData({...formData, category: 'branded'});
                  }}
                />
              <Text style={styles.radiolabel}>Branded</Text>
              <Text style={styles.radiolabeldescrip}>(Twinkie)</Text>
            </View>
            <View style={styles.radioitem}>
              <RadioButton
                  value="all"
                  status={ checked === 'all' ? 'checked' : 'unchecked' }
                  color={COLORS.turq}
                  uncheckedColor={COLORS.darkblue}
                  onPress={() => {
                    setChecked('all');
                    setFormData({...formData, category: 'all'});
                  }}
                />
              <Text style={styles.radiolabel}>All</Text>
              <Text style={styles.radiolabeldescrip}>(all results)</Text>
            </View>
            <View style={styles.radioitem}>
              <RadioButton
                  value="nonbranded"
                  status={ checked === 'nonbranded' ? 'checked' : 'unchecked' }
                  color={COLORS.turq}
                  uncheckedColor={COLORS.darkblue}
                  onPress={() => {
                    setChecked('nonbranded');
                    setFormData({...formData, category: 'nonbranded'});
                  }}
                />
              <Text style={styles.radiolabel}>Non-Branded</Text>
              <Text style={styles.radiolabeldescrip}>(avocado)</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={onSubmit}
          >
            <Text
              style={styles.buttontext}
            >Search</Text>
          </TouchableOpacity>
        </View>
      }
      {display === 'results' &&
        <View style={styles.container}>
          <Text style={styles.header}>Tap your pick!</Text>
          {searchResults.map(item => {
            return <TouchableOpacity
              style={styles.itembutton}
              onPress={ () => {
                setSelectedButton(item.id);
              }}
              key={item.id}
            >
              {selectedButton !== item.id &&              
                <Text
                  style={styles.itembuttontext}
                >{item.name}</Text>
              }
              {selectedButton === item.id &&   
                <View style={styles.servingentry}>
                  <View style={styles.servingentrytext}>
                    <Text
                      style={styles.selecteditembuttontext}
                    >Servings:</Text>
                  </View>
                  <View style={styles.servingentrytext}>
                    <NumericInput 
                      onChange={value => setServings(value)}
                      minValue={1}
                      initValue={1}
                      rounded
                      iconStyle={{color: COLORS.darkblue}}
                      rightButtonBackgroundColor={COLORS.sage}
                      leftButtonBackgroundColor={COLORS.sage}
                      textColor={COLORS.darkblue} 
                    />
                  </View>
                  <View style={styles.servingentrytext}>
                    <TouchableOpacity
                      style={styles.addbutton}
                      onPress={ async () => {
                        console.log(item.id)
                        const res = await apiService.searchNutritionApiByItem(item.id);
                        const nutrientList = res.data[0].foodNutrients;
                        let itemNutrients = {
                          protein: 0,
                          fiber: 0,
                          vitaminA: 0,
                          thiamin: 0,
                          riboflavin: 0,
                          niacin: 0,
                          vitaminB6: 0,
                          vitaminB12: 0,
                          folate: 0,
                          vitaminC: 0,
                          calcium: 0,
                          iron: 0,
                          magnesium: 0,
                          potassium: 0,
                          sodium: 0,
                          zinc: 0
                        }
                        nutrientList.forEach(nutrient => {
                          if (nutrient.number === '203') itemNutrients.protein = nutrient.amount;
                          else if (nutrient.number === '291') itemNutrients.fiber = nutrient.amount
                          else if (nutrient.number === '318') itemNutrients.vitaminA = nutrient.amount
                          else if (nutrient.number === '404') itemNutrients.thiamin = nutrient.amount
                          else if (nutrient.number === '405') itemNutrients.riboflavin = nutrient.amount
                          else if (nutrient.number === '406') itemNutrients.niacin = nutrient.amount
                          else if (nutrient.number === '415') itemNutrients.vitaminB6 = nutrient.amount
                          else if (nutrient.number === '418') itemNutrients.vitaminB12 = nutrient.amount
                          else if (nutrient.number === '417') itemNutrients.folate = nutrient.amount
                          else if (nutrient.number === '401') itemNutrients.vitaminC = nutrient.amount
                          else if (nutrient.number === '301') itemNutrients.calcium = nutrient.amount
                          else if (nutrient.number === '303') itemNutrients.iron = nutrient.amount
                          else if (nutrient.number === '304') itemNutrients.magnesium = nutrient.amount
                          else if (nutrient.number === '306') itemNutrients.potassium = nutrient.amount
                          else if (nutrient.number === '307') itemNutrients.sodium = nutrient.amount
                          else if (nutrient.number === '309') itemNutrients.zinc = nutrient.amount
                        })
                        console.log(itemNutrients)
                        if (servings > 1) {
                          for (let key in itemNutrients) {
                            if (itemNutrients.hasOwnProperty(key)) {
                              itemNutrients[key] *= servings;
                            }
                          }
                        }
                        console.log(itemNutrients)

                        const postItemRes = dispatch(addItem({
                          uniqueId: uuid(),
                          itemName: item.name,
                          servingQuantity: servings,
                          totalNutrients: itemNutrients,
                        }));
                        setDisplay('search')
                      }}>
                      <Text
                        style={styles.addbuttontext}
                      >Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>           
                
              }
            </TouchableOpacity>
          })}

          <TouchableOpacity
            style={styles.tryagainbutton}
            onPress={() => setDisplay('search')}
          >
            <Text
              style={styles.buttontext}
            >Try again!</Text>
          </TouchableOpacity>
        </View>
      }
      {display === 'details' &&
        <View style={styles.container}>
          
        </View>
      }
    </KeyboardAvoidingView>
  );
};
