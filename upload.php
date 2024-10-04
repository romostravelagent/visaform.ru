<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader (if using Composer)
require 'vendor/autoload.php';

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form fields
    $visaType = $_POST['visaType'] ?? 'Не указано';
    $hotelDetails = $_POST['hotelDetails'] ?? 'Не указано';
    $flightDetails = $_POST['flightDetails'] ?? 'Не указано';
    
    // Check for file upload
    if (isset($_FILES['receipt']) && $_FILES['receipt']['error'] == 0) {
        $target_dir = "uploads/";
        
        // Ensure the directory exists
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        
        // Set target file path
        $target_file = $target_dir . basename($_FILES["receipt"]["name"]);
        
        // Allowed file types for security reasons (optional)
        $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $allowed_types = array('jpg', 'jpeg', 'png', 'pdf');
        
        // Check if the file type is allowed
        if (in_array($file_type, $allowed_types)) {
            if (move_uploaded_file($_FILES["receipt"]["tmp_name"], $target_file)) {
                
                // Set up PHPMailer to send email
                $mail = new PHPMailer(true);
                
                try {
                    //Server settings
                    $mail->isSMTP();                                      // Send using SMTP
                    $mail->Host       = 'smtp.example.com';               // Set the SMTP server
                    $mail->SMTPAuth   = true;                             // Enable SMTP authentication
                    $mail->Username   = 'your-email@example.com';         // SMTP username
                    $mail->Password   = 'your-email-password';            // SMTP password
                    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption
                    $mail->Port       = 587;                              // TCP port to connect
                    
                    //Recipients
                    $mail->setFrom('your-email@example.com', 'Visa Application');
                    $mail->addAddress('romostravels@hotmail.com');   // Add recipient
                    
                    // Attachments
                    $mail->addAttachment($target_file);                   // Add receipt as attachment
                    
                    // Content
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Новое заявление на визу';
                    $mail->Body    = "
                        <h3>Новая заявка на визу</h3>
                        <p><b>Тип визы:</b> $visaType</p>
                        <p><b>Детали бронирования отеля:</b> $hotelDetails</p>
                        <p><b>Детали рейса:</b> $flightDetails</p>
                        <p>Квитанция об оплате приложена к этому письму.</p>
                    ";
                    
                    // Send email
                    $mail->send();
                    echo "Заявка успешно отправлена, и письмо отправлено.";
                    
                    // Redirect to congratulations page
                    header("Location: congratulations.html");
                    exit();
                } catch (Exception $e) {
                    echo "Ошибка отправки письма: {$mail->ErrorInfo}";
                }
                
            } else {
                echo "Ошибка загрузки файла.";
            }
        } else {
            echo "Недопустимый тип файла.";
        }
    } else {
        echo "Файл не загружен или произошла ошибка.";
    }
} else {
    echo "Недопустимый метод запроса.";
}
?>
