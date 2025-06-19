<?php
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$notes = json_decode(file_get_contents('../notes.json'), true);
$notes = array_filter($notes, fn($n) => $n['id'] !== $id);

file_put_contents('../notes.json', json_encode(array_values($notes)));
echo json_encode(['status' => 'Note deleted']);
?>
