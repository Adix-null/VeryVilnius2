<?php

use \PHPMailer\PHPmailer\PHPMailer;
use \PHPMailer\PHPmailer\Exception;

require 'sendemail/src/Exception.php';
require 'sendemail/src/PHPMailer.php';
require 'sendemail/src/SMTP.php';

//REQUIRES CHANGING
$to = 'veryvilnius@gmail.com';

$recaptchaSecret = getenv('RECAPTCHA_SECRET_KEY');

if (isset($_POST['submit'])) {
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';
    $verify = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($recaptchaSecret) . '&response=' . urlencode($recaptchaResponse));
    $captchaData = json_decode($verify);

    if (!$captchaData->success) {
        echo "<script>alert('Please complete the reCAPTCHA.'); document.location.href = 'info.html';</script>";
        exit;
    }

    $mail = new PHPMailer(true);

    $mail->IsSMTP();
    $mail->Host = 'smtp.gmail.com';

    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->Username = $to;
    $mail->Password = getenv('GMAIL_APP_PASSWORD');
    $mail->SetFrom($_POST['adress'],  $_POST['name'] . ', Very Vilnius Website'); //sender
    $mail->AddAddress($to); //recipient

    $mail->isHTML(false);
    $mail->Subject = $_POST['subject'] . ', ' . $_POST['adress'];

    $mail->Body = $_POST['message'];

    try {
        $mail->Send();
        echo "
        <script> 
            alert('Email sent sucessfully'); 
        </script>";
    } catch (Exception $e) {
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
} else {
    echo "submit button is not set";
}
