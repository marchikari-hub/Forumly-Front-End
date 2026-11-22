"use client";

import { FormEvent, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Lock,
  Moon,
  Save,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import "./settings.css";

type SettingsTab = "profile" | "preferences" | "notifications" | "security";

const tabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile Details", icon: User },
  { id: "preferences", label: "Preferences", icon: Sun },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    username: "Marchella",
    email: "marchella@example.com",
    bio: "Computer Science student & developer.",
    theme: "dark",
    emailNotifications: true,
    pushNotifications: false,
    twoFactor: false,
  });

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section className="settings-page" aria-labelledby="settings-title">
      <header className="settings-header">
        <h1 id="settings-title">Settings</h1>
        <p>Manage your account settings and preferences.</p>
      </header>

      <div className="settings-layout">
        <nav className="settings-tabs" aria-label="Settings sections">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`settings-tab${activeTab === id ? " active" : ""}`}
              aria-current={activeTab === id ? "page" : undefined}
              onClick={() => setActiveTab(id)}
            >
              <Icon aria-hidden="true" size={17} />
              {label}
            </button>
          ))}
        </nav>

        <form className="settings-card" onSubmit={handleSave}>
          {activeTab === "profile" && (
            <div className="settings-panel">
              <div className="settings-panel-heading">
                <h2>Public Profile</h2>
                <p>Update the information shown on your profile.</p>
              </div>
              <label className="settings-field">
                <span>Username</span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(event) =>
                    setFormData({ ...formData, username: event.target.value })
                  }
                />
              </label>
              <label className="settings-field">
                <span>Email Address</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                />
              </label>
              <label className="settings-field">
                <span>Bio</span>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(event) =>
                    setFormData({ ...formData, bio: event.target.value })
                  }
                />
              </label>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="settings-panel">
              <div className="settings-panel-heading">
                <h2>Appearance &amp; Display</h2>
                <p>Choose how Forumly looks on your device.</p>
              </div>
              <fieldset className="settings-theme-options">
                <legend>Interface Theme</legend>
                <button
                  type="button"
                  className={`settings-theme-option${formData.theme === "light" ? " active" : ""}`}
                  aria-pressed={formData.theme === "light"}
                  onClick={() => setFormData({ ...formData, theme: "light" })}
                >
                  <Sun aria-hidden="true" size={17} />
                  Light
                </button>
                <button
                  type="button"
                  className={`settings-theme-option${formData.theme === "dark" ? " active" : ""}`}
                  aria-pressed={formData.theme === "dark"}
                  onClick={() => setFormData({ ...formData, theme: "dark" })}
                >
                  <Moon aria-hidden="true" size={17} />
                  Dark
                </button>
              </fieldset>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="settings-panel">
              <div className="settings-panel-heading">
                <h2>Notification Preferences</h2>
                <p>Choose which updates you want to receive.</p>
              </div>
              <label className="settings-toggle-row">
                <span>
                  <strong>Email Notifications</strong>
                  <small>Receive updates regarding reply threads and forum mentions.</small>
                </span>
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      emailNotifications: event.target.checked,
                    })
                  }
                />
              </label>
              <label className="settings-toggle-row">
                <span>
                  <strong>Push Notifications</strong>
                  <small>Get instant alerts in your browser when active.</small>
                </span>
                <input
                  type="checkbox"
                  checked={formData.pushNotifications}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      pushNotifications: event.target.checked,
                    })
                  }
                />
              </label>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-panel">
              <div className="settings-panel-heading">
                <h2>Security &amp; Authentication</h2>
                <p>Manage the security settings for your account.</p>
              </div>
              <label className="settings-toggle-row">
                <span className="settings-security-label">
                  <ShieldCheck aria-hidden="true" size={20} />
                  <span>
                    <strong>Two-Factor Authentication (2FA)</strong>
                    <small>Add an extra layer of protection to your account.</small>
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={formData.twoFactor}
                  onChange={(event) =>
                    setFormData({ ...formData, twoFactor: event.target.checked })
                  }
                />
              </label>
            </div>
          )}

          <footer className="settings-footer">
            {saved ? (
              <span className="settings-saved" role="status">
                <CheckCircle2 aria-hidden="true" size={17} />
                Changes saved successfully!
              </span>
            ) : (
              <span />
            )}
            <button className="settings-save-button" type="submit">
              <Save aria-hidden="true" size={16} />
              Save Changes
            </button>
          </footer>
        </form>
      </div>
    </section>
  );
}
