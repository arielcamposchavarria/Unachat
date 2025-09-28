var val = require('../libs/unalib');
var assert = require('assert');


describe('unalib', function(){


  describe('funcion is_valid_phone', function(){

    it('deberia devolver true para 8297-8547', function(){

      assert.equal(val.is_valid_phone('8297-8547'), true);

    });

    it('deberia devolver false para 8297p-8547', function(){

      assert.equal(val.is_valid_phone('8297p-8547'), false);

    });

  });


  describe('funcion is_valid_url_image', function(){

    it('deberia devolver true para http://image.com/image.jpg', function(){

      assert.equal(val.is_valid_url_image('http://image.com/image.jpg'), true);

    });

    it('deberia devolver true para http://image.com/image.gif', function(){

      assert.equal(val.is_valid_url_image('http://image.com/image.gif'), true);

    });
    
  });

  describe('funcion is_valid_yt_video', function(){

    it('deberia devolver true para http://image.com/image.jpg', function(){

      assert.equal(val.is_valid_yt_video('https://www.youtube.com/watch?v=qYwlqx-JLok'), true);

    });

  });

  describe('validacion de URLs de imagenes', function(){
    it('deberia validar y mostrar correctamente una imagen jpg', function(){
      const msg = JSON.stringify({mensaje: 'https://dominio.com/imagen.jpg'});
      const result = JSON.parse(val.validateMessage(msg));
      assert.ok(result.mensaje.includes('<img src="https://dominio.com/imagen.jpg"'));
    });

    it('deberia validar y mostrar correctamente una imagen de Unsplash sin extension', function(){
      const msg = JSON.stringify({mensaje: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'});
      const result = JSON.parse(val.validateMessage(msg));
      assert.ok(result.mensaje.includes('<img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"'));
    });
  });

  describe('validacion de URLs de videos', function(){
    it('deberia aceptar y mostrar un video de YouTube', function(){
      const msg = JSON.stringify({mensaje: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'});
      const result = JSON.parse(val.validateMessage(msg));
      assert.ok(result.mensaje.includes('<iframe'));
      assert.ok(result.mensaje.includes('youtube.com/embed/dQw4w9WgXcQ'));
    });
  });

  describe('prevencion de inyeccion de scripts', function(){
    it('deberia bloquear un intento de inyeccion de script', function(){
      const msg = JSON.stringify({mensaje: '<script>alert("hack")</script> texto normal'});
      const result = JSON.parse(val.validateMessage(msg));
      assert.ok(!result.mensaje.includes('<script>'));
      assert.ok(!result.mensaje.includes('alert("hack")'));
      assert.ok(result.mensaje.includes('texto normal'));
    });

    it('deberia bloquear etiquetas HTML peligrosas', function(){
      const msg = JSON.stringify({mensaje: '<img src=x onerror=alert(1)>'});
      const result = JSON.parse(val.validateMessage(msg));
      assert.ok(!result.mensaje.includes('<img src=x onerror=alert(1)>'));
    });
  });

});







