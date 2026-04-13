import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  User,
  Calendar,
  CreditCard,
  LogOut,
  Edit,
  Save,
  X,
  Loader2,
  Shield,
  Users,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Member Dashboard — Leo Club of Lalbagh Delights" },
      { name: "description", content: "Your Leo Club member dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, profile, isLoading, isAuthenticated, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [registrations, setRegistrations] = useState<(Tables<"event_registrations"> & { events: Tables<"events"> | null })[]>([]);
  const [payments, setPayments] = useState<Tables<"payments">[]>([]);

  // Form state for editing profile
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    international_id: "",
    designation: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        international_id: profile.international_id || "",
        designation: profile.designation || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      // Fetch event registrations
      supabase
        .from("event_registrations")
        .select("*, events(*)")
        .eq("user_id", user.id)
        .order("registered_at", { ascending: false })
        .limit(5)
        .then(({ data }) => {
          if (data) setRegistrations(data as any);
        });

      // Fetch payment history
      supabase
        .from("payments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)
        .then(({ data }) => {
          if (data) setPayments(data);
        });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        phone: formData.phone || null,
        international_id: formData.international_id || null,
        designation: formData.designation || null,
      })
      .eq("user_id", user.id);
    await refreshProfile();
    setEditing(false);
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="pt-20 min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Member Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {profile?.full_name || "Member"}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  My Profile
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full gradient-gold flex items-center justify-center text-primary-foreground text-2xl font-bold mb-3">
                  {(profile?.full_name || "M").charAt(0).toUpperCase()}
                </div>
                {!editing ? (
                  <>
                    <h3 className="font-semibold text-foreground">{profile?.full_name || "—"}</h3>
                    <p className="text-sm text-muted-foreground">{profile?.designation || "Member"}</p>
                  </>
                ) : (
                  <input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full text-center px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Full Name"
                  />
                )}
              </div>

              <div className="space-y-3">
                <ProfileField
                  label="Email"
                  value={profile?.email || user?.email || "—"}
                  editing={false}
                />
                <ProfileField
                  label="International ID"
                  value={editing ? undefined : (profile?.international_id || "Not set")}
                  editing={editing}
                  editValue={formData.international_id}
                  onChange={(v) => setFormData({ ...formData, international_id: v })}
                  placeholder="Enter your ID"
                />
                <ProfileField
                  label="Phone"
                  value={editing ? undefined : (profile?.phone || "Not set")}
                  editing={editing}
                  editValue={formData.phone}
                  onChange={(v) => setFormData({ ...formData, phone: v })}
                  placeholder="Phone number"
                />
                <ProfileField
                  label="Designation"
                  value={editing ? undefined : (profile?.designation || "Member")}
                  editing={editing}
                  editValue={formData.designation}
                  onChange={(v) => setFormData({ ...formData, designation: v })}
                  placeholder="Your designation"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={<Calendar className="h-5 w-5" />}
                label="Events Registered"
                value={registrations.length.toString()}
              />
              <StatCard
                icon={<CreditCard className="h-5 w-5" />}
                label="Total Payments"
                value={payments.length.toString()}
              />
              <StatCard
                icon={<Shield className="h-5 w-5" />}
                label="Member Status"
                value={profile?.is_active ? "Active" : "Inactive"}
              />
            </div>

            {/* Recent Events */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                My Event Registrations
              </h2>
              {registrations.length > 0 ? (
                <div className="space-y-3">
                  {registrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/50"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {reg.events?.title || "Event"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {reg.events?.event_date
                            ? new Date(reg.events.event_date).toLocaleDateString()
                            : "—"}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          reg.payment_status === "completed"
                            ? "bg-green-500/10 text-green-700 dark:text-green-400"
                            : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                        }`}
                      >
                        {reg.payment_status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No event registrations yet.{" "}
                  <Link to="/events" className="text-primary hover:underline">
                    Browse events
                  </Link>
                </p>
              )}
            </div>

            {/* Payment History */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment History
              </h2>
              {payments.length > 0 ? (
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/50"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {payment.description || payment.payment_type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground text-sm">₹{payment.amount}</p>
                        <span
                          className={`text-xs font-medium ${
                            payment.status === "completed"
                              ? "text-green-600 dark:text-green-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No payment history yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
  editing,
  editValue,
  onChange,
  placeholder,
}: {
  label: string;
  value?: string;
  editing: boolean;
  editValue?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-0.5">{label}</p>
      {editing && onChange ? (
        <input
          value={editValue || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder={placeholder}
        />
      ) : (
        <p className="text-sm text-foreground">{value}</p>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">{icon}</div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}
