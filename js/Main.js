//// JavaScript Document

//https://learn.javascript.ru/callbacks

 "use strict"; //Включаю строгий режим для новых функций ES5


//ГЛАВНОЕ ДЛЯ SPA
 $("#SLID").show();
 $("#SECT").show();
 $("#FOR").show();
 
 $("#BASKET").hide();
 $("#ABOUT").hide();
 $("#EAT1").hide();
 $("#EAT2").hide();
 $("#EAT3").hide();


function CallAbout(){
	
		  $("#ABOUT").show();
	
	jQ_hider1();
}

function CallEat1(){
	
		  $("#EAT1").show();
	
	jQ_hider1();
}
	

function CallEat2(){
	
		  $("#EAT2").show();
	
	jQ_hider1();
}

function CallEat3(){
	

		  $("#EAT3").show();
	
	jQ_hider1();
}

 const Over = document.querySelector('.over');

function CallBasket(){

  		 
		  $("#BASKET").show();
		
}

function jQ_hider1() {
 // call a jQuery function:
  $("#SLID").hide();
  $("#SECT").hide();
  $("#FOR").hide();
};

function CallAboutBack(){
  $("#ABOUT").hide();
  $("#SLID").show();
  $("#SECT").show();
  $("#FOR").show();
};

function CallAboutBack2(){
  $("#EAT1").hide();
  $("#SLID").show();
  $("#SECT").show();
  $("#FOR").show();
};

function CallAboutBack3(){
  $("#EAT3").hide();
  $("#SLID").show();
  $("#SECT").show();
  $("#FOR").show();
};

function CallAboutBack4(){
  $("#EAT2").hide();
  $("#SLID").show();
  $("#SECT").show();
  $("#FOR").show();
};

function CallAboutBack5(){
  $("#BASKET").hide();
  $("#SLID").show();
  $("#SECT").show();
  $("#FOR").show();
};



//https://webcomplex.com.ua/jquery/plavnyj-skroll-posle-nazhatiya-na-yakornuyu-ssylku.html

//https://basicweb.ru/jquery/jquery_effect_animate.php


//Изменяем скролл для якорей 
$(document).ready(function(){
	$("#fix").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//И делаем СВОЮ
		//забираем идентификатор блока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top - 100;
		
		//анимируем переход к top и вид анимации
		$('body,html').animate({scrollTop: top}, 100, 'swing');
	});
});


var image = document.getElementById("image");
image.src="img/Music_off.svg";

document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("MyBut").click();
});

function ChangeM(){   

var image = document.getElementById("image");
var myaudio = document.getElementById("myaudio");   
      if(myaudio.paused == true){
        myaudio.play()
        image.src="img/Music_on.svg"
      }else if (myaudio.paused == false){
       myaudio.pause()
        image.src="img/Music_off.svg"
      }
}





//ДЛЯ ВРЕМЕНИ ЛОАДЕРА И ПЕРЕКЛЮЧЕНИЯ МЕЖДУ DIV'АМИ ДЛЯ ОТОБРАЖЕНИЯ
var myVar;
function FynctionLoad() {
    myVar = setTimeout(showPage, 1500);
}

function showPage() {
  document.getElementById("Loader").style.display = "none";
  document.getElementById("wrapper").style.display = "block";
}

//Чтобы скрипт не отрабатывал до того, как становится доступен слайдер на странице
//document.addEventListener('DOMContentLoaded', function () {
//    });




//https://www.internet-technologies.ru/articles/sozdaem-prostoe-javascript-slayd-shou-bez-ispolzovaniya-jquery.html
//SLIDER 
//querySelectorAll для получения слайдов из wrapper
var Slider_wrapper = document.querySelectorAll('#Slider_wrapper .Slider_item');
//Переменная, отслеживающая текущий слайдер
var currentSlider_item = 0;
//Переменная, которйо присваиваем интервал времени, через который выводим слайд
//после чего для выполения этого действия - отсылаемся к функции, где это будет выполн
var slideInterval = setInterval(NextSlide,6000);

//Мы изменяем классы слайдов, тем самым скрываем нынешнйи слайд и показываем следующий
function NextSlide() {
	//Изменяется класс слайдера, чтоб он исчез из галереи за счет анимации,
	//что описана в стилях(transition)
	//То есть вместо Slider_wrapper получаем за счет className - Slider_item
    Slider_wrapper[currentSlider_item].className = 'Slider_item';
	//Получаем номер слайда. Так же оператор % позволяет вернуться обратно
	//к началу, когда достигнут последний слайд
    currentSlider_item = (currentSlider_item+1)%Slider_wrapper.length;
	//Получив номер слайда - за счет стилей делаем, чтоб он один и отображался
    Slider_wrapper[currentSlider_item].className = 'Slider_item Showing';
}




//ФОРМА с проверкой на загрузку документа
//document.addEventListener('DOMContentLoaded', function(){
document.onreadystatechange = function(){
	//Перехват формы отправки после нажатия кнопки
	const form = document.getElementById('form');
	const Over = document.querySelector('.over');
	//Вешаю событие submit на эту переменную
	//и как отправив форму - переходим к formSend
	form.addEventListener('submit', formSend);
	async function formSend(Er)
	{
		//Запрет стандартной отправки(без заполнения)
		Er.preventDefault(); 
		//Теперь пропишем в js - что ДОЛЖНО выполняться
		//после отправки
		
		//ВАЛИДАЦИЯ
		let Error = formValidate(form);
		
		//Получаем все данные заполненных полей
		let formData = new FormData(form);
		
		//За счет AJAX(fetch) будем делать отправку данных
		if(Error === 0){
			//Как стало ясно, что ошибок нет - добавляем к форме
			//класс _sending и СООБЩАЕМ ПОЛЬЗОВАТЕЛЮ ОБ 			
			form.classList.add('_sending');
			Over.classList.add('act');
			
			//В переменную response помещаем ожидание выполнения
			//ОТПРАВКИ в файл php методом POST и данных formData
			
			let Response = await fetch('sendmail.php',{
				method: 'POST',
				body: formData				  
			});
			
			//Проверка на успешность отправки данных
			//sendmail будет возвращать JSON-ответ
			//и в случае успеха - будем получать то,
			//что в if
			if(Response.ok){
				let Result = await Response.json();
				alert(Result.Message);
				//После отправки формы - чистим ее
				form.reset();
				//Убираем высвечивание загрузки
				form.classList.remove('_sending');
				Over.classList.remove('act');
			}
			else{
				alert("Ошибка");
				//Просто убираем этот класс в случае
				//ошибки, чтоб загрузка не вылезла
				form.classList.remove('_sending');
				Over.classList.remove('act');
			}
			
		//Если Error не равно нулю - что выводить
		
		
	}
		else{
			alert('Заполнить обязательные поля!');
		}
}
		
		function formValidate(form){
			let Error = 0;
			//Класс req испольузем для проверки полей и добавл в html
			let formReq = document.querySelectorAll('._Req');
			//Создаем цикл, чтобы бегать по объектам, которым задали
			//класс req для проверки
			for (let index = 0; index < formReq.length; index++){
				//Объект input помещается в константу input
				const input = formReq[index];
				//Изначально перед проверкой убираем класс Error
				formRemoveError(input);
				
				//Сама проверка
				//У каждого поля будет своя проверка и потому у всех разные классы
				if(input.classList.contains('_Email')){
					//Если тест не пройден
					if (EmailTest(input)){
						formAddError(input);
						//Увеличиваем error на единицу
						Error++;
					}
				}
				//Наличие проверки checkbox
				//Проверка, что чекбокс и если бокс не включен
				else if (input.getAttribute("type") === "checkbox" && input.checked === false){
					//И вешаем на класс и его родителя ошибку
					
					formAddError(input);
					Error++;
						 
				 }
				else {
					//Если поле пустое, то
					if(input.value === ''){
						formAddError(input);
						Error++;
					}
				}
			}
			//Возвращаем значение, чтоб правильно работало
			return Error;
		}
		
		//1 Функция для добавления объекту класса Error
		// и родительскому тоже(чтоб вместе горели красным)
		//2 функция наоборот УБИРАЕТ этот класс
		function formAddError(input){
			input.parentElement.classList.add('_Error');
			input.classList.add('_Error');
		}
		function formRemoveError(input){
			input.parentElement.classList.remove('_Error');
			input.classList.remove('_Error');
		}
		//Тест email
		function EmailTest(input){
			return !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value);
		}
		
		
	}