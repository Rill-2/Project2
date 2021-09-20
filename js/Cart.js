// JavaScript Document

"use strict";

//querySelectorAll - много элементов,список их
//querySelector - один определенный

//Коллекция кнопок "добавить в корзину"
const ProductBut = document.querySelectorAll('.Product_but');
//Список элементов, которые будут добавляться в номер корзины
//по количеству il в ul будет определять
const Cartproductslist = document.querySelector('.Cart_content_list');
//Селектор самой корзины для свечения	
const cart = document.querySelector('.Cart');	
//Номер для добавления количества товара, что в корзине
const Cartquantiy = cart.querySelector('.Cart_quantiy');
//Еще берем селектор, в который будем грузить итоговую цену
const Fullprice = document.querySelector('.fullprice');
//Итоговое число, что будет добавляться в fullprice
let price = 0;

//Для кнопки ЗАКАЗАТЬ
const Orderbutton = document.querySelector('.orderbutton');
const CartContent = document.querySelector('.Cart_Content');
const OrderModal  = document.querySelector('.Order_modal');

//Кнопка для открытия списка товаров в окне ЗАКАЗАТЬ
const OrderModalOpen = document.querySelector('.Order_modal_open');
//И сам список дял вывода
const OrderModalList = document.querySelector('.Order_modal_list');


//В этот массив будет получать наши элементы,сформированные выше
let ProductArray = [];







//________________________ФУНКЦИИ________________________________

//Вспомогательные функции

//Функция, выдающая рандомный ID элементам(каждой карточке в разделах). 
//И благодаря айдишникам будет передавать блоки(товары) в КОРЗИНУ.
//В итоге при удалении мы сумеем связать добавленную карточку товара в корзине
//с такой же, что в разделе и будет нужное взаимодействие
const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

//Для перевода цены в нужный формат(в число) у ячейки товара:
//удаляет ненужные символы,
//чтоб оставались только числовые значения
const PriceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

//А ОНА делает противоположное: возвращает вид цены 
//такой же, как в разделах
//На выход получаем обычнео число без лишних символов
//и переводим в виде, что в разделах, и выводим
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

//Суммирование с переменной, что будет выводить итоговую цену
//Принимает текующую цену
const PlusFullPrice = (currentPrice) => {
	//Суммирование для вывода
	return price += currentPrice;
};

//Для удаления, чтобы вычитать, кргда удаляем товар
const MinusFullPrice = (currentPrice) => {
	//Суммирование для вывода
	return price -= currentPrice;
};

//Функция, которая будет получать число и выводить и считать все время
const PrintQuantiy = () => {
	//Считаем количество товара
	//Удобно для этого будет обратиться к переменной
	//Что находится рядом с нашими li - simplebar-content
	
	//Это будет число элементов внутри ul 
	let ProductsListLength  = Cartproductslist.querySelector('.simplebar-content').children.length;
	Cartquantiy.textContent = ProductsListLength ;
	//Если длина больше 0 - добавляем класс
	//Теперь корзина будет светиться, если есть какое-то количество товара
	//и номер рядом будет летать
	ProductsListLength  > 0 ? cart.classList.add('active') : cart.classList.remove('active');
	ProductsListLength  > 0 ? Cartquantiy.classList.add('active') : Cartquantiy.classList.remove('active');
	
	//Чтоб кнопка ЗАКАЗА стала активной
	ProductsListLength  > 0 ? Orderbutton.classList.add('active') : Orderbutton.classList.remove('active');
	//И горела при наведении
	ProductsListLength  > 0 ? Orderbutton.classList.add('orderbuttonAct') : Orderbutton.classList.remove('orderbuttonAct');
	//Чтоб срабатывала прозрачность только с товаром
	ProductsListLength  > 0 ? Orderbutton.disabled = false : Orderbutton.disabled = true;
	
	
};
//Эта функция будет вызываться в удалении и добавлении и она будет смотреть 
//сколько элементов внутри  и сама удалять или добавлять


//Для вывода нужной цены в блок Итого
const PrintFullPrice = () => {
	//Чтоб поместить в fullprice,что является
	//нормальным числом,нужно полученное
	//превратить в такое
	//Потому и юзаем normalPrice
	Fullprice.textContent =`${normalPrice(price) } ₽`;
};


//Функция для возвращения разметки, что находится в корзине после добавления
//4 параметра

//Когда будем добавлять продукты - будем вызывать эту функцию с этими параметрами
//и получим нужный шаблон в корзину
const GenerateCardProduct = (img, title, price, id) => {
	//Возвращаем разметку html
	return `

	<li class="Cart_content_item">
				
					<article class="Cart_content_product Cart_product" data-id="${id}">
							
							<img src="${img}" alt="" class="Cart_product_img">
							<div class="Cart_product_text">		
									<h3 class="Cart_product_title">${title}</h3>
									<span class="Cart_product_price">${normalPrice(price)} ₽</span>
							</div>
							<button class="Cart_product_delete" aria-label = "Удалить"></button>
							
					</article>
				
	</li>

	`;
}
//Функция будет удалять не Article,а parent
const DeleteProducts = (ProductsParent) => {
	
	//Получаем нужный айди
	//Просчитаем цену(вычесть из итога)
	//Вывести итог нынешний
	//Удалить родителя Products
	//Подсчитать
	
	//Обратились к нужному li, нашли в li артикл c таким селектором
	//и забрали айди, что он уже имел
	let Id = ProductsParent.querySelector('.Cart_product').dataset.id;
	

	
	let currentPrice = parseInt(PriceWithoutSpaces(ProductsParent.querySelector('.Cart_product_price').textContent));
	
	MinusFullPrice(currentPrice);
	PrintFullPrice();
	ProductsParent.remove();
	PrintQuantiy();

};

//Обработчик клика
ProductBut.forEach(el => {
	//Для получения рандомного айдишника:
	//Находим элемент Продукты(что стоит у каждого
	//article нашего товара) или как еще можно
	//назвать - родителя
	el.closest('.Products').setAttribute('data-id', randomId());
	//После получения рандомного айди - обрабатываем КЛИК кнопки	
	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		//Находим текущий товар(что с Продукты) 
		//и забираем у него нужные вещи
		let parent = self.closest('.Products');
		//Получаем data-id
		let id = parent.dataset.id;
		//Получаем источник картинки
		let img = parent.querySelector('.Product_img').getAttribute('src');
		let title = parent.querySelector('.Product_title').textContent;
		//Получаем 2 цены, чтоб преобразовывать туда и обратно
		//(одна будет храниться и преобразовываться, а другая в виде числа
		//и будет суммироваться для ИТОГО)
		let PriceString = PriceWithoutSpaces(parent.querySelector('.ProductPrice').textContent);
		//Сначало убираем ненужные символы,а потом преобразовываем в число
		let PriceNumber = parseInt(PriceWithoutSpaces(parent.querySelector('.ProductPrice').textContent));
		//Теперь полученное число можно суммировать
		
		//Делаем действия:
		// summ - сумма,  print full price - вывести нужную цену
		//add to cart - добавить все в переменную
		// count and print quantity - посчитать
		
		PlusFullPrice(PriceNumber);
		PrintFullPrice();
		
		Cartproductslist.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', GenerateCardProduct(img, title, PriceNumber, id));
		
		//Вызываем обязательно ПОСЛЕ добавления товара
		PrintQuantiy();
		
		//5 действие
				
		
		
	});
});
	

//Тоже обрабатываем клик УДАЛЕНИЯ
		Cartproductslist.addEventListener  ('click', (e) => {
			//Если нажали на элемент с таким селектором - то 
			if(e.target.classList.contains('Cart_product_delete'))
				{	//В нее будем передавать элемент li,
					//что нужно будет удалить в списке корзины
					//И от кнопки текущей находим родителя - Cart_content_item
					//что стоит у li
					DeleteProducts(e.target.closest('.Cart_content_item'));
				}
			
			
		});
		

//Клик перехода в ЗАКАЗ
 $("#Hidd").click(function() {
	CartContent.classList.add('hid'); 
	OrderModal.classList.add('vis'); 	 
});


//ОТКРЫТИИЕ СПИСКА ТОВАРОВ
//Дополнительная переменная нам поможет контролировать
//просто этот процесс
let  Flag = 0;
OrderModalOpen.addEventListener('click', (e) => {
	//Когда нажимаем на кнопку - сразу проверяется
	//состояние флага и открывается список из-за 0
	if(Flag == 0){
		OrderModalOpen.classList.add('Open');
		OrderModalList.style.display = "block";
		Flag = 1;		
	}
	else{
		OrderModalOpen.classList.remove('Open');
		OrderModalList.style.display = "none";
		Flag = 0;		
	}
	
});


//Кликая на кнопку нужно просматривать товары из корзины и 
//доставать нужные данные и выводить по шаблону
//в функции
const GenerateModalProduct = (img, title, price, id) => {
	//Возвращаем разметку html
	return `

			<li class="Order_modal_item">
			<article class="Order_modal_product Order_product" data-id="${id}">
			<img src="${img}" class="Order_product_img "  alt="">
			<div class="Order_product_text">
			<h3 class="Order_product_title">${title}</h3>
			<span class="Order_product_price">${normalPrice(price)}</span>
			</div>								  	
			</article>
			</li>

	`;
}


//Для обращения к количеству
let CartContentItem = document.querySelectorAll('item .Cart_content_item');

//Как раз кнопка ЗАКАЗАТЬ
//ЗАКАЗАТЬ
//ЗАКАЗАТЬ
document.querySelector('.orderbutton').addEventListener('click', () => {
	
	
	//Создаем массив, в который помещаем количество элементом из корзины
	let Array = Cartproductslist.querySelector('.simplebar-content').children;
	
	//Итог цена
	let FullPrice = Fullprice.textContent;
	//КОличество(шт)
	let Length = Array.length;	
	//Для вывода правильной инфы 
	document.querySelector('.Order_modal_quantity span').textContent = `${Length} шт`;
	document.querySelector('.Order_modal_sum  span').textContent = `${FullPrice}`;
	
	
	for (CartContentItem of Array){

		
		let img = CartContentItem.querySelector(".Cart_product_img").getAttribute('src');
		let title = CartContentItem.querySelector(".Cart_product_title").textContent;
		let PriceString = PriceWithoutSpaces(CartContentItem.querySelector('.Cart_product_price').textContent);
		let id = CartContentItem.querySelector(".Cart_product_price").dataset.id;
		
		//И получаем из данных по одному товару
		OrderModalList.insertAdjacentHTML('afterbegin', GenerateModalProduct(img, title, PriceString, id));
		
		
		//Запихиваем определенные данные в наш массив для отправки данных
		let obj = {};
		obj.title = title;
		obj.price = PriceString;
		ProductArray.push(obj);
		
	}
	
	console.log(ProductArray)

});

//Делаем простую отправку
document.querySelector('.Order_form').addEventListener('sumbit', (e) => {
	e.preventDefault(); 
	//В этой переменной будет храниться this, то есть она указывает
	//на нашу форму
	let self = e.currentTarget;
	//Где будут хранится для отправки  товары
	//И обязательно указываем селектор формы
	//(объект куда попад все дан из формы)
	let formData = new FormData(self);
	
	//Данные с формы
	let Name = self.querySelector('[name="Имя"]').value;
	let Tel = self.querySelector('[name="Телефон"]').value;
	let Addr = self.querySelector('[name="Адрес"]').value;
	let Pay = self.querySelector('[name="Способ оплаты"]').value;
	let Com = self.querySelector('[name="Комментарий"]').value;
	
	//append принимает строку и она будет формироваться
	//за счет нашего массива
	//Для этого превратим в json формат для ОТПРАВКИ
	formData.append('Еда', JSON.stringify(ProductArray));	
	formData.append('Имя', name);
	formData.append('Телефон', Tel);
	formData.append('Адрес', Addr);
	formData.append('Способ оплаты', Pay);
	formData.append('Комментарий', Com);
	
	
	//Делаем запрос. аналог AJAX
	let xhr = new XMLHttpRequest();
	
	//Открытие xhr
	xhr.open('POST', 'mail.php', true);
	xhr.send(formData);
	
	//После отправки ПРОВЕРКА
	//readyState === 4 - запрос завершен
	//Если статус не 200, то произошла ошибка
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState === 4) {
    		if(xhr.status === 200)
			{
				console.log('Отправлено!');
				alert("Ваш заказ принят! Ожидайте звонка");
			}
  
	}
			
	}
	
	//Сброс формы
	self.reset();
	
	//И убираем 
	CartContent.classList.remove('hid'); 
	OrderModal.classList.remove('vis'); 
	$("#BASKET").hide();
});





