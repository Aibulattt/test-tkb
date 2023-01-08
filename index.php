<?php 

$data = [];

function transformData() {
    foreach ( $_POST as $key => $value ) {
        array_push($data, $value);
    }

    if (!empty($data)) {
        return true;
    } else {
        return false;
    }
}
?>