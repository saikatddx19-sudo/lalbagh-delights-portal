import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loginMethod, setLoginMethod] = useState<"email" | "id">("id");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [internationalId, setInternationalId] = useState("");
  const [phone, setPhone] = useState("");

  const { signUp, signInWithEmail, signInWithInternationalId, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        let result;
        if (loginMethod === "id") {
          if (!internationalId) { setError("Please enter your International ID"); setLoading(false); return; }
          result = await signInWithInternationalId(internationalId, password);
        } else {
          if (!email) { setError("Please enter your email"); setLoading(false); return; }
          result = await signInWithEmail(email, password);
        }
        if (result.error) { setError(result.error.message); } else { navigate("/dashboard"); }
      } else {
        if (!email || !password || !fullName) { setError("Please fill in all required fields"); setLoading(false); return; }
        const result = await signUp(email, password, {
          full_name: fullName,
          international_id: internationalId || undefined,
          phone: phone || undefined,
        });
        if (result.error) { setError(result.error.message); } else {
          setSuccess("Account created successfully! You are now signed in.");
          setTimeout(() => navigate("/dashboard"), 1500);
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-muted/30 px-4 py-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/logo.jpeg" alt="Leo Club" className="mx-auto h-20 w-20 rounded-full object-cover shadow-lg ring-4 ring-primary/20 mb-4" />
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Sign in to your member account" : "Register as a new member"}
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">{error}</div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-sm">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isLogin && (
              <div className="flex rounded-xl overflow-hidden border border-border">
                <button type="button" onClick={() => setLoginMethod("id")}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${loginMethod === "id" ? "gradient-gold text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}>
                  International ID
                </button>
                <button type="button" onClick={() => setLoginMethod("email")}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${loginMethod === "email" ? "gradient-gold text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}>
                  Email
                </button>
              </div>
            )}

            {!isLogin && (
              <div>
                <label htmlFor="fullname" className="block text-sm font-semibold text-foreground mb-2">Full Name <span className="text-destructive">*</span></label>
                <input id="fullname" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="Your full name" required />
              </div>
            )}

            {(isLogin && loginMethod === "id") || !isLogin ? (
              <div>
                <label htmlFor="intlId" className="block text-sm font-semibold text-foreground mb-2">
                  International ID {!isLogin && <span className="text-muted-foreground font-normal">(optional)</span>}
                </label>
                <input id="intlId" type="text" value={internationalId} onChange={(e) => setInternationalId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="Enter your International ID" required={isLogin && loginMethod === "id"} />
              </div>
            ) : null}

            {(isLogin && loginMethod === "email") || !isLogin ? (
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email {!isLogin && <span className="text-destructive">*</span>}
                </label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="you@example.com" required={!isLogin || loginMethod === "email"} />
              </div>
            ) : null}

            {!isLogin && (
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                  Phone <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="+91 98765 43210" />
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password {!isLogin && <span className="text-destructive">*</span>}
              </label>
              <div className="relative">
                <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="••••••••" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-xl gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
              className="text-sm text-primary hover:underline font-medium">
              {isLogin ? "Don't have an account? Register" : "Already a member? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
