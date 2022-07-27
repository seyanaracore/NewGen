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
}

const formHandler = (e) => {
   e.preventDefault(); //Из селектора можно понять, что кнопка логин находится в форме, необходимо отменить обновление страницы
   const username = $("#username").val(); //Предполагается, что это инпуты, необходимо получить значение
   const password = $("#password").val(); //Предполагается, что это инпуты, необходимо получить значение

   if (!username.length || !password.length) return; //Если один из инпутов пуст, то прекратить выполнение

   const responseHandler = (response) => { //Обработчик ответа запроса
      if (response === true) {
         document.location.href = "/home";
      } else {
         alert(response.message); //В негативном случае ожидается объект ошибки со свойством message
      }
   };

   UserService.authenticate_user(username, password, responseHandler); //Передаём обработчик ответа
};

$("form #login").click(formHandler); //Вынос обработчика в отдельную функцию и её назначение на событие клика
