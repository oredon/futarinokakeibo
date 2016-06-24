<?php

class usersController extends AppController{
	public $name = 'Users';
	public $components = array('Auth','Session','Security');

	function beforeFilter(){
		$this->Auth->allow('add');
		$this->Auth->allow('edit');
		$this->Auth->allow('login');
		$this->Auth->allow('logout');
		//$this->Auth->allow('admin_login');

		//force ssl
		//$this->Security->blackHoleCallback = "forceSSL";
		//$this->Security->requireSecure();
	}

/*function forceSSL() {
	$this->redirect("https://".env('SERVER_NAME').$this->here);
}*/

	//function login(){}
	function login(){
		//エラーが無いときはエラーオブジェクトを参照しない
		$this->set('error', false);

		//送信されたデータがnullじゃなかった場合
		if (!empty($this->data)){
			App::import('Sanitize');
			$this->data = Sanitize::clean( $this->data );
			//ユーザ名の探査
			$someone = $this->User->findByUsername($this->data['User']['username']);
			//パスワードが空でなく、
			// DB上のユーザーデータのパスワードと送信されたパスワードが同一の場合
			if(!empty($someone['User']['password']) && $someone['User']['password'] == $this->data['User']['password']){
			//セッションの作成
			$this->Session->write('User', $someone['User']);
			//セッション作成後、別ページへリダイレクト
			$this->redirect('/forms/index');
			}// パスワードが合致しなかった場合の処理
			else{
			//エラーをtrueに設定
			$this->set('error', false);
			//$this->Session->setFlash(__('<span style="color:#00ff00">正しいID、パスワードを入力してください</span>', true));
			}
		}
	}

	//function logout(){$this->Auth->logout();}
	function logout(){
	//ログインセッションの切断
	$this->Auth->logout();
	//別ページへリダイレクト
	$this->redirect('/');
	}
	//ユーザ追加（本番時はコメントアウト）

	function add(){
		if(!empty($this->data)){
			if($this->data){
				App::import('Sanitize');
				$this->data = Sanitize::clean( $this->data );

				$this->User->create();
				$this->User->save($this->data);
				$this->redirect(array('action'=>'login'));
			}
		}
	}

	//ユーザ更新
	function edit($id = null){
		if(!$id && empty($this->data)){
			$this->session->setFlash(__('<span style="color:#ff0000">エラー：不正なデータIDが渡されました</span>', true));
		}
		if(!empty($this->data)){
			App::import('Sanitize');
			$this->data = Sanitize::clean( $this->data );
			
			$this->User->id = $id;
			if ($this->User->save($this->data)) {
				$this->Session->setFlash(__('<span style="color:#00ff00">データは正常に更新されました</span>', true));
				$this->redirect(array('action' => 'edit/'.$id));
			} else {
				$this->Session->setFlash(__('<span style="color:#ff0000">エラー：データの更新に失敗しました。もう一度お試し下さい</span>', true));
			}
		}
		if(empty($this->data)){
			$this->data = $this->User->read(null,$id);
		}

		$this->set('id', $id);

	}

}
?>
