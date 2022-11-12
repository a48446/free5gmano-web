const { startRegistration, startAuthentication } = SimpleWebAuthnBrowser;

console.log(SimpleWebAuthnBrowser);

// Registration
// const statusRegister = document.getElementById("statusRegister");
// const dbgRegister = document.getElementById("dbgRegister");

// // Authentication
// const statusAuthenticate = document.getElementById("statusAuthenticate");
// const dbgAuthenticate = document.getElementById("dbgAuthenticate");

/**
 * Helper methods
 */

// function printToDebug(elemDebug, title, output) {
//   if (elemDebug.innerHTML !== "") {
//     elemDebug.innerHTML += "\n";
//   }
//   elemDebug.innerHTML += `// ${title}\n`;
//   elemDebug.innerHTML += `${output}\n`;
// }

// function resetDebug(elemDebug) {
//   elemDebug.innerHTML = "";
// }

// function printToStatus(elemStatus, output) {
//   elemStatus.innerHTML = output;
// }

// function resetStatus(elemStatus) {
//   elemStatus.innerHTML = "";
// }

// function getPassStatus() {
//   return "註冊成功";
// }

// function getPassStatus2() {
//   return "驗證成功";
// }

// function getFailureStatus(message) {
//   return `失敗 (Reason: ${message})`;
// }

/**
 * Register Button
 */
document.getElementById("btnRegister").addEventListener("click", async () => {
  // resetStatus(statusRegister);
  // resetDebug(dbgRegister);

  // Get options
  let account = document.getElementById("username").value;
  console.log(account);
  const accountRes = await fetch("/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ account: account }),
  });
  console.log(accountRes);

  const resp = await fetch("/generate-registration-options");
  const opts = await resp.json();
  // printToDebug(
  //   dbgRegister,
  //   "Registration Options",
  //   JSON.stringify(opts, null, 2)
  // );

  // Start WebAuthn Registration
  let regResp;
  try {
    regResp = await startRegistration(opts);
    // printToDebug(
    //   dbgRegister,
    //   "測試測試",
    //   JSON.stringify(regResp, null, 2),
    // );
  } catch (err) {
    // printToStatus(statusRegister, getFailureStatus(err));
    if (
      err
        .toString()
        .includes(
          "The user attempted to register an authenticator that contains one of the credentials already registered with the relying party."
        )
    ) {
      alert("此帳號已被註冊過");
    }

    throw new Error(err);
  }

  // Send response to server
  const verificationResp = await fetch("/verify-registration-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(regResp),
  });

  // Report validation response
  const verificationRespJSON = await verificationResp.json();
  console.log(verificationRespJSON);
  const { verified, msg } = verificationRespJSON;
  console.log(msg);
  // if (verified) {
  //   printToStatus(statusRegister, getPassStatus());
  // } else {
  //   printToStatus(statusRegister, getFailureStatus(err));
  // }
  // printToDebug(
  //   dbgRegister,
  //   "Verification Response",
  //   JSON.stringify(verificationRespJSON, null, 2)
  // );
});

/**
 * Authenticate Button
 */
document
  .getElementById("btnAuthenticate")
  .addEventListener("click", async () => {
    // resetStatus(statusAuthenticate);
    // resetDebug(dbgAuthenticate);

    // Get options
    const resp = await fetch("/generate-authentication-options");
    const opts = await resp.json();

    // printToDebug(
    //   dbgAuthenticate,
    //   "Authentication Options",
    //   JSON.stringify(opts, null, 2)
    // );

    // Start WebAuthn Authentication
    let authResp;
    try {
      authResp = await startAuthentication(opts);
      // printToDebug(
      //   dbgAuthenticate,
      //   "Authentication Response",
      //   JSON.stringify(authResp, null, 2)
      // );
    } catch (err) {
      // printToStatus(statusAuthenticate, getFailureStatus(err));
      throw new Error(err);
    }

    // Send response to server
    const verificationResp = await fetch("/verify-authentication-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authResp),
    });

    // Report validation response
    const verificationRespJSON = await verificationResp.json();
    const { verified, msg } = verificationRespJSON;
    if (verified) {
      alert("帳號驗證成功");
    }
    console.log(verificationRespJSON);
    // if (verified) {
    //   printToStatus(statusAuthenticate, getPassStatus2());
    // } else {
    //   printToStatus(statusAuthenticate, getFailureStatus(err));
    // }
    // printToDebug(
    //   dbgAuthenticate,
    //   "Verification Response",
    //   JSON.stringify(verificationRespJSON, null, 2)
    // );
  });
