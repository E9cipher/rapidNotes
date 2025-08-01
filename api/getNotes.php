<?php
$NO_HOMEBTN = true;
ob_clean();
header('Content-Type: application/json');

$notesFile = '../notes.json';

if (!file_exists($notesFile)) {
    file_put_contents($notesFile, '[]');
}

echo file_get_contents($notesFile);
?>
