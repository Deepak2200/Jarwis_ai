import React, { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Bot, Bug, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Command, CreditCard,
  Download, ExternalLink, FileBarChart2, Filter, Globe2, LayoutDashboard, LockKeyhole,
  LogOut, Menu, MessageSquareText, MoreHorizontal, Plus, Search, Settings, Shield,
  ShieldAlert, ShieldCheck, Sparkles, Target, Users, X, Zap
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip,
  XAxis, YAxis, Cell
} from "recharts";

const scanData = [
  { day: "Mon", scans: 14, findings: 31 },
  { day: "Tue", scans: 22, findings: 44 },
  { day: "Wed", scans: 18, findings: 27 },
  { day: "Thu", scans: 31, findings: 53 },
  { day: "Fri", scans: 24, findings: 39 },
  { day: "Sat", scans: 36, findings: 62 },
  { day: "Sun", scans: 29, findings: 47 },
];
const severityData = [
  { name: "Critical", value: 4, color: "#fb7185" },
  { name: "High", value: 12, color: "#fb923c" },
  { name: "Medium", value: 23, color: "#facc15" },
  { name: "Low", value: 31, color: "#55d6e8" },
];
const initialScans = [
  { domain: "acme-commerce.com", type: "Full application scan", date: "Today, 10:42 AM", status: "Completed", findings: 18, score: 72 },
  { domain: "portal.northstar.io", type: "Authenticated scan", date: "Today, 09:18 AM", status: "Running", findings: 7, score: 88 },
  { domain: "api.acme-commerce.com", type: "API security scan", date: "Yesterday, 4:36 PM", status: "Completed", findings: 9, score: 91 },
  { domain: "staging.aurora.dev", type: "Full application scan", date: "Yesterday, 1:05 PM", status: "Failed", findings: 0, score: null },
  { domain: "dashboard.orbit.app", type: "Header analysis", date: "Oct 24, 11:24 AM", status: "Completed", findings: 5, score: 95 },
];
const findings = [
  { title: "Missing Content-Security-Policy", category: "Security misconfiguration", severity: "High", url: "acme-commerce.com/checkout", date: "Oct 27, 2026", status: "Open" },
  { title: "Cookie missing Secure flag", category: "Session management", severity: "Medium", url: "acme-commerce.com/account", date: "Oct 27, 2026", status: "Open" },
  { title: "Server version disclosure", category: "Information disclosure", severity: "Low", url: "acme-commerce.com/api/status", date: "Oct 26, 2026", status: "Open" },
  { title: "Potential reflected XSS", category: "Injection", severity: "Critical", url: "acme-commerce.com/search?q=", date: "Oct 26, 2026", status: "Needs review" },
  { title: "Permissive CORS policy", category: "Security misconfiguration", severity: "High", url: "api.acme-commerce.com/v1", date: "Oct 25, 2026", status: "Open" },
  { title: "Missing rate-limit headers", category: "Rate limiting", severity: "Medium", url: "api.acme-commerce.com/auth", date: "Oct 25, 2026", status: "Open" },
];
const navGroups = [
  { label: "WORKSPACE", items: [
    { id: "Overview", icon: LayoutDashboard },
    { id: "Scans", icon: Activity },
    { id: "Vulnerabilities", icon: ShieldAlert },
    { id: "Reports", icon: FileBarChart2 },
  ]},
  { label: "INTELLIGENCE", items: [
    { id: "AI Assistant", icon: Bot },
    { id: "Domains", icon: Globe2 },
  ]},
  { label: "MANAGE", items: [
    { id: "Users & Access", icon: Users },
    { id: "Payments", icon: CreditCard },
    { id: "Settings", icon: Settings },
  ]},
];

function cn(...classes) { return classes.filter(Boolean).join(" "); }

function Brand() {
  return <div className="flex items-center gap-3 px-5 py-5">
    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-glow">
      <Shield size={20} strokeWidth={2.3} />
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-emerald-400" />
    </div>
    <div>
      <div className="display-font text-[17px] font-bold tracking-tight">jarwis<span className="text-cyan">.ai</span></div>
      <div className="text-[9px] font-semibold tracking-[.2em] text-slate-500">SECURITY PLATFORM</div>
    </div>
  </div>;
}

function Sidebar({ active, setActive, open, close }) {
  return <>
    {open && <button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={close} />}
    <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-line bg-[#0b1220] transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <Brand />
      <div className="mx-4 mb-5 flex items-center gap-3 rounded-xl border border-line bg-[#111b2b] px-3 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-400/15 text-indigo-300"><Command size={16}/></div>
        <div className="min-w-0 flex-1"><div className="truncate text-xs font-semibold text-slate-200">Acme Security Team</div><div className="mt-0.5 text-[10px] text-slate-500">Enterprise workspace</div></div>
        <ChevronDown size={14} className="text-slate-500"/>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3">
        {navGroups.map(group => <div key={group.label}>
          <div className="mb-2 px-3 text-[9px] font-bold tracking-[.18em] text-slate-600">{group.label}</div>
          <div className="space-y-1">{group.items.map(item => {
            const Icon = item.icon;
            const selected = active === item.id;
            return <button key={item.id} onClick={() => { setActive(item.id); close(); }} className={cn("group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] font-medium transition", selected ? "border border-cyan-300/15 bg-cyan-300/[.09] text-cyan-100" : "text-slate-400 hover:bg-white/[.035] hover:text-slate-100")}>
              <Icon size={16} className={selected ? "text-cyan" : "text-slate-500 group-hover:text-slate-300"} />
              <span className="flex-1">{item.id}</span>
              {item.id === "Vulnerabilities" && <span className="rounded-md bg-rose-400/10 px-1.5 py-0.5 text-[9px] font-bold text-rose-300">12</span>}
              {item.id === "Users & Access" && <span className="h-1.5 w-1.5 rounded-full bg-cyan"/>}
            </button>;
          })}</div>
        </div>)}
      </nav>
      <div className="mx-4 mb-4 rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[.09] to-indigo-400/[.04] p-3.5">
        <div className="mb-2 flex items-center gap-2 text-cyan-200"><Sparkles size={14}/><span className="text-[11px] font-semibold">Jarwis Intelligence</span></div>
        <p className="text-[10px] leading-relaxed text-slate-400">AI-powered security insights for your entire attack surface.</p>
        <button onClick={() => setActive("AI Assistant")} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/10 py-2 text-[10px] font-semibold text-cyan-100 hover:bg-cyan-300/15">Open assistant <ArrowUpRight size={12}/></button>
      </div>
      <div className="flex items-center gap-3 border-t border-line px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-[10px] font-bold text-slate-950">JD</div>
        <div className="min-w-0 flex-1"><div className="text-[11px] font-semibold text-slate-200">Jordan Davis</div><div className="text-[10px] text-slate-500">Workspace owner</div></div>
        <button title="Sign out" className="text-slate-500 hover:text-slate-200"><LogOut size={15}/></button>
      </div>
    </aside>
  </>;
}

function Topbar({ active, onMenu }) {
  return <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-line bg-[#080d18]/90 px-4 backdrop-blur-xl sm:px-7">
    <div className="flex items-center gap-3">
      <button onClick={onMenu} className="rounded-lg border border-line p-2 text-slate-300 lg:hidden" aria-label="Open navigation"><Menu size={17}/></button>
      <div><div className="text-[10px] text-slate-500">Workspace <span className="px-1.5 text-slate-700">/</span> <span className="text-slate-400">{active}</span></div><h1 className="display-font mt-1 text-[17px] font-semibold tracking-tight text-white sm:text-[19px]">{active === "Overview" ? "Security overview" : active}</h1></div>
    </div>
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="hidden items-center gap-2 rounded-lg border border-line bg-[#101827] px-3 py-2 md:flex"><Search size={14} className="text-slate-500"/><span className="text-[10px] text-slate-500">Search anything...</span><kbd className="ml-5 rounded border border-line px-1.5 py-0.5 text-[9px] text-slate-500">⌘ K</kbd></div>
      <button className="relative rounded-lg border border-line bg-[#101827] p-2.5 text-slate-400 hover:text-white" aria-label="Notifications"><Bell size={15}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-400"/></button>
      <div className="hidden h-7 w-px bg-line sm:block"/>
      <div className="hidden text-right sm:block"><div className="text-[10px] font-semibold text-slate-200">Jordan Davis</div><div className="mt-0.5 text-[9px] text-slate-500">Admin</div></div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-300/10 text-[10px] font-bold text-cyan-100 sm:hidden">JD</div>
    </div>
  </header>;
}

function Severity({ value }) {
  const styles = {
    Critical: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    High: "border-orange-400/20 bg-orange-400/10 text-orange-300",
    Medium: "border-amber-300/20 bg-amber-300/10 text-amber-200",
    Low: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
    Info: "border-slate-500/20 bg-slate-500/10 text-slate-300",
  };
  return <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[9px] font-bold", styles[value] || styles.Info)}><span className="h-1.5 w-1.5 rounded-full bg-current"/>{value}</span>;
}

function Status({ value }) {
  const styles = {
    Completed: "bg-emerald-400/10 text-emerald-300",
    Running: "bg-cyan-300/10 text-cyan-200",
    Failed: "bg-rose-400/10 text-rose-300",
    Open: "bg-rose-400/10 text-rose-300",
    "Needs review": "bg-amber-300/10 text-amber-200",
    Pending: "bg-amber-300/10 text-amber-200",
    Verified: "bg-emerald-400/10 text-emerald-300",
  };
  return <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px] font-semibold", styles[value] || "bg-slate-500/10 text-slate-400")}>{value === "Running" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300"/>}{value === "Completed" && <Check size={10} />}{value}</span>;
}

function SectionHeading({ title, subtitle, action }) {
  return <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><h2 className="display-font text-[14px] font-semibold text-slate-100">{title}</h2>{subtitle && <p className="mt-1 text-[10px] text-slate-500">{subtitle}</p>}</div>{action}</div>;
}

function MetricCard({ title, value, delta, icon: Icon, tone = "cyan", note }) {
  const tones = { cyan: "bg-cyan-300/10 text-cyan-200 border-cyan-300/10", rose: "bg-rose-400/10 text-rose-300 border-rose-400/10", orange: "bg-orange-400/10 text-orange-300 border-orange-400/10", violet: "bg-violet-400/10 text-violet-300 border-violet-400/10" };
  return <div className="panel rounded-xl p-4 sm:p-5">
    <div className="flex items-start justify-between"><div className="text-[10px] font-medium text-slate-400">{title}</div><div className={cn("flex h-8 w-8 items-center justify-center rounded-lg border", tones[tone])}><Icon size={15}/></div></div>
    <div className="mt-4 flex items-baseline gap-2"><span className="display-font text-[26px] font-semibold tracking-tight text-white">{value}</span>{delta && <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-300"><ArrowUpRight size={11}/>{delta}</span>}</div>
    <div className="mt-1 text-[9px] text-slate-500">{note}</div>
  </div>;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return <div className="rounded-lg border border-line bg-[#0b1220] px-3 py-2 shadow-xl"><div className="mb-1 text-[9px] text-slate-500">{label}</div>{payload.map(p => <div key={p.dataKey} className="text-[10px] text-slate-200">{p.name}: <b>{p.value}</b></div>)}</div>;
}

function Overview({ scans, setActive, startScan }) {
  const recent = scans.slice(0, 4);
  return <div className="space-y-6">
    <div className="soft-grid relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-r from-[#102536] via-[#0e1b2c] to-[#11172a] p-5 sm:p-7">
      <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full bg-cyan-300/[.07] blur-3xl"/>
      <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="max-w-xl"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[.08] px-2.5 py-1 text-[9px] font-semibold tracking-wide text-cyan-100"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> SYSTEM OPERATIONAL <span className="text-slate-600">•</span> LAST UPDATED JUST NOW</div><h2 className="display-font text-[25px] font-semibold leading-tight tracking-tight text-white sm:text-[30px]">Your security posture,<br className="hidden sm:block"/> at a glance.</h2><p className="mt-3 max-w-lg text-[11px] leading-relaxed text-slate-400">Monitor your attack surface, prioritize risk, and turn security findings into actionable next steps.</p></div>
        <button onClick={startScan} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 text-[11px] font-bold text-[#07111c] shadow-glow transition hover:bg-cyan-200"><Plus size={15}/> Start new scan</button>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard title="Total scans" value="248" delta="12.8%" icon={Activity} tone="cyan" note="Compared to previous 30 days"/>
      <MetricCard title="Critical findings" value="04" icon={ShieldAlert} tone="rose" note="Requires immediate attention"/>
      <MetricCard title="Open vulnerabilities" value="39" icon={Bug} tone="orange" note="Across 12 verified domains"/>
      <MetricCard title="Security score" value="86" icon={ShieldCheck} tone="violet" note="↑ 6 points from last month"/>
    </div>
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_1fr]">
      <div className="panel rounded-xl p-4 sm:p-5">
        <SectionHeading title="Scan activity" subtitle="Scan volume and findings over the last 7 days" action={<button className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-2 text-[9px] text-slate-400">Last 7 days <ChevronDown size={12}/></button>}/>
        <div className="mb-4 flex items-center gap-4"><span className="flex items-center gap-2 text-[9px] text-slate-400"><span className="h-2 w-2 rounded-full bg-cyan-300"/> Scans</span><span className="flex items-center gap-2 text-[9px] text-slate-400"><span className="h-2 w-2 rounded-full bg-indigo-400"/> Findings</span></div>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%"><AreaChart data={scanData} margin={{ top: 5, right: 4, left: -22, bottom: 0 }}>
            <defs><linearGradient id="scanFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#55d6e8" stopOpacity={0.25}/><stop offset="100%" stopColor="#55d6e8" stopOpacity={0}/></linearGradient><linearGradient id="findingFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#818cf8" stopOpacity={0.15}/><stop offset="100%" stopColor="#818cf8" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid stroke="#253247" strokeDasharray="3 5" vertical={false}/>
            <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false}/>
            <Tooltip content={<ChartTooltip/>}/>
            <Area type="monotone" dataKey="scans" name="Scans" stroke="#55d6e8" strokeWidth={2} fill="url(#scanFill)" />
            <Area type="monotone" dataKey="findings" name="Findings" stroke="#818cf8" strokeWidth={2} fill="url(#findingFill)" />
          </AreaChart></ResponsiveContainer>
        </div>
      </div>
      <div className="panel rounded-xl p-4 sm:p-5">
        <SectionHeading title="Findings by severity" subtitle="70 findings across all recent scans"/>
        <div className="flex items-center justify-center">
          <div className="relative h-[180px] w-full max-w-[250px]">
            <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={severityData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={78} paddingAngle={4} stroke="none">{severityData.map(item => <Cell key={item.name} fill={item.color}/>)}</Pie><Tooltip content={<ChartTooltip/>}/></PieChart></ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="display-font text-3xl font-semibold text-white">70</span><span className="mt-1 text-[9px] text-slate-500">Total findings</span></div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-3">{severityData.map(item => <div key={item.name} className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-[10px] text-slate-400"><span className="h-2 w-2 rounded-full" style={{ background: item.color }}/>{item.name}</span><span className="text-[10px] font-semibold text-slate-200">{item.value}</span></div>)}</div>
      </div>
    </div>
    <div className="panel overflow-hidden rounded-xl">
      <div className="p-4 sm:p-5"><SectionHeading title="Recent scans" subtitle="A live view of your latest security activity" action={<button onClick={() => setActive("Scans")} className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-200 hover:text-cyan-100">View all scans <ArrowUpRight size={13}/></button>}/></div>
      <ScanTable scans={recent}/>
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="panel rounded-xl p-4 sm:p-5"><SectionHeading title="Priority attention" subtitle="Findings that may need review" action={<button onClick={() => setActive("Vulnerabilities")} className="text-[10px] text-cyan-200">View findings <ArrowUpRight size={12} className="inline"/></button>}/>
        {findings.slice(0,3).map(f => <div key={f.title} className="flex items-start gap-3 border-t border-line py-3 first:border-0"><div className={cn("mt-0.5 rounded-lg p-2", f.severity==="Critical"?"bg-rose-400/10 text-rose-300":f.severity==="High"?"bg-orange-400/10 text-orange-300":"bg-amber-300/10 text-amber-200")}><ShieldAlert size={14}/></div><div className="min-w-0 flex-1"><div className="text-[10px] font-semibold text-slate-200">{f.title}</div><div className="mt-1 truncate text-[9px] text-slate-500">{f.url}</div></div><Severity value={f.severity}/></div>)}
      </div>
      <div className="panel relative overflow-hidden rounded-xl p-5"><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-400/[.08] blur-3xl"/><div className="relative flex items-start gap-3"><div className="rounded-xl border border-violet-300/20 bg-violet-300/10 p-3 text-violet-200"><Bot size={20}/></div><div><div className="flex items-center gap-2 text-[12px] font-semibold text-white">Ask Jarwis AI <span className="rounded bg-violet-300/10 px-1.5 py-0.5 text-[8px] text-violet-200">BETA</span></div><p className="mt-1 max-w-sm text-[10px] leading-relaxed text-slate-400">Get plain-language explanations and practical remediation guidance for your security findings.</p></div></div><div className="relative mt-5 rounded-xl border border-line bg-[#0a1220] p-3"><div className="text-[10px] text-slate-500">Suggested question</div><div className="mt-1 text-[11px] text-slate-200">How should I fix the missing Content-Security-Policy?</div><button onClick={() => setActive("AI Assistant")} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-violet-300/15 px-3 py-2 text-[10px] font-semibold text-violet-100 hover:bg-violet-300/20">Ask Jarwis <ArrowUpRight size={12}/></button></div></div>
    </div>
    <div className="text-center text-[9px] text-slate-600">Demo workspace data · Connect the FastAPI backend to display live security results.</div>
  </div>;
}

function ScanTable({ scans }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left"><thead><tr className="border-y border-line bg-white/[.015] text-[9px] uppercase tracking-wider text-slate-500"><th className="px-5 py-3 font-semibold">Target</th><th className="px-4 py-3 font-semibold">Scan type</th><th className="px-4 py-3 font-semibold">Started</th><th className="px-4 py-3 font-semibold">Findings</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold"></th></tr></thead><tbody>{scans.map((s,i) => <tr key={s.domain} className="border-b border-line/70 last:border-0 hover:bg-white/[.02]"><td className="px-5 py-4"><div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-[#0a1220] text-slate-400"><Globe2 size={14}/></div><div><div className="text-[10px] font-semibold text-slate-200">{s.domain}</div><div className="mt-1 text-[9px] text-slate-500">Web application</div></div></div></td><td className="px-4 py-4 text-[10px] text-slate-400">{s.type}</td><td className="px-4 py-4 text-[10px] text-slate-400">{s.date}</td><td className="px-4 py-4"><span className={cn("text-[11px] font-semibold",s.findings>10?"text-orange-300":s.findings>0?"text-slate-200":"text-slate-500")}>{s.findings.toString().padStart(2,"0")}</span></td><td className="px-4 py-4"><Status value={s.status}/></td><td className="px-4 py-4"><button aria-label={`View ${s.domain}`} className="rounded-md p-1.5 text-slate-500 hover:bg-white/5 hover:text-white"><MoreHorizontal size={15}/></button></td></tr>)}</tbody></table></div>;
}

function ScansPage({ scans, startScan }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const filtered = scans.filter(s => s.domain.toLowerCase().includes(query.toLowerCase()) && (status==="All statuses" || s.status===status));
  return <div className="space-y-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="display-font text-xl font-semibold">Scan history</h2><p className="mt-1 text-[11px] text-slate-500">Track scans, status, and discovered findings.</p></div><button onClick={startScan} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-[10px] font-bold text-[#07111c]"><Plus size={14}/> New scan</button></div>
    <div className="panel rounded-xl p-3"><div className="flex flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center gap-2 rounded-lg border border-line bg-[#0a1220] px-3 py-2.5"><Search size={14} className="text-slate-500"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by domain..." className="w-full bg-transparent text-[11px] text-white outline-none placeholder:text-slate-600"/></div><div className="flex items-center gap-2 rounded-lg border border-line bg-[#0a1220] px-3 py-2"><Filter size={13} className="text-slate-500"/><select value={status} onChange={e=>setStatus(e.target.value)} className="bg-transparent text-[10px] text-slate-300 outline-none"><option>All statuses</option><option>Completed</option><option>Running</option><option>Failed</option></select></div></div></div>
    <div className="panel overflow-hidden rounded-xl"><div className="p-4"><SectionHeading title={`${filtered.length} scans`} subtitle="Demo data for the current workspace"/></div><ScanTable scans={filtered}/>{filtered.length===0 && <div className="p-10 text-center text-[11px] text-slate-500">No scans match your search.</div>}</div>
  </div>;
}

function VulnerabilitiesPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All severities");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => findings.filter(f => f.title.toLowerCase().includes(query.toLowerCase()) || f.url.toLowerCase().includes(query.toLowerCase())).filter(f => severity==="All severities" || f.severity===severity), [query,severity]);
  return <div className="space-y-5"><div><h2 className="display-font text-xl font-semibold">Vulnerability findings</h2><p className="mt-1 text-[11px] text-slate-500">Review discovered issues and prioritize remediation.</p></div>
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4"><MetricCard title="Critical" value="04" icon={ShieldAlert} tone="rose" note="Immediate review recommended"/><MetricCard title="High" value="12" icon={Bug} tone="orange" note="Address as a priority"/><MetricCard title="Medium" value="23" icon={Target} tone="violet" note="Plan remediation"/><MetricCard title="Low" value="31" icon={ShieldCheck} tone="cyan" note="Improve security posture"/></div>
    <div className="panel rounded-xl p-3"><div className="flex flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center gap-2 rounded-lg border border-line bg-[#0a1220] px-3 py-2.5"><Search size={14} className="text-slate-500"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search findings or affected URL..." className="w-full bg-transparent text-[11px] outline-none placeholder:text-slate-600"/></div><select value={severity} onChange={e=>setSeverity(e.target.value)} className="rounded-lg border border-line bg-[#0a1220] px-3 py-2 text-[10px] text-slate-300 outline-none"><option>All severities</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div></div>
    <div className="panel overflow-hidden rounded-xl"><div className="flex items-center justify-between p-4"><div><div className="text-[12px] font-semibold">All findings <span className="ml-1 text-slate-500">({filtered.length})</span></div><div className="mt-1 text-[9px] text-slate-500">Demo findings — not live scan results</div></div><button className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[10px] text-slate-300 hover:bg-white/5"><Download size={13}/> Export</button></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead><tr className="border-y border-line bg-white/[.015] text-[9px] uppercase tracking-wider text-slate-500"><th className="px-5 py-3">Finding</th><th className="px-4 py-3">Severity</th><th className="px-4 py-3">Affected URL</th><th className="px-4 py-3">Discovered</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr></thead><tbody>{filtered.map(f=><tr key={f.title} className="border-b border-line/70 hover:bg-white/[.02]"><td className="px-5 py-4"><div className="text-[10px] font-semibold text-slate-200">{f.title}</div><div className="mt-1 text-[9px] text-slate-500">{f.category}</div></td><td className="px-4 py-4"><Severity value={f.severity}/></td><td className="max-w-[230px] truncate px-4 py-4 text-[10px] text-slate-400">{f.url}</td><td className="px-4 py-4 text-[10px] text-slate-400">{f.date}</td><td className="px-4 py-4"><Status value={f.status}/></td><td className="px-4 py-4"><button onClick={()=>setSelected(f)} className="whitespace-nowrap text-[10px] font-semibold text-cyan-200 hover:text-cyan-100">View details <ChevronRight size={12} className="inline"/></button></td></tr>)}</tbody></table></div>
      {filtered.length===0 && <div className="p-10 text-center text-[11px] text-slate-500">No findings match your filters.</div>}
    </div>
    {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={()=>setSelected(null)}><div className="panel w-full max-w-xl rounded-2xl p-5 shadow-2xl" onClick={e=>e.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><Severity value={selected.severity}/><h3 className="display-font mt-3 text-lg font-semibold">{selected.title}</h3><p className="mt-1 text-[10px] text-slate-500">{selected.url}</p></div><button onClick={()=>setSelected(null)} className="rounded-lg p-2 text-slate-400 hover:bg-white/5"><X size={16}/></button></div><div className="mt-5 space-y-4"><div><h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Introduction</h4><p className="mt-2 text-[11px] leading-relaxed text-slate-300">This is a demo finding. Connect the backend to display verified evidence and a finding-specific explanation.</p></div><div><h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Potential impact</h4><p className="mt-2 text-[11px] leading-relaxed text-slate-300">Impact depends on the application context and should be assessed against the evidence returned by the security scanner.</p></div><div><h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recommended next step</h4><p className="mt-2 text-[11px] leading-relaxed text-slate-300">Review the affected endpoint, validate the finding in an authorized environment, and apply the relevant security control.</p></div></div><div className="mt-5 rounded-lg border border-amber-300/15 bg-amber-300/[.05] p-3 text-[10px] text-amber-100/80">AI/demo guidance only. This is not a verified assessment of the target.</div></div></div>}
  </div>;
}

function DomainsPage() {
  const [domain,setDomain] = useState("");
  const [domains,setDomains] = useState([{name:"acme-commerce.com",status:"Verified",txt:"jarwis-verification=7f4a2c9e",date:"Oct 21, 2026"},{name:"portal.northstar.io",status:"Pending",txt:"jarwis-verification=9d1b6e3a",date:"Oct 26, 2026"}]);
  const add = e => { e.preventDefault(); if(!domain.trim() || !domain.includes(".")) return; setDomains([{name:domain.trim().replace(/^https?:\/\//,"").replace(/\/$/,""),status:"Pending",txt:"jarwis-verification=demo-token",date:"Just now"},...domains]); setDomain(""); };
  return <div className="space-y-5"><div><h2 className="display-font text-xl font-semibold">Verified domains</h2><p className="mt-1 text-[11px] text-slate-500">Verify ownership before starting a security scan.</p></div><div className="panel rounded-xl p-5"><h3 className="text-[12px] font-semibold">Add a domain</h3><p className="mt-1 text-[10px] text-slate-500">Enter a domain you own or are explicitly authorized to test.</p><form onSubmit={add} className="mt-4 flex flex-col gap-3 sm:flex-row"><input value={domain} onChange={e=>setDomain(e.target.value)} placeholder="example.com" className="flex-1 rounded-lg border border-line bg-[#0a1220] px-3 py-3 text-[11px] outline-none focus:border-cyan-300/40"/><button className="rounded-lg bg-cyan-300 px-4 py-3 text-[10px] font-bold text-[#07111c]">Add domain</button></form></div><div className="panel overflow-hidden rounded-xl"><div className="p-4"><SectionHeading title="Your domains" subtitle={`${domains.length} domains added to this demo workspace`}/></div><div className="divide-y divide-line">{domains.map(d=><div key={d.name} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-3"><div className="rounded-lg border border-line bg-[#0a1220] p-2.5 text-slate-400"><Globe2 size={16}/></div><div className="min-w-0"><div className="truncate text-[11px] font-semibold">{d.name}</div><div className="mt-1 text-[9px] text-slate-500">Added {d.date}</div></div></div><Status value={d.status}/><div className="rounded-lg border border-line bg-[#0a1220] px-3 py-2 text-[9px] text-slate-500 sm:max-w-[230px]">TXT record: <span className="break-all text-slate-300">{d.txt}</span></div><button onClick={()=>setDomains(domains.map(x=>x.name===d.name?{...x,status:"Verified"}:x))} disabled={d.status==="Verified"} className="rounded-lg border border-line px-3 py-2 text-[10px] text-cyan-100 disabled:cursor-default disabled:text-slate-600">{d.status==="Verified"?"Verified":"Simulate verify"}</button></div>)}</div><p className="border-t border-line p-3 text-[9px] text-slate-600">Prototype only: verification is simulated in the browser. Real verification must be performed by the backend.</p></div></div>;
}

function AssistantPage() {
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([{role:"assistant",text:"Hi Jordan — I'm Jarwis, your AI security assistant. I can help explain vulnerability concepts and suggest remediation approaches. What would you like to understand?"}]);
  const send = text => { const value=(text||input).trim(); if(!value) return; setMessages(m=>[...m,{role:"user",text:value},{role:"assistant",text:"This prototype is not connected to an AI backend yet. Once the FastAPI assistant endpoint is available, I can provide a context-aware explanation using your verified scan findings and approved security documentation."}]); setInput(""); };
  return <div className="mx-auto flex h-[calc(100vh-130px)] max-w-4xl flex-col"><div className="mb-4"><h2 className="display-font text-xl font-semibold">AI Security Assistant</h2><p className="mt-1 text-[11px] text-slate-500">Security explanations and remediation guidance, in plain language.</p></div><div className="panel flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl"><div className="flex items-center gap-3 border-b border-line p-4"><div className="rounded-xl border border-violet-300/20 bg-violet-300/10 p-2.5 text-violet-200"><Bot size={18}/></div><div className="flex-1"><div className="text-[11px] font-semibold">Jarwis Intelligence</div><div className="mt-1 flex items-center gap-1.5 text-[9px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-amber-300"/> Demo mode · AI backend not connected</div></div><button onClick={()=>setMessages([])} className="text-[10px] text-slate-500 hover:text-white">Clear chat</button></div><div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">{messages.map((m,i)=><div key={i} className={cn("flex gap-3",m.role==="user"?"justify-end":"justify-start")}>{m.role==="assistant" && <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-300/10 text-violet-200"><Sparkles size={14}/></div>}<div className={cn("max-w-[85%] rounded-xl px-4 py-3 text-[11px] leading-relaxed",m.role==="user"?"bg-cyan-300/10 text-cyan-50":"border border-line bg-[#0a1220] text-slate-300")}>{m.text}</div></div>)}{messages.length===0 && <div className="flex h-full flex-col items-center justify-center text-center"><Bot size={28} className="text-violet-200"/><p className="mt-3 text-[12px] text-slate-300">Start a new security conversation</p></div>}</div><div className="border-t border-line p-4"><div className="mb-3 flex flex-wrap gap-2">{["Explain reflected XSS","How do I secure cookies?","What is rate limiting?"].map(s=><button key={s} onClick={()=>send(s)} className="rounded-full border border-line px-3 py-2 text-[9px] text-slate-400 hover:border-cyan-300/30 hover:text-cyan-100">{s}</button>)}</div><form onSubmit={e=>{e.preventDefault();send();}} className="flex items-center gap-2 rounded-xl border border-line bg-[#0a1220] p-2"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a security question..." className="min-w-0 flex-1 bg-transparent px-2 text-[11px] outline-none placeholder:text-slate-600"/><button className="rounded-lg bg-cyan-300 px-3 py-2 text-[10px] font-bold text-[#07111c]"><ArrowUpRight size={15}/></button></form><p className="mt-2 text-center text-[9px] text-slate-600">AI output should be reviewed. Do not share secrets or production credentials.</p></div></div></div>;
}

function ReportsPage() {
  return <div className="space-y-5"><div><h2 className="display-font text-xl font-semibold">Security reports</h2><p className="mt-1 text-[11px] text-slate-500">Review scan summaries and generated security reports.</p></div><div className="grid grid-cols-1 gap-4 md:grid-cols-3"><MetricCard title="Reports generated" value="24" icon={FileBarChart2} tone="cyan" note="Across your workspace"/><MetricCard title="Awaiting generation" value="02" icon={Clock3} tone="orange" note="Pending backend jobs"/><MetricCard title="Domains covered" value="12" icon={Globe2} tone="violet" note="Verified assets"/></div><div className="panel overflow-hidden rounded-xl"><div className="p-4"><SectionHeading title="Recent reports" subtitle="Example report records"/></div><div className="divide-y divide-line">{[{name:"Acme Commerce — Full Security Assessment",domain:"acme-commerce.com",date:"Oct 27, 2026",status:"Completed"},{name:"Northstar Portal — Authenticated Scan",domain:"portal.northstar.io",date:"Oct 27, 2026",status:"Pending"},{name:"Acme API — Security Review",domain:"api.acme-commerce.com",date:"Oct 26, 2026",status:"Completed"}].map(r=><div key={r.name} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"><div className="rounded-lg border border-line bg-[#0a1220] p-2.5 text-cyan-200"><FileBarChart2 size={16}/></div><div className="min-w-0 flex-1"><div className="text-[11px] font-semibold">{r.name}</div><div className="mt-1 text-[9px] text-slate-500">{r.domain} · {r.date}</div></div><Status value={r.status}/><button disabled={r.status!=="Completed"} className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-[10px] text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"><Download size={13}/> Download</button></div>)}</div><p className="border-t border-line p-3 text-[9px] text-slate-600">Downloads are placeholders until report generation is connected to the backend.</p></div></div>;
}

function AdminPage({ active }) {
  const [requests,setRequests] = useState([{name:"Taylor Morgan",email:"taylor@vertexlabs.io",company:"Vertex Labs",use:"Application security testing",status:"Pending"},{name:"Alex Chen",email:"alex@brightpath.dev",company:"BrightPath",use:"Continuous security monitoring",status:"Pending"},{name:"Sam Patel",email:"sam@orbit.app",company:"Orbit Systems",use:"Pre-release vulnerability assessment",status:"Approved"}]);
  if(active==="Users & Access") return <div className="space-y-5"><div><h2 className="display-font text-xl font-semibold">Access requests</h2><p className="mt-1 text-[11px] text-slate-500">Review and manage requests for platform access.</p></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-3"><MetricCard title="Pending requests" value={requests.filter(r=>r.status==="Pending").length.toString().padStart(2,"0")} icon={Clock3} tone="orange" note="Require review"/><MetricCard title="Approved" value={requests.filter(r=>r.status==="Approved").length.toString().padStart(2,"0")} icon={CheckCircle2} tone="cyan" note="Access granted"/><MetricCard title="Total applicants" value={requests.length.toString().padStart(2,"0")} icon={Users} tone="violet" note="Demo workspace"/></div><div className="panel overflow-hidden rounded-xl"><div className="p-4"><SectionHeading title="Applicant queue" subtitle="Demo requests — decisions are local to this browser session"/></div><div className="divide-y divide-line">{requests.map(r=><div key={r.email} className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center"><div className="flex min-w-0 flex-1 items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-300/10 text-[10px] font-bold text-indigo-200">{r.name.split(" ").map(n=>n[0]).join("")}</div><div className="min-w-0"><div className="text-[11px] font-semibold">{r.name}</div><div className="text-[9px] text-slate-500">{r.email} · {r.company}</div><div className="mt-1 text-[10px] text-slate-400">{r.use}</div></div></div><Status value={r.status}/>{r.status==="Pending" && <div className="flex gap-2"><button onClick={()=>setRequests(requests.map(x=>x.email===r.email?{...x,status:"Approved"}:x))} className="rounded-lg bg-emerald-400/10 px-3 py-2 text-[10px] font-semibold text-emerald-300 hover:bg-emerald-400/15">Approve</button><button onClick={()=>setRequests(requests.map(x=>x.email===r.email?{...x,status:"Rejected"}:x))} className="rounded-lg border border-line px-3 py-2 text-[10px] text-slate-400 hover:text-rose-300">Reject</button></div>}</div>)}</div></div></div>;
  if(active==="Payments") return <div className="space-y-5"><div><h2 className="display-font text-xl font-semibold">Payment history</h2><p className="mt-1 text-[11px] text-slate-500">Subscription payment records from the connected payment provider.</p></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-3"><MetricCard title="Collected this month" value="₹48,000" icon={CreditCard} tone="cyan" note="Illustrative demo amount"/><MetricCard title="Successful payments" value="18" icon={CheckCircle2} tone="violet" note="Demo transactions"/><MetricCard title="Pending payments" value="03" icon={Clock3} tone="orange" note="Awaiting confirmation"/></div><div className="panel overflow-hidden rounded-xl"><div className="p-4"><SectionHeading title="Transactions" subtitle="Sample payment records"/></div><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left"><thead><tr className="border-y border-line text-[9px] uppercase text-slate-500"><th className="px-5 py-3">Customer</th><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{[{name:"Taylor Morgan",ref:"pay_demo_0142",amount:"₹4,000",date:"Oct 27, 2026",status:"Completed"},{name:"Alex Chen",ref:"pay_demo_0138",amount:"₹4,000",date:"Oct 26, 2026",status:"Pending"},{name:"Sam Patel",ref:"pay_demo_0129",amount:"₹8,000",date:"Oct 24, 2026",status:"Completed"}].map(p=><tr key={p.ref} className="border-b border-line/70 text-[10px]"><td className="px-5 py-4 font-semibold text-slate-200">{p.name}</td><td className="px-4 py-4 text-slate-500">{p.ref}</td><td className="px-4 py-4">{p.amount}</td><td className="px-4 py-4 text-slate-400">{p.date}</td><td className="px-4 py-4"><Status value={p.status==="Completed"?"Completed":"Pending"}/></td></tr>)}</tbody></table></div></div></div>;
  return <div className="space-y-5"><div><h2 className="display-font text-xl font-semibold">Settings</h2><p className="mt-1 text-[11px] text-slate-500">Manage workspace preferences and security options.</p></div><div className="panel divide-y divide-line rounded-xl">{[{title:"Workspace profile",desc:"Workspace name, logo, and organization details",icon:Users},{title:"Authentication",desc:"Google OAuth and email/password sign-in settings",icon:LockKeyhole},{title:"Notifications",desc:"Scan completion and security alert preferences",icon:Bell},{title:"API configuration",desc:"Backend connection and environment settings",icon:Settings}].map(x=>{const Icon=x.icon;return <button key={x.title} className="flex w-full items-center gap-3 p-4 text-left hover:bg-white/[.02]"><div className="rounded-lg border border-line bg-[#0a1220] p-2.5 text-slate-400"><Icon size={15}/></div><div className="flex-1"><div className="text-[11px] font-semibold">{x.title}</div><div className="mt-1 text-[10px] text-slate-500">{x.desc}</div></div><ChevronRight size={15} className="text-slate-600"/></button>})}</div><div className="rounded-xl border border-amber-300/15 bg-amber-300/[.04] p-4 text-[10px] leading-relaxed text-amber-100/80"><CircleHelp size={14} className="mr-2 inline"/>These settings are UI placeholders. Configure authentication and access policies on the backend before production use.</div></div>;
}

function NewScanModal({ close, onStart }) {
  const [domain,setDomain] = useState("acme-commerce.com");
  const [path,setPath] = useState("/login");
  const [kind,setKind] = useState("Full application scan");
  const [accepted,setAccepted] = useState(false);
  const [error,setError] = useState("");
  const submit = e => { e.preventDefault(); if(!domain.trim() || !domain.includes(".")){setError("Enter a valid domain.");return;} if(!accepted){setError("Confirm that you are authorized to test this domain.");return;} onStart({domain:domain.trim(),type:kind,path}); close(); };
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4" onClick={close}><div className="panel my-auto w-full max-w-lg rounded-2xl p-5 sm:p-6" onClick={e=>e.stopPropagation()}><div className="flex items-start justify-between"><div><div className="flex items-center gap-2 text-cyan-200"><div className="rounded-lg bg-cyan-300/10 p-2"><Zap size={16}/></div><span className="text-[10px] font-bold uppercase tracking-wider">New scan</span></div><h2 className="display-font mt-3 text-xl font-semibold">Configure security scan</h2><p className="mt-1 text-[10px] text-slate-500">Only scan domains you own or are authorized to test.</p></div><button onClick={close} className="rounded-lg p-2 text-slate-400 hover:bg-white/5"><X size={16}/></button></div><form onSubmit={submit} className="mt-5 space-y-4"><div><label className="mb-2 block text-[10px] font-semibold text-slate-300">Verified domain</label><select value={domain} onChange={e=>setDomain(e.target.value)} className="w-full rounded-lg border border-line bg-[#0a1220] px-3 py-3 text-[11px] outline-none"><option value="acme-commerce.com">acme-commerce.com · Verified</option><option value="portal.northstar.io">portal.northstar.io · Pending (demo)</option></select></div><div><label className="mb-2 block text-[10px] font-semibold text-slate-300">Scan type</label><select value={kind} onChange={e=>setKind(e.target.value)} className="w-full rounded-lg border border-line bg-[#0a1220] px-3 py-3 text-[11px] outline-none"><option>Full application scan</option><option>Header analysis</option><option>Authenticated scan</option><option>API security scan</option></select></div><div><label className="mb-2 block text-[10px] font-semibold text-slate-300">Login path <span className="font-normal text-slate-600">(optional)</span></label><input value={path} onChange={e=>setPath(e.target.value)} placeholder="/login" className="w-full rounded-lg border border-line bg-[#0a1220] px-3 py-3 text-[11px] outline-none focus:border-cyan-300/40"/></div><label className="flex items-start gap-2.5 rounded-lg border border-line bg-[#0a1220] p-3"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} className="mt-0.5 accent-cyan-300"/><span className="text-[10px] leading-relaxed text-slate-400">I confirm that I own this domain or have explicit permission to conduct security testing on it.</span></label>{error && <div className="rounded-lg border border-rose-300/20 bg-rose-300/10 p-2.5 text-[10px] text-rose-200">{error}</div>}<div className="flex gap-2 pt-1"><button type="button" onClick={close} className="flex-1 rounded-lg border border-line px-4 py-3 text-[10px] font-semibold text-slate-300">Cancel</button><button className="flex-1 rounded-lg bg-cyan-300 px-4 py-3 text-[10px] font-bold text-[#07111c]">Start demo scan <ArrowUpRight size={13} className="ml-1 inline"/></button></div><p className="text-center text-[9px] text-slate-600">Prototype only. This creates a local demo record and does not execute a real scan.</p></form></div></div>;
}

function App() {
  const [active,setActive] = useState("Overview");
  const [mobileOpen,setMobileOpen] = useState(false);
  const [modal,setModal] = useState(false);
  const [scans,setScans] = useState(initialScans);
  const startScan = ({domain,type}) => setScans(prev => [{domain,type,date:"Just now",status:"Running",findings:0,score:null},...prev]);
  const page = () => {
    if(active==="Overview") return <Overview scans={scans} setActive={setActive} startScan={()=>setModal(true)}/>;
    if(active==="Scans") return <ScansPage scans={scans} startScan={()=>setModal(true)}/>;
    if(active==="Vulnerabilities") return <VulnerabilitiesPage/>;
    if(active==="Domains") return <DomainsPage/>;
    if(active==="AI Assistant") return <AssistantPage/>;
    if(active==="Reports") return <ReportsPage/>;
    return <AdminPage active={active}/>;
  };
  return <div className="min-h-screen bg-ink text-slate-100">
    <Sidebar active={active} setActive={setActive} open={mobileOpen} close={()=>setMobileOpen(false)}/>
    <div className="min-h-screen lg:pl-[252px]"><Topbar active={active} onMenu={()=>setMobileOpen(true)}/><main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-7">{page()}</main></div>
    {modal && <NewScanModal close={()=>setModal(false)} onStart={startScan}/>}
  </div>;
}

export default App;
