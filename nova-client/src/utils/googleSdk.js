let codeClient;

export const initializeGoogleSDK = () => {
  if (document.getElementById("google-client-sdk")) return;

  const script = document.createElement("script");
  script.id = "google-client-sdk";
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;

  script.onload = () => {
    if (window.google) {
      codeClient = window.google.accounts.oauth2.initCodeClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "openid email profile",
        ux_mode: "popup",
        redirect_uri: "postmessage", // This is key to get `code` back in frontend
        callback: (response) => {
          // Will be overwritten in getGoogleIdToken()
        },
      });
    } else {
      console.error("❌ Google SDK loaded but window.google is undefined");
    }
  };

  document.body.appendChild(script);
};

export const getGoogleIdToken = () => {
  return new Promise((resolve, reject) => {
    if (!codeClient) {
      return reject(new Error("Google SDK not initialized"));
    }

    codeClient.callback = async (response) => {
      const code = response.code;

      if (!code) return reject(new Error("Authorization code missing"));

      try {
        // Exchange code for ID token in backend
        const res = await fetch(
          "http://localhost:3000/api/auth/oauth/google-signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          return reject(new Error(data.message || "Google sign-up failed"));
        }

        resolve(data);
      } catch (err) {
        reject(err);
      }
    };

    codeClient.requestCode();
  });
};

// let tokenClient;

// export const initializeGoogleSDK = () => {
//   if (document.getElementById("google-client-sdk")) return;

//   const script = document.createElement("script");
//   script.id = "google-client-sdk";
//   script.src = "https://accounts.google.com/gsi/client";
//   script.async = true;
//   script.defer = true;

//   script.onload = () => {
//     if (window.google) {
//       tokenClient = window.google.accounts.oauth2.initTokenClient({
//         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//         scope: "email profile openid",
//         callback: (tokenResponse) => {
//           // This will be overwritten by getGoogleIdToken
//         },
//       });
//     } else {
//       console.error("❌ Google SDK loaded but window.google is undefined");
//     }
//   };

//   document.body.appendChild(script);
// };

// export const getGoogleIdToken = () => {
//   return new Promise((resolve, reject) => {
//     if (!tokenClient) {
//       return reject(new Error("Google SDK not initialized"));
//     }

//     tokenClient.callback = (tokenResponse) => {
//       if (tokenResponse?.access_token) {
//         resolve(tokenResponse.access_token);
//       } else {
//         reject(new Error("Failed to get Google token"));
//       }
//     };

//     try {
//       tokenClient.requestAccessToken();
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// let resolveToken = null;
// let rejectToken = null;

// export const initializeGoogleSDK = () => {
//   if (document.getElementById("google-client-sdk")) return;

//   const script = document.createElement("script");
//   script.id = "google-client-sdk";
//   script.src = "https://accounts.google.com/gsi/client";
//   script.async = true;
//   script.defer = true;

//   script.onload = () => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//         callback: (response) => {
//           if (resolveToken && response.credential) {
//             resolveToken(response.credential);
//             cleanup();
//           } else {
//             console.error("❌ No credential received", response);
//             if (rejectToken) {
//               rejectToken(new Error("No credential received"));
//               cleanup();
//             }
//           }
//         },
//         ux_mode: "popup",
//       });
//     } else {
//       console.error("❌ Google SDK loaded but window.google is undefined");
//     }
//   };

//   document.body.appendChild(script);
// };

// const cleanup = () => {
//   resolveToken = null;
//   rejectToken = null;
// };

// export const getGoogleIdToken = () => {
//   return new Promise((resolve, reject) => {
//     if (!window.google?.accounts?.id) {
//       console.error("❌ Google SDK not initialized");
//       return reject(new Error("Google SDK not initialized"));
//     }

//     resolveToken = resolve;
//     rejectToken = reject;

//     window.google.accounts.id.prompt((notification) => {
//       if (notification.isSkippedMoment()) {
//         reject(new Error("User skipped sign-in"));
//         cleanup();
//       } else if (notification.isNotDisplayed()) {
//         reject(new Error("Prompt not displayed (popup blocked?)"));
//         cleanup();
//       }
//     });
//   });
// };

// let resolveToken = null;

// export const initializeGoogleSDK = () => {
//   if (document.getElementById("google-client-sdk")) return;

//   const script = document.createElement("script");
//   script.id = "google-client-sdk";
//   script.src = "https://accounts.google.com/gsi/client";
//   script.async = true;
//   script.defer = true;

//   script.onload = () => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//         callback: (response) => {
//           if (resolveToken && response.credential) {
//             resolveToken(response.credential);
//             resolveToken = null;
//           } else {
//             console.error("❌ No credential received", response);
//           }
//         },
//         ux_mode: "popup",
//       });
//     } else {
//       console.error("❌ Google SDK loaded but window.google is undefined");
//     }
//   };

//   document.body.appendChild(script);
// };

// export const getGoogleIdToken = () => {
//   return new Promise((resolve, reject) => {
//     if (!window.google?.accounts?.id) {
//       console.error("❌ Google SDK not initialized");
//       return reject("Google SDK not initialized");
//     }

//     resolveToken = resolve;

//     // This MUST be triggered directly after a user click
//     window.google.accounts.id.prompt((notification) => {
//       if (notification.isSkippedMoment()) {
//         reject("User skipped");
//         resolveToken = null;
//       }
//       if (notification.isNotDisplayed()) {
//         reject("Prompt not displayed");
//         resolveToken = null;
//       }
//     });
//   });
// };
