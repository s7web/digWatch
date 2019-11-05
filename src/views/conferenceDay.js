import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ListItem, Input, Divider } from 'react-native-elements';
import { ApiRequests, apiRoutes } from '../api/requests';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import { isCloseToBottom } from '../utils/scrollDetection';
import { Loader } from '../utils/loader';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ConferenceDayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      conferenceDayList: false,
      conferenceData: {},
    };
  }

  async componentDidMount() {
    //Parent data
    //this.props.navigation.state.params.conferenceDayData

    let conferenceData = this.props.navigation.state.params.conferenceDayData;

    this.setState({ conferenceData }, () => {
      this.handlePopulateData(0).then(conferenceDayList => {
        conferenceDayList = conferenceDayList['data']['rows'];
        this.setState({ conferenceDayList });
      });
    });
  }

  handlePopulateData = page => {
    let { date, conferenceId } = this.state.conferenceData;
    let apiReadyDate = moment(date).format('YYYYMMDD');
    return ApiRequests.conferencesDay(
      apiRoutes.conferencesDay + `${conferenceId}/${apiReadyDate}?`
    );
  };

  handleInfiniteScroll = async () => {
    let pagination = this.state.page + 1;
    this.setState({ page: pagination });
    this.handlePopulateData(pagination).then(conferenceDayList => {
      conferenceDayList = conferenceDayList['data']['rows'];
      let merge = [...this.state.conferenceDayList, ...conferenceDayList];
      this.setState({ conferenceDayList: merge });
    });
  };

  render() {
    let { conferenceDayList, conferenceData } = this.state;
    let { push } = this.props.navigation;
    const placeholder = {
      label: 'Filter by issue',
      value: null,
      color: '#9EA0A4',
    };
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Input
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            containerStyle={styles.input}
            placeholder="Search"
          />

          <RNPickerSelect
            placeholder={placeholder}
            onValueChange={value => console.log(value)}
            style={pickerSelectStyles}
            items={[
              { label: 'Football', value: 'football' },
              { label: 'Baseball', value: 'baseball' },
              { label: 'Hockey', value: 'hockey' },
            ]}
          />

          <Divider style={styles.divider} />

          {conferenceData && (
            <Text style={styles.title}>{conferenceData.formatedDate}</Text>
          )}

          <Divider style={styles.divider} />

          {!conferenceDayList && <Loader loading={true} />}

          <ScrollView
            style={{ marginBottom: 12, marginTop: -10 }}
            // onScroll={({ nativeEvent }) => {
            //   if (isCloseToBottom(nativeEvent)) {
            //     this.handleInfiniteScroll();
            //   }
            // }}
          >
            {conferenceDayList &&
              conferenceDayList.map((l, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    push('ConferenceDayIssue', {
                      conferenceIssueData: {
                        time: `${moment(l.startdatetime).format(
                          'HH:mm'
                        )} - ${moment(l.enddatetime).format('HH:mm')}`,
                        formatedDate: conferenceData.formatedDate,
                        title: l.title,
                        image: conferenceData.image,
                        uuid: l.uuid,
                      },
                    })
                  }
                >
                  <ListItem
                    title={
                      <View>
                        <Text style={styles.titleList}>{`${moment(
                          l.startdatetime
                        ).format('HH:mm')} - ${moment(l.enddatetime).format(
                          'HH:mm'
                        )}`}</Text>
                        <Text style={styles.titleList}>{l.title}</Text>
                      </View>
                    }
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
  },
  listContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 18,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#757575',
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
  },
  divider: {
    backgroundColor: '#757575',
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    marginBottom: 18,
    marginTop: 18,
  },
  title: {
    color: '#414040',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'robotoBold',
    paddingLeft: 12,
    paddingRight: 12,
  },
  titleList: {
    fontFamily: 'robotoRegular',
    color: '#757575',
    fontSize: 12,
    color: 'black',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: '#757575',
    borderRadius: 10,
    borderWidth: 0.5,
    color: '#414040',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    marginBottom: 10,
    height: 40,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#757575',
    color: '#414040',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    marginBottom: 10,
    height: 40,
  },
});
