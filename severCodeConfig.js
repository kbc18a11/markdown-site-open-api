const fs = require('fs');

const serverCodeDirPath = './serverCode/'

const deleteDirsPathList = [
  '.docs',
  '.openapi-generator',
  'handlers',
];

const deleteFilesNameList = [
  '.openapi-generator-ignore',
  'Dockerfile',
  'go.mod',
  'main.go',
  'README.md'
];

// ディレクトリの削除
for (const path of deleteDirsPathList) {
  try {
    fs.rmdirSync(serverCodeDirPath + path, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

// ファイル削除
for (const path of deleteFilesNameList) {
  try {
    fs.unlinkSync(serverCodeDirPath + path);
  } catch (error) {
    console.error(error);
  }
}

// リクエスト,レスポンススキーマファイルがあるディレクトリ名の修正
try {
  fs.renameSync(serverCodeDirPath + 'models', serverCodeDirPath + 'schemas');
} catch (error) {
  console.log(error);
}

// ファイルのpackage名の修正
for (const file of fs.readdirSync(serverCodeDirPath + 'schemas')) {
  // ファイルの内容を取得し、１行目を修正
  const newFileContent
    = fs
      .readFileSync(`${serverCodeDirPath}schemas/${file}`)
      .toString()
      // １行目のpackage名を修正
      .replace('package models', 'package schemas');

  // 修正後のファイルの内容を書き込み 
  fs.writeFileSync(`${serverCodeDirPath}schemas/${file}`, newFileContent);
}
