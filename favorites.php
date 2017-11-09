<?php
$tab = json_decode(file_get_contents('favorite.json'));
if (empty($tab)) // if the favorites are empty
    $tab = array();

if(is_numeric($_GET['id'])){
    if($_GET['action'] == 'add'){ // ADD
        if (in_array($_GET['id'],$tab)){
            $return = 'already';
        } // if the favorite is already added
        else{
            $tab = array_merge($tab,array($_GET['id'])); // adding movie id to json
            writeJSON($tab);
            $return = 'added';
        }
    }
    elseif($_GET['action'] == 'del'){ // DELETE
        if (in_array($_GET['id'], array($_GET['id']))){
            unset($tab[array_search($_GET['id'], array($_GET['id']))]);
            writeJSON($tab);
            $return = 'deleted';
        }
        else
            $return = 'undefined';
    }
}
else // wrong request
    $return = 'NaN';

function writeJSON($tab){ // rewrite the file from an array
    $tab = json_encode($tab); // converting array to json
    file_put_contents(realpath('./favorite.json'),$tab); // rewriting the website
}

header('Location: index.php?action='.$return);