
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './SearchPage.style';
import React, {useState} from 'react';
import { RadioButton } from 'react-native-paper';
import {COLORS} from '../../globalStyles';
import apiService from '../../services/apiService'


export default function SearchPage() {

  const [formData, setFormData] = useState({
    item: '',
    category: ''
  });

  const [checked, setChecked] = React.useState('null')

  const [searchResults, setSearchResults] = React.useState([])

  const onSubmit = async () => {
    const query = formData.item.split(' ').join('%20');
    console.log(query);
    const res = await apiService.searchNutritionApiBranded(query);
    const itemList = res.data.foods.slice(0, 20)
    const itemListCodes = itemList.map(item => item.description);
    console.log(itemListCodes);
    // const itemListRes = await apiService.searchNutritionApiByItems(itemListCodes.join(','));
    // console.log(itemListRes.data);
  } 

  return (
    <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.header}>Add food here:</Text>
        <View style={styles.formcontainer}>
          <TextInput 
            style={styles.input}
            placeholder='Item'
            name='item'
            onChangeText={text => setFormData({...formData, item: text})}
          />
        </View>
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
            <Text style={styles.radiolabeldescrip}>(apple)</Text>
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
    </KeyboardAvoidingView>
  );
};