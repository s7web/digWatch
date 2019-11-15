import React, { memo, useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Input, Button, Icon } from 'react-native-elements';
import { StyleSheet, Dimensions, Keyboard } from 'react-native';
import { ApiRequests } from '../api/requests';

const SCREEN_WIDTH = Dimensions.get('window').width;

const FormView = ({ confId, routeData }) => {
  const [form, setForm] = useState({});
  const [formVisibility, setFormVisibility] = useState(false);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    ApiRequests.conferenceIssues(confId).then(issues => {
      setIssues(issues['data']['data'][1]['issues']);
    });
  }, []);

  const placeholder = {
    label: 'Filter by issue',
    value: null,
    color: '#9EA0A4',
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
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
            value={form['keyword'] && form.keyword}
            containerStyle={styles.input}
            inputStyle={{ fontFamily: 'robotoRegular', fontSize: 16 }}
            placeholder="Search"
            onChangeText={text => {
              let formData = { ...form };
              formData['keyword'] = text;
              setForm(formData);
            }}
          />

          {issues && (
            <RNPickerSelect
              placeholder={placeholder}
              onValueChange={value => {
                let formData = { ...form };
                formData['issueId'] = value;
                setForm(formData);
              }}
              style={{ ...pickerSelectStyles }}
              useNativeAndroidPickerStyle={false}
              items={issues.map(issue => {
                return { label: issue.issuetitle, value: issue.issueid };
              })}
            />
          )}

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
