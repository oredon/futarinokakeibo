<div class="loginBox">
<h3>ユーザ登録</h3>
<p>半角英数字のみ使用してください。</p>
<?php
echo $form->create('User',array('action'=>'add'));
echo $form->input('username');
echo $form->input('password');
//echo $form->input('admin_flag');
//echo $form->select('branch_name',$province_branchArr,null,array('id' => 'province_branch'),false);
//echo $form->input('branch_name_eng');
echo $form->end('ユーザ追加');
?>
</div>
