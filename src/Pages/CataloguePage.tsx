import { useState } from "react";

import plaquetteImg from "../assets/plaquetteDeFrein.jpg";
import filtreHuileImg from "../assets/Filtre_-_huile_universel.jpg";
import batterieImg from "../assets/baterie.jpg";
import amortisseurImg from "../assets/Amortisseur_arri-re.jpg";
import couroieImg from "../assets/couroie.jpg";
import disqueImg from "../assets/Disque_de_frein_perfor-.jpg";
import bougieImg from "../assets/bougie.jpg";
import rotuleImg from "../assets/rotule-direction-premium-mgb.jpg";
import alternateurImg from "../assets/alternateur.jpg";
import filtreAirImg from "../assets/FiltreAAir.jpg";
import roulementImg from "../assets/roulement-avant-clio-3-rs-megane-3-rs-megane-4-rs.jpg";
import radiateurImg from "../assets/Radiateur.jpg";
import {Link} from "react-router-dom";

const allProducts = [
  { id: 1, name: "Plaquettes de frein avant", brand: "Bosch", category: "Freinage", price: 24500, ref: "BP-2024-F", badge: "Populaire", stock: true, img: plaquetteImg },
  { id: 2, name: "Filtre à huile universel", brand: "Mann Filter", category: "Moteur", price: 8900, ref: "FH-MAN-07", badge: "Promo", stock: true, img: filtreHuileImg },
  { id: 3, name: "Batterie 60Ah 12V", brand: "Varta", category: "Électricité", price: 89000, ref: "BAT-60AH", badge: null, stock: true, img: batterieImg },
  { id: 4, name: "Amortisseur arrière", brand: "Monroe", category: "Suspension", price: 45000, ref: "AM-MN-R", badge: "Nouveau", stock: true, img: amortisseurImg },
  { id: 5, name: "Courroie de distribution", brand: "Gates", category: "Moteur", price: 18500, ref: "CD-GAT-12", badge: null, stock: false, img: couroieImg },
  { id: 6, name: "Disque de frein perforé", brand: "Brembo", category: "Freinage", price: 62000, ref: "DF-BR-P", badge: "Populaire", stock: true, img: disqueImg },
  { id: 7, name: "Bougie d'allumage NGK", brand: "NGK", category: "Moteur", price: 4500, ref: "BA-NGK-4", badge: null, stock: true, img: bougieImg },
  { id: 8, name: "Rotule de direction", brand: "TRW", category: "Suspension", price: 15000, ref: "RD-TRW-1", badge: null, stock: true, img: rotuleImg },
  { id: 9, name: "Alternateur 90A", brand: "Bosch", category: "Électricité", price: 120000, ref: "ALT-90A", badge: null, stock: false, img: alternateurImg },
  { id: 10, name: "Filtre à air sport", brand: "K&N", category: "Moteur", price: 32000, ref: "FA-KN-SP", badge: "Nouveau", stock: true, img: filtreAirImg },
  { id: 11, name: "Roulement de roue AV", brand: "SKF", category: "Transmission", price: 22000, ref: "RR-SKF-AV", badge: null, stock: true, img: roulementImg },
  { id: 12, name: "Radiateur de refroidissement", brand: "Valeo", category: "Moteur", price: 95000, ref: "RAD-VL-01", badge: null, stock: true, img: radiateurImg },
];

const categories = ["Tous", "Moteur", "Freinage", "Suspension", "Électricité", "Transmission", "Carrosserie"];
const brands = ["Toutes", "Bosch", "Brembo", "Gates", "K&N", "Mann Filter", "Monroe", "NGK", "SKF", "TRW", "Valeo", "Varta"];

function formatPrice(price: number) {
  return price.toLocaleString("fr-FR") + " FCFA";
}

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedBrand, setSelectedBrand] = useState("Toutes");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMax, setPriceMax] = useState(150000);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = allProducts
      .filter((p) => selectedCategory === "Tous" || p.category === selectedCategory)
      .filter((p) => selectedBrand === "Toutes" || p.brand === selectedBrand)
      .filter((p) => p.price <= priceMax)
      .filter((p) => !inStockOnly || p.stock)
      .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.ref.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });

  return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans">

        {/* NAVBAR */}
        <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-1">
                <span className="text-orange-500 text-2xl font-black">MECA</span>
                <span className="text-white text-2xl font-black">PARTS</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Acceuil</Link>
              <Link to="/product" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Produits</Link>
              <Link to="/catalogue" className="text-sm text-zinc-400 hover:text-orange-500 transition-colors">Catalogue</Link>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded transition-colors">
              Panier (0)
            </button>
          </div>
        </nav>

        {/* BREADCRUMB */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-xs text-zinc-500">
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Accueil</span>
            <span className="mx-2">/</span>
            <span className="text-white">Catalogue</span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16 flex gap-8">

          {/* SIDEBAR */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-6">

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Catégorie</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                            selectedCategory === cat
                                ? "bg-orange-500/10 text-orange-400 font-semibold border-l-2 border-orange-500"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                        }`}
                    >
                      {cat}
                    </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Marque</h3>
              <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
              >
                {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Prix max</h3>
              <input
                  type="range"
                  min={5000}
                  max={150000}
                  step={5000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-orange-500"
              />
              <p className="text-sm text-orange-400 font-semibold mt-2">{formatPrice(priceMax)}</p>
            </div>

            {/* In stock */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={`w-9 h-5 rounded-full transition-colors relative ${inStockOnly ? "bg-orange-500" : "bg-zinc-700"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${inStockOnly ? "left-4" : "left-0.5"}`} />
                </div>
                <span className="text-sm text-zinc-400">En stock uniquement</span>
              </label>
            </div>

            {/* Reset */}
            <button
                onClick={() => {
                  setSelectedCategory("Tous");
                  setSelectedBrand("Toutes");
                  setPriceMax(150000);
                  setInStockOnly(false);
                  setSearchQuery("");
                }}
                className="w-full text-xs text-zinc-500 hover:text-orange-500 transition-colors py-2 border border-zinc-800 rounded hover:border-orange-500/30"
            >
              Réinitialiser les filtres
            </button>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">

            {/* Top bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une pièce, une référence..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-sm text-white px-3 py-2.5 rounded focus:outline-none focus:border-orange-500"
              >
                <option value="default">Trier par : Défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
              </select>
            </div>

            {/* Results count */}
            <p className="text-xs text-zinc-500 mb-4">
              <span className="text-white font-semibold">{filtered.length}</span> résultat{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            </p>

            {/* Products grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-24 text-zinc-500">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="text-sm">Aucune pièce trouvée avec ces filtres.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((product) => (
                      <div
                          key={product.id}
                          className={`bg-zinc-900 border rounded-lg p-5 transition-all cursor-pointer group ${
                              !product.stock ? "opacity-50 border-zinc-800" : "border-zinc-800 hover:border-orange-500/50"
                          }`}
                      >
                        {/* Badge */}
                        <div className="flex items-center justify-between mb-3">
                          {product.badge ? (
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                  product.badge === "Promo" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                                      product.badge === "Nouveau" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                          "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                              }`}>
                        {product.badge}
                      </span>
                          ) : <span />}
                          {!product.stock && (
                              <span className="text-xs text-zinc-600 font-semibold">Rupture</span>
                          )}
                        </div>

                        {/* Image */}
                        <div className="bg-zinc-800 rounded h-32 overflow-hidden mb-4">
                          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <p className="text-xs text-zinc-500 mb-1">{product.brand} · {product.category}</p>
                        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-orange-500 transition-colors leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-xs text-zinc-600 mb-4">Réf: {product.ref}</p>

                        {/* Price + CTA */}
                        <div className="flex items-center justify-between">
                          <span className="text-orange-500 font-black text-sm">{formatPrice(product.price)}</span>
                          <button
                              disabled={!product.stock}
                              className="text-xs bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded transition-colors"
                          >
                            {product.stock ? "+ Panier" : "Indispo"}
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}