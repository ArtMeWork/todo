define(function(){
     
    var routes = [{hash:'#notes', controller:'NoteController', title: 'TODO: Все заметки'},
                  {hash:'#add',  controller:'AddController', title: 'TODO: Создать заметку'}];
    var defaultRoute = '#add';
    var currentHash = '';
    var currentController = null;
     
    function startRouting(){
        window.location.hash = window.location.hash || defaultRoute;
        setInterval(hashCheck, 100);
    }
     
    function hashCheck(){
        var _404 = true;
        if (window.location.hash != currentHash){
            for (var i = 0, currentRoute; currentRoute = routes[i]; i++){
                if (window.location.hash == currentRoute.hash) {
                    if(currentController!=null) closeController(routes[currentController].controller);
                    currentController=i;
                    document.title = routes[i].title;
                    loadController(currentRoute.controller);
                    _404 = false;
                }
            }
            if (_404) {
                window.location.hash = defaultRoute;
                hashCheck();
            }
            currentHash = window.location.hash;
        }
    }

    function closeController(controllerName) {
        require(['Controllers/' + controllerName], function(controller){
            if(controller.stop !== undefined) controller.stop();
        });
    }
     
    function loadController(controllerName){
        require(['Controllers/' + controllerName], function(controller){
            controller.start();
        });
    }
     
    return {
        startRouting:startRouting
    };
});