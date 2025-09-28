// modulo de ejemplo.

module.exports = {


    // logica que valida si un telefono esta correcto...
    is_valid_phone: function (phone) {
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
  
      // validacion Regex
      try {
        isValid = re.test(phone);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    is_valid_url_image: function (url) {
      // Detecta si la URL termina en una extensión de imagen, incluso si tiene parámetros
      if (/\.(jpg|jpeg|png|gif|bmp)(\?.*)?$/i.test(url)) return true;
      // Detecta imágenes de Unsplash aunque no tengan extensión
      if (/^https?:\/\/images\.unsplash\.com\//i.test(url)) return true;
      return false;
    },

    is_valid_yt_video: function (url) {
      var isValid = false;
      var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/i;
      try {
        isValid = re.test(url); // Corregido: era phone
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
    },

    is_valid_url: function(url) {
      // Detecta si es una URL genérica
      var re = /^(https?:\/\/[^\s]+)$/i;
      return re.test(url);
    },

    getLinkTag: function(url){
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    },

    getYTVideoId: function(url){
  
      return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];
    },
  
    getEmbeddedCode: function (url){
      var id = this.getYTVideoId(url);
      var code = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      return code;
    },
  
    getImageTag: function(url){
      // Muestra una imagen alternativa si falla la carga
      var tag = '<img src="'+url+'" style="max-height: 400px;max-width: 400px;" onerror="this.onerror=null;this.src=\'https://via.placeholder.com/150?text=Imagen+no+encontrada\';">';
      return tag;
    },
  
    sanitizeText: function(text) {
      // Elimina bloques <script>...</script> y su contenido
      text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
      // Elimina cualquier otra etiqueta HTML
      text = text.replace(/<.*?>/g, '');
      // Escapa caracteres especiales
      return text.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;');
    },
  
    validateMessage: function(msg){
      if (!msg || typeof msg !== 'string') {
        return JSON.stringify({ mensaje: '' });
      }
      try {
        var obj = JSON.parse(msg);
        var mensaje = obj.mensaje;

        // Sanitiza el mensaje para evitar inyección de código
        mensaje = this.sanitizeText(mensaje);

        // Busca todas las URLs en el mensaje y solo permite imágenes o videos válidos
        mensaje = mensaje.replace(/(https?:\/\/[^\s]+)/gi, (url) => {
          // Permite solo URLs válidas de imágenes o videos
          if(this.is_valid_url_image(url)){
            return this.getImageTag(url);
          }
          else if(this.is_valid_yt_video(url)){
            return this.getEmbeddedCode(url);
          }
          // Si no es imagen ni video, solo muestra el texto plano del enlace (no como <a>)
          return this.sanitizeText(url);
        });

        obj.mensaje = mensaje;
        return JSON.stringify(obj);
      } catch (e) {
        console.log('Error processing message:', e);
        return JSON.stringify({ mensaje: '' });
      }
    }
  
  
  
    
    
  
  // fin del modulo
  };
