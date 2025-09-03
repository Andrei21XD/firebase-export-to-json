// ExportToJson.js
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Service Account JSON
admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json")),
});

const db = admin.firestore();

const COLLECTION = "containers"; // e.g. "users"
const DOC_ID = "lfRZsXIQ0djzK7vTYKch";  // document ID

async function exportDocumentWithSubcollections(ref) {
  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new Error(`Document ${ref.path} does not exist`);
  }

  const data = snapshot.data();
  const plainDoc = {};
  for (const [key, val] of Object.entries(data)) {
    if (val && typeof val.toDate === "function") {
      plainDoc[key] = val.toDate().toISOString();
    } else {
      plainDoc[key] = val;
    }
  }

  const subcollections = await ref.listCollections();
  for (const sub of subcollections) {
    const subSnap = await sub.get();
    const subDocs = [];
    subSnap.forEach((doc) => {
      const d = doc.data();
      const plainSubDoc = {};
      for (const [k, v] of Object.entries(d)) {
        if (v && typeof v.toDate === "function") {
          plainSubDoc[k] = v.toDate().toISOString();
        } else {
          plainSubDoc[k] = v;
        }
      }
      subDocs.push({ id: doc.id, ...plainSubDoc });
    });
    plainDoc[sub.id] = subDocs; 
  }

  return plainDoc;
}

async function run() {
  try {
    const ref = db.collection(COLLECTION).doc(DOC_ID);
    const result = await exportDocumentWithSubcollections(ref);

    const exportDir = path.join(__dirname, "ExportJson");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const outFile = path.join(exportDir, `${COLLECTION}_${DOC_ID}.json`);
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2), "utf8");

    console.log(`Exported to ${outFile}`);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

run();
