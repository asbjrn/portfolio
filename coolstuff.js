$(document).ready(function(){ 
    toggleMenu();
    toggleSkills();
    toggleShowroom();
});

$(window).scroll(function(){ 
    window.requestAnimationFrame(scrollHandler);
    //scrollIntervalID = setInterval(animateStuff, 10);   
});

function toggleMenu(){ 
    $('#menu-btn').click(function(){    
        if($("#slideout").hasClass("isHidden")){
            $("#slideout").removeClass("isHidden");
            $("#slideout").addClass("isVisible");
            console.log("a");
        }
        else{
            $("#slideout").addClass("isHidden");
            $("#slideout").removeClass("isVisible");
              console.log("b");
        };
    });
}

function toggleSkills(){
    $(".chart-restrainer").click(function(){
        var thisName = $(this).attr('id');
        var isThisAlreadyClicked = $("#"+thisName+"-skills").hasClass('visible-skills');
        $(".skill").addClass("hidden-skills"); 
        $(".skill").removeClass("visible-skills");      
        if(isThisAlreadyClicked){
            $("#"+thisName+"-skills").addClass("hidden-skills");  
            $("#"+thisName+"-skills").removeClass("visible-skills");    
        }
        else{
            $("#"+thisName+"-skills").addClass("visible-skills");  
            $("#"+thisName+"-skills").removeClass("hidden-skills");    
        }
    });
}

function toggleShowroom(){
    var scrollOffset;
    var sectionTopOffset;

    $(".case-overlay").click(function(){
        
        scrollOffset = $("body").scrollTop();
        sectionTopOffset = $("#work").offset().top;
        var positionDifference = scrollOffset - sectionTopOffset 
        var thisCase = $(this).parent().attr('id');
        $("#"+thisCase+"-showroom").addClass("showroom-visible");     
        $("section .content").addClass("content-hidden");
        $("section .content").removeClass("content-visible"); 
        
        if(positionDifference >=0){
             $("#"+thisCase+"-showroom").css({
            'top' : positionDifference+15+'px'
             });
        }
        else{
            $("#"+thisCase+"-showroom").css({
            'top' : '0px'
             });
        }
        
    });
    $(".showroom .close").click(function(){
        var newscrollOffset = $("body").scrollTop();
        var newPositionDifference = scrollOffset - newscrollOffset 
        
        var thisShowCase = $(this).parent().attr('id'); 
        $("#"+thisShowCase).removeClass("showroom-visible");  
        $("section .content").removeClass("content-hidden"); 
        $("section .content").addClass("content-visible");      
        $("#"+thisShowCase).css({ 'top' : '0px' });          
        $("body").scrollTop(scrollOffset);
        
    });
}


function scrollHandler(){  
    var wScroll = $(this).scrollTop();
    heroScroll(wScroll);
};

function heroScroll(wScroll){
    var heroNameDiff = $('#hero-name').outerHeight();
    var halfScreen = $(window).height()/2;
    var checkerNum = (halfScreen + heroNameDiff) - 250;
    var scrollSum = wScroll-checkerNum;
    
    if(wScroll < checkerNum ){
        $('#hero-name').css({
            'transform' : 'translate(0px, 0px)',
            '-webkit-transform' : 'translate(0px, 0px)',
            '-ms-transform' : 'translate(0px, 0px)' 
        });
    }
    else if(wScroll > checkerNum){ 
        $('#hero-name').css({
        'transform' : 'translate(0px, -'+ scrollSum +'px)',
        '-webkit-transform' : 'translate(0px, -'+ scrollSum +'px)',
        '-ms-transform' : 'translate(0px, -'+ scrollSum +'px)', 
        });
    };
};

