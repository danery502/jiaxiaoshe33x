/* =========================================================
 * 数据库初始化脚本（CloudBase 云数据库）
 * 作用：
 *   1) 创建所需集合：users / tasks / classes / jobs / signups /
 *      records / evaluations / meta
 *   2) 首次运行时写入示例数据（与前端 seed 一致），便于直接验收
 * 用法（需在已配置 CloudBase 环境变量的机器/CI 上执行）：
 *   TCB_ENV=your-env-id CLOUDBASE_APIKEY=xxxxx node init-db.js
 * 也可通过 CloudBase 云托管「环境变量」注入后，在容器中执行：
 *   node init-db.js
 * ========================================================= */
'use strict';
const cloudbase = require('@cloudbase/node-sdk');

function initCloudBase() {
  const env = process.env.TCB_ENV || process.env.CLOUDBASE_ENV || process.env.ENV_ID;
  if (!env) throw new Error('缺少 TCB_ENV 环境变量（CloudBase 环境 ID）');
  const opts = { env };
  if (process.env.CLOUDBASE_APIKEY) opts.accessKey = process.env.CLOUDBASE_APIKEY;
  else if (process.env.TENCENTCLOUD_SECRETID && process.env.TENCENTCLOUD_SECRETKEY) {
    opts.secretId = process.env.TENCENTCLOUD_SECRETID;
    opts.secretKey = process.env.TENCENTCLOUD_SECRETKEY;
  }
  return cloudbase.init(opts);
}

// 与前端 seed() 一致的示例数据（教学演示用，可在控制台随时删除）
const SAMPLE = {
  tasks: [
    { id: 'T101', name: '劳动最光荣——认识身边的劳动工具', grade: '1', cls: '全年级', layer: '课堂认知层', duration: 40, deadline: '2026-10-30', desc: '在课堂上认识常见劳动工具，说一说它们的用途，树立“劳动最光荣”的观念。', status: '已发布', dims: null, createdAt: '2026-10-08' },
    { id: 'T102', name: '我是家庭小帮手——整理自己的小房间', grade: '3', cls: '3年级2班', layer: '家庭实践层', duration: 30, deadline: '2026-10-25', desc: '独立整理床铺、书桌和玩具，拍照记录劳动前后对比（记得遮挡面部）。', status: '已发布', dims: null, createdAt: '2026-10-09' },
    { id: 'T103', name: '社区清洁我参与——捡拾垃圾分类投放', grade: '5', cls: '5年级3班', layer: '社区服务层', duration: 60, deadline: '2026-11-05', desc: '在家长陪同下参与社区清洁，正确分类投放垃圾，记录服务时长。', status: '已发布', dims: null, createdAt: '2026-10-10' }
  ],
  jobs: [
    { id: 'J201', name: '社区图书角整理小管家', org: '霞山社区服务中心', address: '社区党群服务中心二楼图书角', time: '每周六 9:00-11:00', need: 5, signed: 2, fit: '3-5年级', type: '公益服务', skills: '会简单整理归类、认真细心', safety: '听从社区工作人员安排，不攀爬书架。', contact: '李阿姨 13800001234', deadline: '2026-10-24', status: '招募中', owner: '社区管理员', images: [], createdAt: '2026-10-09' },
    { id: 'J202', name: '敬老院陪伴慰问小使者', org: '夕阳红敬老院', address: '人民大道南 68 号', time: '周日上午 9:30-11:00', need: 8, signed: 8, fit: '4-6年级', type: '志愿服务', skills: '主动打招呼、会表演小节目更佳', safety: '由家长接送，不在院内追逐打闹。', contact: '张叔叔 13800005678', deadline: '2026-10-20', status: '已满员', owner: '社区管理员', images: [], createdAt: '2026-10-09' }
  ],
  signups: [
    { id: 'S301', jobId: 'J201', jobName: '社区图书角整理小管家', student: '王小明', cls: '3年级2班', status: '服务完成', createdAt: '2026-10-10' }
  ],
  records: [
    { id: 'R401', student: '王小明', cls: '3年级2班', school: '湛江市第三十三小学', taskName: '我是家庭小帮手——整理自己的小房间', layer: '家庭实践层', source: 'task', taskId: 'T102', duration: 30, date: '2026-10-11', desc: '独立整理了床铺和书桌，把绘本分类放好。', media: [], status: '已确认', ai: null, uploader: '家长' },
    { id: 'R402', student: '王小明', cls: '3年级2班', school: '湛江市第三十三小学', taskName: '社区图书角整理小管家', layer: '社区服务层', source: 'job', jobId: 'J201', duration: 120, date: '2026-10-12', desc: '周六上午在社区图书角帮忙整理绘本，按颜色分类摆放。', media: [], status: '已确认', ai: null, uploader: '社区' },
    { id: 'R403', student: '李小红', cls: '5年级3班', school: '湛江市第三十三小学', taskName: '社区清洁我参与——捡拾垃圾分类投放', layer: '社区服务层', source: 'task', taskId: 'T103', duration: 60, date: '2026-10-11', desc: '和妈妈一起在小区花园捡拾垃圾并分类投放。', media: [], status: '待审核', ai: null, uploader: '家长' }
  ],
  evals: [
    { id: 'E501', recordId: 'R401', role: '学生', stars: 4, comment: '我把房间收拾得很整齐！', author: '王小明', createdAt: '2026-10-11' },
    { id: 'E502', recordId: 'R401', role: '家长', stars: 5, comment: '孩子独立完成整理，很有责任心，继续保持！', author: '王小明家长', createdAt: '2026-10-11' },
    { id: 'E503', recordId: 'R401', role: '教师', stars: 4, comment: '居家劳动习惯初步养成，建议下次尝试帮忙做简单饭菜。', author: '班主任', createdAt: '2026-10-12' },
    { id: 'E504', recordId: 'R402', role: '社区', stars: 5, comment: '认真负责，图书角焕然一新，感谢小管家的付出！', author: '社区管理员', createdAt: '2026-10-12' },
    { id: 'E505', recordId: 'R402', role: '学生', stars: 5, comment: '大家夸我摆得整齐，我很开心！', author: '王小明', createdAt: '2026-10-12' }
  ]
};

const COLLECTIONS = ['users', 'tasks', 'classes', 'jobs', 'signups', 'records', 'evaluations', 'meta'];

async function main() {
  const app = initCloudBase();
  const db = app.database();

  // 1) 创建集合（已存在则忽略错误）
  for (const name of COLLECTIONS) {
    try {
      const r = await db.createCollection(name);
      console.log('✓ 集合创建/已存在：', name, r.code || '');
    } catch (e) {
      console.log('· 集合', name, '跳过：', e.message);
    }
  }

  // 2) 若已初始化（meta.global 存在），则不再重复播种
  const metaRes = await db.collection('meta').where({ id: 'global' }).get();
  if (metaRes.data && metaRes.data.length) {
    console.log('ℹ️ 数据库已初始化（meta.global 存在），跳过示例数据写入。');
    return;
  }

  // 3) 写入 meta 初始化标记 + seq 计数器
  await db.collection('meta').add({ id: 'global', init: true, seq: 100, note: '家校社平台初始化标记' });
  console.log('✓ 写入 meta 初始化标记');

  // 4) 写入示例数据
  for (const t of SAMPLE.tasks) await db.collection('tasks').add(t);
  for (const j of SAMPLE.jobs) await db.collection('jobs').add(j);
  for (const s of SAMPLE.signups) await db.collection('signups').add(s);
  for (const r of SAMPLE.records) await db.collection('records').add(r);
  for (const e of SAMPLE.evals) await db.collection('evaluations').add(e);
  console.log('✓ 示例数据写入完成（tasks/jobs/signups/records/evaluations）');

  console.log('\n🎉 数据库初始化完成！可在浏览器打开平台，用学校管理端（密码 33x1234）发布任务验证。');
}

main().catch(e => { console.error('初始化失败：', e); process.exit(1); });
