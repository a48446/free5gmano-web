import { startRegistration } from "@simplewebauthn/browser";
import { startAuthentication } from "@simplewebauthn/browser";


// const { startRegistration, startAuthentication } = SimpleWebAuthnBrowser;

// Registration

// Authentication

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
export async function registerFido(name) {
  console.log("我在註冊");
  // const statusRegister = document.getElementById("statusRegister");
  // const dbgRegister = document.getElementById("dbgRegister");
  // resetStatus(statusRegister);
  // resetDebug(dbgRegister);

  console.log(name);

  // Get options
  const resp = await fetch("/generate-registration-options");
  const opts = await resp.json();
  // // printToDebug(
  //   dbgRegister,
  //   "Registration Options",
  //   JSON.stringify(opts, null, 2)
  // );

  // Start WebAuthn Registration
  let regResp;

  console.log(opts);
  opts.pubKeyCredParams.push(
    { type: "public-key", alg: -8 },
    { type: "public-key", alg: -257 },
    { type: "public-key", alg: -258 },
    { type: "public-key", alg: -259 },
    { type: "public-key", alg: -36 },
    { type: "public-key", alg: -37 },
    { type: "public-key", alg: -38 },
    { type: "public-key", alg: -39 }
  );
  try {
    regResp = await startRegistration(opts);
    console.log(regResp);
    // printToDebug(dbgRegister, "測試測試", JSON.stringify(regResp, null, 2));
  } catch (err) {
    // printToStatus(statusRegister, getFailureStatus(err));
    console.log(err);
    if (
      err.toString().includes("The authenticator was previously registered")
    ) {
      alert("已註冊過此驗證");
    }

    throw new Error(err);
  }

  regResp.transports.push("internal");
  // console.log(JSON.stringify(regResp));
  // Send response to server
  console.log(regResp);
  const verificationResp = await fetch("/verify-registration-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(regResp),
  });

  console.log(verificationResp);

  // Report validation response
  const verificationRespJSON = await verificationResp.json();
  console.log(verificationRespJSON);
  const { verified, msg } = verificationRespJSON;
  console.log(verified, msg);
  if (verificationRespJSON.verified) {

    alert("註冊成功");

  } else {
    alert("註冊失敗");
  }
  // if (verified) {
  //   printToStatus(statusRegister, getPassStatus());
  // } else {
  //   printToStatus(statusRegister, getFailureStatus());
  // }
  // printToDebug(
  //   dbgRegister,
  //   "Verification Response",
  //   JSON.stringify(verificationRespJSON, null, 2)
  // );
}
// document
//   .getElementById("btnRegister")
//   .addEventListener("click", async () => {});

/**
 * Authenticate Button
 */
export async function authenticate() {
  console.log("我在驗證");
  // const statusAuthenticate = document.getElementById("statusAuthenticate");
  // const dbgAuthenticate = document.getElementById("dbgAuthenticate");

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
  console.log(verified, msg);
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
}
// document
//   .getElementById("btnAuthenticate")
//   .addEventListener("click", async () => {});
