define([],function(){function e(e){var t='<section id="all-notes">   <header id="notes-title">'+(e.length?'        <h1>Все заметки (<span id="notes-count">'+e.length+"</span>):</h1>":"        <h3>Вы ничего не написали.</h3>")+"    </header>";for(var n=e.length;n--;)t+='<div class="note" id="note'+e[n].id+'">'+'    <p class="text">'+e[n].name+"</p>"+'    <div class="time'+(typeof e[n].up_time!="object"?"":" tooltip")+'" id="time'+e[n].id+'" tooltip="'+e[n].up_time.date+'">'+e[n].up_time.text+"</div>"+'    <button class="delete" onclick="app.delete('+e[n].id+')">&times;</button>'+"</div>";t+="</section>",document.getElementById("app").innerHTML=t}function t(e){e.forEach(function(e){document.getElementById("time"+e.id).innerText=e.up_time.text})}function n(e){var t=document.getElementById("note"+e.id);document.getElementById("notes-count").innerText=e.count,e.count===0&&(document.getElementById("notes-title").innerHTML="<h3>Вы ничего не написали.</h3>"),t.style.opacity=0,setTimeout(function(){t.parentElement.removeChild(t)},300)}function r(e){var r="no status";return e.forEach(function(e){switch(e.name){case"time":r=t(e.val);break;case"delete":r=n(e.val)}}),r}return{render:e,update:r}});