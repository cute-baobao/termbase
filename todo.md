根据你的功能清单和痛点分析，我来为你制定一个 MVP 版本的详细 TodoList。按照依赖关系和优先级排序：

## 📋 术语库 MVP TodoList

### 🏗️ Phase 1: 基础架构 (Week 1)

#### 1.1 数据库设计
- [X] 设计数据库 Schema (Prisma)
  - [X] `users` 表 (id, email, password_hash, role, created_at)
  - [X] `termbases` 表 (id, name, description, owner_id, is_deleted, created_at)
  - [X] `termbase_permissions` 表 (id, termbase_id, user_id, role)
  - [X] `terms` 表 (id, termbase_id, source_text, target_text, context, created_by, updated_at)
  - [ ] `invitations` 表 (id, termbase_id, email, token, role, expires_at)
- [X] 初始化 Prisma 配置
- [X] 创建 migration 文件

#### 1.2 认证系统
- [X] 使用cookie保存登陆状态, 使用jwt加密(@/lib/utils/jwt)
- [X] 创建session中间件 (`src/lib/middleware/sessionMiddleware.ts`)
- [X] 修复并完善登录/注册 API
  - [X] 密码哈希处理 (bcrypt)
  - [X] 输入验证 (zod)
  - [ ] 错误处理统一化

### 🔐 Phase 2: 用户系统 (Week 1-2)

#### 2.1 用户注册/登录
- [X] 注册页面 UI (`/sign-up`)
  - [X] 表单验证 (email format, 密码强度)
  - [X] 成功/错误状态处理
- [X] 登录页面 UI (`/sign-in`)
  - [ ] 记住我功能
  - [ ] 重定向逻辑
- [X] 用户状态管理
  - [X] Context Provider 或 Zustand
  - [X] 路由保护 HOC

#### 2.2 找回密码 (可后置)
- [ ] 邮件配置 (nodemailer)
- [ ] 重置密码流程
- [ ] 重置密码页面

### 📚 Phase 3: 术语库管理 (Week 2)

#### 3.1 术语库 CRUD
- [ ] 术语库列表页 (`/dashboard`)
  - [ ] 我的术语库 + 共享给我的
  - [ ] 创建新库按钮
  - [ ] 库的基本信息展示
- [ ] 创建术语库 API (`POST /api/termbases`)
- [ ] 创建术语库对话框
  - [ ] 名称、描述输入
  - [ ] 创建后自动跳转
- [ ] 重命名/删除功能
  - [ ] 软删除实现
  - [ ] 确认对话框

#### 3.2 权限系统
- [ ] 权限检查中间件
- [ ] 术语库权限 API
  - [ ] 获取库权限列表
  - [ ] 修改用户权限
  - [ ] 移除用户权限

### 👥 Phase 4: 邀请协作 (Week 2-3)

#### 4.1 邀请流程
- [ ] 邀请 API (`POST /api/termbases/:id/invitations`)
  - [ ] 生成邀请 token
  - [ ] 发送邮件邀请
- [ ] 邀请页面 UI
  - [ ] 输入邮箱和权限级别
  - [ ] 批量邀请支持
- [ ] 接受邀请流程 (`/invite/:token`)
  - [ ] Token 验证
  - [ ] 自动注册/登录绑定

#### 4.2 成员管理
- [ ] 成员列表页面
  - [ ] 显示用户权限
  - [ ] 权限修改/移除操作

### 📝 Phase 5: 术语 CRUD (Week 3-4)

#### 5.1 术语列表和详情
- [ ] 术语库详情页 (`/termbases/:id`)
  - [ ] 术语列表展示
  - [ ] 分页功能
  - [ ] 权限控制 (readonly/edit)
- [ ] 术语 CRUD API
  - [ ] 创建术语 (`POST /api/termbases/:id/terms`)
  - [ ] 更新术语 (`PUT /api/terms/:id`)
  - [ ] 删除术语 (`DELETE /api/terms/:id`)

#### 5.2 单条术语编辑
- [ ] 新增术语对话框
  - [ ] 源文本/目标文本输入
  - [ ] 上下文/备注字段
- [ ] 编辑术语功能
  - [ ] 行内编辑或弹窗编辑
  - [ ] 实时保存或手动保存

### 🔍 Phase 6: 即时搜索 (Week 4)

#### 6.1 搜索功能
- [ ] 搜索 API (`GET /api/termbases/:id/search`)
  - [ ] 模糊匹配实现 (LIKE 或 FTS)
  - [ ] 源文本↔目标文本双向搜索
  - [ ] 性能优化 (索引)
- [ ] 搜索 UI 组件
  - [ ] 全局搜索框
  - [ ] 200ms debounce
  - [ ] 搜索结果高亮
  - [ ] 快捷键支持 (`/`)

#### 6.2 搜索优化
- [ ] 大小写不敏感搜索
- [ ] 通配符支持 (*)
- [ ] 搜索性能监控

### 📤 Phase 7: 导入导出 (Week 4-5)

#### 7.1 导出功能
- [ ] CSV 导出 API
- [ ] 导出按钮和下载
- [ ] 导出格式标准化

#### 7.2 导入功能
- [ ] 文件上传组件
- [ ] CSV 解析和验证
- [ ] 列映射 UI
  - [ ] 自动检测 + 手动调整
  - [ ] 预览前 10 条数据
- [ ] 批量导入 API
- [ ] 导入结果反馈

### 🎨 Phase 8: UI/UX 优化 (Week 5)

#### 8.1 响应式设计
- [ ] 移动端适配
- [ ] 布局优化

#### 8.2 用户体验
- [ ] Loading 状态
- [ ] 错误边界处理
- [ ] 成功操作反馈
- [ ] 键盘快捷键

---

## 🚀 技术实现优先级

### 立即开始 (本周)
1. **数据库 Schema 设计** - 架构基础
2. **JWT 认证完善** - 安全基础
3. **注册/登录页面** - 用户入口

### 下周重点
1. **术语库 CRUD** - 核心功能
2. **权限系统** - 协作基础
3. **基础搜索** - 最大痛点

### 后续迭代
1. **邀请流程** - 协作体验
2. **导入导出** - 数据迁移
3. **UI 优化** - 用户体验

## 📊 MVP 成功指标

- [ ] 单个术语库支持 1000+ 条术语
- [ ] 搜索响应时间 < 300ms
- [ ] 支持 3 种权限级别协作
- [ ] CSV 导入成功率 > 95%
- [ ] 移动端基本可用

这个计划大约需要 **4-5 周**完成 MVP，你觉得这个优先级排序如何？需要调整哪些部分的优先级吗？