import { useState } from "react";

import plaquetteImg from "../assets/plaquetteDeFrein.jpg";
import disqueImg from "../assets/Disque_de_frein_perfor-.jpg";
import filtreHuileImg from "../assets/Filtre_-_huile_universel.jpg";
import rotuleImg from "../assets/rotule-direction-premium-mgb.jpg";
import {Link} from "react-router-dom";

const product = {
  id: 1,
  name: "Plaquettes de frein avant",
  brand: "Bosch",
  category: "Freinage",
  ref: "BP-2024-F",
  price: 24500,
  oldPrice: 29000,
  stock: 7,
  badge: "Populaire",
  rating: 4.5,
  reviews: 23,
  img: plaquetteImg,
  description:
      "Plaquettes de frein avant haute performance conçues pour une durabilité maximale et une puissance de freinage optimale. Compatibles avec la majorité des véhicules européens et asiatiques. Matériau semi-métallique pour une dissipation thermique efficace.",
  specs: [
    { label: "Marque", value: "Bosch" },
    { label: "Référence", value: "BP-2024-F" },
    { label: "Matériau", value: "Semi-métallique" },
    { label: "Position", value: "Avant" },
    { label: "Épaisseur", value: "17 mm" },
    { label: "Garantie", value: "12 mois" },
    { label: "Compatibilité", value: "Toyota, Peugeot, Renault, VW" },
    { label: "Poids", value: "0.85 kg" },
  ],
};

const relatedProducts = [
  { id: 2, name: "Disque de frein perforé", brand: "Brembo", price: 62000, ref: "DF-BR-P", img: disqueImg },
  { id: 3, name: "Filtre à huile universel", brand: "Mann Filter", price: 8900, ref: "FH-MAN-07", img: filtreHuileImg },
  { id: 4, name: "Rotule de direction", brand: "TRW", price: 15000, ref: "RD-TRW-1", img: rotuleImg },
];

function formatPrice(price: number) {
  return price.toLocaleString("fr-FR") + " FCFA";
}

function StarRating({ rating }: { rating: number }) {
  return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                className={`text-sm ${star <= Math.floor(rating) ? "text-orange-500" : star - 0.5 <= rating ? "text-orange-300" : "text-zinc-700"}`}
            >
          ★
        </span>
        ))}
      </div>
  );
}

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs">("description");
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans">

        {/* NAVBAR */}
        <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-orange-500 text-2xl font-black">MECA</span>
              <span className="text-white text-2xl font-black">PARTS</span>
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
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Catalogue</span>
            <span className="mx-2">/</span>
            <span className="hover:text-orange-500 cursor-pointer transition-colors">{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name}</span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16">

          {/* PRODUCT MAIN SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

            {/* LEFT — Image */}
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl h-80 overflow-hidden relative">
                {product.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-orange-500/10 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/20">
                  {product.badge}
                </span>
                )}
                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`bg-zinc-900 border rounded-lg h-16 overflow-hidden cursor-pointer transition-colors ${
                            i === 1 ? "border-orange-500" : "border-zinc-800 hover:border-zinc-600"
                        }`}
                    >
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Info */}
            <div>
              <p className="text-xs text-zinc-500 mb-1">{product.brand} · Réf: {product.ref}</p>
              <h1 className="text-3xl font-black mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm text-zinc-400">{product.rating}/5</span>
                <span className="text-xs text-zinc-600">({product.reviews} avis)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-orange-500">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                    <span className="text-sm text-zinc-500 line-through">{formatPrice(product.oldPrice)}</span>
                )}
              </div>
              {product.oldPrice && (
                  <span className="inline-block bg-green-500/10 text-green-400 text-xs font-semibold px-2 py-1 rounded border border-green-500/20 mb-4">
                Économie : {formatPrice(product.oldPrice - product.price)}
              </span>
              )}

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm text-zinc-400">
                {product.stock > 0 ? (
                    <><span className="text-green-400 font-semibold">En stock</span> — {product.stock} unités disponibles</>
                ) : (
                    <span className="text-red-400 font-semibold">Rupture de stock</span>
                )}
              </span>
              </div>

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                  <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                  <button
                      onClick={() => setQty(Math.min(product.stock, qty + 1))}
                      className="w-10 h-10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                        added
                            ? "bg-green-500 text-white"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                    } disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed`}
                >
                  {added ? "✓ Ajouté au panier" : "Ajouter au panier"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🚚", label: "Livraison 24h" },
                  { icon: "🔒", label: "Paiement sécurisé" },
                  { icon: "↩️", label: "Retour 30 jours" },
                ].map((item) => (
                    <div key={item.label} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-lg block mb-1">{item.icon}</span>
                      <span className="text-xs text-zinc-400">{item.label}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* TABS — Description / Specs */}
          <div className="mb-16">
            <div className="flex border-b border-zinc-800 mb-6">
              {(["description", "specs"] as const).map((tab) => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-semibold capitalize transition-colors ${
                          activeTab === tab
                              ? "text-orange-500 border-b-2 border-orange-500"
                              : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    {tab === "description" ? "Description" : "Caractéristiques"}
                  </button>
              ))}
            </div>

            {activeTab === "description" ? (
                <p className="text-zinc-400 leading-relaxed max-w-2xl">{product.description}</p>
            ) : (
                <div className="max-w-xl">
                  {product.specs.map((spec, i) => (
                      <div
                          key={spec.label}
                          className={`flex py-3 text-sm ${i !== product.specs.length - 1 ? "border-b border-zinc-800" : ""}`}
                      >
                        <span className="w-40 text-zinc-500 shrink-0">{spec.label}</span>
                        <span className="text-white font-medium">{spec.value}</span>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* RELATED PRODUCTS */}
          <div>
            <h2 className="text-xl font-black mb-6">Produits associés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((p) => (
                  <div
                      key={p.id}
                      className="bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 rounded-lg p-5 cursor-pointer transition-all group"
                  >
                    <div className="bg-zinc-800 rounded h-24 overflow-hidden mb-4">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-zinc-500 mb-1">{p.brand}</p>
                    <h3 className="text-sm font-semibold text-white group-hover:text-orange-500 transition-colors mb-1">{p.name}</h3>
                    <p className="text-xs text-zinc-600 mb-3">Réf: {p.ref}</p>
                    <span className="text-orange-500 font-black text-sm">{formatPrice(p.price)}</span>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}