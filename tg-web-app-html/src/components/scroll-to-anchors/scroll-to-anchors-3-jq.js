//плавный скролл
$('.js-scroll').on('click', function(event){
  event.preventDefault();
  let anchor = $(this).attr('href');
  $('html, body').stop().animate({
      scrollTop: $(anchor).offset().top - 60
  }, 200);
});