<?php 
	require_once("./config/Config.php");

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

				// SHIP SPEED
				case 'ship_speed':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;
				// SHIP SPEED

				// SHIP
				case 'ship':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;
				
				case 'addShip':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->insert('tbl_ship', $d));
				break;

				case 'updateShip':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_ship", $d, "ship_id=$req[1]"));
				break;
				// SHIP

				// CREW
				case 'crew':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;

				case 'addCrew':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->insert('tbl_crew', $d));
				break;

				case 'updateCrew':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_crew", $d, "crew_id=$req[1]"));
				break;
				// CREW

				// RANK
				case 'rank':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;
				// RANK

				case 'login':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->login($d));
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