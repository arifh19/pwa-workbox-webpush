let teamData;

const loadStandings = () => {
  Loading();
  let standings = getStandings()

  standings.then((data) => {
    let str = JSON.stringify(data).replace(/http:/g, 'https:');
    data = JSON.parse(str);

    let html = ''
    data.standings.forEach((standing) => {
      let detail = ''
      standing.table.forEach((result) => {
        detail += `<tr>
            <td>${result.position}</td>
            <td>${result.team.name}</td>
            <td>${result.playedGames}</td>
            <td>${result.won}</td>
            <td>${result.draw}</td>
            <td>${result.lost}</td>
            <td>${result.goalsFor}</td>
            <td>${result.goalsAgainst}</td>
            <td>${result.goalDifference}</td>
            <td>${result.points}</td>
          </tr>`
      })

      html += `
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h5 class="header">${standing.group}</h5>
        <table class="responsive-table striped">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Draw</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>` + detail + `</tbody>
        </table>
        </div>
        </div>
        </div>
      `
    });
    document.getElementById("header-title").innerHTML = 'Standings Liga Champion';
    document.getElementById("main-content").innerHTML = html;
    hideLoading()
  })
}

const loadTeams = () => {
  Loading()
  let teams = getTeams()

  teams.then(data => {
    let str = JSON.stringify(data).replace(/http:/g, 'https:');
    data = JSON.parse(str);
    
    teamData = data
    let html = ''
    html += '<div class="row">'
    data.teams.forEach((team) => {
      html += `
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class="col">
                <div><img width="80" height="80" src="${team.crestUrl || 'img/null.png'}"></div>
              </div>
              <div class="col">
                <div class="flow-text">${team.name}</div>
                <div>${team.area.name}</div>
                <div><a href="${team.website}" target="_blank">${team.website}</a></div>
              </div>
            </div>
          </div>
          <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small blue" onclick="insertTeamListener(${team.id})"><i class="material-icons left">star</i>Add to Favorite</a>
          </div>
        </div>
      </div>
    `
    })
    html += "</div>"
    document.getElementById("header-title").innerHTML = 'Teams';
    document.getElementById("main-content").innerHTML = html;
    hideLoading()
  })
}

const loadFavTeams = () => {
  Loading()
  let teams = getFavTeams()

  teams.then(data => {
    teamData = data;
    let html = ''
    html += '<div class="row">'
    data.forEach((team) => {
      html += `
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class="col">
                <div><img width="80" height="80" src="${team.crestUrl || 'img/null.png'}"></div>
              </div>
              <div class="col">
                <div class="flow-text">${team.name}</div>
                <div>${team.area.name}</div>
                <div><a href="${team.website}" target="_blank">${team.website}</a></div>
              </div>
            </div>
          </div>
          <div class="card-action right-align">
            <a class="waves-effect waves-light btn-small red" onclick="deleteTeamListener(${team.id})"><i class="material-icons left">delete</i>Delete</a>
          </div>
        </div>
      </div>
    `
    })

    if(data.length == 0) html += '<h6 class="center-align">No favorite team found!</6>'

    html += "</div>"
    document.getElementById("header-title").innerHTML = 'Favorite Teams';
    document.getElementById("main-content").innerHTML = html;
    hideLoading()
  })
}

const Loading = () => {
    let html = `<div class="preloader-wrapper medium active">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
                </div>`
      document.getElementById("loader").innerHTML = html;
  }
  
const hideLoading = () => {
  document.getElementById("loader").innerHTML = '';
}
