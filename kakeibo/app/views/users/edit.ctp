<h3>ユーザ更新</h3>
<p>半角英数字のみ使用してください。</p>
<?php
echo $form->create('User',array('action'=>'edit'));
echo $form->text('username');
echo $form->input('password');
//echo $form->input('admin_flag');
//echo $form->select('branch_name',$province_branchArr,null,array('id' => 'province_branch'),false);
//echo $form->input('branch_name_eng');
echo $form->end('ユーザ更新');
?>
