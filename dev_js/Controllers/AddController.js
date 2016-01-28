define(['Models/Notes', 'Controllers/NotifyController', 'Views/AddView'], function(Notes, Notify, View){

	function validate(text) {
		if (text.length <= 250 && text.length > 0) return true; else throw 'Заметка не должна быть пустой или более 250 символов';
	}

	function convertHtmlToText(oldText) {
		var text = "" + oldText;
    text=text.replace(/\&/gi,"&amp;");
    text=text.replace(/\"/gi,'&quot;');
    text=text.replace(/\</gi,'&lt;');
    text=text.replace(/\>/gi,'&gt;');
    return text;
	}

	function start() {
		View.render();
		document.formAdd.onsubmit = function(){
			var _text = convertHtmlToText(document.getElementById('newNoteName').value),
				_status = {success:false};
				try {
					if (validate(_text))
						_status = Notes.add(_text);
					if (_status.success) {
						Notify.success('Новая заметка успешно добавлена!');
						document.getElementById('newNoteName').value = '';
					} else Notify.err(_status.error);
				} catch(err) {
					Notify.err(err);
				}
				/*setTimeout(function(){
					console.log('do');
				},3000);*/
				return false;
		}
	}

	return {
		start: start
	}
});