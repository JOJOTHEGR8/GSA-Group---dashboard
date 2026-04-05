import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, ComposedChart, Area, AreaChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell, ReferenceLine, LabelList
} from "recharts";

const COLORS = {
  gsa: "#2563eb",
  gsaLight: "#93bbfd",
  accent: "#f59e0b",
  red: "#ef4444",
  green: "#10b981",
  purple: "#8b5cf6",
  slate: "#64748b",
  dark: "#0f172a",
  bg: "#f8fafc",
  cardBg: "#ffffff",
  border: "#e2e8f0",
  text: "#1e293b",
  textSec: "#64748b",
  delta: "#dc2626",
  bloom: "#8b5cf6",
  cobalt: "#059669",
  eth: "#d97706",
  abc: "#6366f1",
  f: "#ec4899",
  h: "#78716c",
  ighali: "#0891b2",
};

const tabs = [
  "Vue d'ensemble",
  "Compétiteurs",
  "Parts de marché",
  "Analyse produits",
  "Prévisions 3 ans",
];

// ─── DATA ────────────────────────────────────────────
const caNetData = [
  { period: "P0", ca: 30000, net: 2250, roce: 15 },
  { period: "P1", ca: 34739, net: 2022, roce: 11.7 },
  { period: "P2", ca: 40929, net: 1894, roce: 9.8 },
  { period: "P3", ca: 49344, net: 3620, roce: 13.6 },
  { period: "P4", ca: 56934, net: 1693, roce: 6.8 },
  { period: "P5", ca: 86839, net: 5871, roce: 20 },
  { period: "P6", ca: 108343, net: 6132, roce: 21 },
];

const shareValueData = [
  { name: "Delta", value: 321, bonus: 40, base: 281, tbl: 4 },
  { name: "GSA", value: 320, bonus: 40, base: 280, tbl: 4 },
  { name: "ABC", value: 289, bonus: 20, base: 269, tbl: 2 },
  { name: "ETH", value: 285, bonus: 10, base: 275, tbl: 1 },
  { name: "Cobalt", value: 263, bonus: 20, base: 243, tbl: 2 },
  { name: "Bloom", value: 258, bonus: 20, base: 238, tbl: 2 },
  { name: "IGHALI", value: 245, bonus: 30, base: 215, tbl: 3 },
  { name: "F", value: 240, bonus: 30, base: 210, tbl: 3 },
  { name: "H", value: 153, bonus: 0, base: 153, tbl: 0 },
];

const roceCompData = [
  { name: "ETH", roce: 34.0 },
  { name: "F", roce: 26.5 },
  { name: "Delta", roce: 24.6 },
  { name: "IGHALI", roce: 22.6 },
  { name: "GSA", roce: 21.0 },
  { name: "ABC", roce: 18.6 },
  { name: "Cobalt", roce: 14.0 },
  { name: "Bloom", roce: 13.6 },
  { name: "H", roce: -3.1 },
];

const revenueComp = [
  { name: "ABC", rev: 114454, net: 7754, vol: 91130 },
  { name: "ETH", rev: 114906, net: 11236, vol: 86606 },
  { name: "GSA", rev: 108343, net: 6132, vol: 52516 },
  { name: "Delta", rev: 86191, net: 7005, vol: 44447 },
  { name: "IGHALI", rev: 87439, net: 6254, vol: 57981 },
  { name: "Cobalt", rev: 72451, net: 2876, vol: 35347 },
  { name: "Bloom", rev: 57079, net: 1776, vol: 29321 },
  { name: "H", rev: 54278, net: -11350, vol: 21901 },
  { name: "F", rev: 45835, net: 3598, vol: 22868 },
];

const pdmEntAmer = [
  { period: "P1", gsa: 36, delta: 39, cobalt: 10, h: 28, eth: 0, bloom: 0 },
  { period: "P2", gsa: 38, delta: 42, cobalt: 8, h: 25, eth: 0, bloom: 10 },
  { period: "P3", gsa: 36, delta: 40, cobalt: 7, h: 22, eth: 0, bloom: 12 },
  { period: "P4", gsa: 35, delta: 36, cobalt: 5, h: 28, eth: 0, bloom: 17 },
  { period: "P5", gsa: 35, delta: 36, cobalt: 3, h: 28, eth: 0, bloom: 11 },
  { period: "P6", gsa: 30, delta: 29, cobalt: 4, h: 23, eth: 0, bloom: 0 },
];

const productMix = [
  { period: "P0", t: 100, tc: 0, tsc: 0, tsci: 0 },
  { period: "P1", t: 60, tc: 40, tsc: 0, tsci: 0 },
  { period: "P2", t: 30, tc: 50, tsc: 20, tsci: 0 },
  { period: "P3", t: 10, tc: 30, tsc: 40, tsci: 20 },
  { period: "P4", t: 5, tc: 20, tsc: 30, tsci: 45 },
  { period: "P5", t: 2, tc: 15, tsc: 20, tsci: 63 },
  { period: "P6", t: 0, tc: 7, tsc: 25, tsci: 68 },
];

const marginData = [
  { product: "T", cout: 1291, prix: 1387, marge: 96, pct: 6.9 },
  { product: "T-C", cout: 1595, prix: 1754, marge: 159, pct: 9.0 },
  { product: "T-SC", cout: 1805, prix: 1936, marge: 132, pct: 6.8 },
  { product: "T-SCI", cout: 2015, prix: 2187, marge: 173, pct: 7.9 },
];

const tblEvolution = [
  { period: "P0", profit: 0, people: 0, planet: 0, tbl: 0 },
  { period: "P1", profit: 0, people: 0, planet: 0, tbl: 0 },
  { period: "P2", profit: 0, people: 1, planet: 1, tbl: 0 },
  { period: "P3", profit: 1, people: 1, planet: 1, tbl: 1 },
  { period: "P4", profit: 0, people: 1, planet: 2, tbl: 0 },
  { period: "P5", profit: 2, people: 2, planet: 2, tbl: 2 },
  { period: "P6", profit: 3, people: 4, planet: 4, tbl: 4 },
];

const qualityComp = [
  { name: "F", quality: 304 },
  { name: "Bloom", quality: 303 },
  { name: "H", quality: 295 },
  { name: "GSA", quality: 288 },
  { name: "Delta", quality: 280 },
  { name: "Cobalt", quality: 279 },
  { name: "IGHALI", quality: 111 },
  { name: "ETH", quality: 103 },
  { name: "ABC", quality: 101 },
];

const radarGSA = [
  { dim: "CA", gsa: 85, delta: 68, eth: 90 },
  { dim: "Rentabilité", gsa: 62, delta: 72, eth: 100 },
  { dim: "Qualité", gsa: 95, delta: 92, eth: 34 },
  { dim: "RSE", gsa: 93, delta: 84, eth: 71 },
  { dim: "TBL", gsa: 100, delta: 100, eth: 25 },
  { dim: "Innovation", gsa: 90, delta: 75, eth: 60 },
  { dim: "Diversif. Géo", gsa: 85, delta: 55, eth: 70 },
];

const previsions = [
  { period: "P6", base: 108343, opti: 108343, pessi: 108343, netBase: 6132, netOpti: 6132, netPessi: 6132 },
  { period: "P7", base: 125000, opti: 132000, pessi: 112000, netBase: 9000, netOpti: 11000, netPessi: 5500 },
  { period: "P8", base: 138000, opti: 150000, pessi: 115000, netBase: 12000, netOpti: 15500, netPessi: 5000 },
  { period: "P9", base: 148000, opti: 165000, pessi: 118000, netBase: 15000, netOpti: 19000, netPessi: 4800 },
];

const commercData = [
  { period: "P0", val: 5700 },
  { period: "P1", val: 5800 },
  { period: "P2", val: 6515 },
  { period: "P3", val: 6722 },
  { period: "P4", val: 9288 },
  { period: "P5", val: 12085 },
  { period: "P6", val: 18409 },
];

// ─── COMPONENTS ──────────────────────────────────────

const KPI = ({ label, value, sub, color = COLORS.gsa }) => (
  <div style={{
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderTop: `3px solid ${color}`,
    borderRadius: 8,
    padding: "14px 18px",
    flex: 1,
    minWidth: 140,
  }}>
    <div style={{ fontSize: 11, color: COLORS.textSec, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, marginTop: 4 }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: color, fontWeight: 600, marginTop: 2 }}>{sub}</div>}
  </div>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 16, marginTop: 8 }}>
    <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.dark, margin: 0, letterSpacing: -0.3 }}>{children}</h2>
    {sub && <p style={{ fontSize: 12, color: COLORS.textSec, margin: "4px 0 0" }}>{sub}</p>}
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: 20,
    ...style,
  }}>{children}</div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 6,
      padding: "8px 12px",
      fontSize: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString("fr-CA") : p.value}{p.unit || ""}</strong>
        </div>
      ))}
    </div>
  );
};

// ─── TAB PANELS ──────────────────────────────────────

const VueEnsemble = () => (
  <div>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
      <KPI label="CA P6" value="108,3M$" sub="+261% vs P0" color={COLORS.gsa} />
      <KPI label="Résultat Net" value="6 132K$" sub="+172% vs P0" color={COLORS.green} />
      <KPI label="ROCE" value="21,0%" sub="TBL Niveau 4" color={COLORS.accent} />
      <KPI label="Share Value" value="320" sub="#2 mondial (+83)" color={COLORS.purple} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <SectionTitle sub="Évolution P0→P6 (en K$)">CA & Résultat Net</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={caNetData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" tick={{ fontSize: 11, fill: COLORS.textSec }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: COLORS.textSec }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: COLORS.textSec }} unit="%" domain={[0, 25]} />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="left" type="monotone" dataKey="ca" fill={COLORS.gsaLight} stroke={COLORS.gsa} strokeWidth={2} fillOpacity={0.3} name="Chiffre d'Affaires" />
            <Bar yAxisId="left" dataKey="net" fill={COLORS.green} radius={[3, 3, 0, 0]} barSize={28} name="Résultat Net">
              {caNetData.map((e, i) => (
                <Cell key={i} fill={e.net < 2000 ? COLORS.red : COLORS.green} />
              ))}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="roce" stroke={COLORS.accent} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.accent }} name="ROCE" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <SectionTitle sub="Les 3 phases du mandat">Progression TBL</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={tblEvolution} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" tick={{ fontSize: 11, fill: COLORS.textSec }} />
            <YAxis domain={[0, 4]} ticks={[0,1,2,3,4]} tick={{ fontSize: 10, fill: COLORS.textSec }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="profit" fill={COLORS.gsa} name="Profit" radius={[2,2,0,0]} barSize={16} />
            <Bar dataKey="people" fill={COLORS.green} name="People" radius={[2,2,0,0]} barSize={16} />
            <Bar dataKey="planet" fill={COLORS.accent} name="Planet" radius={[2,2,0,0]} barSize={16} />
            <Bar dataKey="tbl" fill={COLORS.purple} name="TBL" radius={[2,2,0,0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>

    <Card style={{ marginTop: 16 }}>
      <SectionTitle sub="P0→P6 — Commercialisation & Distribution (K$)">Structure des coûts</SectionTitle>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={commercData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="period" tick={{ fontSize: 11, fill: COLORS.textSec }} />
          <YAxis tick={{ fontSize: 10, fill: COLORS.textSec }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="val" fill="#fde68a" stroke={COLORS.accent} strokeWidth={2} name="Coûts Commercialisation" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>

    <Card style={{ marginTop: 16 }}>
      <SectionTitle>Tableau récapitulatif du mandat</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: COLORS.dark, color: "#fff" }}>
              {["Indicateur","P0","P1","P2","P3","P4","P5","P6","Δ P0→P6"].map(h => (
                <th key={h} style={{ padding: "8px 10px", textAlign: h === "Indicateur" ? "left" : "right", fontWeight: 600, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "CA (K$)", vals: ["30 000","34 739","40 929","49 344","56 934","86 839","108 343"], delta: "+261%", color: COLORS.green },
              { label: "Résultat Net (K$)", vals: ["2 250","2 022","1 894","3 620","1 693","5 871","6 132"], delta: "+172%", color: COLORS.green },
              { label: "ROCE (%)", vals: ["15,0","11,7","9,8","13,6","6,8","20,0","21,0"], delta: "+6 pts", color: COLORS.green },
              { label: "Volume de ventes", vals: ["~30 000","~30 000","~32 000","~37 000","~37 000","46 479","52 516"], delta: "+75%", color: COLORS.green },
              { label: "Prix moyen ($)", vals: ["1 000","1 158","1 278","1 334","1 539","1 868","2 063"], delta: "+106%", color: COLORS.green },
              { label: "TBL (Niveau)", vals: ["0","0","0","1","0","2","4"], delta: "0→4", color: COLORS.purple },
              { label: "Share Value", vals: ["~150","—","—","—","—","—","320"], delta: "+113%", color: COLORS.gsa },
              { label: "Qualité (indice)", vals: ["125","—","—","—","218","253","288"], delta: "+130%", color: COLORS.accent },
              { label: "RSE (indice)", vals: ["100","—","—","—","153","191","226"], delta: "+126%", color: COLORS.green },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "#fff", borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "7px 10px", fontWeight: 600, color: COLORS.dark }}>{row.label}</td>
                {row.vals.map((v, j) => (
                  <td key={j} style={{ padding: "7px 10px", textAlign: "right", color: COLORS.text, fontVariantNumeric: "tabular-nums" }}>{v}</td>
                ))}
                <td style={{ padding: "7px 10px", textAlign: "right", fontWeight: 700, color: row.color }}>{row.delta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const Competiteurs = () => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <SectionTitle sub="Share Value totale = Base + Bonus TBL">Classement Share Value P6</SectionTitle>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={shareValueData} layout="vertical" margin={{ top: 5, right: 40, bottom: 5, left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
            <XAxis type="number" domain={[0, 350]} tick={{ fontSize: 10, fill: COLORS.textSec }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: COLORS.text, fontWeight: 600 }} width={55} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="base" stackId="a" fill="#94a3b8" name="Base" radius={[0,0,0,0]} barSize={22}>
              {shareValueData.map((e, i) => (
                <Cell key={i} fill={e.name === "GSA" ? COLORS.gsa : "#cbd5e1"} />
              ))}
            </Bar>
            <Bar dataKey="bonus" stackId="a" fill={COLORS.accent} name="Bonus TBL" radius={[0, 4, 4, 0]} barSize={22}>
              {shareValueData.map((e, i) => (
                <Cell key={i} fill={e.name === "GSA" ? "#60a5fa" : "#fbbf24"} />
              ))}
              <LabelList position="right" formatter={v => ""} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
          {[
            { color: "#cbd5e1", label: "Base" },
            { color: "#fbbf24", label: "Bonus TBL" },
            { color: COLORS.gsa, label: "GSA" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: COLORS.textSec }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Return On Capital Employed (%)">ROCE — Classement P6</SectionTitle>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={roceCompData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
            <XAxis type="number" domain={[-5, 40]} tick={{ fontSize: 10, fill: COLORS.textSec }} unit="%" />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: COLORS.text, fontWeight: 600 }} width={55} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={20} stroke={COLORS.accent} strokeDasharray="5 5" label={{ value: "TBL 4 (>20%)", fill: COLORS.accent, fontSize: 10 }} />
            <Bar dataKey="roce" name="ROCE" radius={[0, 4, 4, 0]} barSize={20}>
              {roceCompData.map((e, i) => (
                <Cell key={i} fill={e.name === "GSA" ? COLORS.gsa : e.roce < 0 ? COLORS.red : e.roce >= 20 ? COLORS.green : "#94a3b8"} />
              ))}
              <LabelList dataKey="roce" position="right" formatter={v => `${v}%`} style={{ fontSize: 10, fontWeight: 600, fill: COLORS.text }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>

    <Card style={{ marginTop: 16 }}>
      <SectionTitle sub="Positionnement stratégique — GSA vs Top 2 rivaux">Radar Compétitif P6</SectionTitle>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={radarGSA} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11, fill: COLORS.text, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: COLORS.textSec }} />
            <Radar name="GSA" dataKey="gsa" stroke={COLORS.gsa} fill={COLORS.gsa} fillOpacity={0.25} strokeWidth={2} />
            <Radar name="Delta" dataKey="delta" stroke={COLORS.delta} fill={COLORS.delta} fillOpacity={0.1} strokeWidth={2} />
            <Radar name="ETH" dataKey="eth" stroke={COLORS.eth} fill={COLORS.eth} fillOpacity={0.1} strokeWidth={2} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>

    <Card style={{ marginTop: 16 }}>
      <SectionTitle>Tableau comparatif complet P6</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ background: COLORS.dark, color: "#fff" }}>
              {["","ABC","Bloom","Cobalt","Delta","ETH","F","GSA","H","IGHALI"].map(h => (
                <th key={h} style={{ padding: "7px 8px", textAlign: h === "" ? "left" : "center", fontWeight: 600, fontSize: 10, ...(h === "GSA" ? { background: COLORS.gsa } : {}) }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "CA (K$)", vals: ["114 454","57 079","72 451","86 191","114 906","45 835","108 343","54 278","87 439"] },
              { label: "Net (K$)", vals: ["7 754","1 776","2 876","7 005","11 236","3 598","6 132","-11 350","6 254"] },
              { label: "ROCE", vals: ["18,6%","13,6%","14,0%","24,6%","34,0%","26,5%","21,0%","-3,1%","22,6%"] },
              { label: "Volume", vals: ["91 130","29 321","35 347","44 447","86 606","22 868","52 516","21 901","57 981"] },
              { label: "Qualité", vals: ["101","303","279","280","103","304","288","295","111"] },
              { label: "RSE", vals: ["176","210","217","204","172","210","226","229","176"] },
              { label: "TBL", vals: ["Niv.2","Niv.2","Niv.2","Niv.4","Niv.1","Niv.3","Niv.4","0","Niv.3"] },
              { label: "Share Value", vals: ["289","258","263","321","285","240","320","153","245"] },
              { label: "DPS ($)", vals: ["63,0","17,0","9,9","13,3","46,7","0,0","39,1","0,0","16,3"] },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "#fff", borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "6px 8px", fontWeight: 600, color: COLORS.dark, whiteSpace: "nowrap" }}>{row.label}</td>
                {row.vals.map((v, j) => (
                  <td key={j} style={{
                    padding: "6px 8px",
                    textAlign: "center",
                    fontVariantNumeric: "tabular-nums",
                    color: COLORS.text,
                    ...(j === 6 ? { background: "#eff6ff", fontWeight: 700, color: COLORS.gsa } : {}),
                    ...(v.startsWith("-") ? { color: COLORS.red } : {}),
                  }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const PartsMarche = () => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <SectionTitle sub="Évolution P1→P6 — segment le plus stratégique">PdM Entreprises Amériques (%)</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={pdmEntAmer} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" tick={{ fontSize: 11, fill: COLORS.textSec }} />
            <YAxis domain={[0, 50]} tick={{ fontSize: 10, fill: COLORS.textSec }} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="gsa" stroke={COLORS.gsa} strokeWidth={3} dot={{ r: 4 }} name="GSA" />
            <Line type="monotone" dataKey="delta" stroke={COLORS.delta} strokeWidth={2} dot={{ r: 3 }} name="Delta" />
            <Line type="monotone" dataKey="h" stroke={COLORS.h} strokeWidth={2} dot={{ r: 3 }} name="H" />
            <Line type="monotone" dataKey="cobalt" stroke={COLORS.cobalt} strokeWidth={1.5} dot={{ r: 2 }} name="Cobalt" strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <SectionTitle sub="Tous segments, toutes régions — P6">Répartition des PdM de GSA</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginTop: 12 }}>
            <thead>
              <tr style={{ background: COLORS.gsa, color: "#fff" }}>
                <th style={{ padding: "8px 10px", textAlign: "left" }}>Région</th>
                <th style={{ padding: "8px 10px", textAlign: "center" }}>PME</th>
                <th style={{ padding: "8px 10px", textAlign: "center" }}>Particuliers</th>
                <th style={{ padding: "8px 10px", textAlign: "center" }}>Entreprises</th>
              </tr>
            </thead>
            <tbody>
              {[
                { region: "Amériques", pme: "23% (-2)", part: "0% (-1)", ent: "30% (-5)" },
                { region: "EMEA", pme: "—", part: "—", ent: "6% (+6)" },
                { region: "Asie-Australie", pme: "15% (+5)", part: "—", ent: "18% (-3)" },
              ].map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "#fff", borderBottom: `1px solid ${COLORS.border}` }}>
                  <td style={{ padding: "8px 10px", fontWeight: 600 }}>{r.region}</td>
                  <td style={{ padding: "8px 10px", textAlign: "center" }}>{r.pme}</td>
                  <td style={{ padding: "8px 10px", textAlign: "center" }}>{r.part}</td>
                  <td style={{ padding: "8px 10px", textAlign: "center", fontWeight: 600, color: COLORS.gsa }}>{r.ent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.dark, marginBottom: 8 }}>Ventes GSA par marché P6 (volume)</div>
          {[
            { label: "Amériques", val: 27034, total: 52516, color: COLORS.gsa },
            { label: "Asie-Australie", val: 15400, total: 52516, color: COLORS.accent },
            { label: "EMEA", val: 4045, total: 52516, color: COLORS.green },
          ].map(m => (
            <div key={m.label} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                <span style={{ fontWeight: 500 }}>{m.label}</span>
                <span style={{ color: COLORS.textSec }}>{m.val.toLocaleString("fr-CA")} ({Math.round(m.val/m.total*100)}%)</span>
              </div>
              <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${m.val/m.total*100}%`, background: m.color, borderRadius: 4, transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <Card style={{ marginTop: 16 }}>
      <SectionTitle sub="Indice qualité produits — tous concurrents">Qualité P6</SectionTitle>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={qualityComp} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: COLORS.textSec }} />
          <YAxis domain={[0, 350]} tick={{ fontSize: 10, fill: COLORS.textSec }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="quality" name="Indice Qualité" radius={[4, 4, 0, 0]} barSize={32}>
            {qualityComp.map((e, i) => (
              <Cell key={i} fill={e.name === "GSA" ? COLORS.gsa : "#cbd5e1"} />
            ))}
            <LabelList dataKey="quality" position="top" style={{ fontSize: 10, fontWeight: 600, fill: COLORS.text }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

const AnalyseProduits = () => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <SectionTitle sub="% du volume total par produit">Évolution du mix produit</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={productMix} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" tick={{ fontSize: 11, fill: COLORS.textSec }} />
            <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 10, fill: COLORS.textSec }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="tsci" stackId="1" fill={COLORS.gsa} stroke={COLORS.gsa} name="T-SCI" />
            <Area type="monotone" dataKey="tsc" stackId="1" fill={COLORS.green} stroke={COLORS.green} name="T-SC" />
            <Area type="monotone" dataKey="tc" stackId="1" fill={COLORS.accent} stroke={COLORS.accent} name="T-C" />
            <Area type="monotone" dataKey="t" stackId="1" fill="#cbd5e1" stroke="#94a3b8" name="T" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <SectionTitle sub="Prix, coût et marge par produit — P6">Analyse de rentabilité produit</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={marginData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="product" tick={{ fontSize: 11, fill: COLORS.textSec }} />
            <YAxis tick={{ fontSize: 10, fill: COLORS.textSec }} unit="$" />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="cout" fill="#cbd5e1" name="Coût unitaire" radius={[3,3,0,0]} barSize={28} />
            <Bar dataKey="prix" fill={COLORS.gsa} name="Prix moyen" radius={[3,3,0,0]} barSize={28} />
            <Bar dataKey="marge" fill={COLORS.green} name="Marge unitaire" radius={[3,3,0,0]} barSize={28}>
              <LabelList dataKey="pct" position="top" formatter={v => `${v}%`} style={{ fontSize: 10, fontWeight: 700, fill: COLORS.green }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>

    <Card style={{ marginTop: 16 }}>
      <SectionTitle>Détail des marges par produit P6</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: COLORS.dark, color: "#fff" }}>
              {["Produit","Volume","Coût prod.","Composants","Assemblage","R&D","Pub","Services","Distrib.","Coût direct","Frais gén.","Coût total","Prix moyen","Marge $","Marge %"].map(h => (
                <th key={h} style={{ padding: "7px 6px", textAlign: h === "Produit" ? "left" : "right", fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { prod: "T-C", vol: "3 550", cp: "530", comp: "420", asm: "50", rd: "55", pub: "36", svc: "120", dist: "174", cd: "1 385", fg: "210", ct: "1 595", prix: "1 754", m: "159", mp: "9,0%", color: COLORS.green },
              { prod: "T-SC", vol: "13 050", cp: "530", comp: "630", asm: "50", rd: "55", pub: "36", svc: "106", dist: "188", cd: "1 595", fg: "210", ct: "1 805", prix: "1 936", m: "132", mp: "6,8%", color: COLORS.accent },
              { prod: "T-SCI", vol: "41 400", cp: "530", comp: "840", asm: "50", rd: "55", pub: "36", svc: "120", dist: "174", cd: "1 805", fg: "210", ct: "2 015", prix: "2 187", m: "173", mp: "7,9%", color: COLORS.gsa },
            ].map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "#fff", borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "6px 6px", fontWeight: 700, color: r.color }}>{r.prod}</td>
                {[r.vol, r.cp, r.comp, r.asm, r.rd, r.pub, r.svc, r.dist, r.cd, r.fg, r.ct, r.prix].map((v, j) => (
                  <td key={j} style={{ padding: "6px 6px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{v}</td>
                ))}
                <td style={{ padding: "6px 6px", textAlign: "right", fontWeight: 700, color: COLORS.green }}>{r.m}</td>
                <td style={{ padding: "6px 6px", textAlign: "right", fontWeight: 700, color: r.color }}>{r.mp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, padding: "10px 14px", background: "#fef3c7", borderRadius: 6, fontSize: 11, color: "#92400e" }}>
        <strong>Point d'attention :</strong> Le T-SCI (68% du volume) affiche la marge % la plus faible après le T-SC (7,9% vs 9,0% pour le T-C). Le pricing power du T-SCI est sous-exploité — une hausse de 150$ du prix moyen ajouterait ~6,2M$ au résultat net annuel.
      </div>
    </Card>
  </div>
);

const Previsions = () => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <SectionTitle sub="Scénarios optimiste / base / pessimiste">Projections CA (K$) — P7 à P9</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={previsions} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" tick={{ fontSize: 11, fill: COLORS.textSec }} />
            <YAxis domain={[80000, 180000]} tick={{ fontSize: 10, fill: COLORS.textSec }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="opti" stroke={COLORS.green} strokeWidth={2} strokeDasharray="8 4" dot={{ r: 4 }} name="Optimiste" />
            <Line type="monotone" dataKey="base" stroke={COLORS.gsa} strokeWidth={3} dot={{ r: 5 }} name="Base" />
            <Line type="monotone" dataKey="pessi" stroke={COLORS.red} strokeWidth={2} strokeDasharray="8 4" dot={{ r: 4 }} name="Pessimiste" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <SectionTitle sub="Résultat net projeté par scénario">Projections Résultat Net (K$)</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={previsions} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" tick={{ fontSize: 11, fill: COLORS.textSec }} />
            <YAxis tick={{ fontSize: 10, fill: COLORS.textSec }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="netOpti" fill={COLORS.green} name="Optimiste" radius={[3,3,0,0]} barSize={20} fillOpacity={0.7} />
            <Bar dataKey="netBase" fill={COLORS.gsa} name="Base" radius={[3,3,0,0]} barSize={20} />
            <Bar dataKey="netPessi" fill={COLORS.red} name="Pessimiste" radius={[3,3,0,0]} barSize={20} fillOpacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>

    <Card style={{ marginTop: 16 }}>
      <SectionTitle>Prévisions financières détaillées — 3 scénarios</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: COLORS.dark, color: "#fff" }}>
              <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 10 }}>Indicateur</th>
              <th style={{ padding: "8px 10px", textAlign: "center", fontSize: 10, background: "#334155" }} colSpan={3}>P7</th>
              <th style={{ padding: "8px 10px", textAlign: "center", fontSize: 10, background: "#475569" }} colSpan={3}>P8</th>
              <th style={{ padding: "8px 10px", textAlign: "center", fontSize: 10, background: "#64748b" }} colSpan={3}>P9</th>
            </tr>
            <tr style={{ background: "#1e293b", color: "#cbd5e1" }}>
              <th style={{ padding: "5px 10px", fontSize: 9 }}></th>
              {["Pessi.","Base","Opti.","Pessi.","Base","Opti.","Pessi.","Base","Opti."].map((h,i) => (
                <th key={i} style={{ padding: "5px 6px", textAlign: "center", fontSize: 9, color: i%3===0 ? "#fca5a5" : i%3===1 ? "#93c5fd" : "#86efac" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "CA (K$)", vals: ["112 000","125 000","132 000","115 000","138 000","150 000","118 000","148 000","165 000"] },
              { label: "Volume", vals: ["50 000","56 000","58 000","51 000","59 000","62 000","50 000","61 000","65 000"] },
              { label: "Résultat Net (K$)", vals: ["5 500","9 000","11 000","5 000","12 000","15 500","4 800","15 000","19 000"] },
              { label: "ROCE (%)", vals: ["18%","25%","28%","16%","28%","32%","15%","30%","35%"] },
              { label: "Dividendes (K$)", vals: ["3 500","6 000","7 500","3 000","8 000","10 500","3 000","10 000","13 000"] },
              { label: "TBL", vals: ["Niv.3","Niv.4","Niv.4","Niv.3","Niv.4","Niv.4","Niv.2","Niv.4","Niv.4"] },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "#fff", borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "7px 10px", fontWeight: 600, color: COLORS.dark }}>{row.label}</td>
                {row.vals.map((v, j) => (
                  <td key={j} style={{
                    padding: "7px 6px",
                    textAlign: "center",
                    fontVariantNumeric: "tabular-nums",
                    color: j%3===0 ? COLORS.red : j%3===1 ? COLORS.gsa : COLORS.green,
                    fontWeight: j%3===1 ? 700 : 400,
                    background: j%3===1 ? "#eff6ff" : "transparent",
                  }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    <Card style={{ marginTop: 16 }}>
      <SectionTitle>Recommandations & KPI à surveiller</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.dark, margin: "0 0 10px", borderBottom: `2px solid ${COLORS.gsa}`, paddingBottom: 6 }}>5 recommandations stratégiques</h4>
          {[
            { num: "01", title: "Monétiser l'avantage prix", desc: "Hausser le T-SCI de 10-15% — pricing power sous-exploité (marge 7,9%)" },
            { num: "02", title: "Activer PME en EMEA", desc: "Marché de 48 000 unités non adressé — agences déjà en place" },
            { num: "03", title: "Investir en productivité", desc: "Indice 98 = plus bas du marché. Labos Automatisation/Maintenance prioritaires" },
            { num: "04", title: "Protéger le TBL Niveau 4", desc: "Maintenir ROCE >20%, RSE >200, ISO 14004 — vaut +40 pts de Share Value" },
            { num: "05", title: "Dividendes soutenus (60-70%)", desc: "Payout ratio élevé pour soutenir le cours — pas d'investissement massif nécessaire" },
          ].map(r => (
            <div key={r.num} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: COLORS.gsa, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0
              }}>{r.num}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.dark }}>{r.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textSec, marginTop: 1 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.dark, margin: "0 0 10px", borderBottom: `2px solid ${COLORS.accent}`, paddingBottom: 6 }}>6 KPI critiques</h4>
          {[
            { kpi: "Marge unitaire T-SCI", cible: "> 250$", actuel: "173$", status: "warning" },
            { kpi: "PdM Entreprises Amériques", cible: "> 25%", actuel: "30%", status: "ok" },
            { kpi: "Indice productivité", cible: "> 130", actuel: "98", status: "danger" },
            { kpi: "ROCE moyen", cible: "> 20%", actuel: "21%", status: "ok" },
            { kpi: "Cash disponible", cible: "> 3 000K", actuel: "4 764K", status: "ok" },
            { kpi: "PdM PME EMEA", cible: "> 5%", actuel: "0%", status: "danger" },
          ].map((k, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 10px", borderRadius: 6, marginBottom: 6,
              background: k.status === "ok" ? "#f0fdf4" : k.status === "warning" ? "#fefce8" : "#fef2f2",
              border: `1px solid ${k.status === "ok" ? "#bbf7d0" : k.status === "warning" ? "#fef08a" : "#fecaca"}`,
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.dark }}>{k.kpi}</div>
                <div style={{ fontSize: 10, color: COLORS.textSec }}>Cible : {k.cible}</div>
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700,
                color: k.status === "ok" ? COLORS.green : k.status === "warning" ? COLORS.accent : COLORS.red,
              }}>{k.actuel}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

// ─── MAIN ────────────────────────────────────────────

export default function GSADashboard() {
  const [tab, setTab] = useState(0);

  const panels = [VueEnsemble, Competiteurs, PartsMarche, AnalyseProduits, Previsions];
  const Panel = panels[tab];

  return (
    <div style={{
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        padding: "20px 24px 14px",
        color: "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "linear-gradient(135deg, #2563eb, #60a5fa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, letterSpacing: -0.5,
          }}>GSA</div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: -0.3 }}>GSA Group — Présentation Finale</h1>
            <p style={{ fontSize: 11, margin: 0, opacity: 0.7 }}>MNGT 10430 — GlobStrat P0→P6 — Dashboard Analytique</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 2, padding: "0 24px",
        background: "#1e293b", overflowX: "auto",
      }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              padding: "10px 16px",
              fontSize: 12,
              fontWeight: tab === i ? 700 : 500,
              color: tab === i ?"#fff" : "#94a3b8",
              background: tab === i ? COLORS.gsa : "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px 6px 0 0",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
          >{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
        <Panel />
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "16px 0 24px", fontSize: 10, color: COLORS.textSec }}>
        GSA Group • VP Finance : Georges Elias Khalil • Données GlobStrat P0–P6 • HEC Montréal
      </div>
    </div>
  );
}