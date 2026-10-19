import { spawnSync } from "node:child_process";

const strict = process.argv.includes("--enforce");
const result = spawnSync("npm", ["audit", "--omit=dev", "--json"], {
  encoding: "utf8",
  maxBuffer: 20 * 1024 * 1024,
  timeout: 120_000,
});
if (result.error) {
  console.error("Production audit could not run:", result.error.message);
  process.exit(2);
}
let data;
try {
  data = JSON.parse(result.stdout);
} catch {
  console.error("Production audit returned invalid JSON:", (result.stderr || result.stdout).slice(0, 500));
  process.exit(2);
}
if (data.error || !data.metadata || !data.vulnerabilities) {
  console.error("Production audit returned an error:", JSON.stringify(data.error || data).slice(0, 700));
  process.exit(2);
}
const counts = data.metadata.vulnerabilities || {};
const rows = Object.entries(data.vulnerabilities)
  .sort((a,b) => ["critical","high","moderate","low"].indexOf(a[1].severity) - ["critical","high","moderate","low"].indexOf(b[1].severity));
console.log("PRODUCTION DEPENDENCY AUDIT (npm audit --omit=dev)");
console.log("Totals:", JSON.stringify(counts));
for (const [name,v] of rows) {
  const via = (v.via || []).map(x => typeof x === "string" ? x : x.title || x.name).join(" | ");
  const fix = v.fixAvailable === false ? "no automatic fix" : v.fixAvailable === true ? "fix available" : JSON.stringify(v.fixAvailable);
  console.log(`[${v.severity.toUpperCase()}] ${name}@${v.range} - ${fix}; via: ${via.slice(0,170)}`);
}
if (strict && (Number(counts.critical || 0) > 0 || Number(counts.high || 0) > 0)) {
  console.error("RELEASE BLOCKED: untriaged critical/high production advisories.");
  process.exitCode = 1;
} else if (rows.length) {
  console.warn("Audit findings require review before production; a green build is not security clearance.");
}
