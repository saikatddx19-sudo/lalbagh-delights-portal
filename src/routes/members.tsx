import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Users, Filter, Loader2, User, Mail, Phone, BadgeCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Member Directory — Leo Club of Lalbagh Delights" },
      { name: "description", content: "Browse the member directory of Leo Club of Lalbagh Delights." },
      { property: "og:title", content: "Member Directory — Leo Club of Lalbagh Delights" },
      { property: "og:description", content: "Meet the members of our club." },
    ],
  }),
  component: MembersPage,
});

type Profile = Tables<"profiles">;

function MembersPage() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [designations, setDesignations] = useState<string[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_active", true)
        .order("full_name", { ascending: true });

      if (data) {
        setMembers(data);
        const uniqueDesignations = [...new Set(data.map((m) => m.designation).filter(Boolean))] as string[];
        setDesignations(uniqueDesignations);
      }
      setLoading(false);
    };
    fetchMembers();
  }, []);

  const filtered = members.filter((m) => {
    const matchesSearch =
      !search ||
      m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.international_id?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase());
    const matchesDesignation = !designationFilter || m.designation === designationFilter;
    return matchesSearch && matchesDesignation;
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">Our Family</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Member <span className="text-gradient-gold">Directory</span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            Meet the dedicated members who make our club great.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or International ID..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors text-sm"
              />
            </div>
            {designations.length > 0 && (
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={designationFilter}
                  onChange={(e) => setDesignationFilter(e.target.value)}
                  className="pl-11 pr-8 py-3 rounded-xl bg-card border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors text-sm appearance-none min-w-[180px]"
                >
                  <option value="">All Designations</option>
                  {designations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No members found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function MemberCard({ member }: { member: Profile }) {
  return (
    <div className="group bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center text-primary-foreground text-xl font-bold shrink-0 group-hover:scale-105 transition-transform">
          {member.avatar_url ? (
            <img
              src={member.avatar_url}
              alt={member.full_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            member.full_name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {member.full_name || "Member"}
          </h3>
          {member.designation && (
            <p className="text-xs text-primary font-medium">{member.designation}</p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        {member.international_id && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{member.international_id}</span>
          </div>
        )}
        {member.email && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
        )}
        {member.phone && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{member.phone}</span>
          </div>
        )}
      </div>

      {/* Status badge */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Active Member
        </span>
      </div>
    </div>
  );
}
