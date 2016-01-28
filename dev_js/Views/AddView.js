define(function(){
	function render() {
		var html = '<section id="addBox">'+
		'<form name="formAdd">'+
    '<input type="text" placeholder="Текст новой заметки" id="newNoteName" autofocus autocomplete="off" maxlength="250">'+
    '<button type="submit">Сохранить</button>'+
    '<a href="#notes" class="close">&times;</a>'+
  	'</form>'+
		'</section>';
		document.getElementById('app').innerHTML = html;
		document.getElementById('newNoteName').focus();
	}

	return {
		render: render
	}
});