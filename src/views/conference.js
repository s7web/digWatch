import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Loader } from '../utils/loader';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default class ConferenceDayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      loading: false,
      conference: false,
      dates: [],
    };
  }

  componentDidMount() {
    //Parent data
    //this.props.navigation.state.params.conferenceData

    let conference = this.props.navigation.state.params.conferenceData;
    console.log('conference page', conference);
    this.setState({ conference });

    const start = moment(conference.startdatetime);
    const end = moment(conference.enddatetime);

    const range = moment.range(start, end);

    let dates = Array.from(range.by('day'));

    this.setState({ dates });
  }

  render() {
    let { conference, loading, dates } = this.state;
    let { push } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={{ uri: conference.image }}
            style={{
              width: 120,
              height: 80,
              marginLeft: 12,
              marginBottom: 10,
            }}
          />

          <Text style={styles.title}>
            Session reports from the {conference.title}{' '}
          </Text>
          <Text style={styles.titleLast}>{conference.location}</Text>

          <ScrollView style={{ marginBottom: 12 }} scrollEventThrottle={400}>
            {dates &&
              dates.map((l, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    push('ConferenceDay', {
                      conferenceDayData: {
                        date: l,
                        conferenceId: conference.id,
                        conferenceUuid: conference.uuid,
                        formatedDate: moment(l).format('dddd, D MMM'),
                        image: conference.image,
                      },
                    })
                  }
                >
                  <ListItem
                    leftAvatar={
                      <Avatar
                        icon={{
                          name: 'calendar',
                          type: 'font-awesome',
                          size: 32,
                          color: '#757575',
                        }}
                        overlayContainerStyle={{
                          backgroundColor: 'transparent',
                        }}
                      />
                    }
                    style={{ paddingLeft: 12, paddingRight: 12 }}
                    title={moment(l).format('dddd, D MMM')}
                    titleStyle={{
                      fontFamily: 'robotoRegular',
                      color: '#757575',
                    }}
                    bottomDivider={dates.length == i + 1 ? true : false}
                    topDivider
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>

          <Loader loading={loading} />
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
  title: {
    color: '#757575',
    fontSize: 14,
    fontFamily: 'robotoRegular',
    paddingLeft: 12,
    paddingRight: 12,
  },
  titleLast: {
    color: '#757575',
    fontSize: 14,
    fontFamily: 'robotoRegular',
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 18,
  },
});
