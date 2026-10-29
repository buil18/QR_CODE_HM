#!/usr/bin/env node
/**
 * Đồng bộ danh sách kho & vị trí giữa data/vi-tri-kho.json và index.html.
 *
 *   node tools/sync-seed.mjs             JSON  -> index.html  (mặc định)
 *   node tools/sync-seed.mjs --extract   index.html -> JSON
 *   node tools/sync-seed.mjs --check     chỉ kiểm tra hai bên có khớp nhau không
 *
 * Không cần cài gì thêm, chạy bằng Node 18 trở lên.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(root, 'index.html');
const jsonPath = join(root, 'data', 'vi-tri-kho.json');
const SEED_RE = /(<script id="seedData"[^>]*>)([\s\S]*?)(<\/script>)/;

const mode = process.argv.includes('--extract') ? 'extract'
  : process.argv.includes('--check') ? 'check'
  : 'inject';

const html = readFileSync(htmlPath, 'utf8');
const match = html.match(SEED_RE);
if (!match) {
  console.error('Không tìm thấy khối <script id="seedData"> trong index.html');
  process.exit(1);
}

const fromHtml = JSON.parse(match[2]);
const total = (s) => s.warehouses.reduce((n, w) => n + w.codes.length, 0);

if (mode === 'extract') {
  writeFileSync(jsonPath, JSON.stringify(fromHtml, null, 2) + '\n');
  console.log(`Đã ghi data/vi-tri-kho.json — phiên bản ${fromHtml.version}, ` +
    `${fromHtml.warehouses.length} kho, ${total(fromHtml)} vị trí.`);
  process.exit(0);
}

const fromJson = JSON.parse(readFileSync(jsonPath, 'utf8'));
if (!Array.isArray(fromJson.warehouses) || !fromJson.warehouses.length) {
  console.error('data/vi-tri-kho.json không có danh sách kho nào.');
  process.exit(1);
}

const ids = new Set();
for (const w of fromJson.warehouses) {
  if (!w.id || !w.name || !Array.isArray(w.codes)) {
    console.error(`Kho thiếu id/name/codes: ${JSON.stringify(w).slice(0, 80)}`);
    process.exit(1);
  }
  if (ids.has(w.id)) {
    console.error(`Trùng id kho: ${w.id}`);
    process.exit(1);
  }
  ids.add(w.id);
}

const compact = JSON.stringify(fromJson).replace(/</g, '\\u003c');

if (mode === 'check') {
  const same = JSON.stringify(fromHtml) === JSON.stringify(fromJson);
  console.log(same
    ? `Khớp — phiên bản ${fromJson.version}, ${total(fromJson)} vị trí.`
    : `LỆCH — index.html đang ở phiên bản ${fromHtml.version} (${total(fromHtml)} vị trí), ` +
      `JSON ở phiên bản ${fromJson.version} (${total(fromJson)} vị trí). ` +
      `Chạy "node tools/sync-seed.mjs" để ghi JSON vào index.html.`);
  process.exit(same ? 0 : 1);
}

if (fromJson.version <= fromHtml.version) {
  console.warn(`Cảnh báo: version trong JSON (${fromJson.version}) không lớn hơn ` +
    `version đang nằm trong index.html (${fromHtml.version}). ` +
    `Máy nào đã mở app trước đó sẽ KHÔNG nhận danh sách mới.`);
}

writeFileSync(htmlPath, html.replace(SEED_RE, (_m, a, _mid, c) => `${a}\n${compact}\n${c}`));
console.log(`Đã ghi vào index.html — phiên bản ${fromJson.version}, ` +
  `${fromJson.warehouses.length} kho, ${total(fromJson)} vị trí.`);
