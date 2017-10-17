$( document ).ready(function() {
    showFavorites();

});

$('#search').keyup(function() {
    if($('#search').val().length >2){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query="+$('#search').val()+"&language=fr&api_key=34450d3b715a46959f480801c2baf21e",
            "method": "GET",
            "headers": {},
            "data": "{}"
        };

        $.ajax(settings).done(function (response) {
            var i = 0;
            $('#films').empty();
            $.each(response.results, function(i, item) {
                $('#films').append(createCards(response.results[i]));
                i++;
                if(i===2){
                    i=0;
                    $('#films').append('<div class="clearfix"></div>');
                }
            });
        });
    }
    else
        showFavorites();
});

function showFavorites(){
    var i = 0;
    $.getJSON('favorite.json?'+Math.floor(Math.random() * 100),function(favorites){
        $('#films').empty();
        $.each(favorites,function(index,d){
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.themoviedb.org/3/movie/"+d+"?api_key=34450d3b715a46959f480801c2baf21e",
                "method": "GET",
                "headers": {},
                "data": "{}"
            };

            $.ajax(settings).done(function(response){
                $('#films').append(createCards(response));
            });
            i++;
            console.log(i);
            if(i===2){
                i=0;
                $('#films').append('<div class="clearfix"></div>');
            }
        });
    });
}

function createCards(json){

    if(json.title.length>25)
        json.title = json.title.substring(0, 30) + "...";
    if(!json.backdrop_path)
        var img = "img/default.jpg";
    else
        var img = "https://image.tmdb.org/t/p/w500/"+json.backdrop_path;

    var box = '';
    box += '<div class="col s12 m4">';
    box += '<div class="card">';
    box += '<div class="card-image waves-effect waves-block waves-light">';
    box += '<img class="activator" src="'+ img +'">';
    box += '</div>';
    box += '<div class="card-content">';
    box += '<span class="card-title activator grey-text text-darken-4">'+ json.title +'</span>';
    box += '<p><a href="addfavorite.php?id='+json.id+'" id="add" class="favorite">&hearts; Ajouter</a></p>';
    box += '</div>';
    box += ' <div class="card-reveal">';
    box += '<span class="card-title grey-text text-darken-4">'+ json.title +'<i class="material-icons right">close</i></span>';
    box += '<p>'+json.overview+'</p>';
    box += '</div>';
    box += '</div>';
    box += '</div>';

    return box;
}