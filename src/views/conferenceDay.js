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
import moment from 'moment';
import { isCloseToBottom } from '../utils/scrollDetection';
import { Loader } from '../utils/loader';
import { SearchForm } from '../utils/searchForm';

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
        console.log('CONFERENCE ISSUE LIST', conferenceDayList);
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

    return (
      <View style={styles.container}>
        <View style={styles.containerForm}>
          <SearchForm
            routeData={(searchKeyword, issueId) =>
              push('ConferenceSearch', {
                conferenceSearchData: {
                  conferenceId: conferenceData.conferenceId,
                  issueId: issueId,
                  image: conferenceData.image,
                  keyword: searchKeyword,
                },
              })
            }
          />

          <Divider style={styles.divider} />

          {conferenceData && (
            <Text style={styles.title}>{conferenceData.formatedDate}</Text>
          )}

          <Divider style={styles.divider} />

          {!conferenceDayList && <Loader loading={true} />}

          <ScrollView style={{ marginBottom: 12, marginTop: -10 }}>
            {conferenceDayList &&
              conferenceDayList.map((l, i) => (
                <TouchableOpacity
                  disabled={l.statuspublished == 1 ? false : true}
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
                        conferenceId: conferenceData.conferenceId,
                      },
                    })
                  }
                >
                  <ListItem
                    disabled={l.statuspublished == 1 ? false : true}
                    disabledStyle={{ opacity: 0.2 }}
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
  containerForm: {
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
