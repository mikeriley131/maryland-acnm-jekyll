$(document).ready(function() {

  var allPanels = $('.faq__list > .faq__definition').hide();

  $('.faq__term').css({'margin-bottom': '1em'});

  $('.faq__list > .faq__term > .faq__link').click(function() {
    allPanels.slideUp();
    $(this).parent().next().slideDown();
    return false;
  });

});