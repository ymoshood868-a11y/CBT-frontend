import { useState, useEffect } from "react";

interface SystemConfig {
  examRules: {
    maxAttempts: number;
    allowRetake: boolean;
    retakeCooldown: number;
    autoSubmitOnTimeout: boolean;
    allowPause: boolean;
    maxPauseDuration: number;
    antiCheatEnabled: boolean;
    maxTabSwitches: number;
    requireFullscreen: boolean;
  };
  featureToggles: {
    enableDemoMode: boolean;
    enableOfflineMode: boolean;
    enableAutoSave: boolean;
    enableCalculator: boolean;
    enablePassageOverlay: boolean;
    enableDarkMode: boolean;
    enableBulkUpload: boolean;
    enableAnalytics: boolean;
  };
  systemSettings: {
    maintenanceMode: boolean;
    allowNewRegistrations: boolean;
    requireEmailVerification: boolean;
    sessionTimeout: number;
    maxFileUploadSize: number;
    backupFrequency: string;
  };
}

const defaultConfig: SystemConfig = {
  examRules: {
    maxAttempts: 3,
    allowRetake: true,
    retakeCooldown: 24,
    autoSubmitOnTimeout: true,
    allowPause: true,
    maxPauseDuration: 10,
    antiCheatEnabled: true,
    maxTabSwitches: 3,
    requireFullscreen: true,
  },
  featureToggles: {
    enableDemoMode: true,
    enableOfflineMode: true,
    enableAutoSave: true,
    enableCalculator: true,
    enablePassageOverlay: true,
    enableDarkMode: true,
    enableBulkUpload: true,
    enableAnalytics: true,
  },
  systemSettings: {
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true,
    sessionTimeout: 30,
    maxFileUploadSize: 10,
    backupFrequency: "daily",
  },
};

export default function SystemConfiguration() {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSaveConfig = () => {
    alert("System configuration saved successfully!");
    setHasChanges(false);
  };

  const handleResetConfig = () => {
    if (confirm("Are you sure you want to reset to default configuration?")) {
      setConfig(defaultConfig);
      setHasChanges(false);
      alert("Configuration reset to defaults!");
    }
  };

  const updateExamRule = (key: keyof SystemConfig["examRules"], value: any) => {
    setConfig({
      ...config,
      examRules: { ...config.examRules, [key]: value },
    });
    setHasChanges(true);
  };

  const updateFeatureToggle = (
    key: keyof SystemConfig["featureToggles"],
    value: boolean,
  ) => {
    setConfig({
      ...config,
      featureToggles: { ...config.featureToggles, [key]: value },
    });
    setHasChanges(true);
  };

  const updateSystemSetting = (
    key: keyof SystemConfig["systemSettings"],
    value: any,
  ) => {
    setConfig({
      ...config,
      systemSettings: { ...config.systemSettings, [key]: value },
    });
    setHasChanges(true);
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: "hsl(var(--background))",
        minHeight: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
          borderRadius: 16,
          padding: "32px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "hsl(var(--accent) / 0.2)",
            filter: "blur(60px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <h1
                style={{
                  color: "hsl(var(--primary-foreground))",
                  fontSize: 32,
                  fontWeight: 800,
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em",
                }}
              >
                ⚙️ System Configuration
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Configure exam rules, features, and system settings
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {hasChanges && (
                <button
                  onClick={handleResetConfig}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              )}
              <button
                onClick={handleSaveConfig}
                disabled={!hasChanges}
                style={{
                  background: hasChanges
                    ? "hsl(var(--accent))"
                    : "hsl(var(--secondary))",
                  color: hasChanges ? "#fff" : "hsl(var(--muted-foreground))",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: hasChanges ? "pointer" : "not-allowed",
                }}
              >
                💾 Save Changes
              </button>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: isOnline
                    ? "rgba(34, 197, 94, 0.2)"
                    : "rgba(239, 68, 68, 0.2)",
                  border: `1px solid ${isOnline ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                  borderRadius: 100,
                  padding: "8px 16px",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: isOnline ? "#22c55e" : "#ef4444",
                    boxShadow: `0 0 8px ${isOnline ? "#22c55e" : "#ef4444"}`,
                  }}
                />
                <span
                  style={{
                    color: "hsl(var(--primary-foreground))",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Exam Rules */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 20,
              color: "hsl(var(--foreground))",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            📝 Exam Rules
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "hsl(var(--foreground))",
                }}
              >
                Max Attempts per Exam
              </label>
              <input
                type="number"
                value={config.examRules.maxAttempts}
                onChange={(e) =>
                  updateExamRule("maxAttempts", parseInt(e.target.value))
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.examRules.allowRetake}
                  onChange={(e) =>
                    updateExamRule("allowRetake", e.target.checked)
                  }
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Allow Exam Retakes
                </span>
              </label>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "hsl(var(--foreground))",
                }}
              >
                Retake Cooldown (hours)
              </label>
              <input
                type="number"
                value={config.examRules.retakeCooldown}
                onChange={(e) =>
                  updateExamRule("retakeCooldown", parseInt(e.target.value))
                }
                disabled={!config.examRules.allowRetake}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "inherit",
                  opacity: config.examRules.allowRetake ? 1 : 0.5,
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.examRules.autoSubmitOnTimeout}
                  onChange={(e) =>
                    updateExamRule("autoSubmitOnTimeout", e.target.checked)
                  }
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Auto-Submit on Timeout
                </span>
              </label>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.examRules.allowPause}
                  onChange={(e) =>
                    updateExamRule("allowPause", e.target.checked)
                  }
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Allow Exam Pause
                </span>
              </label>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "hsl(var(--foreground))",
                }}
              >
                Max Pause Duration (minutes)
              </label>
              <input
                type="number"
                value={config.examRules.maxPauseDuration}
                onChange={(e) =>
                  updateExamRule("maxPauseDuration", parseInt(e.target.value))
                }
                disabled={!config.examRules.allowPause}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "inherit",
                  opacity: config.examRules.allowPause ? 1 : 0.5,
                }}
              />
            </div>
          </div>
        </div>

        {/* Anti-Cheat Settings */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 20,
              color: "hsl(var(--foreground))",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            🔒 Anti-Cheat Settings
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.examRules.antiCheatEnabled}
                  onChange={(e) =>
                    updateExamRule("antiCheatEnabled", e.target.checked)
                  }
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Enable Anti-Cheat System
                </span>
              </label>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "hsl(var(--foreground))",
                }}
              >
                Max Tab Switches (before auto-submit)
              </label>
              <input
                type="number"
                value={config.examRules.maxTabSwitches}
                onChange={(e) =>
                  updateExamRule("maxTabSwitches", parseInt(e.target.value))
                }
                disabled={!config.examRules.antiCheatEnabled}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "inherit",
                  opacity: config.examRules.antiCheatEnabled ? 1 : 0.5,
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.examRules.requireFullscreen}
                  onChange={(e) =>
                    updateExamRule("requireFullscreen", e.target.checked)
                  }
                  disabled={!config.examRules.antiCheatEnabled}
                  style={{
                    width: 18,
                    height: 18,
                    cursor: config.examRules.antiCheatEnabled
                      ? "pointer"
                      : "not-allowed",
                    opacity: config.examRules.antiCheatEnabled ? 1 : 0.5,
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                    opacity: config.examRules.antiCheatEnabled ? 1 : 0.5,
                  }}
                >
                  Require Fullscreen Mode
                </span>
              </label>
            </div>

            <div
              style={{
                background: "hsl(var(--accent) / 0.1)",
                border: "1px solid hsl(var(--accent) / 0.3)",
                borderRadius: 10,
                padding: 16,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "hsl(var(--accent))",
                  marginBottom: 8,
                }}
              >
                ⚠️ Anti-Cheat Features
              </div>
              <ul
                style={{
                  fontSize: 12,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                  paddingLeft: 20,
                  lineHeight: 1.6,
                }}
              >
                <li>Tab switch detection</li>
                <li>Fullscreen exit monitoring</li>
                <li>Copy/paste prevention</li>
                <li>Right-click disable</li>
                <li>Browser console detection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 20,
              color: "hsl(var(--foreground))",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            🎛️ Feature Toggles
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.entries(config.featureToggles).map(([key, value]) => (
              <label
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "hsl(var(--secondary))",
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(var(--accent) / 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsl(var(--secondary))";
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
                <div
                  style={{
                    position: "relative",
                    width: 48,
                    height: 24,
                    background: value ? "#22c55e" : "hsl(var(--border))",
                    borderRadius: 100,
                    transition: "all 0.2s",
                  }}
                  onClick={() =>
                    updateFeatureToggle(
                      key as keyof SystemConfig["featureToggles"],
                      !value,
                    )
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      left: value ? 26 : 2,
                      width: 20,
                      height: 20,
                      background: "#fff",
                      borderRadius: "50%",
                      transition: "all 0.2s",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* System Settings */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 20,
              color: "hsl(var(--foreground))",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            🖥️ System Settings
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.systemSettings.maintenanceMode}
                  onChange={(e) =>
                    updateSystemSetting("maintenanceMode", e.target.checked)
                  }
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: config.systemSettings.maintenanceMode
                      ? "#ef4444"
                      : "hsl(var(--foreground))",
                  }}
                >
                  🚧 Maintenance Mode
                </span>
              </label>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.systemSettings.allowNewRegistrations}
                  onChange={(e) =>
                    updateSystemSetting(
                      "allowNewRegistrations",
                      e.target.checked,
                    )
                  }
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Allow New Registrations
                </span>
              </label>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.systemSettings.requireEmailVerification}
                  onChange={(e) =>
                    updateSystemSetting(
                      "requireEmailVerification",
                      e.target.checked,
                    )
                  }
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Require Email Verification
                </span>
              </label>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "hsl(var(--foreground))",
                }}
              >
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={config.systemSettings.sessionTimeout}
                onChange={(e) =>
                  updateSystemSetting(
                    "sessionTimeout",
                    parseInt(e.target.value),
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "hsl(var(--foreground))",
                }}
              >
                Max File Upload Size (MB)
              </label>
              <input
                type="number"
                value={config.systemSettings.maxFileUploadSize}
                onChange={(e) =>
                  updateSystemSetting(
                    "maxFileUploadSize",
                    parseInt(e.target.value),
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "hsl(var(--foreground))",
                }}
              >
                Backup Frequency
              </label>
              <select
                value={config.systemSettings.backupFrequency}
                onChange={(e) =>
                  updateSystemSetting("backupFrequency", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
