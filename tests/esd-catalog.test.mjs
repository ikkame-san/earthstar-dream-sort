import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {SONGS} from '../songs.js';
import {filterCatalog} from '../catalog.js';
const audit=JSON.parse(await readFile(new URL('../catalog-audit.json',import.meta.url),'utf8'));
test('all official release and video candidates are accounted for',()=>{
 const ids=new Set(SONGS.map(s=>s.id));
 for(const r of [...audit.releases,...audit.videos]){
  assert.ok(['included','merged','excluded','review'].includes(r.status));
  if(r.status==='included'||r.status==='merged')assert.ok(ids.has(r.songId),r.title);
  else assert.ok(r.reason);
 }
 assert.ok(audit.channels.every(c=>c.complete));assert.equal(audit.pending.length,0);
 for(const s of SONGS)assert.ok(audit.releases.some(r=>r.songId===s.id));
 for(const [id,count] of [[5393,11],[5395,13],[5351,5]])assert.equal(audit.releases.filter(r=>r.source==='https://www.earthstar.co.jp/service/detail/item-'+id+'/').length,count);
 assert.equal(audit.partialAppleReleases.length,2);
});
test('solo and unit filters are independent and default off',()=>{
 const base=filterCatalog(SONGS),solos=SONGS.filter(s=>s.solo),units=SONGS.filter(s=>s.unit);
 assert.equal(solos.length,9);assert.equal(units.length,2);
 assert.ok(base.every(s=>!s.solo&&!s.unit));
 assert.equal(filterCatalog(SONGS,{includeSolo:true}).length,base.length+solos.length);
 assert.equal(filterCatalog(SONGS,{includeUnits:true}).length,base.length+units.length);
 assert.equal(filterCatalog(SONGS,{includeSolo:true,includeUnits:true}).length,SONGS.length);
 for(const title of ['ブラッドタイプ☆ハートビート','ハッピー∞エフェクト','Diamond Soul','Fan Fanfare!!!'])assert.ok(base.some(s=>s.title===title));
 for(const title of ['青春サーフDays','走れ！うさかめ高校テニス部！！'])assert.ok(base.some(s=>s.title===title),title+' should be visible by default');
 assert.ok(units.some(s=>s.title==='スマイル♡インビテーション'));
});
test('earliest ESD release dates are retained; TV/live versions do not duplicate songs',()=>{
 assert.equal(SONGS.find(s=>s.title==='とってもサファリ').date,'2015-11-25');
 assert.equal(SONGS.find(s=>s.title==='ファッとして桃源郷').date,'2016-02-10');
 assert.equal(SONGS.find(s=>s.title==='メニメニマニマニ').date,'2017-06-14');
 assert.equal(SONGS.filter(s=>s.title==='青春サーフDays').length,1);
 assert.ok(SONGS.every(s=>!/instrumental|TVバージョン|メドレー|2周年記念ライブ/i.test(s.title)));
});
test('every heading in the user-confirmed live repertoire is represented, including unreleased covers',()=>{
 const rows=audit.releases.filter(r=>r.source===audit.repertoire.source);
 assert.equal(rows.length,31);assert.equal(audit.repertoire.addedSongIds.length,10);
 assert.ok(rows.every(r=>['included','merged'].includes(r.status)));
 const added=SONGS.filter(s=>audit.repertoire.addedSongIds.includes(s.id));
 assert.equal(added.length,10);
 for(const song of added){
  assert.ok(filterCatalog(SONGS).includes(song));assert.equal(song.dateKind,'unknown');assert.equal(song.date,'');
  assert.equal(song.artwork,undefined);assert.equal(song.video,undefined);
 }
 for(const title of ['Take you to My PARTY!!','Dreamin’×Dreamin’!!','Eternal Stage ～アース・スター ドリームver.～','ツッパリくんvs関取マン','ばいたる☆エクササイズ','夏色プレゼント','Sweet berry, Strawberry','girl meets DEADLINE','毎日☆まんがーる!','cocoiro rainbow'])assert.ok(added.some(s=>s.title===title),title);
 assert.equal(SONGS.filter(s=>s.title==='Diamond Soul').length,1);
 assert.equal(SONGS.filter(s=>s.title==='スタッカートデイズ').length,1);
});
test('video links use verified channels and do not substitute group audio for solos',()=>{
 const channels=new Set(audit.channels.map(c=>c.channelId));
 for(const song of SONGS.filter(s=>s.video)){
  const row=audit.videos.find(v=>v.id===song.video.id);
  assert.ok(row&&channels.has(row.channelId));assert.equal(row.songId,song.id);
 }
 assert.ok(SONGS.filter(s=>s.solo).every(s=>!s.video));
 assert.equal(SONGS.find(s=>s.title.startsWith('君色に染まる')).video.id,'fp8gZ69bPmk');
 assert.equal(audit.videos.find(v=>v.id==='2N7vd2QRvGc').status,'excluded');
 assert.ok(SONGS.every(s=>s.title!=='叭喇撃突ケ響'));
});
