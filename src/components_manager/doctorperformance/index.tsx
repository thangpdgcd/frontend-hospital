import React, { useState } from "react";
import "./index.scss";

export type RequestStatus = "APPROVED" | "REJECTED" | "PENDING";
export type WorkloadStatus = "normal" | "overworked" | "underworked";
type TimeRange = "week" | "month" | "year";

export type DoctorSummary = {
  id: string;
  name: string;
  role: string; // Cardiologist
  department: string; // Cardiology
  code: string; // E001

  // ratios
  dailyRatio: number;
  weeklyRatio: number;
  monthlyRatio: number;

  // chi tiết giờ / bệnh nhân
  dailyHours?: number;
  dailyPatients?: number;
  weeklyHours?: number;
  weeklyPatients?: number;

  // monthly
  hoursWorked: number;
  patientsTreated: number;

  activeAlerts: number;
  requestsCount: number;

  // trạng thái tải công việc
  workload?: WorkloadStatus;
  workloadNote?: string;
};

export interface DoctorPerformanceModalProps {
  doctor?: DoctorSummary;      // bác sĩ được chọn
  open: boolean;               // true => hiện modal
  onClose?: () => void;        // callback khi đóng
}

/* ===== DEMO DOCTOR ===== */
const demoDoctor: DoctorSummary = {
  id: "E001",
  name: "Dr. Michael Roberts",
  role: "Cardiologist",
  department: "Cardiology",
  code: "E001",

  dailyRatio: 0.25,
  weeklyRatio: 0.27,
  monthlyRatio: 0.26,

  dailyHours: 7.5,
  dailyPatients: 30,
  weeklyHours: 40,
  weeklyPatients: 148,

  hoursWorked: 168,
  patientsTreated: 646,

  activeAlerts: 2,
  requestsCount: 5,

  workload: "normal",
  workloadNote: "Stable monthly workload close to department average.",
};

/* ===== DATA DEMO CHO CHART ===== */
const ratioSeriesByRange: Record<
  TimeRange,
  { label: string; value: number }[]
> = {
  week: [
    { label: "Mon", value: 0.33 },
    { label: "Tue", value: 0.31 },
    { label: "Wed", value: 0.3 },
    { label: "Thu", value: 0.29 },
    { label: "Fri", value: 0.3 },
  ],
  month: [
    { label: "Week 1", value: 0.34 },
    { label: "Week 2", value: 0.29 },
    { label: "Week 3", value: 0.31 },
    { label: "Week 4", value: 0.3 },
  ],
  year: [
    { label: "Q1", value: 0.31 },
    { label: "Q2", value: 0.3 },
    { label: "Q3", value: 0.29 },
    { label: "Q4", value: 0.3 },
  ],
};

/* ===== SHIFT DISTRIBUTION DEMO ===== */
const shiftDist = {
  total: 23,
  morning: 10,
  evening: 8,
  night: 5,
};

const DoctorPerformanceModal: React.FC<DoctorPerformanceModalProps> = ({
  doctor,
  open,
  onClose,
}) => {
  const [range, setRange] = useState<TimeRange>("month");

  // modal đóng thì không render gì
  if (!open) return null;

  const currentDoctor = doctor ?? demoDoctor;

  const initials = currentDoctor.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const workload = currentDoctor.workload ?? "normal";

  const metricTrendClass =
    workload === "overworked"
      ? "dp-metric-value--bad"
      : workload === "underworked"
      ? "dp-metric-value--warn"
      : "dp-metric-value--good";

  const workloadLabel =
    workload === "overworked"
      ? "Overworked"
      : workload === "underworked"
      ? "Underworked"
      : "";

  const defaultWorkloadNote =
    workload === "overworked"
      ? "Above recommended monthly load"
      : workload === "underworked"
      ? "Below department average hours"
      : "Stable monthly workload";

  /* ===== CHART CALC ===== */
  const series = ratioSeriesByRange[range];
  const chartWidth = 520;
  const chartHeight = 180;
  const padX = 40;
  const padY = 24;
  const values = series.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 0.01;

  const points = series.map((p, i) => {
    const x =
      padX + (i * (chartWidth - padX * 2)) / (series.length - 1 || 1);
    const y =
      chartHeight -
      padY -
      ((p.value - min) / span) * (chartHeight - padY * 2);
    return { x, y };
  });

  let polyPoints = "";
  let areaPoints = "";

  if (points.length > 0) {
    polyPoints = points.map((pt) => `${pt.x},${pt.y}`).join(" ");
    const first = points[0];
    const last = points[points.length - 1];
    areaPoints =
      `${first.x},${chartHeight - padY} ` +
      polyPoints +
      ` ${last.x},${chartHeight - padY}`;
  }

  const morningPct = Math.round((shiftDist.morning / shiftDist.total) * 100);
  const eveningPct = Math.round((shiftDist.evening / shiftDist.total) * 100);
  const nightPct = Math.round((shiftDist.night / shiftDist.total) * 100);

  /* ===== EXPORT 1 DOCTOR RA CSV ===== */
  const handleExportReport = () => {
    const d = currentDoctor;
    const header = [
      "Name",
      "Role",
      "Department",
      "Code",
      "DailyRatio",
      "WeeklyRatio",
      "MonthlyRatio",
      "HoursWorked",
      "PatientsTreated",
      "ActiveAlerts",
      "RequestsCount",
      "Workload",
    ];
    const row = [
      d.name,
      d.role,
      d.department,
      d.code,
      d.dailyRatio.toFixed(2),
      d.weeklyRatio.toFixed(2),
      d.monthlyRatio.toFixed(2),
      d.hoursWorked,
      d.patientsTreated,
      d.activeAlerts,
      d.requestsCount,
      d.workload ?? "",
    ];
    const csv =
      header
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",") +
      "\n" +
      row
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${d.code}_performance_report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /* ========= MODAL CHI TIẾT ========= */
  return (
    <div className="dp-backdrop">
      <div className="dp-modal">
        {/* HEADER MODAL */}
        <div className="dp-header">
          <div className="dp-header-left">
            <div className="dp-avatar dp-avatar--lg">{initials}</div>

            <div className="dp-title-block">
              <h2 className="dp-name dp-name--lg">{currentDoctor.name}</h2>
              <p className="dp-subtitle">
                {currentDoctor.role} • {currentDoctor.department}
              </p>
              <div className="dp-chips">
                <span className="dp-chip dp-chip-role">Doctor</span>
                <span className="dp-chip dp-chip-id">
                  ID: {currentDoctor.code}
                </span>
              </div>
            </div>
          </div>

          <div className="dp-header-right">
            <div className="dp-segment">
              {(["week", "month", "year"] as TimeRange[]).map((item) => (
                <button
                  key={item}
                  className={
                    "dp-segment-item " +
                    (range === item ? "dp-segment-item--active" : "")
                  }
                  onClick={() => setRange(item)}
                >
                  {item === "week"
                    ? "Week"
                    : item === "month"
                    ? "Month"
                    : "Year"}
                </button>
              ))}
            </div>

            <button
              className="dp-close"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* TOP STATS ROW */}
        <div className="dp-stats-row">
          <div className="dp-stat-card">
            <span className="dp-stat-label">Monthly Ratio</span>
            <span className="dp-stat-value">
              {currentDoctor.monthlyRatio.toFixed(2)} H/P
            </span>
          </div>
          <div className="dp-stat-card">
            <span className="dp-stat-label">Hours Worked</span>
            <span className="dp-stat-value">
              {currentDoctor.hoursWorked}h
            </span>
          </div>
          <div className="dp-stat-card">
            <span className="dp-stat-label">Patients Treated</span>
            <span className="dp-stat-value">
              {currentDoctor.patientsTreated}
            </span>
          </div>
          <div className="dp-stat-card">
            <span className="dp-stat-label">Active Alerts</span>
            <span className="dp-stat-value dp-stat-value--alert">
              {currentDoctor.activeAlerts}
            </span>
          </div>
          <div className="dp-stat-card">
            <span className="dp-stat-label">Requests</span>
            <span className="dp-stat-value">
              {currentDoctor.requestsCount}
            </span>
          </div>
        </div>

        {/* BODY */}
        <div className="dp-body-scroll">
          {/* CHART SECTION */}
          <section className="dp-card dp-card--chart">
            <div className="dp-card-header dp-card-header--full">
              <div className="dp-card-title-block">
                <span className="dp-card-icon">📈</span>
                <div>
                  <div className="dp-card-title">
                    Performance Progression
                  </div>
                  <div className="dp-card-subtitle">
                    Average H/P Ratio (month)
                  </div>
                </div>
              </div>

              <div className="dp-card-meta">
                <div className="dp-card-meta-main">
                  <span className="dp-card-meta-value">0.30 H/P</span>
                  <span className="dp-pill dp-pill--neutral">Stable</span>
                </div>
                <div className="dp-card-meta-desc">
                  Lower ratio = Better efficiency
                </div>
              </div>
            </div>

            <div className="dp-chart-wrapper dp-chart-wrapper--lg">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="dp-chart-svg"
              >
                <defs>
                  <linearGradient
                    id="hpAreaDetail"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#14b8a6"
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor="#14b8a6"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3].map((i) => {
                  const y =
                    padY + (i * (chartHeight - padY * 2)) / 3;
                  return (
                    <line
                      key={i}
                      x1={padX}
                      x2={chartWidth - padX}
                      y1={y}
                      y2={y}
                      className="dp-chart-grid-line"
                    />
                  );
                })}

                <line
                  x1={padX}
                  x2={padX}
                  y1={padY}
                  y2={chartHeight - padY}
                  className="dp-chart-axis"
                />

                {points.length > 0 && (
                  <>
                    <polygon
                      points={areaPoints}
                      className="dp-chart-area dp-chart-area--detail"
                    />
                    <polyline
                      points={polyPoints}
                      className="dp-chart-line dp-chart-line--detail"
                    />
                    {points.map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r={3}
                        className="dp-chart-dot"
                      />
                    ))}
                  </>
                )}
              </svg>

              <div className="dp-chart-xlabels dp-chart-xlabels--lg">
                {series.map((p) => (
                  <span key={p.label}>{p.label}</span>
                ))}
              </div>
            </div>
          </section>

          {/* SHIFT DISTRIBUTION SECTION */}
          <section className="dp-card dp-card--distribution">
            <div className="dp-card-header dp-card-header--full">
              <div className="dp-card-title-block">
                <span className="dp-card-icon">📅</span>
                <div>
                  <div className="dp-card-title">
                    Shift Distribution (This Month)
                  </div>
                  <div className="dp-card-subtitle">
                    Overview of Morning, Evening and Night shifts
                  </div>
                </div>
              </div>
            </div>

            <div className="dp-shift-cards">
              <div className="dp-shift-card dp-shift-card--total">
                <div className="dp-shift-card-header">
                  <span className="dp-shift-icon">⏱</span>
                  <span className="dp-shift-label">Total</span>
                </div>
                <div className="dp-shift-value">{shiftDist.total}</div>
                <div className="dp-shift-sub">Total Shifts</div>
              </div>

              <div className="dp-shift-card dp-shift-card--morning">
                <div className="dp-shift-card-header">
                  <span className="dp-shift-icon">🌤</span>
                  <span className="dp-shift-label">Morning Shifts</span>
                </div>
                <div className="dp-shift-time">08:00–16:00</div>
                <div className="dp-shift-value">{shiftDist.morning}</div>
                <div className="dp-shift-sub">
                  {morningPct}% of total
                </div>
                <div className="dp-shift-bar dp-shift-bar--morning">
                  <div
                    className="dp-shift-bar-fill"
                    style={{ width: `${morningPct}%` }}
                  />
                </div>
              </div>

              <div className="dp-shift-card dp-shift-card--evening">
                <div className="dp-shift-card-header">
                  <span className="dp-shift-icon">🌆</span>
                  <span className="dp-shift-label">Evening Shifts</span>
                </div>
                <div className="dp-shift-time">14:00–22:00</div>
                <div className="dp-shift-value">{shiftDist.evening}</div>
                <div className="dp-shift-sub">
                  {eveningPct}% of total
                </div>
                <div className="dp-shift-bar dp-shift-bar--evening">
                  <div
                    className="dp-shift-bar-fill"
                    style={{ width: `${eveningPct}%` }}
                  />
                </div>
              </div>

              <div className="dp-shift-card dp-shift-card--night">
                <div className="dp-shift-card-header">
                  <span className="dp-shift-icon">🌙</span>
                  <span className="dp-shift-label">Night Shifts</span>
                </div>
                <div className="dp-shift-time">22:00–06:00</div>
                <div className="dp-shift-value">{shiftDist.night}</div>
                <div className="dp-shift-sub">
                  {nightPct}% of total
                </div>
                <div className="dp-shift-bar dp-shift-bar--night">
                  <div
                    className="dp-shift-bar-fill"
                    style={{ width: `${nightPct}%` }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="dp-footer">
          <button className="dp-btn dp-btn-ghost">
            Send Feedback
          </button>

          <div className="dp-footer-right">
            <button
              className="dp-btn dp-btn-outline"
              onClick={handleExportReport}
            >
              Export Report
            </button>
            <button
              className="dp-btn dp-btn-primary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPerformanceModal;
