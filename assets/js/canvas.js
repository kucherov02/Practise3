function canvas(selector, options){
    const canvas = document.querySelector(selector);
    canvas.classList.add('canvas')
    canvas.setAttribute('width', `${options.width || 400}px`)
    canvas.setAttribute('height', `${options.height || 300}px`)
 
 
    // отримання контексту для малювання
    const context = canvas.getContext('2d')
   // отримуємо координати canvas відносно viewport
    const rect = canvas.getBoundingClientRect();
 
    let isPaint = false // чи активно малювання
    let points = [] //масив з точками

    let mycolor = context.strokeStyle;
	let mywidth = context.lineWidth;
    
        // об’являємо функцію додавання точок в масив
    const addPoint = (x, y, dragging) => {
       // преобразуємо координати події кліка миші відносно canvas
       points.push({
           x: (x - rect.left),
           y: (y - rect.top),
           dragging: dragging,
           color: mycolor,
	       width: mywidth,
       })
    }
    
         // головна функція для малювання
       const redraw = () => {
       
    //    context.strokeStyle = options.strokeColor;
       context.lineJoin = "round";
       context.lineWidth = options.strokeWidth;
       let prevPoint = null;
       for (let point of points){
          context.strokeStyle = point.color;
          context.lineWidth = point.width;
           context.beginPath();
           if (point.dragging && prevPoint){
               context.moveTo(prevPoint.x, prevPoint.y)
           } else {
               context.moveTo(point.x - 1, point.y);
           }
           context.lineTo(point.x, point.y)
           context.closePath()
           context.stroke();
           prevPoint = point;
       }
    }
    
         // функції обробники подій миші
    const mouseDown = event => {
       isPaint = true
       addPoint(event.pageX, event.pageY);
       redraw();
    }
    
    const mouseMove = event => {
       if(isPaint){
           addPoint(event.pageX, event.pageY, true);
           redraw();
       }
    }


    
    // додаємо обробку подій
    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mouseup',() => {
       isPaint = false;
    });
    canvas.addEventListener('mouseleave',() => {
       isPaint = false;
    });


    const toolBar = document.getElementById('toolbar')
// clear button
const clearBtn = document.createElement('button')
clearBtn.classList.add('btn')
clearBtn.addEventListener('click', () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    points = [];
})
clearBtn.insertAdjacentHTML("beforeend",  '<i class="fa fa-eraser"></i>');

toolBar.insertAdjacentElement('afterbegin', clearBtn)


const downloadBtn = document.createElement('button')
downloadBtn.classList.add('btn')


downloadBtn.addEventListener('click', () =>{
    const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
const newTab = window.open('about:blank','image from canvas');
newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");

})
downloadBtn.insertAdjacentHTML("beforeend",  '<i class="fa fa-angle-double-down"></i>');
toolBar.insertAdjacentElement('beforeend', downloadBtn)

const saveBtn = document.createElement('button')
saveBtn.classList.add('btn')


saveBtn.addEventListener('click',()=>{
    localStorage.setItem('points', JSON.stringify(points));
})

saveBtn.insertAdjacentHTML("beforeend",  '<i class="fa fa-file"></i>');


toolBar.insertAdjacentElement('beforeend', saveBtn)

const restoreBtn = document.createElement('button')
restoreBtn.classList.add('btn')
restoreBtn.insertAdjacentHTML("beforeend",  '<i class="fa fa-arrow-circle-right"></i>');

restoreBtn.addEventListener('click',()=>{
  
  points = JSON.parse(localStorage.getItem('points'));
  
  isPaint = true;
  redraw();
  isPaint = false;
})
toolBar.insertAdjacentElement('beforeend', restoreBtn)

const dataBtn = document.createElement('button')
dataBtn.classList.add('btn')
dataBtn.insertAdjacentHTML("beforeend",  '<i class="fa fa-archive"></i>');
toolBar.insertAdjacentElement('beforeend', dataBtn)

dataBtn.addEventListener('click',()=>{
    const context = document.getElementById("draw").getContext("2d");;
    context.font = "bold 32px Arial";
    context.fillText(new Date().toDateString(), 50, 100);

})


const colorPicker = document.querySelector('.color-picker');


colorPicker.addEventListener('change', () => {
    context.strokeStyle = colorPicker.value;
    mycolor = colorPicker.value;
});

const sizeForm = document.querySelector('.size');

sizeForm.addEventListener('change', () => {
    context.lineWidth = sizeForm.value;
    mywidth =   sizeForm.value;
})

const backBtn = document.createElement('button')
backBtn.classList.add('btn')
backBtn.insertAdjacentHTML("beforeend",  '<i class="fa fa-spinner"></i>');
toolBar.insertAdjacentElement('beforeend', backBtn)

backBtn.addEventListener('click', () => {
    const img = new Image; 
    img.src =`https://www.fillmurray.com/200/300`;   
  
     context.drawImage(img,0, 0);
     
})
  
  

 }
 