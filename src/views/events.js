import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ApiRequests, apiRoutes } from '../api/requests';
import { Loader } from '../utils/loader';
import { isCloseToBottom } from '../utils/scrollDetection';

export default class EventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      loading: false,
      conferences: false,
    };
  }

  componentDidMount() {
    this.handlePopulateData(0).then(conferences => {
      conferences = conferences['data']['rows'];
      this.setState({ conferences });
    });
  }

  handlePopulateData = page => {
    return ApiRequests.conferences(apiRoutes.conferences + page);
  };

  handleInfiniteScroll = () => {
    this.setState({ loading: true });
    let pagination = this.state.page + 1;
    this.setState({ page: pagination });
    this.handlePopulateData(pagination).then(conferences => {
      conferences = conferences['data']['rows'];
      let merge = [...this.state.conferences, ...conferences];
      this.setState({ conferences: merge });
      this.setState({ loading: false });
    });
  };

  render() {
    let { conferences, loading } = this.state;
    let { push } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Events</Text>

          {!conferences && <Loader loading={true} />}

          <ScrollView
            style={{ marginBottom: 12 }}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                this.handleInfiniteScroll();
              }
            }}
            scrollEventThrottle={400}
          >
            {conferences &&
              conferences.map((l, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => push('Conference', { conferenceData: l })}
                >
                  <ListItem
                    leftAvatar={
                      <View>
                        <Image
                          resizeMode="contain"
                          source={{
                            uri: l.image,
                          }}
                          style={{
                            width: 100,
                            height: 60,
                          }}
                        />
                      </View>
                    }
                    style={{ paddingLeft: 12, paddingRight: 12 }}
                    titleStyle={{
                      fontFamily: 'robotoRegular',
                      color: '#757575',
                    }}
                    title={
                      <View style={{ marginLeft: 20 }}>
                        <Text>Session reports from the</Text>
                        <Text>{l.title}</Text>
                        <Text>{`${new Date(l.startdatetime).getFullYear()} ${
                          l.location
                        }`}</Text>
                      </View>
                    }
                    bottomDivider={conferences.length == i + 1 ? true : false}
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
    color: '#4ac2f1',
    fontSize: 26,
    backgroundColor: 'transparent',
    marginBottom: 16,
    fontFamily: 'robotoBold',
    paddingLeft: 12,
    paddingRight: 12,
  },
});
