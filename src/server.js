const express = require('express')
const app = express()
const http = require('http')
const request = require('request');
const port = 3000
const path = require('path')


app.use(express.static(path.join(__dirname, `..`, 'dist')))
app.use(express.static(path.join(__dirname, `..`, 'node_modules')))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
    "raptors": "1610612761",
    "bucks": "1610612749"
}

app.get('/', function (req, res) {
    res.send("Server is up and running smoothly")
})

app.get('/teams/:teamName', function(req, res){
    let teamName = req.params.teamName
    if (teamToIDs.hasOwnProperty(teamName)){
            request('http://data.nba.net/10s/prod/v1/2018/players.json', { json: true }, (err, respond, body) => {
                // // let data =JSON.parse(reponse.body)
                const data = body.league.standard
                let isActive = data.filter(d => d.isActive === true)
                let rightTeam = isActive.filter(t => t.teamId === teamToIDs[teamName])
                const teamActive = rightTeam.map(r => {return {firstName: r.firstName, lastName: r.lastName, jersey: r.jersey, position: r.pos}})

res.send(teamActive)
    })
}
})

app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})


