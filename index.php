<?php

?>
<!DOCTYPE html>
<html>
<head>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="css/style.css"/>

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <title>Cinéma-Fun</title>
</head>

<body>

<div class="progress" id="loader" style="margin:0">
    <div class="indeterminate"></div>
</div>

<nav>
    <div class="nav-wrapper">
        <form style="width:96%; float: left;">
            <div class="input-field">
                <input id="search" type="search" required>
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
            </div>
        </form>
        <a class='dropdown-button' href='#' data-activates='dropdown1' style="width:4%; float: right; text-align: right; padding-right: 16px; background-color: rgba(255,255,255,.1);"><i class="material-icons" id="icon">local_movies</i></a>
        <ul id='dropdown1' class='dropdown-content'>
            <li><a href="#" id="movie"><i class="small material-icons">local_movies</i></a></li>
            <li class="divider"></li>
            <li><a href="#" id="person"><i class="small material-icons">create</i></a></li>
        </ul>
    </div>
</nav>

<div class="container">
    <div class="row" id="films"></div>
</div>

<footer class="page-footer">
    <div class="container">
        <div class="row">
            <div class="col l6 s12">
                <h5 class="white-text">Cinema-Fun</h5>
                <p class="grey-text text-lighten-4">Bravo ! Ce site est fonctionnel !!!</p>
            </div>
            <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Liens</h5>
                <ul>
                    <li><a class="grey-text text-lighten-3" href="#">Link 1</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <div class="container">
            &copy; 2017 Cinéma Fun
            <a class="grey-text text-lighten-4 right" href="#">More Links</a>
        </div>
    </div>
</footer>

<!--Import jQuery before materialize.js-->
<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/materialize.min.js"></script>
<script type="text/javascript" src="js/film.js"></script>
</body>
</html>