const spawnNotification = (title, options) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
   new Notification(title, options);
  }
}
const notification = querySelector('notification')
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

// play sound
const playSound = (sound) => {
  const audio = new Audio(sound)
  audio.play()
  // stop sound after 10 seconds
  setTimeout(() => {
    audio.pause()
  }, 10000)
}

// play a sound when a notification is received
// notification.addEventListener('notificationclick', function(event) {
//   playSound('/sounds/notification.mp3')
// }
// )


// select elements
const submit = querySelector('.submit')
const form = querySelector('.activation-form')

// add event listener on submit
submit.addEventListener('submit', function (e) {
  if (Notification.permission !== 'denied') {
    e.preventDefault();
    const data = e.formData;
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
    fetch('/notifications', { method: 'post', body: formData })
    .then((res)=> {
      // spawn notification from request if granted permission
      if (Notification.permission === 'granted') {
      // play two different sounds depending on the response from the server
        if (res.responsecode === 100) {
          playSound('/sounds/tailwind.mp3')
        }
        else if (res.responsecode === 101) {
          playSound('/sounds/Hidden Depth.mp3')
        }
      spawnNotification('Credit Card Activated', {
        body: 
        `Your credit card: ${cardnumber}. 
        message is: ${res.message}. 
        response code is: ${res.responsecode}. 
        response status is: ${res.status}.`,
        icon: 'images/giphy.gif'
        })
      }
    })
    .catch((err)=>{
      // spawn notification
      if (Notification.permission === 'granted') {
        // play sound when a new notification is spawned
        playSound('/sounds/What You Deserve.mp3')
        spawnNotification('Credit Card Failure', {
          body: `Your credit card: ${cardnumber} has not been activated due to error ${err}`,
          icon: 'images/giphy.gif'
          })
    }})
    .finally(()=>console.log("i forgot the notification functionality and i am adding this last minute. here's some emojis if you are reading this 🕺👯🕺"));
  }
})