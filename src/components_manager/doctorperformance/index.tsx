import React from "react";
import "./index.scss";

export type RequestStatus = "APPROVED" | "REJECTED" | "PENDING";
export type WorkloadStatus = "normal" | "overworked" | "underworked";

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
  workloadNote?: string; // text hiển thị trong banner
};

export interface DoctorPerformanceModalProps {
  doctor?: DoctorSummary; // ❗ làm optional để không truyền cũng được
  open?: boolean; // cho phép ẩn/hiện card (mặc định true)
  onViewDetail?: () => void; // callback khi click "View Detailed Profile"
}

// ❗ DEMO DOCTOR: dùng khi không truyền prop doctor
const demoDoctor: DoctorSummary = {
  id: "E001",
  name: "Dr. Michael Roberts",
  role: "Cardiologist",
  department: "Cardiology",
  code: "E001",

  dailyRatio: 0.32,
  weeklyRatio: 0.28,
  monthlyRatio: 0.26,

  dailyHours: 8,
  dailyPatients: 32,
  weeklyHours: 48,
  weeklyPatients: 180,

  hoursWorked: 168,
  patientsTreated: 646,

  activeAlerts: 2,
  requestsCount: 5,

  workload: "overworked",
  workloadNote: "Workload is 15% higher than department average this month.",
};

const DoctorPerformanceModal: React.FC<DoctorPerformanceModalProps> = ({
  doctor,
  open = true,
  onViewDetail,
}) => {
  if (!open) return null;

  // ❗ Nếu không có doctor -> fallback demoDoctor
  const currentDoctor = doctor ?? demoDoctor;

  const initials = currentDoctor.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dailyText =
    currentDoctor.dailyHours && currentDoctor.dailyPatients
      ? `${currentDoctor.dailyHours}h / ${currentDoctor.dailyPatients} patients`
      : "—";

  const weeklyText =
    currentDoctor.weeklyHours && currentDoctor.weeklyPatients
      ? `${currentDoctor.weeklyHours}h / ${currentDoctor.weeklyPatients} patients`
      : "—";

  const monthlyText = `${currentDoctor.hoursWorked}h / ${currentDoctor.patientsTreated} patients`;

  const workload = currentDoctor.workload ?? "normal";

  const metricTrendClass =
    workload === "overworked"
      ? "dp-metric-value--bad"
      : workload === "underworked"
      ? "dp-metric-value--warn"
      : "dp-metric-value--good";

  const metricArrow =
    workload === "overworked"
      ? "↗"
      : workload === "underworked"
      ? "↘"
      : "↗";

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
      : "";

  return (
    <div className="dp-card">
      {/* HEADER */}
      <div className="dp-card-header">
        <div className="dp-avatar">{initials}</div>

        <div className="dp-info">
          <div className="dp-name">{currentDoctor.name}</div>
          <div className="dp-role">
            {currentDoctor.role} • {currentDoctor.department}
          </div>
        </div>

        {workload !== "normal" && (
          <span
            className={
              "dp-workload-tag " +
              (workload === "overworked"
                ? "dp-workload-tag--red"
                : "dp-workload-tag--amber")
            }
          >
            {workloadLabel}
          </span>
        )}
      </div>

      {/* WORKLOAD BANNER (Thanh màu ở giữa header và metrics) */}
      {workload !== "normal" && (
        <div
          className={
            "dp-workload-banner " +
            (workload === "overworked"
              ? "dp-workload-banner--red"
              : "dp-workload-banner--amber")
          }
        >
          <div className="dp-workload-icon">!</div>
          <div className="dp-workload-text">
            <div className="dp-workload-main">
              {currentDoctor.workloadNote ?? defaultWorkloadNote}
            </div>
          </div>
        </div>
      )}

      {/* 3 BOX: DAILY / WEEKLY / MONTHLY */}
      <div className="dp-metrics-row">
        {/* Daily */}
        <div className="dp-metric-card">
          <div className="dp-metric-top">
            <span className="dp-metric-label">Daily</span>
            <span className="dp-metric-trend">{metricArrow}</span>
          </div>
          <div className={`dp-metric-value ${metricTrendClass}`}>
            {currentDoctor.dailyRatio.toFixed(2)}{" "}
            <span className="dp-hp">H/P</span>
          </div>
          <div className="dp-metric-sub">{dailyText}</div>
        </div>

        {/* Weekly */}
        <div className="dp-metric-card">
          <div className="dp-metric-top">
            <span className="dp-metric-label">Weekly</span>
            <span className="dp-metric-trend">{metricArrow}</span>
          </div>
          <div className={`dp-metric-value ${metricTrendClass}`}>
            {currentDoctor.weeklyRatio.toFixed(2)}{" "}
            <span className="dp-hp">H/P</span>
          </div>
          <div className="dp-metric-sub">{weeklyText}</div>
        </div>

        {/* Monthly */}
        <div className="dp-metric-card">
          <div className="dp-metric-top">
            <span className="dp-metric-label">Monthly</span>
            <span className="dp-metric-trend">{metricArrow}</span>
          </div>
          <div className={`dp-metric-value ${metricTrendClass}`}>
            {currentDoctor.monthlyRatio.toFixed(2)}{" "}
            <span className="dp-hp">H/P</span>
          </div>
          <div className="dp-metric-sub">{monthlyText}</div>
        </div>
      </div>

      {/* LINK DƯỚI CÙNG */}
      <button
        type="button"
        className="dp-view-link"
        onClick={onViewDetail}
      >
        View Detailed Profile <span className="dp-view-arrow">›</span>
      </button>
    </div>
  );
};

export default DoctorPerformanceModal;
