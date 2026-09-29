const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const files = ['index.html','app.js','translation.js','sections.js','styles.css','assets','data','media'];
for (const file of files) {
  if (!fs.existsSync(path.join(root,file))) throw new Error('Missing required site file: '+file);
}
const payload = JSON.parse(fs.readFileSync(path.join(root,'data/materials.json'),'utf8'));
if (!payload.materials?.length) throw new Error('Material catalog is empty');
for (const material of payload.materials) for (const asset of material.media || []) {
  if (!fs.existsSync(path.join(root,decodeURIComponent(asset.src)))) throw new Error('Missing media: '+asset.src);
}
fs.mkdirSync(output,{recursive:true});
for (const file of files) fs.cpSync(path.join(root,file),path.join(output,file),{recursive:true});
console.log('Static site ready: '+payload.materials.length+' materials. Translation module and media included.');
