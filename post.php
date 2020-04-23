<?php
/**
 * Só deixei o arquivo aqui para titulo de curiosidade rsrs
 */
//refatorando dados
foreach($_REQUEST['perguntas'] as $key => $pergunta){
    
       $_REQUEST['perguntas'][$key] = json_decode($pergunta);
    
}
//salvando arquivo
file_put_contents("js/perguntas.json",json_encode($_REQUEST['perguntas'],JSON_UNESCAPED_UNICODE));
