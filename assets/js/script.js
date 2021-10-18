function Slide(index, title, background, link ) {
    this.title = title;
    this.background = background;
    this.link = link;
    this.id = "slide-" + index;
 }
 
 const Slider = {
    current: 0,
    slides: [],
    initSlider: function(slides){
        let index = 0;
        for (let slide of slides){
            this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
            index++;
        }
        this.buildSlider();
    },

    buildSlider: function() {
        
        let sliderHTML = "";
        for(let slide of this.slides) {
 //зверніть увагу на можливість використання ``,яка дозволяє додавати в string змінні ${}
            sliderHTML +=
                `<div id='${slide.id}' class='singleSlide'
            style='background-image:url(${slide.background});'>
            <div class='slideOverlay'>
            <h2>${slide.title}</h2>
            <a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;
        }
 
        document.getElementById("slider").innerHTML = sliderHTML;
        document.getElementById("slide-" + this.current).style.left = 0;
    },
    prevSlide: function() {
        let next;
        if (this.current === 0 ) {
            next = this.slides.length - 1;
        } else {
            next = this.current - 1;
        }
 
        document.getElementById("slide-" + next).style.left = "-100%";
        document.getElementById("slide-" + this.current).style.left = 0;
 
        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");
 
        this.current = next;
    },
    nextSlide: function(){
        let next;
        if (this.current === (this.slides.length - 1) ) {
            next = 0;
        } else {
            next = this.current + 1;
        }
 
        document.getElementById("slide-" + next).style.left = "100%";
        document.getElementById("slide-" + this.current).style.left = 0;
 
        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");
 
        this.current = next;
    },

    setSlide: function(id){
        let next;
        if (this.current === (this.current.length - id ) ) {
            next = id;
        } else {
            next = id - 1;
        }
 
        document.getElementById("slide-" + next).style.left = "100%";
        document.getElementById("slide-" + this.current).style.left = 0;
 
        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");  
        
        this.current = next;
    }
 }

 const prevBtn = document.querySelector('.prevBtn');
 const nextBtn = document.querySelector('.nextBtn');

 prevBtn.addEventListener('click', () => {
    Slider.prevSlide();
 });

nextBtn.addEventListener('click',() => {
    Slider.nextSlide();
})

const hide = document.querySelector('.hide');
const show = document.querySelector('.show');
const slider_container = document.querySelector('.slider');

hide.addEventListener('click', () =>{
    slider_container.classList.add('hide-class');
})

show.addEventListener('click', () =>{
    slider_container.classList.remove('hide-class');
})

const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', (event)=>{
    if (event.target.classList.contains('start')){
        event.target.innerHTML = 'Start';
        clearInterval(interval)
    } else {
        event.target.innerHTML = 'Stop';
        interval = setInterval(()=>{
            Slider.nextSlide();
        },3000)
    }
    event.target.classList.toggle('start')
 });

 const btn1 = document.getElementById('1');
 const btn2 = document.getElementById('2');
 const btn3 = document.getElementById('3');

 btn1.addEventListener('click', (event) => {
     
    Slider.setSlide(event.target.getAttribute('id'));
 })

 btn2.addEventListener('click', (event) => {
    Slider.setSlide(event.target.getAttribute('id'));
 })

 btn3.addEventListener('click', (event) => {
    Slider.setSlide(event.target.getAttribute('id'));
 })

 
 



 

 