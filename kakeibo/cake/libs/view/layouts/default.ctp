<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow" />
<title>家計簿管理システム</title>
<?php
	echo $this->Html->css('cake.generic');
?>
</head>
<body>
<div id="container">
<div id="header">
<h1><?php if($_SERVER['SERVER_ADDR'] =="192.168.196.135"){	echo 'ローカル | ';} ?>家計簿管理システム</h1>
</div>
<div id="content">
<?php echo $this->Session->flash(); ?>
<?php echo $content_for_layout; ?>
</div>
<div id="footer">
家計簿管理システム画面
</div>
</div>
<?php //echo $this->element('sql_dump'); ?>
</body>
</html>