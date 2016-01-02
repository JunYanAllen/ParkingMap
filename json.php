<?php
    $link = mysql_connect("127.0.0.1","root","23393150");
    header("Content-Type:text/html; charset=utf-8");
    mysql_query("SET NAMES 'UTF8'");
    mysql_select_db("iname2",$link);
    $ee = "SELECT * FROM 學生資料";
    $qq = mysql_query($ee);
    $data = array();
    while ($as = mysql_fetch_assoc($qq))
    {
        $data[] = array("class"=>urlencode($as["班級"]), "id"=>urlencode($as["學號"]), "name"=>urlencode($as["姓名"]) ,"sex"=>urlencode($as["性別"]), "phone"=>urlencode($as["手機"]), "email"=>urlencode($as["email"]));
    }
    $json =  urldecode(json_encode($data));
    echo urldecode(json_encode($data));
?>
