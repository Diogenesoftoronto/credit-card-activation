const spawnNotification = (title, options, actions) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }
  else if (Notification.permission == "granted") {
   const notification = new Notification(title, options);
    // check if actions are provided and calls the ac tion functions in the actions array
    if (actions) {
      actions.forEach(action => {
        action(notification);
      });
    }
   notification.addEventListener('notificationclick', function(event) {
     console.log('On notification click: ', event.notification.tag);
     event.notification.close();
   
     // This looks to see if the current is already open and
     // focuses if it is
     event.waitUntil(clients.matchAll({
       type: "window"
     }).then(function(clientList) {
       for (const client of clientList) {
         if (client.url == '/' && 'focus' in client)
           return client.focus();
       }
       if (clients.openWindow)
         return clients.openWindow('/');
     }));
   });
  }
}

// play sound
const playSound = (sound) => {
  const audio = new Audio(sound)
  audio.play()
  // stop sound after 3 seconds
  setTimeout(() => {
    audio.pause()
  }, 3000)
}

// play a sound when a notification is received
// notification.addEventListener('notificationclick', function(event) {
//   playSound('/sounds/notification.mp3')
// }
// )
const BASE_URL = window.location.href

// select elements
const form = document.querySelector('#form')
// console.log(form)

// add event listener on submit
form.addEventListener("submit", (e) => {
  console.log(Object.keys(e), e)
  // why is this not working? yyyyyyyyyy this should work
  Notification.permission == 'denied' ? console.log('please allow notifications')
  : e.preventDefault()

  if (Notification.permission !== 'denied') {
    // request permission for notifications
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
    const data = new FormData(form);
    const cardnumber = data.get("cardnumber")
    const csv = data.get("csv")
    const expirydata = data.get("expirydata")
    const phonenumber = data.get("phonenumber")

    const formData = { expirydata, phonenumber, csv}
    console.log(formData)
    // send fetch request
    // const headers = {
    //   'Content-Type': 'text/html',
    //   // normally authkey would be hidden with env however to do this would require the request to be made off the browser or to another api which I do have! i can make the request to activation route which can send me a response!
    //   // 'Authkey': '<3',
    // };
    fetch(BASE_URL+'notifications', { method: 'post', body: formData })
    .then((res)=> {
      // spawn notification from request if granted permission
      if (Notification.permission == 'granted') {
      // play two different sounds depending on the response from the server
      if (res.responsecode === 100) {
        playSound('sounds/tailwind.mp3')
      }
      else if (res.responsecode === 101) {
        playSound('sounds/Hidden Depth.mp3')
      }
      spawnNotification('Credit Card Activated', {
        body: 
        `Your credit card: ${cardnumber}. 
        message is: ${res.message}. 
        response code is: ${res.responsecode}. 
        response status is: ${res.status}.`,
        icon: 'images/giphy.gif'
        })
        // console.log(res)
      }
    })
    .catch((err)=>{
      // spawn notification
      if (Notification.permission === 'granted') {
        // play sound when a new notification is spawned
        playSound('sounds/What You Deserve.mp3')
        spawnNotification('Credit Card Failure', {
          body: `Your credit card: ${cardnumber} has not been activated due to error ${err}`,
          icon: 'images/giphy.gif'
          })
    }})
    .finally(()=>console.log("i forgot the notification functionality and i am adding this last minute. here's some emojis if you are reading this 🕺👯🕺"))
    })
  }
})