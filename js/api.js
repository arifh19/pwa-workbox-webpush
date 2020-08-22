const API_KEY = '802c5fd91ec34ffbabb6f4a65109ac62'
const LEAGUE_ID = 2001
const base_url = "https://api.football-data.org/v2/";
const standing = `${base_url}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`
const teams = `${base_url}competitions/${LEAGUE_ID}/teams`

const fetchApi = (url) => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
}

const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = (response) => {
  return response.json();
}

const error = (error) => {
  console.log("Error: " + error);
}

const getStandings = () => {
  return fetchApi(standing)
    .then(status)
    .then(json);
}

const getTeams = () => {
  return fetchApi(teams)
  .then(status)
  .then(json)
}