if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

const periodicSync = async () => {
  const status = await navigator.permissions.query({
    name: "periodic-background-sync",
  });
  console.log(`status`, status);
  Notification.requestPermission().then((p) => {
    if (p === "granted") {
      navigator.serviceWorker.ready.then(async (reg) => {
        const status = await navigator.permissions.query({
          name: "periodic-background-sync",
        });
        if (status.state === "granted") {
          const registration = await navigator.serviceWorker.ready;
          try {
            await registration.periodicSync.register("ps-1", {
              minInterval: 1000 * 60 * 3,
            });
          } catch (error) {
            console.log(`error`, error);
          }
        } else {
          console.log("No periodic sync permission");
        }
      });
    }
  });
};

periodicSync();
