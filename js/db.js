let dbx = idb.open('my-football', 1, (upgradeDb) => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('teams', { 'keyPath': 'id' })
  }
});

const insertTeam = (team) => {
  dbx.then(db => {
    let tx = db.transaction('teams', 'readwrite');
    let store = tx.objectStore('teams')
    team.createdAt = new Date().getTime()
    store.put(team)
    return tx.complete;
  }).then(() => {
    M.toast({ html: `${team.name} berhasil disimpan!` })
    console.log('Pertandingan berhasil disimpan');
  }).catch((err) => {
    console.error('Pertandingan gagal disimpan', err);
  });
}

const deleteTeam = (teamId) => {
  dbx.then(db => {
    let tx = db.transaction('teams', 'readwrite');
    let store = tx.objectStore('teams');
    store.delete(teamId);
    return tx.complete;
  }).then(() => {
    M.toast({ html: 'Team has been deleted!' });
    loadFavTeams();
  }).catch(err => {
    console.error('Error: ', err);
  });
}

const getFavTeams = () => {
  return dbx.then(db => {
    let tx = db.transaction('teams', 'readonly');
    let store = tx.objectStore('teams');
    return store.getAll();
  })
}


const insertTeamListener = (teamId) => {
  let team = teamData.teams.filter(el => el.id == teamId)[0]
  insertTeam(team);
}

const deleteTeamListener = (teamId) => {
  let d = confirm("Delete this team?")
  if (d == true) {
    deleteTeam(teamId);
  }
}