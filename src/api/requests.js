import axios from 'axios';

export const baseUrl = 'https://dig.watch';

export const apiRoutes = {
  conferences: '/appconferences?page=',
  conferencesDay: '/appsessions4conferencegroupedbyday/',
  conferencesDayReport: '/jsonapi/node/conference_sessions/',
  conferencesSearch: '/appconferencesessions/',
  aboutPageContent: '/appaboutjit',
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
  saveToken: route => {
    return axios.get('http://10.0.1.188/store-token/' + route);
  },
  aboutPageContent: () => {
    return axios.get(baseUrl + apiRoutes.aboutPageContent);
  },
};
