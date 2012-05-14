//News cycle jquery plugin

jQuery.fn.jqnewscycle = function(options){
    // default plugin settings
    settings = jQuery.extend({
        containerDiv: 				'#service-alerts',		// any HTML tag or #id, default to #service-alerts (please do not use a class)
        issuesDiv: 					'#service-alert-list',	// any HTML tag or #id, default to #issues (please do not use a class)
        issuesSelectedClass: 		'selected',			    // any class, default to selected
        issuesSpeed: 				500,				    // integer between 100 and 1000 (recommended), default to 500 (the lower the number, the faster the transition)
        issuesTransparency: 		1,				        // integer between 0 and 1 (recommended), default to 1 (the lower the number, the more transparent the text will be)
        issuesTransparencySpeed: 	500,				    // integer between 100 and 1000 (recommended), default to 500 (the lower the number, the faster the transition between opacity settings)
        prevButton: 				'#prev',			    // any HTML tag or #id, default to #prev (please do not use a class)
        nextButton: 				'#next',			    // any HTML tag or #id, default to #next (please do not use a class)
        startAt: 					1,					    // value: integer, default to 1 (first)
        autoPlay: 					'true',			        // value: true | false, default to false
        autoPlayDirection: 			'forward',			    // value: forward | backward, default to forward
        autoPlayPause: 				9000				    // value: integer (1000 = 1 second), default to 9000 (9 seconds)

    }, options);

    $(function(){
        // setting variables... many of them
        var howManyIssues = $(settings.issuesDiv+' li').length;
        var currentIssue = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass);
        var widthContainer = $(settings.containerDiv).width();
        var heightContainer = $(settings.containerDiv).height();
        var widthIssues = $(settings.issuesDiv).width();
        var heightIssues = $(settings.issuesDiv).height();
        var widthIssue = $(settings.issuesDiv+' li').width();
        var heightIssue = $(settings.issuesDiv+' li').height();

        var id = null;

        // set positions!
        $(settings.issuesDiv).width(widthIssue*howManyIssues);

        //Call autoplay handler
        if(settings.autoPlay == 'true') {
            id = intervalTrigger();
        }

        $(settings.nextButton).bind('click', function(event){
            event.preventDefault();
            var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
            var currentIssueIndex = currentPositionIssues/widthIssue;
            if(currentPositionIssues <= -(widthIssue*howManyIssues-(widthIssue))) {
                $(settings.issuesDiv).animate({'marginLeft':0},{queue:false, duration:settings.issuesSpeed});
            } else {
                if (!$(settings.issuesDiv).is(':animated')) {
                    $(settings.issuesDiv).animate({'marginLeft':currentPositionIssues-widthIssue},{queue:false, duration:settings.issuesSpeed});
                    $(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
                    $(settings.issuesDiv+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).next().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
                }
            }
            //Reset autoplay handler
            if(settings.autoPlay == 'true') {
                window.clearInterval(id);
                id = intervalTrigger();
            }
        });

        $(settings.prevButton).click(function(event){
            event.preventDefault();
            var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
            var currentIssueIndex = currentPositionIssues/widthIssue;
            if(currentPositionIssues >= 0) {
                $(settings.issuesDiv).animate({'marginLeft':-(widthIssue*howManyIssues-(widthIssue))},{queue:false, duration:settings.issuesSpeed});
            } else {
                if (!$(settings.issuesDiv).is(':animated')) {
                    $(settings.issuesDiv).animate({'marginLeft':currentPositionIssues+widthIssue},{queue:false, duration:settings.issuesSpeed});
                    $(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed});
                    $(settings.issuesDiv+' li.'+settings.issuesSelectedClass).removeClass(settings.issuesSelectedClass).prev().fadeTo(settings.issuesTransparencySpeed, 1).addClass(settings.issuesSelectedClass);
                }
            }
            //Reset autoplay handler
            if(settings.autoPlay == 'true') {
                window.clearInterval(id);
                id = intervalTrigger();
            }
        });
    });
};

function autoPlay(){
    //test if we are on the final li elem
    var issuesDiv = settings.issuesDiv;
    if($(issuesDiv).css("marginLeft") === (-($(issuesDiv).width()-$(issuesDiv+'>li').width()))+"px") {
        $(settings.issuesDiv).animate({'marginLeft':0},{queue:false, duration:settings.issuesSpeed});
    } else {
        $("#next").trigger('click');
    }
}

function intervalTrigger() {
    return window.setInterval("autoPlay()", settings.autoPlayPause);
}

//End News cycle jquery plugin
