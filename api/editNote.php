<?php
$NO_HOMEBTN = true;
ob_clean();
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$newText = $data['text'];

$notes = json_decode(file_get_contents('../notes.json'), true);
foreach ($notes as &$note) {
  if ($note['id'] === $id) {
    $note['text'] = $newText;
    $note['timestamp'] = time();
    // Optionally re-analyze
    $words = preg_split('/\s+/', trim($newText));
    $note['analysis'] = [
      'word_count' => count($words),
      'longest_word' => array_reduce($words, fn($a, $b) => strlen($a) > strlen($b) ? $a : $b)
    ];
    break;
  }
}

file_put_contents('../notes.json', json_encode($notes));
echo json_encode(['status' => 'Note updated']);
?>
