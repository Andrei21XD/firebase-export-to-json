# Firestore Document Exporter

[![Node.js](https://img.shields.io/badge/node-%3E%3D14-brightgreen)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/firebase-admin-orange)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A Node.js script to export a Firebase Firestore document (with subcollections) into a JSON file.  
Useful for quick backups and data migration.


## 📦 Features
- Exports a document by `COLLECTION` and `DOC_ID`.
- Includes all subcollections of the document (as arrays of objects).
- Automatically converts Firestore `Timestamp` fields into ISO date strings (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- Saves the output in a local `ExportJson` folder.

## 🛠️ Installation
1. Clone the repository or copy the `exportDoc.js` file.
2. Install dependencies:
   ```bash
   npm install firebase-admin

Add your Firebase Service Account JSON file:
/serviceAccountKey.json

🚀 Usage
Edit the variables inside the script:

const COLLECTION = "containers";   // e.g. "users"

const DOC_ID = "lfRZsXIQ0djzK7vTYKch";  // document ID

Run the script:

node exportDoc.js

📂 Output
A JSON file will be created inside the ExportJson/ directory:

ExportJson/containers_lfRZsXIQ0djzK7vTYKch.json

⚠️ Notes

The script currently exports the document and its direct subcollections only.
Nested subcollections (sub-subcollections) are not included unless the script is extended recursively.


