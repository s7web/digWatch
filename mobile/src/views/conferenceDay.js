import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { ListItem, Input, Divider, Icon } from 'react-native-elements';
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
      refreshing: false,
      formVisibility: false,
    };
  }

  async componentDidMount() {
    //Parent data
    //this.props.navigation.state.params.conferenceDayData
    let conferenceData = this.props.navigation.state.params.conferenceDayData;

    this.setState({ conferenceData }, () => {
      this.handlePopulateData(0).then((conferenceDayList) => {
        conferenceDayList = conferenceDayList['data']['rows'];
        this.setState({ conferenceDayList });
      });
    });
  }

  handlePopulateData = async (page) => {
    let { date, conferenceId } = this.state.conferenceData;
    let apiReadyDate = moment(date).format('YYYYMMDD');
    return await ApiRequests.conferencesDay(
      apiRoutes.conferencesDay + `${conferenceId}/${apiReadyDate}?`
    );
  };

  handleInfiniteScroll = async () => {
    let pagination = this.state.page + 1;
    this.setState({ page: pagination });
    await this.handlePopulateData(pagination).then((conferenceDayList) => {
      conferenceDayList = conferenceDayList['data']['rows'];
      let merge = [...this.state.conferenceDayList, ...conferenceDayList];
      this.setState({ conferenceDayList: merge });
    });
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.handlePopulateData(0).then((conferenceDayList) => {
      conferenceDayList = conferenceDayList['data']['rows'];
      this.setState({ conferenceDayList }, () => {
        this.setState({ refreshing: false });
        this.setState({ page: 0 });
        this.setState({ blockInfinite: false });
      });
    });
  };

  render() {
    let {
      conferenceDayList,
      conferenceData,
      refreshing,
      formVisibility,
    } = this.state;
    let { push } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.containerForm}>
          {conferenceDayList && formVisibility && (
            <SearchForm
              confId={conferenceData.conferenceId}
              routeData={(searchKeyword, issueId) =>
                push('ConferenceSearch', {
                  conferenceSearchData: {
                    conferenceId: conferenceData.conferenceId,
                    issueId: issueId,
                    image: conferenceData.image,
                    keyword: searchKeyword,
                    eventTitle: conferenceData.shareTitle,
                  },
                })
              }
            />
          )}

          {conferenceData && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 22,
              }}
            >
              <Text style={styles.title}>{conferenceData.formatedDate} </Text>
              <Icon
                name={this.state.formVisibility ? 'cross' : 'sound-mix'}
                size={26}
                type="entypo"
                underlayColor={'white'}
                iconStyle={{ paddingRight: 11, color: '#757575' }}
                onPress={() =>
                  this.setState({ formVisibility: !this.state.formVisibility })
                }
                containerStyle={{ position: 'relative', top: -3 }}
              />
            </View>
          )}

          <Divider style={styles.divider} />

          {!conferenceDayList && <Loader loading={true} />}

          <ScrollView
            style={{ marginBottom: 12, marginTop: -10 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            {conferenceDayList &&
              conferenceDayList.map((l, i) => (
                <TouchableOpacity
                  disabled={l.statuspublished == 1 ? false : true}
                  key={i}
                  onPress={() =>
                    push('ConferenceDayIssue', {
                      conferenceIssueData: {
                        time:
                          moment(l.startdatetime).hour() !== 0 &&
                          moment(l.enddatetime).hour() !== 0
                            ? `${moment(l.startdatetime).format(
                                'HH:mm'
                              )} - ${moment(l.enddatetime).format('HH:mm')}`
                            : '',
                        formatedDate: conferenceData.formatedDate,
                        title: l.title,
                        image: conferenceData.image,
                        uuid: l.uuid,
                        conferenceId: conferenceData.conferenceId,
                        eventTitle: conferenceData.shareTitle,
                        sessionid: l.sessionid,
                      },
                    })
                  }
                >
                  <ListItem
                    disabled={l.statuspublished == 1 ? false : true}
                    disabledStyle={{ opacity: 0.2 }}
                    title={
                      <View>
                        {moment(l.startdatetime).hour() !== 0 &&
                          moment(l.enddatetime).hour() !== 0 && (
                            <Text style={styles.titleList}>{`${moment(
                              l.startdatetime
                            ).format('HH:mm')} - ${moment(l.enddatetime).format(
                              'HH:mm'
                            )}`}</Text>
                          )}
                        <Text style={styles.titleList}>
                          {l.title.split('&#039;').join("'")}
                        </Text>
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

    paddingBottom: 12,
  },
  containerForm: {
    flex: 1,
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
    marginBottom: 12,
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
});
