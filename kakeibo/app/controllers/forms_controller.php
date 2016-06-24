<?php

class formsController extends AppController{
	public $name = 'Forms';
	public $components = array('Auth','Session','Security');
	private $sinceYear = 2013;
	private $productArray = array(
		'ABCスーパー',
		'暮らしの雑貨と薬局併設店',
		'コーヒーショップ',
		'バーガーショップ',
		'ホームセンター',
		'診療所'
	);

	/*
	 * controller処理前共通
	 */
	function beforeFilter(){

	}

	/*
	 * generateArrayBySql
	 *  - formパーツなど、sqlデータからidとnameが紐付いた連想配列を返す
	 *  @param $_this Object 呼び出し元コンテキストの$this
	 *  @param $namespace String データベーステーブル名、モデル名
	 *  @param $id String モデルのID名
	 *  @param $name String モデルのname名
	 *
	 *  @return Array id=>name
	 */
	static function generateArrayBySql( $_this, $namespace, $id="id", $name="name" ){
		//ex.)Category カテゴリーIDからカテゴリーをひっぱってくる
		$_this->loadModel($namespace); //if it's not already loaded
		$datas = $_this->{$namespace}->find('all'); //or whatever conditions you want
		$catArr = array();
		foreach( $datas as $key => $val ){
			foreach( $val as $key2 => $val2 ){
				$catArr[ $val2[ $id ] ] = $val2[ $name ];
			}
		}

		return $catArr;
	}

	static function getMaxDate($year,$mon){
		return substr(date('Y-m-d', mktime(0, 0, 0, $mon + 1, 0, $year)),-2,2);
		//date('Y-m-d', strtotime($year . '-' . $mon . '-01 +1 month -1 day')) . PHP_EOL;
	}

	/*
	* indexページ
	*/
	function index(){
		$this->layout = "";
		//現在年月日
		$nowY = date("Y");
		$nowM = date("m");
		$nowD = date("d");

		$this->set('nowYear',$nowY);
		$this->set('nowMonth',$nowM);
		$this->set('nowDate',$nowD);

		//カテゴリーIDからカテゴリー配列を生成
		$catArr = self::generateArrayBySql( $this, "Category" );
		$this->set('catArr',$catArr);
		
		//開始月の割り当て
		$this->set('sinceYear', $this->sinceYear);
	}


	/*
	 * 月別データ抽出
	 */
	function monthly(){
		$this->layout = "";
		//パラメータの取得
		if(!empty($this->params['form']['start'])){
			$conditions = array(
				//"not" => array('Form.status' => '0'),
				//"or" => $keyword1Arr
			);
			$conditions["and"] = array();
			//$conditions["or"] = array();

			//ターゲットとなる年月日
			$targetdate = $this->params['form']['start'];

			//YYYYMM形式の変換
			if( strlen($targetdate) <= 6 ){
				$targetdate .= "01";
			}

			$startY = substr($targetdate,0,4);
			$startM = substr($targetdate,-4,2);
			$startD = substr($targetdate,-2,2);

			if(!empty($this->params['form']['end'])){
				$enddate = $this->params['form']['end'];
				$endY = substr($enddate,0,4);
				$endM = substr($enddate,-4,2);
				$endD = substr($enddate,-2,2);
			}else{
				$endY = substr($targetdate,0,4);
				$endM = substr($targetdate,-4,2);
				$endD = self::getMaxDate($endY,$endM);
			}

			//日付による絞り込み
			$startDateTime = date('Y-m-d',strtotime($startY . "-" . $startM . "-" . $startD));
			$endDateTime = date('Y-m-d',strtotime($endY . "-" . $endM . "-" . $endD));
			$conditions["and"] += array(
				"Form.date BETWEEN ? AND ?" => array($startDateTime,$endDateTime)
			);

			//sql発行
			$res = $this->Form->find('all',array(
				'conditions'=>$conditions,
				'order'=>array(
					'Form.date'=>'asc'
				),
				'fields'=>array(
					'Form.category_id as catid',
					'sum(Form.price) as sumPrice',
					'sum(Form.pay_danna) as sumDanna',
					'sum(Form.pay_yome) as sumYome'
				),
				'group'=>array(
					'Form.category_id'
				)
			));
			//var_dump($res);


			$dataArr = array();
			$allSum = 0;
			$dannaSum = 0;
			$yomeSum = 0;

			$catArr = self::generateArrayBySql( $this, "Category" );
			foreach($res as $key => $val){
				if(isset($val["Form"])){
					$val_data = $val["Form"];
				}else{
					$val_data = $val[0];
				}
				if( $val_data["catid"] ){
					$catid = $val_data["catid"];

					$catdata = array(
						"category_id" => $catid,
						"category_name" => $catArr[$catid],
						"sum_price" => $val[0]["sumPrice"],
						"sum_danna" => $val[0]["sumDanna"],
						"sum_yome" => $val[0]["sumYome"]
					);

					array_push($dataArr, $catdata);
					$allSum += $val[0]["sumPrice"];
					$dannaSum += $val[0]["sumDanna"];
					$yomeSum += $val[0]["sumYome"];
				}
			}

			$this->set('dataArr',$dataArr);
			$this->set('allSum',$allSum);
			$this->set('dannaSum',$dannaSum);
			$this->set('yomeSum',$yomeSum);

			$res = $this->Form->find('all',array(
					'conditions'=>array(
						"and" => array(
							"Form.date BETWEEN ? AND ?" => array($startDateTime,$endDateTime)
						),
						"not" => array(
							"Form.category_id BETWEEN ? AND ?" => array(11,12)
						)
					),
					'order'=>array(
						'Form.date'=>'asc'
					)
				)
			);
			$this->set('res',$res);

			//カテゴリーIDからカテゴリー配列を生成
			$catArr = self::generateArrayBySql( $this, "Category" );
			$this->set('catArr',$catArr);

			//前後月への遷移リンク用
			$prevDatetime = date('Ym', strtotime($startY . '-' . $startM . '-01 -1 month')) . PHP_EOL;
			$nextDatetime = date('Ym', strtotime($startY . '-' . $startM . '-01 +1 month')) . PHP_EOL;
			$this->set('prevDatetime',$prevDatetime);
			$this->set('nextDatetime',$nextDatetime);

			$json["status"] = "1";
			$json["msg"] = "月データを表示します";

		}else{
			$json = array();
			$json["status"] = "0";
			$json["msg"] = "リクエストが不正です";
		}
		$this->set('json',$json);
	}

	function edit(){
		$this->layout = "";
		$json = array();
		if( !empty($this->params['form']) ){
			//クリーニング
			App::import('Sanitize');
			$this->params['form'] = Sanitize::clean( $this->params['form'] );

			//id値の有無判定
			if(!empty($this->params['form']['id']) && $this->params['form']['id'] != 0){
				//編集
				$this->Form->id = $this->params['form']['id'];
				$json["isNew"] = "0";
			}else{
				//新規追加
				$this->Form->create();
				$json["isNew"] = "1";
			}

			if ($this->Form->save($this->params['form'])) {
				$json["status"] = "1";
				$json["msg"] = "データ保存しました";
			}else{
				$json["status"] = "0";
				$json["msg"] = "データ保存に失敗しました。もう一度お試し下さい";
			}
		}else{
			$json["status"] = "0";
			$json["msg"] = "空データは保存できません";
		}
		$this->set('json',$json);
	}

	function entry(){
		$this->layout = "";
		if( !empty($this->params['form']) && !empty($this->params['form']['id']) ){
			App::import('Sanitize');
			$this->params['form'] = Sanitize::clean( $this->params['form'] );
			$json = $this->Form->read(null, $this->params['form']['id']);
			
			$json["status"] = "1";
			$json["msg"] = "データの取得に成功しました。";

			$this->set('json',$json);
		}else{
			$json["status"] = "0";
			$json["msg"] = "データの取得に失敗しました。IDが未指定です。";
			$this->set('json',$json);
		}
	}

	function delete($id = null) {
		$this->layout = "";
		if( !empty($this->params['form']) && !empty($this->params['form']['id']) ){
			App::import('Sanitize');
			$this->params['form'] = Sanitize::clean( $this->params['form'] );

			if ($this->Form->delete( $this->params['form']['id'] )) {
				$json["status"] = "1";
				$json["msg"] = "正常にデータを削除しました";
			}else{
				$json["status"] = "0";
				$json["msg"] = "データの削除に失敗しました";
			}

			$this->set('json',$json);
		}else{
			$json["status"] = "0";
			$json["msg"] = "データの削除に失敗しました。IDが未指定です。";
			$this->set('json',$json);
		}
	}

	function yearly() {
		$this->layout = "";
		if( !empty($this->params['form']) && !empty($this->params['form']['year']) ){
			App::import('Sanitize');
			$this->params['form'] = Sanitize::clean( $this->params['form'] );

			//12ヶ月分のデータを集計する
			$datas = array();
			$cnt = 1;
			$year = intval($this->params['form']['year'], 10);

			while($cnt<=12){
				//data配列初期化
				$datas["mon".$cnt] = array();
				//SQL 初期化
				$conditions = array(
					//"not" => array('Form.status' => '0'),
					//"or" => $keyword1Arr
				);
				$conditions["and"] = array();

				//日付範囲
				$endD = self::getMaxDate($year,$cnt);
				$startDateTime = date('Y-m-d',strtotime($year . "-" . $cnt . "-" . "01"));
				$endDateTime   = date('Y-m-d',strtotime($year . "-" . $cnt . "-" . $endD));

				//
				$conditions["and"] += array(
					"Form.date BETWEEN ? AND ?" => array($startDateTime,$endDateTime)
				);

				//sql発行
				$tmpData = $this->Form->find('all',array(
					'conditions'=>$conditions,
					'order'=>array(
						'Form.date'=>'asc'
					),
					'fields'=>array(
						'Form.category_id as catid',
						'sum(Form.price) as sumPrice',
						'sum(Form.pay_danna) as sumDanna',
						'sum(Form.pay_yome) as sumYome'
					),
					'group'=>array(
						'Form.category_id'
					)
				));
				//var_dump($tmpData);
				foreach( $tmpData as $k1 => $v1){
					foreach( $v1 as $k2 => $v2 ){
						$datas["mon".$cnt][$v2['catid']] = $v2;
					}
				}

				$cnt++;
			}
			//var_dump($datas);

			$dataArr = array();

			$catArr = self::generateArrayBySql( $this, "Category" );
			$dataArr['total'] = array('all' => 0, 'danna' => 0, 'yome' => 0);
			foreach($datas as $k => $v){
				$dataArr[$k] = array();
				$dataArr[$k]["sum"] = 0;
				$dataArr[$k]["danna"] = 0;
				$dataArr[$k]["yome"] = 0;
				foreach($v as $key => $val){
					if( $val["catid"] ){
						$catid = $val["catid"];

						$catdata = array(
							"category_id" => $catid,
							"category_name" => $catArr[$catid],
							"sum_price" => $val["sumPrice"],
							"sum_danna" => $val["sumDanna"],
							"sum_yome" => $val["sumYome"]
						);
						$dataArr[$k][$catid] = $catdata;

						$dataArr[$k]["sum"] += $val["sumPrice"];
						$dataArr[$k]["danna"] += $val["sumDanna"];
						$dataArr[$k]["yome"] += $val["sumYome"];

						$dataArr["total"]["all"] += $val["sumPrice"];
						$dataArr["total"]["danna"] += $val["sumDanna"];
						$dataArr["total"]["yome"] += $val["sumYome"];
					}
				}
			}
			$dataArr["status"] = "1";
			$dataArr["msg"] = "年データを取得します。";
			
			$dataArr["category"] = self::generateArrayBySql( $this, "Category" );
			//var_dump($dataArr);
			$this->set('dataArr',$dataArr);
		}else{
			$json["status"] = "0";
			$json["msg"] = "年が未指定です。";
			$this->set('json',$json);
		}
	}
}
?>
