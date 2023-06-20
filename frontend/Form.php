<?php
// Replace the placeholders with your MySQL database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moneysmart";

// Establish a connection to the MySQL database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to sanitize user input
function sanitizeInput($input)
{
    // Trim leading/trailing whitespace
    $input = trim($input);
    // Remove slashes and backslashes
    $input = stripslashes($input);
    // Convert special HTML characters to entities
    $input = htmlspecialchars($input);
    return $input;
}

// Check if the login form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the submitted email and password
    $email = sanitizeInput($_POST["email"]);
    $password = sanitizeInput($_POST["password"]);

    // Prepare a SQL statement to select the user with the provided email and password
    $stmt = $conn->prepare("SELECT * FROM users WHERE Email = ? AND Password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();

    // Check if a matching user is found
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        // Login successful, redirect to the dashboard
        header("Location: Dashboard.html");
        exit;
    } else {
        // Login failed, show an error message
        echo "Invalid email or password.";
    }

    // Close the prepared statement
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
