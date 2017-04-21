// Initialize your app
var myApp = new Framework7();

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

document.addEventListener("deviceready", function(){
    $("#iniciar_sesion").bind("click",iniciar_session);
    $("#camara").bind("click",cam);

});

function iniciar_session(){
    var icon_name = '<i class="f7-icons" style="font-size:14px;">person</i>';
    var icon_mail = '<i class="f7-icons" style="font-size:14px;">email</i>';

    var correo  = $("#username").val();
    var pass    = $("#password").val();

    if(correo.trim().length > 0 && pass.trim().length > 0){
        myApp.showPreloader("Iniciando Sesión...");
        $.ajax({
            dataType: "json",
            type: "POST",
            data:{
                user: correo,
                pass: pass
            },
            url: "http://login-appmovilubb.rhcloud.com/",
            success: function(respuesta){
                if(respuesta.resp === true){
                    $("#nosesion").hide();
                    $("#sesion").show();
                    $("#name").html(icon_name +" "+ respuesta.data.nombre);
                    $("#mail").html(icon_mail +" "+ correo);
                    myApp.hidePreloader();
                    myApp.closeModal(".login-screen", true);
                }else{
                    myApp.hidePreloader();
                    myApp.alert("Error en los datos de sesión", "SmartAPP");
                }
            },
            error: function(){
                myApp.hidePreloader();
                myApp.alert("Error en la Conexión", "SmartAPP");
            }
        });
    }else{
        myApp.alert("No hay datos ingresados", "SmartAPP");
    }
}

/*
function cam(){

    navigator.camera.getPicture(function(photo){
       myApp.alert(photo);
        $('#foto1').attr('src',photo);
        $('#imagen1').attr('src',photo);

    }, function(error){
        myApp.alert('Error al tomar la fotografía','SMART@APP')
    }, {
        quality:100
    });

}
*/

function cam(){
     navigator.camera.getPicture(
       function(photo){
            myApp.prompt('Cual es el nombre de la foto?','SamrtApp', function (value) {
              var html_elemento = "";
             html_elemento += '<li>';
             html_elemento += ' <a href="#" class="item-link item-content">';
             html_elemento +=     ' <div class="item-media"><img src="'+photo+'" width="44"></div>';
             html_elemento +=     ' <div class="item-inner">';
             html_elemento +=     ' <div class="item-title-row">';
             html_elemento +=      '<div class="item-title">'+value+'</div>';
             html_elemento +=      '</div>';
             html_elemento +=     ' <div class="item-subtitle">Beatles</div>';
             html_elemento +=     ' </div>';
             html_elemento += '</a>';
         html_elemento +=  '</li>';
         $("#my_lista").append(html_elemento);

         });


  }, function(error){
      myApp.alert('Error al tomar la fotografía','SMART@APP')
  }, {
      quality:100,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: 0
  });


};
