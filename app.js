/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const myUl = document.getElementById('navbar__list');
const myFragment = document.createDocumentFragment();
/**
 * End Global Variables 
*/
/** build the nav
 * loop over all sections to get data-nav value to assign it to list items.
 * create new list items and add new text to them.
 * add event listener to each list item to scroll to relevant section.
*/ 
sections.forEach(function(element){
    let sectionName = element.getAttribute('data-nav');
    let myLi = document.createElement('li');
    let myLiLink = document.createElement('a');
    let myLiText = document.createTextNode(sectionName);
    myLiLink.addEventListener('click',function (){
        element.scrollIntoView({behavior: "smooth"})// Scroll using scrollIntoView event
    });    
    myLi.appendChild(myLiLink)
    myLiLink.appendChild(myLiText);
// using Document Fragment to enhance the performance. 
    myFragment.appendChild(myLi);
});
// add fragment to Ul after the loop to prevent repetitive reflow. 
myUl.appendChild(myFragment);

// Add class 'active' to section when near top of viewport
// two forEach loop one for sections contains another one for the list items
// onscroll event
window.onscroll = function () {
    sections.forEach(function(element){
// to calculate the height of each section depending on screen width 
    let elementHeight = element.getBoundingClientRect().bottom - element.getBoundingClientRect().top;
    let sectionPosition = element.getBoundingClientRect().top;
    if((sectionPosition > -0.7*elementHeight) && (sectionPosition < 0.3*elementHeight)){
        element.classList.add('your-active-class');
        let sectionName = element.getAttribute('data-nav');// save the name of the active section to use in the links loop
        let links = document.querySelectorAll('li');
        links.forEach(function(link){
        let linkName = link.textContent;
        if (linkName === sectionName){
            link.classList.add('menu__link');
        } else {
            link.classList.remove('menu__link');
        }
    }); 
        } else {
            element.classList.remove('your-active-class');
    }
    
    });
};
// the end of code