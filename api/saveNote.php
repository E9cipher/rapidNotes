<?php
$NO_HOMEBTN = true;
ob_clean();
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ERROR | E_PARSE | E_WARNING);


$data = json_decode(file_get_contents('php://input'), true);
$text = trim($data['text'] ?? '');

if ($text === '') {
    echo json_encode(['error' => 'Empty note']);
    exit;
}

$notesFile = '../notes.json';
$inputFile = '../tmp/note.txt';
$outputFile = '../tmp/result.json';

// Save note to file for analysis
file_put_contents($inputFile, $text);

// Call C++ analyzer
exec("../analyzeNote $inputFile > $outputFile");

// Load analysis
$analysis = json_decode(file_get_contents($outputFile), true);

// Load existing notes
$notes = file_exists($notesFile)
    ? json_decode(file_get_contents($notesFile), true)
    : [];

// Add new note
$notes[] = [
    'id' => uniqid(),
    'text' => $text,
    'timestamp' => time(),
    'analysis' => $analysis
];

// Save back
file_put_contents($notesFile, json_encode($notes, JSON_PRETTY_PRINT));

echo json_encode(['status' => 'Note saved', 'analysis' => $analysis]);
?>
