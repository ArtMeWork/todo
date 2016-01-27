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
		this.date = Date.parse(new Date(_now.getUTCFullYear(),_now.getUTCMonth(),_now.getUTCDate(),_now.getUTCHours(),_now.getUTCMinutes(),_now.getUTCSeconds(),_now.getUTCMilliseconds())+"GMT+0000");
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
