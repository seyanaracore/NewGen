const URL = "https://examples.com/api/user/authernticate?"; //вынос в константы
const SUCCESSFUL_STATUS = 200; //вынос в константы

class UserService {
   //Убрали бесполезный код, для сервиса не требуется экземляр и соответсвенно поля username, password и их геттеры
   static authenticate_user(username, password, callback) {
      const xhr = new XMLHttpRequest();

      xhr.responseType = "json";
      xhr.open("GET", `${URL}username=${username}&password=${password}`, true); //Для читабельности используем шаблонную строку

      xhr.onload = function () {
         xhr.status === SUCCESSFUL_STATUS
            ? callback(true)
            : callback(new Error(xhr.status));
      };
      xhr.onerror = function () { //Также обрабатываем ошибку и возвращаем её
         callback(new Error("Unable to connect"));
      };

      xhr.send(); //Отправляем запрос
   }
	get password() {
		throw "You are not allowed to get password";
}

	static authenticate_user() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://examples.com/api/user/authernticate?username=' +
		 	 UserService.username + "&password=" + UserService.password, true);
		xhr.responseType = "json";

		const result = false;

		xhr.onload = function() {
			if(xhr.status !== '200') {
				result = xhr.response;
			} else {
				result = true;
			}
		}

		return result
	}
}

$('form #login').click(function(){
	var username = $("#username");
	var password = $("#password");

	var res = UserService(username, password).authenticate_user();

	if(res == true) {
		document.location.href = "/home";
	} else {
		alert(res.error);
	}
})