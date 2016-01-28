define([],
	function(){

		var Dmessage = {
			success: "Действие успешно выполнено!",
			error: "Ошибка. Повторите действие еще раз."
		},
		top = 0, count = 0;

		function _show(type, message, time) {
			time = time ? time : 3000;
			var dom = document.createElement('div');
			count++;
			dom.className += 'notify '+type;
			dom.innerText = message;
			document.getElementById('app').appendChild(dom);
			if (count === 1) top = 0;
			setTimeout(function(){
				dom.style.top = top + 'px';
				dom.style.opacity = 1;
				dom.style.left = '0px';
				top += 10 + dom.offsetHeight;
			}, 10);
			setTimeout(function(){
				count--;
				try { document.getElementById('app').removeChild(dom)}
				catch(err) {dom = undefined}
			},time);
		}

		function success(message, time) {
			message = message ? message : Dmessage.success;
			_show('success', message, time);
		}

		function err(message, time) {
			message = message ? message : Dmessage.error;
			_show('error', message, time);
		}

		function inf(message, time) {
			message = message ? message : Dmessage.info;
			_show('info', message, time);
		}

		return {
			success: success,
			err: err,
			inf: inf
		}
	});