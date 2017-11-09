<?php
    if (is_numeric($_GET['id']))
    {
        $tab1 = json_decode(file_get_contents('favorite.json'));
        if (empty($tab1))
        {
            $tab1 = array();
        }
        if (in_array($_GET['id'],$tab1))
        {
            $return = 'already';
        }
        else
        {
            $tab2 = array($_GET['id']);
            $tab = array_merge($tab1,$tab2);
            $tab = json_encode($tab);
            file_put_contents(realpath('./favorite.json'),$tab);
            $return = 'ok';
        }
    }
    else
    {
        $return = 'not authorized';
    }

    header('Location: index.php?added='.$return);

?>