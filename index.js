navigator.serviceWorker.register("/sw.js");

const periodicSync = async () => {
  const permission = Notification.permission;
  Notification.requestPermission().then((p) => {
    if (p === "granted") {
      navigator.serviceWorker.ready
        .then((reg) => {
          reg.periodicSync.register("ps", {
            minInterval: 15 * 60 * 1000,
          });
        })
        .then(console.log)
        .catch(console.log);
    }
  });
};

periodicSync();
