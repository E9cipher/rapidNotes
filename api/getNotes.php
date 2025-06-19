<?php
header('Content-Type: application/json');

$notesFile = '../notes.json';

if (!file_exists($notesFile)) {
    file_put_contents($notesFile, '[]');
}

echo file_get_contents($notesFile);
?>
