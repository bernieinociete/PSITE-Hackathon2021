<?php  
	class GlobalMethods {
		protected $pdo;

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		// SELECT
		public function exec_query($table, $filter_data) {

			$this->sql = "SELECT * FROM tbl_$table";

			if($table == "user") {
				$this->sql .= " WHERE user_status = 1 AND user_role = 1";

				if($filter_data != null) {
					$this->sql .= " AND user_id=$filter_data";
				}
			}

			if($table == "category") {
				$this->sql .= " WHERE category_status=1";

				if($filter_data != null) {
					$this->sql .= " AND category_id=$filter_data";
				}
			}

			if($table == "subcategory") {
				$this->sql .= " LEFT JOIN tbl_category ON tbl_category.category_id = tbl_subcategory.category_id 
				WHERE tbl_subcategory.subcategory_status=1";

				if($filter_data != null) {
					$this->sql .= " AND tbl_subcategory.subcategory_id=$filter_data";
				}
			}

			if($table == "product") {
				$this->sql .= " LEFT JOIN tbl_user ON tbl_user.user_id = tbl_product.user_id 
					LEFT JOIN tbl_category ON tbl_category.category_id = tbl_product.category_id
					LEFT JOIN tbl_subcategory ON tbl_subcategory.subcategory_id = tbl_product.subcategory_id
					WHERE tbl_product.product_status=1";

				if($filter_data != null) {
					$this->sql .= " AND tbl_product.product_id=$filter_data";
				}
			}

			if($table == "coupon") {
				if($filter_data != null) {
					$this->sql .= " WHERE coupon_id = $filter_data";
				}
			}

			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

		public function insert($table, $data){
			$i = 0; $fields=[]; $values=[];
			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try {
				$ctr = 0;
				$sqlstr="INSERT INTO $table (";
				foreach ($fields as $value) {
					$sqlstr.=$value; $ctr++;
					if($ctr<count($fields)) {
						$sqlstr.=", ";
					} 	
				} 
				$sqlstr.=") VALUES (".str_repeat("?, ", count($values)-1)."?)";

				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}

		public function update($table, $data, $conditionStringPassed){
			$fields=[]; $values=[];
			$setStr = "";
			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try{
				$ctr = 0;
				$sqlstr = "UPDATE $table SET ";
					foreach ($data as $key => $value) {
						$sqlstr .="$key=?"; $ctr++;
						if($ctr<count($fields)){
							$sqlstr.=", ";
						}
					}
					$sqlstr .= " WHERE ".$conditionStringPassed;
					$sql = $this->pdo->prepare($sqlstr);
					$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");	
			}
			catch(\PDOException $e){
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}

		public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'Bernie L. Inociete Jr., Developer',
				"timestamp"=>date_create());
		} 
	}
?>