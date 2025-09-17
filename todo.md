根据你的功能清单和痛点分析，我来为你制定一个 MVP 版本的详细 TodoList。按照依赖关系和优先级排序：

## 📋 术语库 MVP TodoList

### 🏗️ Phase 1: 基础架构 (Week 1)

#### 1.1 数据库设计
- [X] 设计数据库 Schema (Prisma)
  - [X] `User` 表 (id, username, email, password, globalRole, created_at)
  - [X] `Workspace` 表 (id, name, ownerId, created_at, updated_at)
  - [X] `WorkspaceMember` 表 (id, workspaceId, userId, role, permissions, created_at)
  - [X] `Termbase` 表 (id, name, ownerId, workspaceId, sourceLang, targetLang, isDeleted, created_at)
  - [X] `Term` 表 (id, termbaseId, sourceTerm, targetTerm, created_at, updated_at)
  - [X] `Invitation` 表 (id, workspaceId, email, token, role, expires_at)
- [X] 初始化 Prisma 配置
- [ ] 解决数据库迁移冲突 (Role enum already exists)
- [ ] 创建新的 migration 文件

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
  - [X] Zustand store (修复 zustand/middleware 导入问题)
  - [X] 路由保护 HOC

#### 2.2 找回密码 (可后置)
- [ ] 邮件配置 (nodemailer)
- [ ] 重置密码流程
- [ ] 重置密码页面

### 🏢 Phase 3: 工作区管理 (Week 2) **新增**

#### 3.1 工作区 CRUD
- [X] 工作区列表页 (`/workspaces`)
  - [ ] 我拥有的工作区
  - [ ] 我参与的工作区
  - [X] 创建新工作区按钮
- [X] 创建工作区 API (`POST /api/workspaces`)
- [X] 创建工作区对话框
  - [X] 名称输入
  - [X] 创建后自动跳转
- [ ] 重命名/删除工作区功能
  - [ ] 确认对话框
  - [ ] 权限检查（仅owner可删除）

#### 3.2 工作区权限系统 **重新设计**
- [ ] 权限检查中间件
  - [ ] `hasWorkspaceAccess()` 函数
  - [ ] 全局ADMIN权限处理
  - [ ] 工作区角色层级检查
- [ ] 工作区成员管理 API
  - [ ] 获取成员列表 (`GET /api/workspaces/:id/members`)
  - [X] 添加成员 (`POST /api/workspaces/:id/members`)
  - [ ] 修改成员权限 (`PUT /api/workspaces/:id/members/:userId`)
  - [ ] 移除成员 (`DELETE /api/workspaces/:id/members/:userId`)

### 📚 Phase 4: 术语库管理 (Week 2-3) **重构**

#### 4.1 术语库 CRUD (基于工作区)
- [ ] 工作区内术语库列表 (`/workspaces/:id/termbases`)
  - [ ] 术语库卡片展示
  - [ ] 创建新库按钮（检查权限）
  - [ ] 语言对显示
- [ ] 创建术语库 API (`POST /api/workspaces/:id/termbases`)
  - [ ] 工作区权限检查（EDITOR以上）
  - [ ] 语言对选择
- [ ] 创建术语库对话框
  - [ ] 名称、源语言、目标语言输入
  - [ ] 创建后自动跳转
- [ ] 重命名/删除功能
  - [ ] 软删除实现
  - [ ] 权限检查（ADMIN以上或owner）

#### 4.2 术语库权限继承
- [ ] 实现术语库权限继承逻辑
  - [ ] 工作区VIEWER → 术语库只读
  - [ ] 工作区EDITOR → 术语库读写
  - [ ] 工作区ADMIN/OWNER → 术语库管理

### 👥 Phase 5: 邀请协作 (Week 3) **基于工作区**

#### 5.1 工作区邀请流程
- [ ] 邀请 API (`POST /api/workspaces/:id/invitations`)
  - [ ] 生成邀请 token
  - [ ] 发送邮件邀请
  - [ ] 权限级别选择
- [ ] 邀请页面 UI
  - [ ] 输入邮箱和工作区角色
  - [ ] 批量邀请支持
- [ ] 接受邀请流程 (`/invite/:token`)
  - [ ] Token 验证
  - [ ] 自动注册/登录绑定
  - [ ] 添加到工作区成员

#### 5.2 工作区成员管理
- [ ] 成员列表页面 (`/workspaces/:id/members`)
  - [ ] 显示用户工作区角色
  - [ ] 角色修改操作（仅ADMIN/OWNER）
  - [ ] 移除成员操作

### 📝 Phase 6: 术语 CRUD (Week 3-4)

#### 6.1 术语列表和详情
- [ ] 术语库详情页 (`/workspaces/:workspaceId/termbases/:id`)
  - [ ] 术语列表展示
  - [ ] 分页功能
  - [ ] 权限控制 (基于工作区权限)
- [ ] 术语 CRUD API
  - [ ] 创建术语 (`POST /api/termbases/:id/terms`)
  - [ ] 更新术语 (`PUT /api/terms/:id`)
  - [ ] 删除术语 (`DELETE /api/terms/:id`)
  - [ ] 权限检查（工作区EDITOR以上）

#### 6.2 单条术语编辑
- [ ] 新增术语对话框
  - [ ] 源文本/目标文本输入
  - [ ] 表单验证
- [ ] 编辑术语功能
  - [ ] 行内编辑或弹窗编辑
  - [ ] 实时保存或手动保存

### 🔍 Phase 7: 即时搜索 (Week 4)

#### 7.1 搜索功能
- [ ] 搜索 API (`GET /api/termbases/:id/search`)
  - [ ] 模糊匹配实现 (PostgreSQL ILIKE)
  - [ ] 源文本↔目标文本双向搜索
  - [ ] 性能优化 (数据库索引)
- [ ] 搜索 UI 组件
  - [ ] 全局搜索框
  - [ ] 200ms debounce
  - [ ] 搜索结果高亮
  - [ ] 快捷键支持 (`Ctrl+K`)

#### 7.2 搜索优化
- [ ] 大小写不敏感搜索
- [ ] 部分匹配支持
- [ ] 搜索性能监控

### 📤 Phase 8: 导入导出 (Week 4-5)

#### 8.1 导出功能
- [ ] CSV 导出 API (`GET /api/termbases/:id/export`)
- [ ] 导出按钮和下载
- [ ] 导出格式标准化 (源语言,目标语言,创建时间)

#### 8.2 导入功能
- [ ] 文件上传组件
- [ ] CSV 解析和验证
- [ ] 列映射 UI
  - [ ] 自动检测 + 手动调整
  - [ ] 预览前 10 条数据
- [ ] 批量导入 API (`POST /api/termbases/:id/import`)
- [ ] 导入结果反馈 (成功/失败统计)

### 🎨 Phase 9: UI/UX 优化 (Week 5)

#### 9.1 响应式设计
- [ ] 移动端适配
- [ ] 工作区/术语库布局优化

#### 9.2 用户体验
- [ ] Loading 状态 (骨架屏)
- [ ] 错误边界处理
- [ ] 成功操作反馈 (Toast)
- [ ] 键盘快捷键

#### 9.3 管理员功能
- [ ] 全局管理员面板 (`/admin`)
  - [ ] 用户管理
  - [ ] 工作区概览
  - [ ] 系统统计

---

## 🚀 技术实现优先级

### 立即开始 (本周)
1. **解决数据库迁移问题** - 解决Role enum冲突
2. **实现新的权限系统** - 工作区权限架构
3. **完善用户状态管理** - 修复zustand导入

### 下周重点
1. **工作区 CRUD** - 新的核心概念
2. **权限中间件** - 安全基础
3. **术语库重构** - 适配工作区模式

### 后续迭代
1. **工作区邀请流程** - 协作体验
2. **术语 CRUD** - 核心功能
3. **搜索和导入导出** - 效率工具

## 📊 MVP 成功指标

- [ ] 支持工作区概念，用户可以创建多个工作区
- [ ] 工作区内权限管理 (OWNER/ADMIN/EDITOR/VIEWER)
- [ ] 单个术语库支持 1000+ 条术语
- [ ] 工作区邀请协作流程完整
- [ ] 搜索响应时间 < 300ms
- [ ] CSV 导入成功率 > 95%
- [ ] 移动端基本可用

## 🔄 重要变更说明

### 新架构特点：
1. **工作区为中心**：所有术语库都属于某个工作区
2. **两层权限**：全局权限(ADMIN/USER) + 工作区权限(OWNER/ADMIN/EDITOR/VIEWER)
3. **权限继承**：术语库权限完全继承自工作区权限
4. **协作简化**：邀请到工作区而非单个术语库

### 数据库变更：
- 新增 `Workspace` 和 `WorkspaceMember` 表
- `Termbase` 新增 `workspaceId` 字段
- 移除原有的 `Member` 表
- 用户表的 `role` 改名为 `globalRole`

这个计划大约需要 **5-6 周**完成 MVP，工作区模式会让协作更加清晰和易管理。