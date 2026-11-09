"use client";

import { useState } from "react";
import { 
  User, 
  Bell, 
  Lock, 
  Moon, 
  Sun, 
  Save, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "notifications" | "security">("profile");
  const [saved, setSaved] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    username: "Marchella",
    email: "marchella@example.com",
    bio: "Computer Science student & developer.",
    theme: "dark",
    emailNotifications: true,
    pushNotifications: false,
    twoFactor: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-10 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your account settings and preference configurations.
          </p>
        </div>

        {/* Layout Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 pb-4 md:pb-0">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors w-full text-left whitespace-nowrap ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <User className="w-4 h-4" /> Profile Details
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors w-full text-left whitespace-nowrap ${
                activeTab === "preferences"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <Sun className="w-4 h-4" /> Preferences
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors w-full text-left whitespace-nowrap ${
                activeTab === "notifications"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors w-full text-left whitespace-nowrap ${
                activeTab === "security"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <Lock className="w-4 h-4" /> Security
            </button>
          </nav>

          {/* Form Content Area */}
          <div className="md:col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3">
                    Public Profile
                  </h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3">
                    Appearance & Display
                  </h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">Interface Theme</label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, theme: "light" })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                          formData.theme === "light"
                            ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                            : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <Sun className="w-4 h-4" /> Light
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, theme: "dark" })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                          formData.theme === "dark"
                            ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                            : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <Moon className="w-4 h-4" /> Dark
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3">
                    Notification Preferences
                  </h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Email Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates regarding reply threads and forum mentions.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Push Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get instant alerts in your browser when active.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.pushNotifications}
                      onChange={(e) => setFormData({ ...formData, pushNotifications: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3">
                    Security & Authentication
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-sm">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of protection to your account.</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.twoFactor}
                      onChange={(e) => setFormData({ ...formData, twoFactor: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Save Footer */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                {saved && (
                  <span className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" /> Changes saved successfully!
                  </span>
                )}
                {!saved && <div />}
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}