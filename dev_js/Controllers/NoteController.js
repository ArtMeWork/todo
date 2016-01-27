define(['Models/Notes', 'Controllers/NotifyController', 'Views/NotesView'], function(Notes, Notify, View){

    var realUpdate;

	function start() {
		window.app = {
			delete: function(id) {
				var status = Notes.del(id);
                if (status.success) {
                    View.update([{name:'delete', val:{id:id, count:Notes.get().length}}]);
                    Notify.success("Заметка успешно удалена!");
                } else Notify.err(status.error ? status.error : "Нет сообщения");
			}
		};
		View.render(updateTime());

        realUpdate = setInterval(function(){
            View.update([{name:'time', val:updateTime()}]);
        }, 10000);
	}  

    function stop() {
        clearInterval(realUpdate);
    }

	function timeAgo(timeStr) {
        var 
        now = new Date(),
        utc = Date.parse(new Date(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes(),now.getUTCSeconds(),now.getUTCMilliseconds())+"GMT+0000"),
        note = new Date(now-(utc-timeStr)),
        period = Math.floor((utc-timeStr)/1000),
        time = 0,
        mas = [],
        month = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'],
        fullDate = note.getDate()+" "+month[note.getMonth()]+" "+note.getFullYear()+", в "+note.getHours()+":"+note.getMinutes();

        if(period<60) {
            time = period;
            mas = ['только что', 'секунд назад', 'секунду назад', 'секунды назад'];
            return {text:(time>=10?time:'') + ' ' + mas[time<10?0:(time>=10 && time<=20)?1:time%10==1?2:(time%10>1 && time%10<5)?3:1], date: fullDate};
        } else if(period>=60 && period<3600) {
            time = Math.floor(period/60);
            mas = ["минуту назад","две минуты назад","три минуты назад","минут назад","минуту назад","минуты назад"];
            return {text:(time>3 ? time : '') + ' ' + mas[time<4?time-1:(time>4 && time<=20)?3:time%10==1?4:(time%10>1 && time%10<5)?5:3], date: fullDate};
        } else if(period>=3600 && period<21600) {
            time = Math.floor(period/60/60);
            mas = ['час назад', 'два часа назад', 'три часа назад', 'часа назад', 'часов назад'];
            return {text:(time>3 ? time : '') + ' ' + mas[time<4?time-1:(time>4 && time<=20)?4:time%10==1?0:(time%10>1 && time%10<5)?3:4], date: fullDate};
        } else if(period>2160 && now.getDate()-note.getDate()===0)
        	return {text:"сегодня в " + note.getHours()+":"+note.getMinutes(), date: fullDate};
        else if(now.getDate()-note.getDate()===1)
            return {text:"вчера в " + note.getHours()+":"+note.getMinutes(), date: fullDate};
        else return fullDate;
    }

	function updateTime() {
		Notes.get().forEach(function(e){
			e.up_time = timeAgo(e.date);
		});
        return Notes.get();
	}

	return {
		start: start,
        stop: stop
	}
});