<?php
session_start();

// Define where the receipt will be saved
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["receipt"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if the file is a valid type (image or PDF)
$allowedTypes = array("jpg", "jpeg", "png", "pdf");
if (!in_array($fileType, $allowedTypes)) {
    echo "Sorry, only JPG, JPEG, PNG & PDF files are allowed.";
    $uploadOk = 0;
}

// Check file size (limit to 5MB)
if ($_FILES["receipt"]["size"] > 5000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Upload the file if everything is okay
if ($uploadOk == 1) {
    if (move_uploaded_file($_FILES["receipt"]["tmp_name"], $target_file)) {
        // The file was uploaded successfully
        // Optionally, you can store the file path in a database here

        // Redirect to the congratulations page
        header('Location: congratulations.html');
        exit(); // Stop further execution after redirection
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
} else {
    echo "Sorry, your file was not uploaded.";
}

// Clear session or cookies if needed
session_destroy();
?>