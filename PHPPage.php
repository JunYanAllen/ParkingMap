

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title></title>
    </head>
    <body>
        <?php
$db = mysql_connect("localhost","root","")or die(mysql_errno());
mysql_query("SET NAMES 'utf8'");
mysql_select_db("test");
$result = mysql_query("select * from police",$db);
$json = array();
$data = array();
while($row = mysql_fetch_assoc($result))
{
    $data[] = urlencode(array('id'=>$row['id'],'name'=>$row['name'],'content'=>$row['content'],'lat'=>$row['lat'],'lng'=>$row['lng'],'display_addr'=>$row['display_addr'],'poi_addr'=>$row['poi_addr']));
    //echo $row['content']."<br>";
    /*$row_array['id'] = $row['id'];
    $row_array['name'] = $row['name'];
    $row_array['content'] = $row['content'];
    $row_array['lat'] = $row['lat'];
    $row_array['lng'] = $row['lng'];
    $row_array['display_addr'] = $row['display_addr'];
    $row_array['poi_addr'] = $row['poi_addr'];
    array_push($json,$row_array);*/
}
echo urldecode(json_encode($data));
/*$fp = fopen('police_json.js','w');
fwrite($fp,urldecode(json_encode($data)));
fclose($fp);*/
?>
    </body>
</html>
