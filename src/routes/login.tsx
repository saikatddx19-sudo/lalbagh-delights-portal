import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Member Login — Leo Club of Lalbagh Delights" },
      { name: "description", content: "Sign in to the Leo Club of Lalbagh Delights member portal." },
      { property: "og:title", content: "Member Login — Leo Club of Lalbagh Delights" },
      { property: "og:description", content: "Access your member dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-muted/30 px-4 py-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/logo.jpeg"
            alt="Leo Club"
            className="mx-auto h-20 w-20 rounded-full object-cover shadow-lg ring-4 ring-primary/20 mb-4"
          />
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Sign in to your member account" : "Register as a new member"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="fullname" className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                <input
                  id="fullname"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="intlId" className="block text-sm font-semibold text-foreground mb-2">
                International ID {!isLogin && <span className="text-muted-foreground font-normal">(optional)</span>}
              </label>
              <input
                id="intlId"
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                placeholder="Enter your International ID"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="regEmail" className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    id="regEmail"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="regPhone" className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <input
                    id="regPhone"
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-xl gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              {isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline font-medium"
            >
              {isLogin ? "Don't have an account? Register" : "Already a member? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
