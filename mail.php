<?
require_once 'phpmailer/PHPMailerAutoload.php';

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

//Когда нескольким почтам передаем и делается из них массив
$admin_email = array();
//И сюда пушится нужный нам емэил
foreach ( $_POST["admin_email"] as $key => $value ) {
	array_push($admin_email, $value);
}

$admin_email = 'alexbolotov869@gmail.com';

//Тема письма
$form_subject = trim($_POST["form_subject"]);

//Сам phpmailer вызывается
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

// Настройки SMTP
// $mail->isSMTP();
// $mail->SMTPAuth = true;
// $mail->SMTPDebug = 0;

// $mail->Host = 'ssl://smtp.gmail.com';
// $mail->Port = 465;
// $mail->Username = 'Логин';
// $mail->Password = 'Пароль';


$jsonText = $_POST['Еда'];
//Из json обратно в текст преобразование
$myArray = json_decode($jsonText, true);


$prod = '';

//По всему переданному массиву проходимся
foreach ($myArray as $key => $value) {
	
		$cat = $value["category"];
	    $title = $value["title"];
	    $price = $value["price"];
		//priceString
		
	    $prod .= "
			<tr>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$title</td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$price</td>
			</tr>
			";
	}

$c = true;
$message = '';
foreach ( $_POST as $key => $value ) {
	if ( $value != ""  && $key != "admin_email" && $key != "form_subject"  && $key != "Еда") {
		if (is_array($value)) {
			$val_text = '';
			foreach ($value as $val) {
				if ($val && $val != '') {
					$val_text .= ($val_text==''?'':', ').$val;
				}
			}
			$value = $val_text;
		}
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
		<td style='padding: 10px; width: auto;'><b>$key:</b></td>
		<td style='padding: 10px;width: 100%;'>$value</td>
		</tr>
		";
	}
}
$message = "<table style='width: 50%;'>$message . $prod</table>";


// От кого
$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Инкогнито');

// Кому
foreach ( $admin_email as $key => $value ) {
	$mail->addAddress($value);
}
// Тема письма
$mail->Subject = $form_subject;

// Тело письма
$body = $message;
// $mail->isHTML(true);  это если прям верстка
$mail->msgHTML($body);


// Для обработки файла
if ($_FILES){
	foreach ( $_FILES['file']['tmp_name'] as $key => $value ) {
		$mail->addAttachment($value, $_FILES['file']['name'][$key]);
	}
}
if (!$mail->send()){
		$Message = 'Ошибка';
	}
	else
	{
		$Message = 'Данные отправлены';
	}
?>
