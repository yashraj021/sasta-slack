const socket = io("http://localhost:9000");


socket.on('connect', (data)=> {
    console.log(socket.id);
})

socket.on("nsData", data => {

    let namespaceDiv = document.querySelector('.namespaces')
    namespaceDiv.innerHTML = "";
    
    if(data.length) {
        data.forEach(element => {
           namespaceDiv.innerHTML +=  `<div class="namespace" ns="${element.endpoint}"><img src="${element.img}"></div>`;
        });
    }

    Array.from(document.getElementsByClassName('namespace')).forEach(elem => {
        elem.addEventListener('click', e => {
            const nsEndpoiint = elem.getAttribute('ns');
            console.log(nsEndpoiint); 
        })
    })

    const nsSocket = io('http://localhost:9000/wiki');
    nsSocket.on('nsRoomLoad', nsRooms => {
        let roomList = document.querySelector('.room-list');
        
        roomList.innerHTML = "";
        nsRooms.forEach(room => {
            let glyph;
            room.privateRoom ? glyph = 'lock': glyph = 'globe';
            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
        })

        Array.from(document.getElementsByClassName('room')).forEach(room=>{
            room.addEventListener('click', e => {
                console.log("Someone clicked on ", e.target.innerText); 
            })
        })
    })
})




