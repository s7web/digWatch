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

export default class ConferenceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      conferenceSearch: false,
      searchResults: false,
    };
  }

  async componentDidMount() {
    //Parent data
    let conferenceSearch = this.props.navigation.state.params
      .conferenceSearchData;

    console.log('PARENT DATA', conferenceSearch);

    this.setState({ conferenceSearch }, () => {
      this.handlePopulateData().then(searchResults => {
        searchResults = searchResults['data']['rows'];
        console.log('Search results ', searchResults);
        this.setState({ searchResults });
        if (searchResults.length == 0) {
          this.setState({ noResults: true });
        }
      });
    });
  }

  handlePopulateData = () => {
    const { conferenceId, issueId, keyword } = this.state.conferenceSearch;
    return ApiRequests.conferencesSearch(
      apiRoutes.conferencesSearch +
        `${conferenceId}/?issuesid=${issueId}&title=${keyword}&body=${keyword}`
    );
  };

  render() {
    const { searchResults, conferenceSearch } = this.state;
    let { push } = this.props.navigation;
    const placeholder = {
      label: 'Filter by issue',
      value: null,
      color: '#9EA0A4',
    };
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Divider style={styles.divider} />
          <Text style={{ ...styles.title }}>Search results</Text>
          <Divider style={styles.divider} />

          {!searchResults && <Loader loading={true} />}
          {this.state.noResults && (
            <Text style={{ flex: 1, textAlign: 'center' }}>No Results</Text>
          )}

          <ScrollView style={{ marginBottom: 12, marginTop: -10 }}>
            {searchResults &&
              searchResults.map((l, i) => (
                <TouchableOpacity
                  disabled={l.statuspublished == 1 ? false : true}
                  key={i}
                  onPress={() =>
                    push('ConferenceDayIssue', {
                      conferenceIssueData: {
                        time: `${moment(l.startdatetime).format(
                          'HH:mm'
                        )} - ${moment(l.enddatetime).format('HH:mm')}`,
                        formatedDate: moment(l.startdatetime).format(
                          'dddd, D MMM'
                        ),
                        title: l.title,
                        image: conferenceSearch.image,
                        uuid: l.uuid,
                        conferenceId: conferenceSearch.conferenceId,
                      },
                    })
                  }
                >
                  <ListItem
                    disabled={l.statuspublished == 1 ? false : true}
                    disabledStyle={{ opacity: 0.2 }}
                    title={
                      <View>
                        <Text style={styles.titleListBold}>{`${moment(
                          l.startdatetime
                        ).format('HH:mm')} - ${moment(l.enddatetime).format(
                          'HH:mm'
                        )} | ${moment(l.startdatetime).format(
                          'dddd, D MMM'
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
    fontSize: 14,
    color: 'black',
  },
  titleListBold: {
    fontFamily: 'robotoBold',
    fontWeight: 'bold',
    color: '#757575',
    fontSize: 14,
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
