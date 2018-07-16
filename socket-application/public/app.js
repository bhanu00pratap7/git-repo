var username=prompt(" Enter your username");
$(document).ready(function(){
    var socket = io();
    let btn = $('#btn');
    let inp = $('#inp');
    let result = $('#result');
    let on=$('#users')
    onDisplay();  
    display();
    
   
    
    btn.click(function(){
       let value = inp.val();
       socket.emit('message',{input:value,user:username});
    });
 
     socket.on('show', function(data) {
        //console.log(data);
         result.append(`<li><span><strong>${data.user}</strong>:${data.input}</li>`);
         
         
     })
     
     function display() {
        socket.on('ms', function(data){
           //console.log(data);
           render(data);

        })
    }
     function render(data) {
       //  console.log(data);
        data.forEach((msg)=>{
           // console.log(msg);
            result.append(`<li><strong>${msg.user}</strong>:${msg.input}</li>`)
            
        })

    }
    socket.emit('online_users',{online:username})
     socket.on('users',function(data){
       //  console.log(data);
         on.append(`<li>${data.online}</li>`)
     })
     function onDisplay(){
        socket.on('onli',function(data){
           data.forEach(function(data){
               on.append(`<li>${data.online}</li>`)
           }) 
            
          })
             }
        
    

            
   
 
   
 
  
     
     
 });
 
 // Disconnect
 // Host it on Heroku