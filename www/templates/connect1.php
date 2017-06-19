<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>Document</title>
 </head>
 <body>
  <?php
  $conn=mysqli_connect("localhost","root","","d56");
  if($conn){
	echo "connect sussecc";
	}else{
		echo "ERROR CONNECT";
		}
  ?>
 </body>
</html>
