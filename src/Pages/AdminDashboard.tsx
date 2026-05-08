import { useState } from "react";

const stats = [
  { label: "Revenus du mois", value: "1 240 000 FCFA", change: "+12%", up: true },
  { label: "Commandes", value: "87", change: "+5%", up: true },
  { label: "Produits actifs", value: "312", change: "-3", up: false },
  { label: "Clients inscrits", value: "204", change: "+18%", up: true },
];

const recentOrders = [
  { id: "#CMD-0087", client: "Mamadou Diallo", date: "06/05/2024", total: 69500, status: "Livré" },
  { id: "#CMD-0086", client: "Fatou Ndiaye", date: "05/05/2024", total: 24500, status: "En cours" },
  { id: "#CMD-0085", client: "Ibrahima Sow", date: "04/05/2024", total: 89000, status: "En attente" },
  { id: "#CMD-0084", client: "Aissatou Ba", date: "03/05/2024", total: 32000, status: "Livré" },
  { id: "#CMD-0083", client: "Ousmane Fall", date: "02/05/2024", total: 15000, status: "Annulé" },
];

const topProducts = [
  { name: "Plaquettes de frein avant", sales: 34, revenue: 833000 },
  { name: "Filtre à huile universel", sales: 28, revenue: 249200 },
  { name: "Batterie 60Ah 12V", sales: 12, revenue: 1068000 },
  { name: "Bougie d'allumage NGK", sales: 41, revenue: 184500 },
];

const monthlySales = [40, 65, 50, 80, 55, 90, 75, 87, 60, 95, 70, 87];
const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

type NavItem = "dashboard" | "produits" | "commandes" | "clients";

function statusStyle(status: string) {
  switch (status) {
    case "Livré": return "bg-green-500/10 text-green-400 border-green-500/20";
    case "En cours": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "En attente": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "Annulé": return "bg-red-500/10 text-red-400 border-red-500/20";
    default: return "";
  }
}

function formatPrice(n: number) {
  return n.toLocaleString("fr-FR") + " FCFA";
}

export default function AdminDashboard() {
  const [active, setActive] = useState<NavItem>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const maxSales = Math.max(...monthlySales);

  return (
      <div className="min-h-screen bg-zinc-950 text-white flex font-sans">

        {/* SIDEBAR — hidden on mobile */}
        <aside className={`fixed md:static inset-y-0 left-0 z-50 w-52 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0 transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <div className="px-5 py-5 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-orange-500 font-black text-xl">MECA</span>
              <span className="text-white font-black text-xl">PARTS</span>
              <p className="text-xs text-zinc-500 mt-0.5">Administration</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-zinc-400 hover:text-white">✕</button>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {([
              { id: "dashboard", label: "Tableau de bord", icon: "📊" },
              { id: "produits", label: "Produits", icon: "🔧" },
              { id: "commandes", label: "Commandes", icon: "📦" },
              { id: "clients", label: "Clients", icon: "👥" },
            ] as { id: NavItem; label: string; icon: string }[]).map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                        active === item.id
                            ? "bg-orange-500/10 text-orange-400 font-semibold"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
            ))}
          </nav>
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm font-bold">A</div>
              <div>
                <p className="text-xs font-semibold text-white">Admin</p>
                <p className="text-xs text-zinc-500">admin@mecaparts.sn</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* MAIN */}
        <main className="flex-1 overflow-auto min-w-0">
          {/* Top bar */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-zinc-400 hover:text-white text-xl">☰</button>
              <div>
                <h1 className="text-base md:text-lg font-black text-white">Tableau de bord</h1>
                <p className="text-xs text-zinc-500 hidden sm:block">Bienvenue, voici l'état du site aujourd'hui.</p>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded transition-colors whitespace-nowrap">
              + Ajouter
            </button>
          </div>

          <div className="p-4 md:p-8 space-y-6 md:space-y-8">

            {/* STATS CARDS */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
              {stats.map((s) => (
                  <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-5">
                    <p className="text-xs text-zinc-500 mb-2">{s.label}</p>
                    <p className="text-base md:text-xl font-black text-white mb-2">{s.value}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        s.up ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                    }`}>
                  {s.up ? "↑" : "↓"} {s.change} ce mois
                </span>
                  </div>
              ))}
            </div>

            {/* CHART + TOP PRODUCTS */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* Bar chart */}
              <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6">
                <h2 className="text-sm font-bold text-white mb-6">Commandes par mois</h2>
                <div className="flex items-end gap-1 md:gap-2 h-32 md:h-40">
                  {monthlySales.map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                            className={`w-full rounded-t transition-all ${
                                i === 7 ? "bg-orange-500" : "bg-zinc-700 hover:bg-zinc-600"
                            }`}
                            style={{ height: `${(val / maxSales) * 100}%` }}
                        />
                        <span className="text-xs text-zinc-600 hidden sm:block">{months[i]}</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* Top products */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6">
                <h2 className="text-sm font-bold text-white mb-5">Top produits</h2>
                <div className="space-y-4">
                  {topProducts.map((p) => (
                      <div key={p.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-zinc-300 truncate max-w-40">{p.name}</span>
                          <span className="text-xs text-zinc-500 shrink-0 ml-2">{p.sales} ventes</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${(p.sales / 41) * 100}%` }}
                          />
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RECENT ORDERS TABLE — scrollable on mobile */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="px-4 md:px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-sm font-bold text-white">Dernières commandes</h2>
                <button className="text-xs text-orange-500 hover:text-orange-400 transition-colors">
                  Voir toutes →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                  <tr className="border-b border-zinc-800">
                    {["Réf.", "Client", "Date", "Total", "Statut", "Action"].map((h) => (
                        <th key={h} className="text-left px-4 md:px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          {h}
                        </th>
                    ))}
                  </tr>
                  </thead>
                  <tbody>
                  {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                        <td className="px-4 md:px-6 py-4 text-xs font-mono text-zinc-400">{order.id}</td>
                        <td className="px-4 md:px-6 py-4 text-sm text-white font-medium">{order.client}</td>
                        <td className="px-4 md:px-6 py-4 text-xs text-zinc-500">{order.date}</td>
                        <td className="px-4 md:px-6 py-4 text-sm font-bold text-orange-500">{formatPrice(order.total)}</td>
                        <td className="px-4 md:px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${statusStyle(order.status)}`}>
                          {order.status}
                        </span>
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <button className="text-xs text-zinc-500 hover:text-orange-500 transition-colors">
                            Voir →
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
  );
}