// src/pages/HomeView.tsx
import React, { useEffect, useState } from "react";
import "./index.scss";
import DoctorPerformanceModal from "../doctorperformance/index";
import type {
  DoctorSummary,
  WorkloadStatus,
} from "../doctorperformance/index";

// ===== TYPES CHO PHẦN STATUS / SCHEDULE =====
type ShiftType = "Morning" | "Evening" | "Night";
type StaffState = "Active" | "Late" | "NotClocked";

type Staff = {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  shift: ShiftType;
  shiftTime: string;
  status: StaffState;
  statusNote?: string;
};

type ShiftSchedule = {
  id: string;
  staffId: string;
  staffName: string;
  staffInitials: string;
  department: string;
  date: string; // 2025-11-24
  shiftType: ShiftType;
  scheduledTime: string; // 14:00 - 22:00
  actualTime?: string;
  status: "Pending" | "Validated" | "Completed";
  patientsTreated?: number;
  hoursWorked?: string;
  notes?: string;
};

// ===== DATA STATUS / SCHEDULE =====
const workingStaff: Staff[] = [
  {
    id: "1",
    name: "Dr. Michael Roberts",
    initials: "MR",
    role: "Cardiologist",
    department: "Cardiology",
    shift: "Morning",
    shiftTime: "08:00 - 16:00",
    status: "Active",
    statusNote: "Started 7h 0m ago",
  },
  {
    id: "2",
    name: "Dr. James Anderson",
    initials: "JA",
    role: "ICU Specialist",
    department: "ICU",
    shift: "Morning",
    shiftTime: "08:00 - 16:00",
    status: "Active",
    statusNote: "Started 7h 0m ago",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Emergency Nurse",
    department: "Emergency",
    shift: "Morning",
    shiftTime: "08:00 - 16:00",
    status: "Active",
    statusNote: "Started 7h 0m ago",
  },
  {
    id: "4",
    name: "Dr. Emily Watson",
    initials: "EW",
    role: "Emergency Physician",
    department: "Emergency",
    shift: "Morning",
    shiftTime: "08:00 - 16:00",
    status: "Late",
    statusNote: "Clocked in at 08:20",
  },
  {
    id: "5",
    name: "Dr. Emily Watson",
    initials: "EW",
    role: "Emergency Physician",
    department: "Emergency",
    shift: "Night",
    shiftTime: "22:00 - 06:00",
    status: "NotClocked",
  },
  {
    id: "6",
    name: "Maria Garcia",
    initials: "MG",
    role: "ICU Nurse",
    department: "ICU",
    shift: "Night",
    shiftTime: "22:00 - 06:00",
    status: "NotClocked",
  },
];

const initialScheduleData: ShiftSchedule[] = [
  {
    id: "s1",
    staffId: "4",
    staffName: "Dr. Emily Watson",
    staffInitials: "EW",
    department: "Emergency",
    date: "2025-11-23",
    shiftType: "Evening",
    scheduledTime: "14:00 - 22:00",
    actualTime: "16:00 - 00:00",
    status: "Pending",
    patientsTreated: 13,
    hoursWorked: "8h 0m",
    notes: "Shift report pending completion by employee.",
  },
  {
    id: "s2",
    staffId: "4",
    staffName: "Dr. Emily Watson",
    staffInitials: "EW",
    department: "Emergency",
    date: "2025-11-24",
    shiftType: "Night",
    scheduledTime: "22:00 - 06:00",
    status: "Validated",
  },
  {
    id: "s3",
    staffId: "4",
    staffName: "Dr. Emily Watson",
    staffInitials: "EW",
    department: "Emergency",
    date: "2025-11-27",
    shiftType: "Morning",
    scheduledTime: "08:00 - 16:00",
    status: "Validated",
  },
  {
    id: "s4",
    staffId: "4",
    staffName: "Dr. Emily Watson",
    staffInitials: "EW",
    department: "Emergency",
    date: "2025-11-30",
    shiftType: "Evening",
    scheduledTime: "14:00 - 22:00",
    status: "Validated",
  },
  {
    id: "s5",
    staffId: "4",
    staffName: "Dr. Emily Watson",
    staffInitials: "EW",
    department: "Emergency",
    date: "2025-12-01",
    shiftType: "Night",
    scheduledTime: "22:00 - 06:00",
    status: "Validated",
  },
  {
    id: "s6",
    staffId: "2",
    staffName: "Dr. James Anderson",
    staffInitials: "JA",
    department: "ICU",
    date: "2025-11-24",
    shiftType: "Night",
    scheduledTime: "22:00 - 06:00",
    status: "Validated",
  },
  {
    id: "s7",
    staffId: "2",
    staffName: "Dr. James Anderson",
    staffInitials: "JA",
    department: "ICU",
    date: "2025-11-26",
    shiftType: "Morning",
    scheduledTime: "08:00 - 16:00",
    status: "Validated",
  },
  {
    id: "s8",
    staffId: "2",
    staffName: "Dr. James Anderson",
    staffInitials: "JA",
    department: "ICU",
    date: "2025-11-28",
    shiftType: "Evening",
    scheduledTime: "14:00 - 22:00",
    status: "Validated",
  },
  {
    id: "s9",
    staffId: "2",
    staffName: "Dr. James Anderson",
    staffInitials: "JA",
    department: "ICU",
    date: "2025-12-01",
    shiftType: "Morning",
    scheduledTime: "08:00 - 16:00",
    status: "Validated",
  },
];

// ===== DATA PERFORMANCE (sử dụng DoctorSummary từ doctorperformance) =====
const doctorPerformanceData: DoctorSummary[] = [
  {
    id: "1",
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
    activeAlerts: 0,
    requestsCount: 2,
    workload: "normal",
  },
  {
    id: "2",
    name: "Dr. Emily Watson",
    role: "Emergency Physician",
    department: "Emergency",
    code: "E002",
    dailyRatio: 0.22,
    weeklyRatio: 0.23,
    monthlyRatio: 0.22,
    dailyHours: 7.0,
    dailyPatients: 32,
    weeklyHours: 42,
    weeklyPatients: 150,
    hoursWorked: 176,
    patientsTreated: 640,
    activeAlerts: 2,
    requestsCount: 4,
    workload: "overworked",
    workloadNote: "16h / 168h (+2h over) Above recommended load",
  },
  {
    id: "3",
    name: "Dr. James Anderson",
    role: "ICU Specialist",
    department: "ICU",
    code: "E003",
    dailyRatio: 0.3,
    weeklyRatio: 0.32,
    monthlyRatio: 0.31,
    dailyHours: 7.5,
    dailyPatients: 25,
    weeklyHours: 40,
    weeklyPatients: 130,
    hoursWorked: 170,
    patientsTreated: 552,
    activeAlerts: 3,
    requestsCount: 6,
    workload: "overworked",
    workloadNote: "18h / 168h (+10h over) Exceeding monthly baseline",
  },
  {
    id: "4",
    name: "Dr. Lisa Martinez",
    role: "Pediatrician",
    department: "Pediatrics",
    code: "E004",
    dailyRatio: 0.28,
    weeklyRatio: 0.29,
    monthlyRatio: 0.28,
    dailyHours: 7.0,
    dailyPatients: 27,
    weeklyHours: 38,
    weeklyPatients: 140,
    hoursWorked: 160,
    patientsTreated: 580,
    activeAlerts: 1,
    requestsCount: 3,
    workload: "underworked",
    workloadNote: "144h / 168h (-24h short) Below minimum monthly hours",
  },
  {
    id: "5",
    name: "Dr. David Kim",
    role: "Neurologist",
    department: "Neurology",
    code: "E005",
    dailyRatio: 0.26,
    weeklyRatio: 0.25,
    monthlyRatio: 0.26,
    dailyHours: 7.2,
    dailyPatients: 29,
    weeklyHours: 39,
    weeklyPatients: 146,
    hoursWorked: 170,
    patientsTreated: 655,
    activeAlerts: 0,
    requestsCount: 2,
    workload: "normal",
  },
  {
    id: "6",
    name: "Dr. Rachel Green",
    role: "Surgeon",
    department: "Surgery",
    code: "E006",
    dailyRatio: 0.24,
    weeklyRatio: 0.24,
    monthlyRatio: 0.24,
    dailyHours: 7.0,
    dailyPatients: 28,
    weeklyHours: 40,
    weeklyPatients: 145,
    hoursWorked: 160,
    patientsTreated: 640,
    activeAlerts: 0,
    requestsCount: 4,
    workload: "normal",
  },
  {
    id: "7",
    name: "Sarah Johnson",
    role: "Emergency Nurse",
    department: "Emergency",
    code: "E007",
    dailyRatio: 0.21,
    weeklyRatio: 0.2,
    monthlyRatio: 0.21,
    dailyHours: 7.2,
    dailyPatients: 31,
    weeklyHours: 39,
    weeklyPatients: 139,
    hoursWorked: 160,
    patientsTreated: 571,
    activeAlerts: 0,
    requestsCount: 2,
    workload: "normal",
  },
  {
    id: "8",
    name: "Maria Garcia",
    role: "ICU Nurse",
    department: "ICU",
    code: "E008",
    dailyRatio: 0.23,
    weeklyRatio: 0.22,
    monthlyRatio: 0.23,
    dailyHours: 7.0,
    dailyPatients: 30,
    weeklyHours: 38,
    weeklyPatients: 143,
    hoursWorked: 148,
    patientsTreated: 640,
    activeAlerts: 1,
    requestsCount: 2,
    workload: "underworked",
    workloadNote: "148h / 168h (-20h short) Below department average hours",
  },
  {
    id: "9",
    name: "Tom Wilson",
    role: "Care Assistant",
    department: "General Care",
    code: "E009",
    dailyRatio: 0.27,
    weeklyRatio: 0.28,
    monthlyRatio: 0.27,
    dailyHours: 7.1,
    dailyPatients: 28,
    weeklyHours: 39,
    weeklyPatients: 142,
    hoursWorked: 162,
    patientsTreated: 600,
    activeAlerts: 0,
    requestsCount: 1,
    workload: "underworked",
    workloadNote: "162h / 168h (-6h short) Mild below minimum threshold",
  },
  {
    id: "10",
    name: "Linda Davis",
    role: "Department Manager",
    department: "Administration",
    code: "E010",
    dailyRatio: 0.35,
    weeklyRatio: 0.36,
    monthlyRatio: 0.35,
    dailyHours: 7.8,
    dailyPatients: 21,
    weeklyHours: 42,
    weeklyPatients: 120,
    hoursWorked: 170,
    patientsTreated: 470,
    activeAlerts: 3,
    requestsCount: 5,
    workload: "overworked",
    workloadNote: "178h / 168h (+10h over) Above safe admin workload",
  },
];

// fallback tính status nếu không set workload
const getWorkloadStatus = (doc: DoctorSummary): WorkloadStatus => {
  if (doc.workload) return doc.workload;
  if (doc.monthlyRatio >= 0.3) return "overworked";
  if (doc.monthlyRatio <= 0.23) return "underworked";
  return "normal";
};

// =========================================================

type TabKey = "status" | "schedule" | "performance";

const HomeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("status");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [onlyLate, setOnlyLate] = useState(false);
  const [onlyNotClocked, setOnlyNotClocked] = useState(false);

  // REAL-TIME CLOCK
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // schedule state
  const [schedule, setSchedule] = useState<ShiftSchedule[]>(() => {
    try {
      const saved = localStorage.getItem("medstaff_validation_schedule");
      if (saved) {
        const parsed = JSON.parse(saved) as ShiftSchedule[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Cannot parse medstaff_validation_schedule:", e);
    }
    return initialScheduleData;
  });

  const [selectedShift, setSelectedShift] = useState<ShiftSchedule | null>(
    null
  );
  const [currentWeekStart, setCurrentWeekStart] = useState(
    new Date(2025, 10, 24)
  );

  // toast
  const [toast, setToast] = useState<{ title: string; subtitle: string } | null>(
    null
  );

  // SUMMARY COUNTS
  const totalStaffCount = workingStaff.length;
  const activeStaffCount = workingStaff.filter(
    (s) => s.status === "Active"
  ).length;
  const notStartedCount = workingStaff.filter(
    (s) => s.status === "NotClocked"
  ).length;

  // lưu pending count cho MainLayout
  useEffect(() => {
    const pendingCount = schedule.filter((s) => s.status === "Pending").length;
    localStorage.setItem("medstaff_pending_shifts", String(pendingCount));
    window.dispatchEvent(new Event("medstaff-pending-updated"));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(
      "medstaff_validation_schedule",
      JSON.stringify(schedule)
    );
  }, [schedule]);

  const visibleWorkingStaff = workingStaff.filter((s) => {
    if (s.status === "NotClocked") return false;
    if (onlyLate) return s.status === "Late";
    return true;
  });

  const notClockedStaff = workingStaff.filter(
    (s) => s.status === "NotClocked"
  );

  const handleFilterClick = () => setFiltersOpen(true);

  const handleSummaryClick = (type: "total" | "active" | "notStarted") => {
    setActiveTab("status");
    if (type === "active") {
      setOnlyLate(false);
      setOnlyNotClocked(false);
    } else if (type === "notStarted") {
      setOnlyNotClocked(true);
      setOnlyLate(false);
    } else {
      setOnlyLate(false);
      setOnlyNotClocked(false);
    }
  };

  const getDatesForWeek = () => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const getShiftsForStaffAndDate = (staffId: string, date: Date) => {
    const dateStr = formatDate(date);
    return schedule.filter(
      (s) => s.staffId === staffId && s.date === dateStr
    );
  };

  const handleValidateShift = () => {
    if (!selectedShift) return;
    const shift = selectedShift;

    setSchedule((prev) =>
      prev.map((s) =>
        s.id === shift.id ? { ...s, status: "Validated" } : s
      )
    );
    setSelectedShift(null);

    setToast({
      title: `Shift validated for ${shift.staffName}`,
      subtitle: `${shift.shiftType} shift on ${shift.date}`,
    });
    setTimeout(() => setToast(null), 2500);
  };

  // EXPORT PERFORMANCE CSV
  const handleExportPerformance = () => {
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

    const rows = doctorPerformanceData.map((d) => [
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
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((val) => `"${String(val).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "performance-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ===== RENDER =====
  return (
    <div className="myteam-main-only">
      {/* HEADER */}
      <header className="myteam-header">
        <div className="header-top">
          <div>
            <h1 className="header-title">My Team</h1>
            <p className="header-subtitle">
              Monitor team activity and schedules in real-time
            </p>
          </div>

          <button className="filter-button" onClick={handleFilterClick}>
            <span>⚙️</span>
            <span>Filters</span>
          </button>
        </div>

        <div className="summary-cards">
          <button
            className="summary-card summary-card--button"
            onClick={() => handleSummaryClick("total")}
          >
            <div className="summary-icon summary-icon--muted">👤</div>
            <div>
              <div className="summary-label">Total Staff</div>
              <div className="summary-value">{totalStaffCount}</div>
            </div>
          </button>

          <button
            className="summary-card summary-card--green summary-card--button"
            onClick={() => handleSummaryClick("active")}
          >
            <div className="summary-icon summary-icon--white">💓</div>
            <div>
              <div className="summary-label summary-label--green">
                Active
              </div>
              <div className="summary-value summary-value--green">
                {activeStaffCount}
              </div>
            </div>
          </button>

          <button
            className="summary-card summary-card--button"
            onClick={() => handleSummaryClick("notStarted")}
          >
            <div className="summary-icon summary-icon--muted">⏲</div>
            <div>
              <div className="summary-label">Not Started</div>
              <div className="summary-value">{notStartedCount}</div>
            </div>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="myteam-content">
        {/* Tabs */}
        <div className="shift-tabs">
          <button
            className={
              "shift-tab" +
              (activeTab === "status" ? " shift-tab--active" : "")
            }
            onClick={() => setActiveTab("status")}
          >
            Active Shift Status
          </button>
          <button
            className={
              "shift-tab" +
              (activeTab === "schedule" ? " shift-tab--active" : "")
            }
            onClick={() => setActiveTab("schedule")}
          >
            Team Schedule Overview
          </button>
          <button
            className={
              "shift-tab" +
              (activeTab === "performance" ? " shift-tab--active" : "")
            }
            onClick={() => setActiveTab("performance")}
          >
            Performance
          </button>
        </div>

        {/* TAB STATUS */}
        {activeTab === "status" && (
          <>
            {!onlyNotClocked && (
              <section className="section section-working">
                <div className="section-header section-header--green">
                  <div className="section-title-wrapper">
                    <div className="section-dot section-dot--green">✓</div>
                    <div className="section-title">
                      Currently Working ({visibleWorkingStaff.length})
                    </div>
                  </div>
                </div>

                <div className="section-body section-body--grid">
                  {visibleWorkingStaff.map((staff) => (
                    <StaffCard key={staff.id} staff={staff} now={now} />
                  ))}
                </div>
              </section>
            )}

            {notClockedStaff.length > 0 && (
              <section className="section section-notclocked">
                <div className="section-header section-header--grey">
                  <div className="section-title-wrapper">
                    <div className="section-title">
                      Not Clocked In ({notClockedStaff.length})
                    </div>
                  </div>
                </div>

                <div className="section-body section-body--grid">
                  {notClockedStaff.map((staff) => {
                    const [startStr] = staff.shiftTime.split(" - ");
                    const enrichedStaff: Staff = {
                      ...staff,
                      statusNote: `Starts at ${startStr}`,
                    };
                    return (
                      <StaffCard
                        key={staff.id}
                        staff={enrichedStaff}
                        now={now}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {/* TAB SCHEDULE */}
        {activeTab === "schedule" && (
          <section className="section">
            <div className="section-header section-header--grey">
              <div className="section-title-wrapper">
                <span className="section-icon">📅</span>
                <div className="section-title">Team Schedule Overview</div>
              </div>
              <div className="schedule-controls">
                <button className="view-toggle">Day</button>
                <button className="nav-button" onClick={goToPreviousWeek}>
                  ‹
                </button>
                <button className="nav-button" onClick={goToNextWeek}>
                  ›
                </button>
              </div>
            </div>

            <div className="section-body section-body--schedule">
              <div className="schedule-calendar">
                {/* header ngày */}
                <div className="schedule-header">
                  <div className="staff-column-header">
                    <div className="staff-count">
                      Staff ({workingStaff.length})
                    </div>
                  </div>
                  {getDatesForWeek().map((date, idx) => {
                    const isToday = formatDate(date) === "2025-11-30";
                    return (
                      <div
                        key={idx}
                        className={
                          "date-column-header" +
                          (isToday ? " date-column-header--today" : "")
                        }
                      >
                        <div className="date-day">
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="date-number">{date.getDate()}</div>
                        {isToday && <div className="today-badge">Today</div>}
                        <div className="date-stats">
                          <span className="date-stat">🟠 0/4</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* row staff */}
                {workingStaff.map((staff) => (
                  <div key={staff.id} className="schedule-row">
                    <div className="staff-cell">
                      <div className="staff-avatar-small">
                        {staff.initials}
                      </div>
                      <div className="staff-name-dept">
                        <div className="staff-name-small">{staff.name}</div>
                        <div className="staff-dept-small">
                          {staff.department}
                        </div>
                      </div>
                    </div>

                    {getDatesForWeek().map((date, idx) => {
                      const shifts = getShiftsForStaffAndDate(
                        staff.id,
                        date
                      );
                      return (
                        <div key={idx} className="shift-cell">
                          {shifts.length > 0 ? (
                            shifts.map((shift) => (
                              <button
                                key={shift.id}
                                className={
                                  "shift-block " +
                                  `shift-block--${shift.shiftType.toLowerCase()} ` +
                                  (shift.status === "Pending"
                                    ? "shift-block--pending"
                                    : "shift-block--validated")
                                }
                                onClick={() => setSelectedShift(shift)}
                              >
                                <div className="shift-type">
                                  {shift.shiftType}
                                </div>
                                <div className="shift-hours">
                                  {shift.scheduledTime.split(" - ")[0]}
                                </div>

                                {shift.status === "Pending" && (
                                  <div className="shift-indicator" />
                                )}

                                {shift.status === "Validated" && (
                                  <div className="shift-indicator shift-indicator--validated">
                                    ✓
                                  </div>
                                )}
                              </button>
                            ))
                          ) : (
                            <div className="shift-off">Off</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB PERFORMANCE – GRID NHIỀU CARD + EXPORT */}
        {activeTab === "performance" && (
          <section className="section section-performance">
            {/* TOP BAR */}
            <div className="perf-page-header">
              <div className="perf-page-title">
                <span className="perf-page-icon ">📊</span>
                Performance Ratios: Hours Worked per Patient Treated
              </div>

              <div className="perf-page-actions">
                <button className="perf-btn perf-btn-outline">
                  <span className="perf-btn-icon">🔔</span>
                  Alert Notification
                </button>
                <button
                  className="perf-btn perf-btn-primary"
                  onClick={handleExportPerformance}
                >
                  <span className="perf-btn-icon">⬇</span>
                  Export Report
                </button>
              </div>
            </div>

            {/* GRID CARD */}
            <div className="perf-grid">
              {doctorPerformanceData.map((doc) => {
                const status = getWorkloadStatus(doc);

                return (
                  <div
                    key={doc.id}
                    className={
                      "perf-item " +
                      (status === "overworked"
                        ? "perf-item--overworked"
                        : status === "underworked"
                        ? "perf-item--underworked"
                        : "")
                    }
                  >
                    {/* chấm cảnh báo góc trên phải giống hình */}
                    {status !== "normal" && (
                      <div
                        className={
                          "perf-alert-dot " +
                          (status === "overworked"
                            ? "perf-alert-dot--red"
                            : "perf-alert-dot--amber")
                        }
                      >
                        !
                      </div>
                    )}

                    <DoctorPerformanceModal doctor={doc} open />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* FILTER PANEL */}
      {filtersOpen && (
        <div
          className="filters-overlay"
          onClick={() => setFiltersOpen(false)}
        >
          <div
            className="filters-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="filters-header">
              <h3>Filters</h3>
              <button
                className="detail-close-btn"
                onClick={() => setFiltersOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="filters-body">
              <label className="filters-row">
                <input
                  type="checkbox"
                  checked={onlyLate}
                  onChange={(e) => setOnlyLate(e.target.checked)}
                />
                <span>Chỉ hiển thị staff bị Late (Currently Working)</span>
              </label>
              <label className="filters-row">
                <input
                  type="checkbox"
                  checked={onlyNotClocked}
                  onChange={(e) => setOnlyNotClocked(e.target.checked)}
                />
                <span>Chỉ quan tâm phần Not Clocked In</span>
              </label>
            </div>
            <div className="filters-footer">
              <button
                className="filter-button filter-button--small"
                onClick={() => {
                  setOnlyLate(false);
                  setOnlyNotClocked(false);
                }}
              >
                Clear
              </button>
              <button
                className="filter-button filter-button--primary filter-button--small"
                onClick={() => setFiltersOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHIFT DETAIL MODAL */}
      {selectedShift && (
        <div
          className="filters-overlay"
          onClick={() => setSelectedShift(null)}
        >
          <div
            className="shift-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="detail-close-btn detail-close-btn--absolute"
              onClick={() => setSelectedShift(null)}
            >
              ✕
            </button>

            <div className="shift-detail-header">
              <div className="shift-detail-staff">
                <div className="staff-avatar-large">
                  {selectedShift.staffInitials}
                </div>
                <div>
                  <div className="shift-detail-name">
                    {selectedShift.staffName}
                  </div>
                  <div className="shift-detail-dept">
                    {selectedShift.department}
                    <span className="shift-badge shift-badge--small">
                      {selectedShift.shiftType} Shift
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="shift-detail-body">
              <div className="shift-detail-date">
                <span className="detail-icon">📅</span>
                {new Date(selectedShift.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
                {selectedShift.status === "Pending" && (
                  <span className="status-badge status-badge--pending">
                    ⏳ Pending Validation
                  </span>
                )}
              </div>

              {selectedShift.patientsTreated !== undefined && (
                <div className="shift-stats">
                  <div className="stat-card stat-card--green">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                      <div className="stat-label">Patients Treated</div>
                      <div className="stat-value">
                        {selectedShift.patientsTreated}
                      </div>
                    </div>
                  </div>
                  <div className="stat-card stat-card--blue">
                    <div className="stat-icon">🕐</div>
                    <div className="stat-content">
                      <div className="stat-label">Hours Worked</div>
                      <div className="stat-value">
                        {selectedShift.hoursWorked}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="shift-detail-section">
                <div className="detail-section-title">
                  <span className="detail-icon">🕐</span>
                  Time Details
                </div>
                <div className="time-detail-row">
                  <span className="time-label">Scheduled Time</span>
                  <span className="time-value">
                    {selectedShift.scheduledTime}
                  </span>
                </div>
                {selectedShift.actualTime && (
                  <div className="time-detail-row">
                    <span className="time-label">Actual Time</span>
                    <span className="time-value">
                      {selectedShift.actualTime}
                    </span>
                  </div>
                )}
              </div>

              {selectedShift.notes && (
                <div className="shift-detail-section">
                  <div className="detail-section-title">
                    <span className="detail-icon">📝</span>
                    Doctor&apos;s Notes
                  </div>
                  <div className="notes-content">
                    {selectedShift.notes}
                  </div>
                </div>
              )}

              {selectedShift.status === "Pending" && (
                <button
                  className="validate-button"
                  onClick={handleValidateShift}
                >
                  <span>✓</span>
                  Validate Shift Report
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="myteam-toast">
          <div className="myteam-toast-icon">✓</div>
          <div className="myteam-toast-text">
            <div className="myteam-toast-title">{toast.title}</div>
            <div className="myteam-toast-subtitle">
              {toast.subtitle}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== Helpers & StaffCard =====
type StaffCardProps = {
  staff: Staff;
  now: Date;
  onClick?: () => void;
};

const parseShiftTimes = (shiftTime: string, now: Date) => {
  const [startStr, endStr] = shiftTime.split(" - ");
  const [sh, sm] = startStr.split(":").map((n) => Number(n) || 0);
  const [eh, em] = endStr.split(":").map((n) => Number(n) || 0);

  const start = new Date(now);
  start.setHours(sh, sm, 0, 0);

  const end = new Date(now);
  end.setHours(eh, em, 0, 0);
  if (end <= start) end.setDate(end.getDate() + 1);

  return { start, end };
};

type TimingInfo = {
  note: string;
  isOvertime: boolean;
  overtimeLabel: string;
};

const getTimingInfo = (staff: Staff, now: Date): TimingInfo => {
  if (staff.status !== "Active") {
    return {
      note: staff.statusNote || "",
      isOvertime: false,
      overtimeLabel: "",
    };
  }

  const { start, end } = parseShiftTimes(staff.shiftTime, now);
  let workedMs = now.getTime() - start.getTime();
  if (workedMs < 0) workedMs = 0;

  const workedMinutes = Math.floor(workedMs / 60000);
  const workedH = Math.floor(workedMinutes / 60);
  const workedM = workedMinutes % 60;
  const note = `Started ${workedH}h ${workedM}m ago`;

  const overtimeMs = now.getTime() - end.getTime();
  const isOvertime = overtimeMs > 0;

  let overtimeLabel = "";
  if (isOvertime) {
    const overtimeMinutes = Math.floor(overtimeMs / 60000);
    const oh = Math.floor(overtimeMinutes / 60);
    const om = overtimeMinutes % 60;
    overtimeLabel = `Overtime: ${oh}h ${om}m`;
  }

  return { note, isOvertime, overtimeLabel };
};

const StaffCard: React.FC<StaffCardProps> = ({ staff, now, onClick }) => {
  const { note, isOvertime, overtimeLabel } = getTimingInfo(staff, now);
  const isLate = staff.status === "Late";

  return (
    <div className="staff-card" onClick={onClick}>
      <div className="staff-card-left">
        <div className="staff-avatar">{staff.initials}</div>
        <div className="staff-info">
          <div className="staff-name-row">
            <div className="staff-name">{staff.name}</div>
          </div>
          <div className="staff-role">
            {staff.role} • {staff.department}
          </div>

          <div className="staff-meta">
            <span className="shift-badge">{staff.shift}</span>
            <span className="shift-time">
              <span className="clock-icon">🕒</span> {staff.shiftTime}
            </span>
          </div>

          {note && (
            <div
              className={
                isLate
                  ? "staff-status-note staff-status-note--danger"
                  : "staff-status-note"
              }
            >
              {note}
            </div>
          )}

          {overtimeLabel && (
            <div className="staff-overtime-pill">
              <span className="overtime-icon">⚠</span>
              <span>{overtimeLabel}</span>
            </div>
          )}
        </div>
      </div>

      <div className="staff-card-right">
        <StatusPill state={staff.status} isOvertime={isOvertime} />
      </div>
    </div>
  );
};

const StatusPill: React.FC<{ state: StaffState; isOvertime?: boolean }> = ({
  state,
  isOvertime,
}) => {
  if (state === "Active") {
    if (isOvertime) {
      return (
        <div className="status-pill status-pill--muted">Shift Ended</div>
      );
    }
    return <div className="status-pill status-pill--active">Active</div>;
  }
  if (state === "Late") {
    return <div className="status-pill status-pill--late">Late</div>;
  }
  return <div className="status-pill status-pill--muted">Not Clocked In</div>;
};

export default HomeView;
