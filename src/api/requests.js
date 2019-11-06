import axios from 'axios';

export const baseUrl = 'https://dig.watch';

export const apiRoutes = {
  conferences: '/appconferences?page=',
  conferencesDay: '/appsessions4conferencegroupedbyday/',
  conferencesDayReport: '/jsonapi/node/conference_sessions/',
  conferencesSearch: '/appconferencesessions/',
};

export const ApiRequests = {
  conferences: route => {
    return axios.get(baseUrl + route);
  },
  conferencesDay: route => {
    return axios.get(baseUrl + route);
  },
  conferencesDayReport: route => {
    return axios.get(baseUrl + route);
  },
  conferencesSearch: route => {
    return axios.get(baseUrl + route);
  },
};
