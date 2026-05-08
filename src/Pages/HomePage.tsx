import { useState } from "react";
import { Link } from "react-router-dom";

import heroImg from "../assets/hero.jpg";
import plaquetteImg from "../assets/plaquetteDeFrein.jpg";
import filtreHuileImg from "../assets/Filtre_-_huile_universel.jpg";
import batterieImg from "../assets/baterie.jpg";
import amortisseurImg from "../assets/Amortisseur_arri-re.jpg";

const categories = [
  { id: 1, name: "Moteur", icon: "⚙️", count: 243 },
  { id: 2, name: "Freinage", icon: "🔧", count: 187 },
  { id: 3, name: "Suspension", icon: "🛠️", count: 156 },
  { id: 4, name: "Électricité", icon: "⚡", count: 312 },
  { id: 5, name: "Carrosserie", icon: "🚗", count: 98 },
  { id: 6, name: "Transmission", icon: "🔩", count: 134 },
];

const featuredProducts = [
  {
    id: 1,
    name: "Plaquettes de frein avant",
    brand: "Bosch",
    price: 24500,
    ref: "BP-2024-F",
    badge: "Populaire",
    img: plaquetteImg,
  },
  {
    id: 2,
    name: "Filtre à huile universel",
    brand: "Mann Filter",
    price: 8900,
    ref: "FH-MAN-07",
    badge: "Promo",
    img: filtreHuileImg,
  },
  {
    id: 3,
    name: "Batterie 60Ah 12V",
    brand: "Varta",
    price: 89000,
    ref: "BAT-60AH",
    badge: null,
    img: batterieImg,
  },
  {
    id: 4,
    name: "Amortisseur arrière",
    brand: "Monroe",
    price: 45000,
    ref: "AM-MN-R",
    badge: "Nouveau",
    img: amortisseurImg,
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("fr-FR") + " FCFA";
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans">

        {/* NAVBAR */}
        <nav className="bg-zinc-900/10 border-b border-zinc-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-2xl font-black tracking-tight">MECA</span>
              <span className="text-white text-2xl font-black tracking-tight">PARTS</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/catalogue" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Catalogue</Link>
              <Link to="/product" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Produits</Link>
              <Link to="/" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Accueil</Link>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden md:block text-sm text-zinc-400 hover:text-white transition-colors">Connexion</button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded transition-colors">
                Panier (0)
              </button>
              <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden text-zinc-400 hover:text-white p-1"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {menuOpen && (
              <div className="md:hidden border-t border-zinc-800 px-4 py-4 flex flex-col gap-3">
                <Link to="/catalogue" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Catalogue</Link>
                <Link to="/product" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Produits</Link>
                <Link to="/login" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Connexion</Link>
              </div>
          )}
        </nav>

        {/* HERO */}
        <section className="relative bg-zinc-900 py-12 md:py-20 px-4 overflow-hidden">
          <img src={heroImg} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-10" />
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-2xl">
            <span className="inline-block bg-orange-500/10 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-orange-500/20">
              + de 5000 références disponibles
            </span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                Toutes vos pièces <br />
                <span className="text-orange-500">détachées</span> en un clic
              </h1>
              <p className="text-zinc-400 text-base md:text-lg mb-8">
                Trouvez la bonne pièce pour votre véhicule. Livraison rapide, qualité garantie.
              </p>
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Référence, marque ou modèle..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded transition-colors whitespace-nowrap">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-orange-500 py-6 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "5 000+", label: "Références" },
              { value: "24h", label: "Livraison" },
              { value: "100%", label: "Garantie" },
              { value: "2 ans", label: "Expérience" },
            ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-orange-100 text-sm">{stat.label}</p>
                </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-black mb-2">Catégories</h2>
          <p className="text-zinc-400 text-sm mb-8">Parcourez par type de pièce</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className="bg-zinc-900 border border-zinc-800 hover:border-orange-500 rounded-lg p-5 text-center transition-all group"
                >
                  <span className="text-3xl block mb-2">{cat.icon}</span>
                  <p className="text-sm font-semibold text-white group-hover:text-orange-500 transition-colors">{cat.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">{cat.count} pièces</p>
                </button>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-black mb-2">Pièces populaires</h2>
            <p className="text-zinc-400 text-sm mb-8">Les plus commandées cette semaine</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                  <div
                      key={product.id}
                      className="bg-zinc-950 border border-zinc-800 hover:border-orange-500/50 rounded-lg p-5 transition-all cursor-pointer group"
                  >
                    {product.badge && (
                        <span className={`inline-block text-xs font-semibold px-2 py-1 rounded mb-3 ${
                            product.badge === "Promo" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                                product.badge === "Nouveau" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                    "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                        }`}>
                    {product.badge}
                  </span>
                    )}
                    <div className="bg-zinc-800 rounded h-32 overflow-hidden mb-4">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-zinc-500 mb-1">{product.brand}</p>
                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-600 mb-3">Réf: {product.ref}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-500 font-black">{formatPrice(product.price)}</span>
                      <button className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded transition-colors">
                        + Panier
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Vous ne trouvez pas votre pièce ?</h2>
            <p className="text-zinc-400 mb-8">Contactez notre équipe, on vous trouve ce qu'il vous faut.</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-lg transition-colors text-sm">
              Nous contacter
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-zinc-900 border-t border-zinc-800 py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              <span className="text-orange-500 font-black">MECA</span>
              <span className="text-white font-black">PARTS</span>
            </div>
            <p className="text-zinc-500 text-sm">© 2024 MecaParts — Tous droits réservés</p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-500 hover:text-orange-500 text-sm transition-colors">CGV</a>
              <a href="#" className="text-zinc-500 hover:text-orange-500 text-sm transition-colors">Confidentialité</a>
            </div>
          </div>
        </footer>

      </div>
  );
}