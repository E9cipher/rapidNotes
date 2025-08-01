<?php
$NO_HOMEBTN = true;
ob_clean();
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$notesFile = '../notes.json';
$notes = file_exists($notesFile) ? json_decode(file_get_contents($notesFile), true) : [];

$notes = array_filter($notes, fn($n) => $n['id'] !== $id);
file_put_contents($notesFile, json_encode(array_values($notes), JSON_PRETTY_PRINT));

echo json_encode(['status' => 'Note deleted']);
exit;
