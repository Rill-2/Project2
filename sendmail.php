<?php
	//Загрузка необходимых файлов PHPMailer'а 
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	
	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	
	//Объявляем PHPMailer 
	$mail = new PHPMailer(true);
	//Настройка кодировки
	$mail->CharSet = 'UTF-8';
	//Языковой файл из папки PHPMailer(ошибки поймем тоже) 
	$mail->setLanguage('ru', 'phpmailer/language/');
	//Включение html-тэгов в письме
	$mail->IsHTML(true);
	
	
	//От кого
	$mail->setFrom('NoName@gmail.com', '');
	//Кому
	$mail->addAddress('alexbolotov869@gmail.com');
	//Тема
	$mail->Subject = 'Ваш сайт был кем-то замечен!';
	
	//Тело письма
	$body = '<h1>Неожиданно!Не правда ли?</h1>';
	
	//Проверки полей на пустоту (на всякий)
	if(trim(!empty($_POST['Name']))){
		$body.='<p><strong>Имя: </strong> '.$_POST['Name'].'</p>';
	}
	
	if(trim(!empty($_POST['Email']))){
		$body.='<p><strong>E-mail: </strong> '.$_POST['Email'].'</p>';
	}
	
	if(trim(!empty($_POST['Message']))){
		$body.='<p><strong>Сообщение: </strong> '.$_POST['Message'].'</p>';
	}
	
	$mail->$body;
	
	//Отправка
	//Если форма не отправилась - выводит ошибку
	if (!$mail->send()){
		$Message = 'Данные не отправлены';
	}
	else
	{
		$Message = 'Данные отправлены';
	}
	
	//Формирование JSON для присваивания сообщения
	//что должно выводится при отправки
	//и чтоб мы получили в ответ нужное сообщение
	$Response = ['Message' => $Message];
	
	header('Content-type: application/json');
	//Возвращаем в JS с заголовком json
	echo json_encode($Response);
		
	
	error_reporting(E_ALL);
    ini_set('display_errors', 1);	
		
?>