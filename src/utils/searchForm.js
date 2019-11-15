import React, { memo, useState, useCallback } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Input, Button, Icon } from 'react-native-elements';
import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const FormView = ({ routeData }) => {
  const [form, setForm] = useState({});
  const [formVisibility, setFormVisibility] = useState(false);

  const placeholder = {
    label: 'Filter by issue',
    value: null,
    color: '#9EA0A4',
  };

  const handleSubmit = () => {
    routeData(form['keyword'], form['issueId']);
  };

  return (
    <>
      <Icon
        name={'sound-mix'}
        size={28}
        type="entypo"
        underlayColor={'white'}
        iconStyle={{ paddingRight: 10, color: '#757575' }}
        onPress={() => setFormVisibility(!formVisibility)}
        containerStyle={{ alignItems: 'flex-end', marginBottom: 2 }}
      />
      {formVisibility && (
        <>
          <Input
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            containerStyle={styles.input}
            inputStyle={{ fontFamily: 'robotoRegular', fontSize: 16 }}
            placeholder="Search"
            onChangeText={text => setForm({ keyword: text, issueId: 216 })}
          />

          <RNPickerSelect
            placeholder={placeholder}
            onValueChange={value => console.log(value)}
            style={{ ...pickerSelectStyles }}
            useNativeAndroidPickerStyle={false}
            items={[{ label: 'TODO issues', value: 1 }]}
          />

          <Button
            title="OK"
            type="clear"
            buttonStyle={styles.button}
            titleStyle={{ color: '#757778', fontFamily: 'robotoRegular' }}
            onPress={() => handleSubmit()}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 18,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#757778',
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
  },
  button: {
    marginBottom: 1,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#757778',
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    backgroundColor: '#80daff',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#757778',
    borderRadius: 10,
    borderWidth: 0.5,
    color: '#414040',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    marginBottom: 10,
    height: 40,
    fontFamily: 'robotoRegular',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#757778',
    color: '#414040',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    marginBottom: 10,
    height: 40,
    fontFamily: 'robotoRegular',
  },
});

export const SearchForm = memo(FormView);
