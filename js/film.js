var find = "movie",
    loader = $('#loader').slideDown();

$( document ).ready(function() {
    loader.slideUp() // remove loader when page's ready

    $('#movie').click(function () { // switch search mode to movie
        $('#icon').html('local_movies')
        find = 'movie'
        search()
    });
    $('#person').click(function () { // switch search mode to actor
        $('#icon').html('create')
        find = 'person'
        search()
    });

    $('#search').keyup(function() {
        if($('#search').val().length > 2) // search only if string > 2 chars
            search()
        else                              //else show favorites
            showFavorites()
    });

    showFavorites()
});

function search(){ // themovieDB api call to find a film
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/"+ find +"?include_adult=false&query="+$('#search').val()+"&language=fr&api_key=34450d3b715a46959f480801c2baf21e",
        "method": "GET",
        "headers": {},
        "data": "{}"
    };

    $.ajax(settings).done(function (response) {
        loader.slideDown(); // enable loader
        var i = 0; // film card counter
        $('#films').empty(); // empty film div
        $.each(response.results, function(i, item) {
            if(find==='person')
                $('#films').append(createCards(response.results[0].known_for[i], false)); // show films searched actor is known for
            else
                $('#films').append(createCards(response.results[i], false)); // show films which correspond to the search
            i++;
            if(i===3){ // fixes the box sizes bug
                i=0;
                $('#films').append('<div class="clearfix"></div>');
            }
        });
        loader.slideUp(); // remove loader
    });
}

function showFavorites(){ // list films from favorite.json and retrieve from GET movie method
    loader.slideDown();
    var i = 0;
    $.getJSON('favorite.json?'+Math.floor(Math.random() * 100),function(favorites){
        $('#films').empty();
        $.each(favorites,function(index,d){ // for each favorite
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.themoviedb.org/3/movie/"+d+"?api_key=34450d3b715a46959f480801c2baf21e",
                "method": "GET",
                "headers": {},
                "data": "{}"
            };

            $.ajax(settings).done(function(response){ // call GET movie API for this ID
                $('#films').append(createCards(response, true));
            });
            i++;
            if(i===3){ // see @line48
                i=0;
                $('#films').append('<div class="clearfix"></div>');
            }
        });
        loader.slideUp();
    });
}

function createCards(json, favorite){ // create card
    /*
    *   This is really crappy but WE DON'T NEED FUCKING SHITTY PHP
     */

    if(json.title.length>25)
        json.title = json.title.substring(0, 25) + "...";
    if(!json.backdrop_path)
        var img = "img/default.jpg"; // if no image is available, show default one
    else
        var img = "https://image.tmdb.org/t/p/w500/"+json.backdrop_path; // create absolute path to cover picture

    var box = '';
    box += '<div class="col s12 m4">'
    box += '<div class="card">'
    box += '<div class="card-image waves-effect waves-block waves-light">'
    box += '<img class="activator" src="'+ img +'">'
    box += '</div>'
    box += '<div class="card-content">'
    box += '<span class="card-title activator grey-text text-darken-4">'+ json.title +'</span>'
    if(favorite) // if we are in favorite mode
        box += '<p><a href="favorites.php?action=del&id='+json.id+'" class="favorite">&#x1f494; Retirer</a></p>' // remove from favorites
    else        // else
        box += '<p><a href="favorites.php?action=add&id='+json.id+'" class="favorite">&hearts; Ajouter</a></p>' // add to favorites
    box += '</div>'
    box += ' <div class="card-reveal">'
    box += '<span class="card-title grey-text text-darken-4">'+ json.title +'<i class="material-icons right">close</i></span>'
    box += '<p>'+json.overview+'</p>' // description
    box += '</div>'
    box += '</div>'
    box += '</div>'
    return box;
}