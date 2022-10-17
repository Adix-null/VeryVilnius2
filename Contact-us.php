<?php

use \PHPMailer\PHPmailer\PHPMailer;
use \PHPMailer\PHPmailer\Exception;
require 'sendemail/src/Exception.php';
require 'sendemail/src/PHPMailer.php';
require 'sendemail/src/SMTP.php';

//REQUIRES CHANGING
$to = 'info@veryvilnius.com';

if(isset($_POST['submit']))
{
    $mail = new PHPMailer(true);

    $mail->IsSMTP();
    $mail->Host = 'smtp-mail.outlook.com';
    
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 587;

    $mail->Username = $to;
    //Should not be a security vulnerability
    $mail->Password = 'ctkspxqtnlacbkvk';
    $mail->SetFrom($_POST['adress'],  $_POST['name'] . ', Very Vilnius Website'); //sender
    $mail->AddAddress($to); //recipient

    $mail->isHTML(false);
    $mail->Subject = $_POST['subject'];
    $mail->Body = $_POST['message'];
    
    try
    {
        $mail->Send();
        echo "
        <script> 
            alert('Email sent sucessfully'); 
        </script>";
    }
    catch(Exception $e)
    {
        $strmg = 'Error: ' . $e->getMessage();
        echo  "
        <script> 
            alert($strmg); 
        </script>";;
    }
    echo "
    <script> 
        document.location.href = 'info.html';
    </script>";
}
else
{
    echo "submit button is not set";
}
