define(function(){

	var notes = localStorage.getItem('Notes');
	
	try { 
		notes = JSON.parse(notes);
		if (!notes) notes = [];
	}	catch(err) { 
		notes = [];
	}

	function getNotes() {
		return notes;
	}

	function addNote(name) {
		var _new = new create(name);
		notes.push(_new);
		var _status = updateStorage();
		return _status;
	}

	function create(name) {
		this.id = (function(){
			var _max = 0;
			if(notes.length) {
				notes.forEach(function(val, i){
					_max = val.id > _max ? val.id : _max;
				});
				return _max+1;
			} else return 0;
		})();
		this.name = name;
		var _now = new Date();
		var _utc = new Date(Date.UTC(_now.getFullYear(),_now.getMonth(),_now.getDate(),_now.getHours(),_now.getMinutes(),_now.getSeconds(),_now.getMilliseconds()));
		_utc.setUTCHours(_utc.getUTCHours() + _utc.getTimezoneOffset()/60);
		this.date = _utc.getTime();
	}

	function updateStorage() {
		try {
			localStorage.setItem('Notes', JSON.stringify(notes));
		} catch(err) {
			return {success:false, error: err};
		}
		return {success:true};
	}

	function deleteNote(id) {
		var _status;
		notes.forEach(function(e,i){
			if(e.id==id) {
				try {
					notes.splice(i,1);
					_status = updateStorage();
				} catch(err) {
					_status = {success:false, error: err};
				}
			}
		});
		if(_status===undefined) _status = {success:false, error: "Заметка с таким id не найдена"};
		return _status;
	}

	return {
		get: getNotes,
		add: addNote,
		del: deleteNote,
	}

});
