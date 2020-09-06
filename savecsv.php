<?php
$post_data = json_decode(file_get_contents('php://input'), true);
try {
    // the directory "data" must be writable by the server
    $name = $post_data['user_id'];
    if(!preg_match('/[a-zA-Z0-9]+/', $name))
        throw new Exception('Invalid user ID');
    if($name == "test_id") {
        $data = "";
    } else {
        $data = $post_data['csv'];
    }
    $name = "data/public/$name.csv";
    // write the file to disk
    file_put_contents($name, $data);
    http_response_code(200);
    die('Data saved successfully');
} catch(Exception $exception) {
    http_response_code(400);
    die($exception);
}
