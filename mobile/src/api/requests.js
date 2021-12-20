import axios from 'axios';

export const baseUrl = 'https://dig.watch';

export const apiRoutes = {
  //  conferences: '/jit-conferences.json?page=',
  //  conferencesDay: '/jit-conferences-by-day.json/',
  //  conferencesDayReport: '/jsonapi/node/conference_sessions/',
  //  conferencesSessionDayReport: '/jit-report.json/',
  //  conferencesSearch: '/jit-search.json/',
  //  aboutPageContent: '/jit-about.json',
  //  conferenceIssues: '/jit-issues.json/',
  
  conferences: '/wp-json/dw/v1/events/page=',
  conferencesDay: '/wp-json/dw/v1/event-reports/id=',
  conferencesSessionDayReport: '/wp-json/dw/v1/report/id=',
  aboutPageContent: '/wp-json/dw/v1/about',
  conferenceIssues: '/wp-json/dw/v1/topics/id=',
  conferencesSearch: '/wp-json/dw/v1/search/id='
};

export const ApiRequests = {
  conferences: (route) => {
    return axios.get(baseUrl + route);
  },
  conferencesDay: (route) => {
    return axios.get(baseUrl + route);
  },
  conferencesDayReport: (route) => {
    return axios.get(baseUrl + route);
  },
  conferencesSearch: (route) => {
    return axios.get(baseUrl + apiRoutes.conferencesSearch + route);
  },
  conferenceIssues: (confId) => {
    return axios.get(baseUrl + apiRoutes.conferenceIssues + confId);
  },
  saveToken: (route) => {
    return axios.get('http://78.47.162.187/store-token/' + route);
  },
  aboutPageContent: () => {
    return axios.get(baseUrl + apiRoutes.aboutPageContent);
  },
};
