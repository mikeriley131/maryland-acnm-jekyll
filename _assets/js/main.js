$(document).ready(function() {

  //FAQ Accordion
  var allPanels = $('.faq__list > .faq__definition').hide();

  $('.faq__term').css({'margin-bottom': '1em'});

  $('.faq__list > .faq__term > .faq__link').click(function() {
    allPanels.slideUp();
    $(this).parent().next().slideDown();
    return false;
  });

  //For Midwives Sorting
  $('.js-filter__ga').on('click', function() {
    $('.general-announcement').show('fast');
    $('article').not('.general-announcement').hide('fast');
  });

  $('.js-filter__lu').on('click', function() {
    $('.leg-update').show('fast');
    $('article').not('.leg-update').hide('fast');
  });

  $('.js-filter__mm').on('click', function() {
    $('.meeting-mins').show('fast');
    $('article').not('.meeting-mins').hide('fast');
  });

  $('.js-filter__jp').on('click', function() {
    $('.job-post').show('fast');
    $('article').not('.job-post').hide('fast');
  });

  $('.js-filter__all').on('click', function() {
    $('.news-grouping').show('fast');
  });

});