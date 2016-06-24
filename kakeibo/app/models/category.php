<?php
class Category extends AppModel {
	//var $name = 'Sales';
	var $name = 'Category';
	//var $useTable = 'sales';
	//var $displayField = 'shop_title';
	
	//add edit時のバリデーション
	//var $validate = array(
	//	'process' => array(
	//		'notempty' => array(
	//			'rule' => array('notempty'),
	//			'message' => 'プロセスを選択してください。',
	//			'allowEmpty' => false,
	//			'required' => true,
	//			//'last' => false, // Stop validation after this rule
	//			//'on' => 'create', // Limit validation to 'create' or 'update' operations
	//		),
	//	)
	//);
	//var $checkboxes = array("join_campaign");
	//function beforeSave(){
	//	foreach ($this->checkboxes as $field) {
	//		if (!array_key_exists($field, $this->data[$this->name])) {
	//			continue;
	//		}
	//		$result = "";
	//		if(is_array($this->data[$this->name][$field])){
	//			foreach ($this->data[$this->name][$field] as $key => $value) {
	//				if ($result == "") {
	//					$result = $value;
	//				} else {
	//					$result .= "|" . $value;
	//				}
	//			}
	//		}
	//	$this->data[$this->name][$field] = $result;
	//	}
	//	
	//	return true;
	//}

//    function afterFind($results, $primary = false) {
//        for ($i = 0; $i < count($results); $i++) {
//            foreach ($this->checkboxes as $field) {
//                if (!array_key_exists($field, $results[$i][$this->name])) {
//                    continue;
//                }
//                $a = explode("|", $results[$i][$this->name][$field]);
//                $results[$i][$this->name][$field] = $a;
//            }
//        }
//        return $results;
//    }
//
	

}
?>