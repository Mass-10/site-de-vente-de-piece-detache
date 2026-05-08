import { useState } from "react";
import {Link} from "react-router-dom";

type Mode = "login" | "register";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (mode === "register" && !form.name.trim()) e.name = "Le nom est requis.";
    if (!form.email.includes("@")) e.email = "Email invalide.";
    if (form.password.length < 6) e.password = "Minimum 6 caractères.";
    if (mode === "register" && form.password !== form.confirm) e.confirm = "Les mots de passe ne correspondent pas.";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
  }

  function switchMode(m: Mode) {
    setMode(m);
    setErrors({});
    setSubmitted(false);
    setForm({ name: "", email: "", password: "", confirm: "" });
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-zinc-900 border-b border-zinc-800/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1">
            <span className="text-orange-500 text-2xl font-black">MECA</span>
            <span className="text-white text-2xl font-black">PARTS</span>
          </a>
          <Link to="/catalogue" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">  Retour au catalogue →</Link>


        </div>
      </nav>

      {/* FORM CENTERED */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Toggle tabs */}
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1 mb-8">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                  mode === m
                    ? "bg-orange-500 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {m === "login" ? "Connexion" : "Créer un compte"}
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <h1 className="text-2xl font-black text-white mb-1">
              {mode === "login" ? "Bon retour 👋" : "Créer un compte"}
            </h1>
            <p className="text-sm text-zinc-500 mb-8">
              {mode === "login"
                ? "Connectez-vous pour accéder à vos commandes."
                : "Rejoignez MecaParts pour commander facilement."}
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">✅</span>
                <p className="text-white font-bold text-lg mb-2">
                  {mode === "login" ? "Connexion réussie !" : "Compte créé !"}
                </p>
                <p className="text-zinc-400 text-sm">Redirection en cours...</p>
              </div>
            ) : (
              <div className="space-y-4">

                {/* Name — register only */}
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Nom complet</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Mamadou Diallo"
                      className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                        errors.name ? "border-red-500" : "border-zinc-700 focus:border-orange-500"
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Adresse email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="vous@exemple.com"
                    className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.email ? "border-red-500" : "border-zinc-700 focus:border-orange-500"
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Mot de passe</label>
                    {mode === "login" && (
                      <a href="#" className="text-xs text-orange-500 hover:text-orange-400 transition-colors">
                        Mot de passe oublié ?
                      </a>
                    )}
                  </div>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.password ? "border-red-500" : "border-zinc-700 focus:border-orange-500"
                    }`}
                  />
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm password — register only */}
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      value={form.confirm}
                      onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                      placeholder="••••••••"
                      className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                        errors.confirm ? "border-red-500" : "border-zinc-700 focus:border-orange-500"
                      }`}
                    />
                    {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors mt-2"
                >
                  {mode === "login" ? "Se connecter" : "Créer mon compte"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-xs text-zinc-600">ou</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>

                {/* Switch mode */}
                <p className="text-center text-xs text-zinc-500">
                  {mode === "login" ? "Pas encore de compte ? " : "Déjà inscrit ? "}
                  <button
                    onClick={() => switchMode(mode === "login" ? "register" : "login")}
                    className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
                  >
                    {mode === "login" ? "S'inscrire" : "Se connecter"}
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
