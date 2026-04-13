const leaders = [
  { name: "Ravi Kumar", role: "President", initials: "RK" },
  { name: "Priya Sharma", role: "Vice President", initials: "PS" },
  { name: "Anil Reddy", role: "Secretary", initials: "AR" },
  { name: "Meera Patel", role: "Treasurer", initials: "MP" },
];

export default function LeadershipSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Our Team
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Club <span className="text-gradient-gold">Leadership</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="mx-auto mb-4 h-24 w-24 rounded-full gradient-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="font-heading text-2xl font-bold text-primary-foreground">
                  {leader.initials}
                </span>
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {leader.name}
              </h3>
              <p className="text-sm text-primary font-medium mt-1">
                {leader.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
