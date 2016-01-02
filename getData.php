<?php
    header("Access-Control-Allow-Origin: *");
    header("Refresh:180;");
    $data = file_get_contents('http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=9ba187c9-b07e-40bc-9aa5-8d3c9f1aad63');
    echo $data;
    $fp = fopen('park_available.js','w');
    fwrite($fp,$data);
    fclose($fp);
?>

