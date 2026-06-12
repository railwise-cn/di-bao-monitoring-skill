# 地保监测 Skill

`di-bao-monitoring-skill` 是一个面向 AI 智能体的地保监测专业技能包，用于轨道交通控制保护区、地铁保护区、既有线路保护区等第三方监测工作。

它默认以中文使用，适合编制监测方案、初始值资料、日报周报月报、预警/报警/消警资料、项目总结，以及穿越工况下的 15 分钟、2 小时、4 小时自动化全站仪监测快报和上海华桓静力水准沉降快报。

当前安装器默认适配 Codex 的 skills 目录；技能内容本身是 Markdown + 模板 + 脚本结构，其他支持自定义技能、知识库、系统提示词或工具脚本的智能体平台也可以复用。本仓库目前通过 GitHub 源安装，尚未发布到 npm registry。

GitHub 仓库：

<https://github.com/railwise-cn/di-bao-monitoring-skill>

## 适用场景

这个 skill 适用于以下工作：

- 轨道交通控制保护区监测方案、监测大纲、评审回复。
- 测点埋设记录、测点验收、初始值报告、控制网联测资料。
- 地保监测日报、周报、月报、监护记录。
- 盾构、顶管、管廊、基坑、道路、桥梁等穿越或邻近轨道交通结构期间的高频快报。
- 自动化全站仪平台取数、平差成果整理、点名映射、桥墩沉降/位移/倾斜计算。
- 上海华桓静力水准平台/API 取数、`findSZByIdAndDate type=2` 沉降成果整理、单次/累计沉降快报。
- 预警、报警、红色预警、消警申请、专题分析和项目总结。

当前自动化脚本重点支持两类穿越期高频报表：全站仪/测量机器人平差成果快报、上海华桓静力水准沉降快报。人工监测和其他设备可以按 skill 内的资料规则继续扩展。

## 方案编制能力

这个 skill 最基础、也最常用的能力是“从资料收集到监测方案成稿”的完整地保监测方案编制流程。它不是只做自动化快报。

方案编制适用对象包括：

- 地铁车站、区间隧道、盾构区间、联络通道、出入口、风亭、换乘通道。
- 高架区间、桥墩、桥梁、承台、盖梁、桥面结构、道床结构。
- 外部施工风险源：基坑、盾构、顶管、综合管廊、道路、桥梁、桩基、邻近建筑、拆改工程等。
- 运营期既有线保护区和建设期轨道交通控制保护区项目。

### 方案编制前置资料

AI 助手使用这个 skill 编制方案时，会先建立 `project_profile` 项目资料卡，并尽量从用户给的文件、图纸、已有方案、报表封面或 `info` 表中提取信息。缺失字段会保留占位符，不会把参考项目内容硬套到新项目。

常见资料清单：

| 类别 | 资料 |
|---|---|
| 外部工程资料 | 总平面图、基坑/盾构/道路/桥梁施工图、施工组织设计、专项施工方案、工筹横道图 |
| 轨道交通资料 | 线路、车站、区间、桥墩、桥面、道床、结构图，既有沉降资料，保护区范围图 |
| 勘察和环境资料 | 地勘报告、水文资料、管线资料、周边建筑物、道路交通和重载车辆路径 |
| 安评和审查资料 | 安全影响评估报告、审查意见、专家意见、运营单位或轨道公司控制指标 |
| 项目管理资料 | 委托单、合同、建设/施工/监理/监测单位信息、报表格式、报送要求 |

### 方案章节框架

skill 支持按项目情况生成完整方案，通常包括：

1. 工程概况。
2. 编制依据。
3. 轨道交通结构现状和保护区关系。
4. 外部工程施工内容、施工筹划和风险工序。
5. 监测范围和影响关系分析。
6. 监测等级、监测对象和监测项目。
7. 测点布设原则、测点数量、点号规则和布点图说明。
8. 监测方法和技术要求。
9. 平面控制网、高程控制网和基准点布设。
10. 监测频率和分阶段加密要求。
11. 预警值、报警值、控制值和速率/趋势报警规则。
12. 数据处理、成果分析和报送流程。
13. 巡视检查、异常复核和预警处置流程。
14. 组织机构、人员设备、质量安全保证措施。
15. 应急响应、信息报送和资料归档。
16. 附图、附表、工作量清单、评审回复或修改说明。

### 地下结构和高架结构区别

skill 会先判断监测对象，不会默认把所有项目都写成“隧道收敛”：

- 地下区间/车站：重点考虑道床沉降、结构沉降、远端沉降、水平位移、收敛、巡视，必要时接入静力水准、振动、轨道几何等。
- 高架/桥梁/桥墩：重点考虑桥墩沉降、桥墩水平位移、桥墩倾斜、承台/盖梁/梁端/桥面结构沉降、巡视和运营安全约束。
- 盾构/顶管穿越：重点写穿越窗口、正投影区、延伸影响范围、加密频率、自动化监测、异常复核和即时快报机制。

### 报警值和频率口径

方案中的预警值、报警值、控制值优先级为：

1. 本项目监测方案、安评报告、专家意见、轨道公司/运营单位指令。
2. 用户明确提供的阈值和频率。
3. 参考资料或经验值。

没有项目依据时，skill 会标注“待确认阈值”，不会把其他项目的报警值直接套用到当前项目。

监测频率会按阶段拆分，例如：

- 施工前初始值阶段。
- 普通施工阶段。
- 临近保护区阶段。
- 穿越正投影或关键工序阶段。
- 预警/报警阶段。
- 施工完成后稳定观察阶段。

### 方案编制命令示例

```text
使用 $di-bao-monitoring，根据这些图纸和安评资料编制轨道交通控制保护区监测方案。
```

```text
使用 $di-bao-monitoring，帮我列这个地保监测项目还缺哪些资料，并按资料齐全后的方案目录起草。
```

```text
使用 $di-bao-monitoring，这个是高架桥墩项目，不要按隧道收敛写，重点写桥墩沉降、位移和倾斜。
```

```text
使用 $di-bao-monitoring，根据专家评审意见逐条写回复，并指出方案里要修改的章节。
```

### 内审、专家评审和回复

skill 内置了内审和专家评审工作流，可用于：

- 方案自查：监测范围、测点数量、频率、报警值、控制网、应急流程、附图是否一致。
- 内审会议准备：问题清单、修改责任、会议议程。
- 专家意见回复：逐条拆分意见，写“采纳情况 + 修改位置 + 修改后内容摘要”。
- 修订版检查：章节号、页码、附图、附表和回复表保持一致。

### 方案相关模板和参考文件

安装后可在 skill 目录中找到：

```text
~/.codex/skills/di-bao-monitoring/assets/plan-template.md
~/.codex/skills/di-bao-monitoring/references/phase0-intake.md
~/.codex/skills/di-bao-monitoring/references/phase1-drafting.md
~/.codex/skills/di-bao-monitoring/references/elevated-line.md
~/.codex/skills/di-bao-monitoring/references/technical-standards.md
~/.codex/skills/di-bao-monitoring/references/review-checklist.md
~/.codex/skills/di-bao-monitoring/references/review-response-template.md
```

## 跨平台使用说明

简单说：

- Codex 只是当前 npm 安装器默认适配的平台。
- `SKILL.md`、`references/`、`assets/`、`scripts/` 可以给 Claude、ChatGPT 自定义 GPT/项目知识库、Dify、Coze、Open WebUI、LangGraph/Agent 项目等复用。

这个仓库分为三层：

- **技能知识层**：`skill/di-bao-monitoring/SKILL.md`、`references/`、`assets/`。这部分是通用的，适合给 Codex、Claude、ChatGPT 自定义 GPT/项目知识库、Dify、Coze、Open WebUI、LangGraph/Agent 项目等智能体参考或加载。
- **脚本工具层**：`skill/di-bao-monitoring/scripts/`。这部分是普通 Python/Shell 脚本，可在有 Python、Node.js、LibreOffice 等依赖的电脑或服务器上独立运行。
- **安装器层**：`bin/di-bao-monitoring-skill.js`。这部分目前主要负责把 skill 安装到 Codex 默认目录 `~/.codex/skills/di-bao-monitoring`。

如果不是 Codex 平台，可以手动复制：

```text
skill/di-bao-monitoring/SKILL.md
skill/di-bao-monitoring/references/
skill/di-bao-monitoring/assets/
skill/di-bao-monitoring/scripts/
```

导入目标平台时，建议把 `SKILL.md` 作为主说明，把 `references/` 作为可检索参考资料，把 `assets/` 作为模板，把 `scripts/` 作为可调用工具或本地脚本。

## Codex 安装

一次性安装或更新到 Codex skills 目录：

```bash
npx github:railwise-cn/di-bao-monitoring-skill install --force
```

也可以先把安装命令装到全局，再安装或更新 skill：

```bash
npm install -g github:railwise-cn/di-bao-monitoring-skill
di-bao-monitoring-skill install --force
```

默认安装位置：

```text
~/.codex/skills/di-bao-monitoring
```

如果你的 Codex skills 目录不在默认位置，可以使用：

```bash
di-bao-monitoring-skill install --force --target /path/to/skills
```

也可以通过环境变量指定：

```bash
export CODEX_HOME="$HOME/.codex"
# 或
export CODEX_SKILLS_DIR="$HOME/.codex/skills"
```

安装后，如果 Codex 没有立即识别新 skill，请重启 Codex 或刷新 skill 列表。

## 更新

更新到 GitHub main 分支最新版：

```bash
npm install -g github:railwise-cn/di-bao-monitoring-skill#main
di-bao-monitoring-skill install --force
```

安装指定版本：

```bash
npm install -g github:railwise-cn/di-bao-monitoring-skill#v0.2.0
di-bao-monitoring-skill install --force
```

查看安装目标位置：

```bash
di-bao-monitoring-skill where
```

查看安装器版本：

```bash
di-bao-monitoring-skill version
```

## 在 AI 助手中使用

在 Codex 中安装后，可以这样说；在其他智能体平台中，也可以把下面的话作为调用这个技能的提示词：

```text
使用 $di-bao-monitoring，帮我编制这个项目的地保监测方案。
```

```text
使用 $di-bao-monitoring，做穿越期 4 小时自动化全站仪监测快报。
```

```text
使用 $di-bao-monitoring，从上海华桓静力水准平台生成 4 小时沉降快报。
```

```text
使用 $di-bao-monitoring，根据这些数据判断是否预警，并生成监测快报。
```

当用户提到“穿越期地保监测报表”“自动化全站仪快报”“15 分钟/2 小时/4 小时出报”等任务时，skill 会提示用户补齐平台地址、项目 ID、平差网 ID、报表截止时间、施工工况、点名映射和图片资料。

当用户提到“上海华桓”“静力水准”“沉降自动化平台”“静力水准 15 分钟/2 小时/4 小时快报”等任务时，skill 会提示用户补齐华桓平台入口、登录方式、项目 ID、报表截止时间、上期参考时间、`sampMinutes`、测点分区/点名映射、阈值、模板和图片资料。

## 自动化全站仪快报数据口径

当前快报脚本默认采用工程师确认的坐标公式口径：

- 沉降：按平差后 `Z/H` 坐标差计算。
- 东西方向水平位移：按 `Y` 坐标差计算，`+` 为向东方向，`-` 为向西方向。
- 南北方向水平位移：按 `X` 坐标差计算，`+` 为向北方向，`-` 为向南方向。
- 东西方向桥墩倾斜：上下点 `Y` 坐标位移差 / 上下点初始三维距离。
- 南北方向桥墩倾斜：上下点 `X` 坐标位移差 / 上下点初始三维距离。
- 平台累计 `dX/dY/dH` 用于反推并校核自动化初值。
- 测站 `CZ` 和测量基点 `JD` 不作为监测点参与主表统计。
- 报表可见点名应通过点名映射显示为 `MCC/MCW/MCQX` 等工程点名，不直接显示平台原始 `S12/X12` 等点名。

## 上海华桓静力水准沉降快报口径

静力水准快报只处理沉降/竖向位移，不套用全站仪平差坐标、水平位移或桥墩倾斜计算规则。

- 数据来源优先使用华桓接口 `POST /API/findSZByIdAndDate`，其中 `type=2` 为沉降/静力水准成果。
- `本次变化量` 取接口 `curOffset`，表示 `statDate` 相对 `endDate` 的本期沉降变化。
- `累计变化量` 取接口 `totalOffset`，表示本期相对平台初始值的累计变化。
- `本次测值` 取 `curValue`，`参考测值` 取 `refValue`。
- 未明确项目正负号时，报表备注暂写“+ 为隆起，- 为下沉（待项目确认）”。
- 缺测、离线、异常值不得填 0；保留 `/` 并在备注写明接口状态。

取数脚本：

```bash
python3 ~/.codex/skills/di-bao-monitoring/scripts/fetch_shhh_static_level.py \
  --project-id "{{华桓项目ID}}" \
  --project-name "{{项目全称}}" \
  --report-cadence "4h" \
  --report-cutoff-time "{{YYYY-MM-DD HH:mm:ss}}" \
  --previous-time "{{YYYY-MM-DD HH:mm:ss}}" \
  --samp-minutes 60 \
  --output-dir "平台数据输出"
```

如果不知道华桓项目 ID，应先登录 `http://yun.shhhcl.com/project/login#{{入口号}}`，按用户名可见项目查找并人工确认项目 ID、项目名称、测点和分区；确认后再用接口取数。

## 平台取数配置

不要把平台账号、密码、Cookie、项目私有 URL 写进 GitHub、README、报告、PDF 或 skill 文件。请在运行时通过环境变量或命令参数传入。

常用环境变量：

| 环境变量 | 说明 |
|---|---|
| `DIBAO_PLATFORM_BASE_URL` | 平台项目地址，例如 `https://example.com/IndexPage.aspx?prjid=123` |
| `DIBAO_PLATFORM_PRJID` | 平台项目 ID |
| `DIBAO_ADJUST_NET_ID` | 平差网 ID |
| `DIBAO_PLATFORM_USER` | 平台用户名 |
| `DIBAO_PLATFORM_PASSWORD` | 平台密码 |
| `SHHH_PLATFORM_URL` | 上海华桓平台入口，例如 `http://yun.shhhcl.com/project/login#{{入口号}}` |
| `SHHH_API_BASE` | 上海华桓接口地址，默认 `http://yun.shhhcl.com/TESTAPI` |
| `SHHH_PLATFORM_USER` | 上海华桓平台用户名 |
| `SHHH_PLATFORM_PASSWORD` | 上海华桓平台密码；仅运行时使用，不提交 |
| `SHHH_PROJECT_ID` | 上海华桓项目 ID |
| `DIBAO_PROJECT_NAME` | 项目全称，用于文件名和报表页眉 |
| `DIBAO_WORK_CONDITION` | 当前施工工况 |
| `DIBAO_CUTOFF_TIME` | 报表名义截止时间，不填则按当前时间取最近 4 小时整点 |
| `DIBAO_DATA_GRACE_MINUTES` | 整点后取数宽限，默认 20 分钟 |
| `DIBAO_PREVIOUS_DATA_GRACE_MINUTES` | 上期整点后取数宽限，默认 20 分钟 |
| `DIBAO_WORKDIR` | 输出工作目录，默认当前目录 |
| `DIBAO_OUTPUT_DIR` | 输出目录，默认 `平台数据输出` |
| `DIBAO_REPORT_TEMPLATE` | 快报模板 xlsx 路径 |
| `DIBAO_FULL_REPORT_TEMPLATE` | 完整报表模板 xlsx 路径；默认使用 `assets/完整报表模板.xlsx` |
| `DIBAO_INITIAL_REPORT` | 初始值报告 docx 路径，用于提取项目实施单位 |
| `DIBAO_IMAGE_LEFT` | 左侧示意图/工况图 |
| `DIBAO_IMAGE_RIGHT` | 右侧布点图/现场图 |
| `DIBAO_POINT_ALIAS_MAP` | 点名映射 JSON |
| `DIBAO_MANUAL_OVERRIDES` | 工程师人工复核修正 JSON |
| `DIBAO_SOFFICE` | LibreOffice `soffice` 路径，用于导出 PDF |

示例：

```bash
export DIBAO_PLATFORM_BASE_URL="https://example.com/IndexPage.aspx?prjid=123"
export DIBAO_PLATFORM_PRJID="123"
export DIBAO_ADJUST_NET_ID="456"
export DIBAO_PLATFORM_USER="your-user"
export DIBAO_PLATFORM_PASSWORD="your-password"
export DIBAO_PROJECT_NAME="某轨道交通控制保护区监测项目"
export DIBAO_WORK_CONDITION="当前盾构推进至503环，开始拼装，盾尾距桥桩36m。"
export DIBAO_CUTOFF_TIME="2026-06-05 12:00:00"
```

## 生成 4 小时快报

安装 skill 后，通用 4 小时快报脚本位于：

```bash
~/.codex/skills/di-bao-monitoring/scripts/run_crossing_4h_report.sh
```

运行：

```bash
~/.codex/skills/di-bao-monitoring/scripts/run_crossing_4h_report.sh
```

输出：

- Excel：`平台数据输出/{{项目全称}}_{{YYYYMMDD}}_{{小时}}点_4小时快报.xlsx`
- PDF：`平台数据输出/pdfcheck/{{项目全称}}_{{YYYYMMDD}}_{{小时}}点_4小时快报.pdf`
- 完整报表 Excel：`平台数据输出/{{项目全称}}_{{YYYYMMDD}}_{{小时}}点_4小时完整报表.xlsx`
- 完整报表 PDF：`平台数据输出/pdfcheck/{{项目全称}}_{{YYYYMMDD}}_{{小时}}点_4小时完整报表.pdf`

完整报表默认 5 页：封面、全站仪快报、桥墩沉降明细、桥墩水平位移明细、桥墩倾斜明细；`适配设置页` 会在导出时隐藏，不进入 PDF。

说明：

- 脚本只导出 Excel/PDF。
- 默认不发送微信、邮件或任何即时通讯消息。
- PDF 导出依赖 LibreOffice；如果系统没有 LibreOffice，脚本仍会保留 Excel。
- 断电、设备离线或平台未生成当前批次时，不应把上一批旧数据误标为当前报表。

## 点名映射

点名映射文件建议从模板复制：

```text
~/.codex/skills/di-bao-monitoring/assets/point-alias-map-template.json
```

典型用途：

- 平台原始点名 `X12` 在沉降报表中显示为 `MCC012`。
- 平台原始点名 `X12` 在水平位移报表中显示为 `MCW012`。
- `S12/X12` 倾斜配对显示为 `MCQX012`。

点名映射必须由项目工程师确认后再用于正式快报。

## 人工复核修正

如果工程师对某个点的本次变化或累计变化做了人工复核修正，不建议直接手改 Excel。应写入 `manual_metric_overrides.json`，再重新生成报表，保证主表、平台最新动态、最大值和留痕一致。

示例：

```json
{
  "overrides": [
    {
      "report_time": "2026-06-05 12:02:40",
      "point_id": "X13",
      "monitoring_item": "横向变形量",
      "current_change_mm": -0.3,
      "cumulative_mm": -0.6,
      "reason": "工程师复核修正"
    }
  ]
}
```

## 目录结构

```text
di-bao-monitoring-skill/
├── bin/
│   └── di-bao-monitoring-skill.js        # npm 安装命令
├── skill/
│   └── di-bao-monitoring/
│       ├── SKILL.md                      # skill 入口
│       ├── agents/openai.yaml            # OpenAI/Codex UI 元数据
│       ├── assets/                       # 模板和输入样例
│       ├── references/                   # 监测工作流和报表规则
│       └── scripts/                      # 平台取数、计算、报表生成脚本
├── package.json
└── README.md
```

## 脚本清单

| 脚本 | 用途 |
|---|---|
| `fetch_adjusted_total_station.py` | 登录平台，抓取平差批次、平差报告、点位坐标、平台初始值，生成 CSV |
| `build_crossing_total_station_xlsx.py` | 根据 CSV、模板、图片和点名映射生成 A3 横版快报；使用完整模板时同步填封面和各测项明细页 |
| `run_crossing_4h_report.sh` | 通用 4 小时快报导出脚本；默认同时导出单页快报和 5 页完整报表 |
| `fetch_shhh_static_level.py` | 调用上海华桓静力水准接口，按项目 ID 和时间窗口导出沉降 CSV/JSON/摘要 |
| `summarize_crossing_total_station.py` | 对结构化监测 CSV 做汇总和预警判定 |
| `evaluate_alarms.py` | 对通用监测数据进行阈值判定 |

## 依赖

基础安装：

- Node.js 18 或更高版本，用于 npm 安装命令。
- Python 3，用于平台取数和报表生成脚本。

Python 脚本常用依赖：

- `requests`
- `openpyxl`
- `python-docx`
- `Pillow`
- `pypdf`

PDF 导出：

- LibreOffice，可通过 `DIBAO_SOFFICE` 指定 `soffice` 路径。

## 安全说明

- 不要提交平台账号、密码、Cookie、私有 IP、项目内部输出数据。
- 不要把自动发微信、自动发群、个人 Keychain 服务名写入公开包。
- 平台凭证仅通过环境变量、运行时参数或本机安全存储读取。
- 报表中不应出现平台登录凭证或 Cookie。

## 常见问题

### 安装后 Codex 没有看到 skill

重启 Codex，或确认安装目录是否正确：

```bash
di-bao-monitoring-skill where
```

### 生成了 Excel，但没有 PDF

检查 LibreOffice 是否安装，并设置：

```bash
export DIBAO_SOFFICE="/Applications/LibreOffice.app/Contents/MacOS/soffice"
```

### 平台没有当前批次

如果现场断电、设备离线或平台平差未完成，脚本不会把旧数据误标为当前报表。应等待平台生成当前批次，或明确指定补报时间和上一批次口径。

### 为什么要人工确认点名映射

平台点名和报表工程点名经常不是同一套规则，例如 `X12` 可能对应沉降 `MCC012`、位移 `MCW012`，而倾斜需要 `S12/X12` 成对计算。正式出报前必须由工程师确认映射。

## 开发和发布

克隆仓库：

```bash
git clone https://github.com/railwise-cn/di-bao-monitoring-skill.git
cd di-bao-monitoring-skill
```

本地测试：

```bash
npm test
python3 -m py_compile skill/di-bao-monitoring/scripts/*.py
npm pack --dry-run
```

提交更新：

```bash
git add .
git commit -m "Update README"
git push
```

发布新版本时，更新 `package.json` 中的 `version`，再打 tag：

```bash
git tag v0.2.0
git push origin main v0.2.0
gh release create v0.2.0 --title "v0.2.0" --notes "更新说明"
```

## English Summary

`di-bao-monitoring-skill` is a Chinese-first AI-agent skill package for rail transit protection-zone monitoring workflows. It supports report drafting, monitoring plans, initial-value documents, periodic reports, warning workflows, crossing-stage automated total-station quick reports, and Shanghai Huahuan static-level settlement quick reports. The bundled GitHub-source npm installer targets Codex by default, while the Markdown skill, references, templates, and scripts can be reused by other agent platforms.

Install:

```bash
npx github:railwise-cn/di-bao-monitoring-skill install --force
```

The package is Chinese-first by default. Runtime platform credentials and project settings must be provided through environment variables or command arguments, not committed to GitHub.

## License

MIT
