$(window).load(function(){
    loadimages();
});

$(window).resize(function(){
    modalResize();
        
});

$(window).scroll(function(){ 
    window.requestAnimationFrame(scrollHandler);
    //scrollIntervalID = setInterval(animateStuff, 10);   
});

function scrollHandler(){  
    var wScroll = $(this).scrollTop();
    imageScroll(wScroll);
};

function imageScroll(wScroll){
    $('.unit img').each(function(){
        if(wScroll > $(this).offset().top - $(window).height()){
            var offset = Math.min(0, wScroll - $(this).offset().top +$(window).height() - ($(window).height()*0.2));
            var offset2 = Math.max(0,wScroll - $(this).offset().top -  $(this).outerHeight() + ($(window).height()*0.2));

            var small2 = (Math.abs(offset2 * 0.12)/10).toFixed(3);
            var big2 = (Math.abs(100-small2)).toFixed(3);

            var small = (Math.abs(offset * 0.12)/10).toFixed(3);
            var big = (Math.abs(100-small)).toFixed(3);

            var scaleIn = (((big-90)/10)+0.05).toFixed(3);
            var scaleOut = (((big2-90)/10)+0.05).toFixed(3);

            if(scaleIn < 1){
                $(this).css({
                '-webkit-clip-path': 'polygon(0% 0, 100% 0, '+big+'% 100%, '+small+'% 100%)',
                '-webkit-transform': 'scale('+scaleIn+')',
                });
            };
            if(scaleOut < 1){
                $(this).css({
                '-webkit-clip-path': 'polygon('+small2+'% 0, '+big2+'% 0, 100% 100%, 0% 100%)',
                '-webkit-transform': 'scale('+scaleOut+')',
                });
            };
            if(scaleOut >= 1 && scaleIn >= 1){
                $(this).css({
                    '-webkit-clip-path': 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
                    '-webkit-transform': 'scale(1)',
                });
            }
        }  
    });
};


function setModalImage(){    
     $('#modalviewer img').click(function(){
        $('#modalviewer').css({
            'display': 'none',
        });
     })
    $('.unit img').click(function(){
        var width = $(window).width()-120;
        var offset = $(window).scrollTop()+20;
        /*  
            160 is the number of pixels subtracted from the total window width.
            the number is set by the total amount of margin and offset
        */
        var imageToShow = $(this).attr('src');
        $('#modalviewer img').attr('src',imageToShow);
        $('#modalviewer').css({
            'display': 'block',
            'width': width,
            'top': offset, 
      });
        
    modalResize();
    });
};

function modalResize(){
    var width = $(window).width()-160;
    /*  
        160 is the number of pixels subtracted from the total window width.
        the number is set by the total amount of margin and offset
    */
    $('#modalviewer').css({
        'width': width,        
    });
};

function loadimages(){
    var dir = "assets/";
    var fileextension = [".png", ".jpg"];
    var counter = 1;

    $.ajax({
        //This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: dir,
        success: function (data) {
            //List all images file names in the page
           $(data).find("a:contains(" + (fileextension[0]) + "), a:contains(" + (fileextension[1]) + ")").each(function() {
                var filename = this.href.replace(window.location.host, "").replace("http:///", "");   
                    if(counter%2==0){
                        $("#leftImgContainer").append($(
                            "<a class='unit'><img src="+ filename +"></a>"
                        ));
                        counter=counter+1;             
                    }
                    else{
                        $("#rightImgContainer").append($(
                            "<a class='unit'><img src="+ filename +"></a>"
                        ));
                        counter=counter+1;
                    }; 
            });
            setModalImage(); 
            refitImages();
        }
    });
};

function refitImages(){    
    console.log("hi");
     setTimeout(function(){      
            var leftColumnHeight = $("#leftImgContainer").height();
            var leftColumnLastChild = $("#leftImgContainer .unit img").last();
            var rightColumnHeight = $("#rightImgContainer").height(); 
            var rightColumnLastChild = $("#rightImgContainer .unit img").last();
         
    if((leftColumnHeight-rightColumnHeight)>leftColumnLastChild.outerHeight()){
        //venstre side har mere end ét element ekstra i højden
        var imageToMove = leftColumnLastChild.attr('src');
        leftColumnLastChild.remove();
        
        $("#rightImgContainer").append($(
            "<a class='unit'><img src="+ imageToMove +"></a>"
        ));
        refitImages();
    }
    else if((rightColumnHeight-leftColumnHeight)>rightColumnLastChild.outerHeight()){
        //højre side har mere end ét element ekstra i højden
        
        var imageToMove = rightColumnLastChild.attr('src');
        rightColumnLastChild.remove();
        
        $("#leftImgContainer").append($(
            "<a class='unit'><img src="+ imageToMove +"></a>"
        ));
        refitImages();
    }
           
    }, 300 );
    

}
