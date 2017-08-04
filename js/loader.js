(function(){
	var counter = 0;
	var progress = $(".progress");
	var a_enter = $("a.enter");
	
	var loadComplete = function(){
		a_enter.click(function(){
			$("body").load("home.html");
		});
		
		setTimeout(function(){
			$("body").load("home.html");
		}, 500);
	};
	
	var loadNext = function(){
		var per = counter / resource.length * 100;
		progress.css({"width": per + "%"});
	
		if(counter == resource.length) return loadComplete();
	
		var url = resource[counter];
		counter++;
		
		if(/.png|.jpg/.test(url)){
			var img = new Image();
			img.addEventListener("load", function(){
				console.info(url);
				loadNext();
			});
			img.src = url;
		}else{
			$.get(url,null, loadNext);
		}
	};

	loadNext();	
})();