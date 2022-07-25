const spawnNotification = (body, icon, tag, title) => {
  const options = {
      body: body,
      icon: icon,
      tag: tag
  }
  const notification = new Notification(title, options);
  
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