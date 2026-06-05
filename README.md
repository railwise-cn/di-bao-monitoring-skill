# di-bao-monitoring-skill

Codex skill for rail transit control protection zone monitoring work: monitoring plans, initial value reports, daily/weekly/monthly reports, warnings, closeout summaries, and crossing-stage automated total-station quick reports.

## Install From GitHub

One-time install:

```bash
npx github:railwise-cn/di-bao-monitoring-skill install --force
```

Or install the command globally, then install/update the skill:

```bash
npm install -g github:railwise-cn/di-bao-monitoring-skill
di-bao-monitoring-skill install --force
```

The installer copies the bundled skill to:

```text
~/.codex/skills/di-bao-monitoring
```

Set `CODEX_HOME` or `CODEX_SKILLS_DIR` to install somewhere else, or pass `--target <skills-dir>`.

## Update

```bash
npm install -g github:railwise-cn/di-bao-monitoring-skill#main
di-bao-monitoring-skill install --force
```

## Platform Credentials

Do not write platform usernames or passwords into reports, PDFs, GitHub, or the skill files. Pass them at runtime:

```bash
export DIBAO_PLATFORM_USER="your-user"
export DIBAO_PLATFORM_PASSWORD="your-password"
```

For automated total-station reports, provide project-specific settings through environment variables or command arguments:

```bash
export DIBAO_PLATFORM_BASE_URL="https://example.com/IndexPage.aspx?prjid=123"
export DIBAO_PLATFORM_PRJID="123"
export DIBAO_ADJUST_NET_ID="456"
export DIBAO_PROJECT_NAME="项目全称"
```

## 4-Hour Crossing Report Helper

After installing the skill, a generic helper script is available inside the skill folder:

```bash
~/.codex/skills/di-bao-monitoring/scripts/run_crossing_4h_report.sh
```

It exports Excel by default and exports PDF when LibreOffice is available. It does not send WeChat messages.

## Contents

- `skill/di-bao-monitoring/SKILL.md`: skill entrypoint.
- `skill/di-bao-monitoring/references/`: domain workflows and report rules.
- `skill/di-bao-monitoring/assets/`: report templates and input examples.
- `skill/di-bao-monitoring/scripts/`: deterministic platform fetch, calculation, alarm, and report-generation scripts.

## License

MIT
