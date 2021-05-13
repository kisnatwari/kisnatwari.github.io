<?php 
	$name = $_POST["name"];
	$email = $_POST["email"];
	$message = $_POST["message"];
	if(mail("twarikisna@gmail.com","Message from website", "Hi, This message is sent from website","From: kisnatwari@gmail.com")){
		echo "Message successfully sent... We will contact you shortly.. Please be patient";
	}
 ?>
