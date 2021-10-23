<?php 
	require_once("./config/Config.php");
	require_once("./models/OTP.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$auth = new Auth($pdo);
	$post = new Post($pdo);
	$get = new Get($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim(($_REQUEST['request']), '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch($req[0]) {
				// USERS
				case 'user':
					if(count($req)>1){
						echo json_encode($get->user($req[1]));
					} else {
						echo json_encode($get->user(null));
					}
				break;
				// USERS

				case 'add':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->insert('tbl_', $d));
				break;

				case 'update':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_", $d, "_id=$req[1]"));
				break;
				// CATEGORIES 

				case 'checkEmail':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->checkEmail($d));
				break;

				case 'checkUsername':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->checkUsername($d));
				break;

				case 'verifyEmail':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->verifyEmail($d));
				break;

				case 'login':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->login($d));
				break;

				case 'register':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->register($d));
				break;

				case 'sendOTP':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo sendOTP($d);
				break;

				case 'getOTP':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->getOTP($d));
				break;

				case 'updateProfile':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("accounts", $d, "acc_id = $req[1]"));
				break;

				case 'updatePassword':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->updatePassword($d, "acc_id = $req[1]"));
				break;

				default:
					http_response_code(400);
					echo "Invalid Route";
				break;
			}
		break;

		case 'GET':
			switch ($req[0]) {
				default:
				http_response_code(400);
				echo "Bad Request";
				break;
			}
			break;

		default:
			http_response_code(403);
			echo "Please contact the Systems Administrator";
		break;
	}
?>