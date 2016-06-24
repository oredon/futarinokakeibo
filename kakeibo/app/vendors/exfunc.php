<?php
/**
 * 翻訳ファイルから日本語表記を返す
 * @param str ユーザ名
 * @param str 翻訳対象となる文字列
 * @return 翻訳ファイルに対になる文字列があればそれを返し、無ければ空文字を返す
 */
function translateJP($username,$tgtStr){
	//Valueからkeyを探る
	$transBase = $_SERVER['DOCUMENT_ROOT'] . '/kakeibo/translate/' . $username . '.txt';
    $return = "";
    
	if(file_exists($transBase)){
		$tgtfile = file($transBase);
		mb_convert_variables('utf-8','sjis-win',$tgtfile);
		for($i=0;$i<count($tgtfile);$i++){
			$tmpArr = explode(',', $tgtfile[$i]);
			if($tgtStr == trim($tmpArr[0])){
				return trim($tmpArr[1]);
			}
		}
	}
	
	return $return;
}

/**
 * ファイルポインタから行を取得し、CSVフィールドを処理する
 * @param resource handle
 * @param int length
 * @param string delimiter
 * @param string enclosure
 * @return ファイルの終端に達した場合を含み、エラー時にFALSEを返す
 */
function fgetcsv_reg (&$handle, $length = null, $d = ',', $e = '"') {
    $d = preg_quote($d);
    $e = preg_quote($e);
    $_line = "";
    $eof = false;
    while (($eof != true)and(!feof($handle))) {
        $_line .= (empty($length) ? fgets($handle) : fgets($handle, $length));
        $itemcnt = preg_match_all('/'.$e.'/', $_line, $dummy);
        if ($itemcnt % 2 == 0) $eof = true;
    }
    $_csv_line = preg_replace('/(?:\\r\\n|[\\r\\n])?$/', $d, trim($_line));
    $_csv_pattern = '/('.$e.'[^'.$e.']*(?:'.$e.$e.'[^'.$e.']*)*'.$e.'|[^'.$d.']*)'.$d.'/';
    preg_match_all($_csv_pattern, $_csv_line, $_csv_matches);
    $_csv_data = $_csv_matches[1];
    for($_csv_i=0;$_csv_i<count($_csv_data);$_csv_i++){
        $_csv_data[$_csv_i]=preg_replace('/^'.$e.'(.*)'.$e.'$/s','$1',$_csv_data[$_csv_i]);
        $_csv_data[$_csv_i]=str_replace($e.$e, $e, $_csv_data[$_csv_i]);
    }
    return empty($_line) ? false : $_csv_data;
}

/**
 * headerを出力し、コンテンツをダウンロードさせる
 * @param filename ダウンロード時のファイル名を指定
 * @param content 出力内容
 * @return header付きのコンテンツ
 */
function print_download($filename,$content){
    //header('Content-Type: text/csv');
    header('Expires: ' . gmdate('D, d M Y H:i:s') . ' GMT');
    header('Content-Disposition: attachment; filename="'.$filename.'"');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    echo $content;
}



function fileputcsv($handle, $fields){
    $new_fields = array();
    foreach ($fields as $value) {
        $value = str_replace('"', '""', $value);
        if (preg_match('/[,"\s]/', $value)) {
            $value = '"' . $value . '"';
        }
        $new_fields[] = $value;
    }
    return fputs($handle, implode(',', $new_fields) . "\n");
}
?>