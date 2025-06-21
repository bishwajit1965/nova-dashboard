let resolveToken = null;

export const initializeGoogleSDK = () => {
  if (document.getElementById("google-client-sdk")) return;

  const script = document.createElement("script");
  script.id = "google-client-sdk";
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;

  script.onload = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response) => {
          if (resolveToken && response.credential) {
            resolveToken(response.credential);
            resolveToken = null;
          } else {
            console.error("❌ No credential received", response);
          }
        },
        ux_mode: "popup",
      });
    } else {
      console.error("❌ Google SDK loaded but window.google is undefined");
    }
  };

  document.body.appendChild(script);
};

export const getGoogleIdToken = () => {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.id) {
      console.error("❌ Google SDK not initialized");
      return reject("Google SDK not initialized");
    }

    resolveToken = resolve;

    // This MUST be triggered directly after a user click
    window.google.accounts.id.prompt((notification) => {
      if (notification.isSkippedMoment()) {
        reject("User skipped");
        resolveToken = null;
      }
      if (notification.isNotDisplayed()) {
        reject("Prompt not displayed");
        resolveToken = null;
      }
    });
  });
};
