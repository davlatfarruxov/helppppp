/*======================================================
* Template Name: Plesir - Car & Travel Mobile Template	
* Version: 1.0
* Author: HidraTheme 
* Developed By: HidraTheme  
* Author URL: https://themeforest.net/user/hidratheme 
======================================================*/

(function ($) {

  "use strict"; 

    /* PRELOADER */
      $(window).on('load',function() { 
          $(".preloading").fadeOut("slow"); 
      });

    /* SIDE NAVIGATION */
      $('#dismiss, .overlay').on('click', function () {
          $('#sidebarleft').removeClass('active');
          $('#sidebarright').removeClass('active');
          $('.overlay').removeClass('active'); 
          $('body').removeClass('noscroll');
      });

      $('#sidebarleftbutton,#sidebarrightbutton').on('click', function () { 
          $('.overlay').addClass('active');
          $('body').addClass('noscroll');
      });

      $('#sidebarleftbutton').on('click', function () {
          $('#sidebarleft').addClass('active'); 
      });

      $('#sidebarrightbutton').on('click', function () {
          $('#sidebarright').addClass('active'); 
      });


      /* HOMEPAGE - CAROUSEL SLIDER */
      $('.img-hero').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        arrows : false,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: false
      });
      
      
      /* DEFAULT CAROUSEL */
      $('.default-carousel').slick({  
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: false,
      arrows : false,
      variableWidth: true
    });


    /* DATE PICKER */
    $('.date-start-class').datepicker({
        uiLibrary: 'bootstrap'
    }); 
    $('.date-end-class').datepicker({
          uiLibrary: 'bootstrap'
    });

    /* TIME PICKER */
      $('.timepicker').timepicker({
        template: false,
        showInputs: false,
        minuteStep: 1
      });


    /* GALLERY - FILTERING FUCTION */
      $(".filter-button").on("click", function() {  
        var value = $(this).data('filter');  

          if(value == "gallery-show-all")
          {
              $('.gallery-img-box').removeClass("gallery-hidden");
          }
          else
          {  
            $( '.gallery-img-box:not([data-category-image*="' + value + '"]').addClass("gallery-hidden");
            $( '.gallery-img-box[data-category-image*="' + value + '"]').removeClass("gallery-hidden");   
          }
      });

      $('.filter-gallery .filter-button').on("click", function() {
          $('.filter-gallery').find('.filter-button.active').removeClass('active');  
          $(this).addClass('active');
      });


    /* MAGNIFICPOPUP GALLERY */
      $(".gallery-list").magnificPopup({
              type: "image",
              removalDelay: 300 
      });


})(jQuery);

var x = document.getElementById("maps-button");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "Geolokatsiya bu brauzer tomonidan qo‘llab-quvvatlanmaydi.";
    }
}



$(function () {
    $("#maps-gl").hide();
    function showPosition(position) {
        console.log(position);
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        $(".lat").html(`lat: ${lat}`);
        $(".lot").html(`long: ${long}`);
    }

    function ViloyatSelectPrint() {
        $.ajax({
            url : "https://robocontest.uz/api/regions",
            method:"get",
            success:function (e){
                var html = ``;
                for (const i in e) {
                    html += `
                        <option value="${e[i].id}"> ${e[i].name} </option>
                    `;
                }

                $("#country-viloyat").html(html);
            },
            error:function (){
                alert("Internetga bog'lanishdagi xatolik");
            }
        })
    }

    ViloyatSelectPrint();

    $("#country-viloyat").change(function() {
        var id = $("#country-viloyat").val();
        $.ajax({
            url : "https://robocontest.uz/api/regions?q=" + id,
            method:"get",
            success:function (e){
                var html = ``;
                for (const i in e) {
                    html += `
                        <option value="${e[i].id}"> ${e[i].name} </option>
                    `;
                }
                $("#city").html(html);
            },
            error:function (){
                alert("Internetga bog'lanishdagi xatolik");
            }
        })
    });

    $("#maps-eye").on("click",function (){
        $("#maps-gl").show();
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        }else{
            alert("Lokatsiyani topib bo'lmadi");
        }
    });

    $("#last-seen-rec").on("click",function () {
        $("#maps-gl").show();
    })  

})
