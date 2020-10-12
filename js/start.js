
// * SETTING THE BODY TO THE WINDOWHEIGHT 
$('div.fixed-height').css('height', `${$(window).height()}px`);


$('#start-button').on('click', () => {
    window.location.assign("/index.html");
});