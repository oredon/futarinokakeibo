<?php
//var_dump($_SESSION);

if($session->check('Message.auth'))
	echo $session->flash('auth');
?>
<div class="loginBox">
<?php
echo $form->create('User',array('action'=>'login'));
echo $form->input('username',array('label'=>'ユーザID' , 'div' => false, 'type' => 'text'));
echo '<br /><br />';
echo $form->input('password',array('label'=>'パスワード' , 'div' => false));
echo $form->end('ログイン');
?>
<!-- loginBox --></div>
