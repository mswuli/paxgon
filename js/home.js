var viewPage = null;

(function(){
	viewPage = new (function(){
		var it = null;
		var menu = null;
		this.init = function(){
			it = $("<div id='viewPage'></div>")
			.append("<div class='close' title='Close'></div><div class='content'></div>")
			.appendTo(".main");
			it.find(".close").bind("click", this.close);
			
			menu = $("#centerMenu")
			var pattern = /^resource\/what\/clients\/[a-zA-Z]*\/video.jpg$/;
			var srcs = "";

			$("#viewPage").on("mouseover", "ul.imglist img", function(){
				var src = $(this).attr("src");
				if(pattern.test(src)){
					srcs = src.split('.');
					$("#viewPage div.view").find("#video").remove();
					$("#viewPage div.view").css({"background-image":""});
					$("<video id='video' controls='controls' width='800' height='530' autoplay='true'> <source src='"+srcs[0]+".mp4' type='video/mp4' /><object><embed width='800' height='530' src='"+srcs[0]+".swf'></embed></object></video>")
					.appendTo("#viewPage div.view");
				}else{
					$("#viewPage div.view").find("#video").remove();
					$("#viewPage div.view").css({"background-image":"url(" + src + ")"});
				}
			});
			//$("#viewPage").on("click",".imglist img",function(){alert(1);});
			
		};
		
		this.open = function(url){
			it.find(".content").load(url, null, function(){
				it.addClass("on");
				menu.addClass("on disabled");
			});
		};
		/*this.open =function(){
			it.find(".content").load("content__.html", null, function(){
				it.addClass("on");
				menu.addClass("on disabled");
			});
		}*/
		
		this.close = function(){
			it.removeClass("on");
			menu.removeClass("on disabled");
			$("#viewPage div.view").find("#video").remove();
		};
	})();
})();

$(document).ready(function(){
	initSomeUi();
	initMenu();
});

function initMenu(){
	$("ul.menu li").click(function(){
		var selected = $(this).hasClass("selected");
		if(selected) return;
		
		var ul = $(this).parent("ul");
		
		if(this == ul.find("li:last")[0]) return ;
		
		ul.find("li.selected").removeClass("selected");
		$(this).addClass("selected");
		var tag = $(this).text().toLocaleLowerCase();
		
		$("#content-left").load("resource/" + tag + "/left.html");
		//$("#content-right").load("resource/" + tag + "/right.html");
		
		$("#content-right").load("resource/" + tag + "/right.html",
			function(){		
				setTimeout(function(){
					$('#'+tag+'-right').addClass("ani");
				},50);
			});
		
		
		if(this ==$("ul.menu li")[0]){
			
			setTimeout(function(){
				
				if($('#slideshow')[0] == null){
					return;
				}
				
				$('#slideshow').cycle({
				//    fx:     'fade',
				//    speed:  'slow',
					timeout: 2000,
				});
				
			},500);
		}
		
			
	}).eq(0).trigger("click");
}

function initSomeUi(){
	
	viewPage.init();
}