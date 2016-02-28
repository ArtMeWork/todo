define(function(){ 

    function render(notes) {
        var html = 
            '<section id="all-notes">'+
            '   <header id="notes-title">'+
            (notes.length ?
            '        <h1>Все заметки (<span id="notes-count">'+notes.length+'</span>):</h1>' :
            '        <h3>Вы ничего не написали.</h3>')+
            '    </header>';
            for (var i = notes.length; i--;) {
                html += 
                '<div class="note" id="note'+notes[i].id+'">'+
                '    <p class="text">'+notes[i].name+'</p>'+
                '    <div class="time tooltip" id="time'+notes[i].id+'" tooltip="'+notes[i].up_time.date+'">'+notes[i].up_time.text+'</div>'+
                '    <button class="delete" onclick="app.delete('+notes[i].id+')">&times;</button>'+
                '</div>';
            }
            html += '</section>';
        document.getElementById('app').innerHTML = html;
    }

    function updateTime(times) {
        times.forEach(function(e){
            document.getElementById('time'+e.id).innerText = e.up_time.text;
        });
    }

    function deleteNote(data) {
        var _elm = document.getElementById('note'+data.id);
        document.getElementById('notes-count').innerText = data.count;
        if (data.count===0)
            document.getElementById('notes-title').innerHTML = "<h3>Вы ничего не написали.</h3>";
        _elm.style.opacity = 0;
        setTimeout(function(){_elm.parentElement.removeChild(_elm);},300);
    }

    function update(states) {
        var _status = "no status";
        states.forEach(function(e){
            switch(e.name) {
                case 'time': _status = updateTime(e.val); break;
                case 'delete': _status = deleteNote(e.val); break;
            };
        });
        return _status;
    }

    return {
        render: render,
        update: update
    }
});