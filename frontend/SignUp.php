<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Validate form inputs
  $name = $_POST["name"];
  $email = $_POST["email"];
  $password = $_POST["password"];

  $errors = [];

  if (empty($name)) {
    $errors[] = "Name is required.";
  }

  if (empty($email)) {
    $errors[] = "Email address is required.";
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email address.";
  }

  if (empty($password)) {
    $errors[] = "Password is required.";
  }

  // If there are no validation errors, proceed with storing the data in the database
  if (empty($errors)) {
    // Replace with your database credentials
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'moneysmart';
    
    // Create a new MySQLi instance
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check the connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO users(Name, Email, Password) VALUES (?, ?, ?)");

    // Bind the parameters
    $stmt->bind_param('sss', $name, $email, $password);

    // Execute the statement
    $stmt->execute();

    // Close the statement
    $stmt->close();

    // Close the connection
    $conn->close();

    // Redirect to the dashboard page
    header("Location: Dashboard.html");
    exit();
  }
}
?>
