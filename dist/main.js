const getRoster = function () {
    let input = $("#team-input").val()
    $.get(`/teams/${input}`, function (player) {
        $('.players-container').empty()
        const source = $('#player-template').html()
        const template = Handlebars.compile(source)
        const someHTML = template({player})
        $('.players-container').append(someHTML)
        console.log(player)
    })
}

