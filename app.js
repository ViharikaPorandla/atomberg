const BACKEND = "https://atomberg-backend.onrender.com"; // change this
let accessToken = "";

const log = msg =>
  document.getElementById("log").textContent = msg;

async function getAccessToken() {
  const res = await fetch(`${BACKEND}/access-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: apiKey.value,
      refreshToken: refreshToken.value
    })
  });

  const data = await res.json();
  accessToken = data.access_token;
  log("Access token generated");
}

async function loadDevices() {
  const res = await fetch(`${BACKEND}/devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: apiKey.value,
      accessToken
    })
  });

  const devices = await res.json();
  devicesSelect.innerHTML = "";

  devices.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.device_id;
    opt.textContent = d.name;
    devices.appendChild(opt);
  });
}

async function loadState() {
  const res = await fetch(`${BACKEND}/device/${devices.value}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: apiKey.value,
      accessToken
    })
  });

  const s = await res.json();
  state.innerText = `Power: ${s.power}, Speed: ${s.speed}`;
}

async function sendCommand(command, value) {
  if (!value) return;

  await fetch(`${BACKEND}/command/${devices.value}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: apiKey.value,
      accessToken,
      command,
      value: Number(value)
    })
  });

  loadState();
}
