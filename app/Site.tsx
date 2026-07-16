"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { fullTranslations } from "./i18n";

const bikes = [
  { name: "Veloce R9 — Démo", type: "Superbike", price: "Prix sur demande", power: "Fiche à venir", image: "/bike-1.jpg", badge: "Modèle démo" },
  { name: "Apex RR — Démo", type: "Sport", price: "Prix sur demande", power: "Fiche à venir", image: "/bike-2.jpg", badge: "Modèle démo" },
  { name: "Nomad 900 — Démo", type: "Roadster", price: "Prix sur demande", power: "Fiche à venir", image: "/bike-3.jpg", badge: "Modèle démo" },
  { name: "Atlas X — Démo", type: "Aventure", price: "Prix sur demande", power: "Fiche à venir", image: "/ride-1.jpg", badge: "Modèle démo" },
  { name: "Raven 750 — Démo", type: "Néo-rétro", price: "Prix sur demande", power: "Fiche à venir", image: "/ride-2.jpg", badge: "Modèle démo" },
  { name: "Circuit RS — Démo", type: "Sport", price: "Prix sur demande", power: "Fiche à venir", image: "/ride-3.jpg", badge: "Modèle démo" },
  { name: "Heritage 1200 — Démo", type: "Classique", price: "Prix sur demande", power: "Fiche à venir", image: "/ride-4.jpg", badge: "Modèle démo" },
  { name: "Nocturne GT — Démo", type: "Grand tourisme", price: "Prix sur demande", power: "Fiche à venir", image: "/ride-5.jpg", badge: "Modèle démo" },
  { name: "Urban S — Démo", type: "Urbain", price: "Prix sur demande", power: "Fiche à venir", image: "/story-1.jpg", badge: "Modèle démo" },
];

const accessories = [
  { name: "Casque Carbon R1 — Démo", price: "Prix à définir", tag: "Protection", image: "/helmet.jpg" },
  { name: "Veste Apex Leather — Démo", price: "Prix à définir", tag: "Équipement", image: "/gear.jpg" },
  { name: "Gants Road Pro — Démo", price: "Prix à définir", tag: "Gants", image: "/gear-2.jpg" },
  { name: "Casque Urban Vision — Démo", price: "Prix à définir", tag: "Casques", image: "/gear-3.jpg" },
  { name: "Pack Adventure — Démo", price: "Prix à définir", tag: "Voyage", image: "/gear-4.jpg" },
  { name: "Protection Halo — Démo", price: "Prix à définir", tag: "Protection", image: "/gear-5.jpg" },
];

const nav = [
  ["Motos", "/motorcycles"], ["Accessoires", "/accessories"], ["La Maison", "/about"], ["Journal", "/blog"], ["Contact", "/contact"],
];
const INSTAGRAM_URL = "https://www.instagram.com/moto_house_kenitra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

function Arrow() { return <span aria-hidden="true">↗</span>; }

type Lang = "fr" | "en" | "ar";
const translations: Record<"en" | "ar", Record<string, string>> = {
  en: {
    "MOTOS": "BIKES", "ACCESSOIRES": "ACCESSORIES", "LA MAISON": "OUR STORY", "JOURNAL": "JOURNAL", "CONTACT": "CONTACT",
    "Motos": "Bikes", "Accessoires": "Accessories", "La Maison": "Our story", "Journal": "Journal", "Contact": "Contact",
    "WhatsApp": "WhatsApp", "L’excellence moto à Kénitra": "Motorcycle excellence in Kenitra", "Ride beyond": "Ride beyond", "limits.": "limits.",
    "Des machines iconiques, choisies pour ceux qui refusent l’ordinaire.": "Iconic machines, selected for those who refuse the ordinary.",
    "Explorer les motos": "Explore motorcycles", "Parler à un expert": "Talk to an expert", "Notre philosophie": "Our philosophy",
    "Plus qu’une moto.": "More than a motorcycle.", "Une extension de vous.": "An extension of you.",
    "Machines d’exception.": "Exceptional machines.", "Voir toute la collection": "View the collection", "Sélection privée": "Private selection",
    "Le service": "Service", "sans compromis.": "without compromise.", "L’expérience House": "The House experience",
    "Conseil sur mesure": "Tailored guidance", "Sélection contrôlée": "Curated selection", "Accompagnement continu": "Ongoing support",
    "Découvrir la maison": "Discover our story", "Années de passion": "Years of passion", "Pilotes accompagnés": "Riders advised",
    "Marques partenaires": "Partner brands", "Note communauté": "Community rating", "Équipement": "Equipment", "Protection.": "Protection.",
    "Tout l’équipement": "All equipment", "Votre prochaine machine": "Your next machine", "Prêt à ressentir": "Ready to feel",
    "la différence ?": "the difference?", "Réserver un essai": "Book a test ride", "Contenu de démonstration": "Demo content",
    "Collection de démonstration": "Demo collection", "Choisissez votre": "Choose your", "caractère.": "character.",
    "Contenu placeholder": "Placeholder content", "Toutes": "All", "Sport": "Sport", "Roadster": "Roadster", "Recommandées": "Recommended",
    "Prix croissant": "Price: low to high", "Prix sur demande": "Price on request", "Fiche à venir": "Specs coming soon", "Modèle démo": "Demo model",
    "Explorer": "Explore", "Visiter": "Visit", "Suivre": "Follow", "Votre prochaine histoire commence ici.": "Your next story starts here.",
    "Parlons de votre moto": "Let’s talk about your motorcycle", "Démarrer la conversation": "Start the conversation"
  },
  ar: {
    "Motos": "الدراجات", "Accessoires": "الإكسسوارات", "La Maison": "قصتنا", "Journal": "المجلة", "Contact": "اتصل بنا",
    "WhatsApp": "واتساب", "L’excellence moto à Kénitra": "التميز في عالم الدراجات بالقنيطرة", "Ride beyond": "قد بلا", "limits.": "حدود.",
    "Des machines iconiques, choisies pour ceux qui refusent l’ordinaire.": "دراجات استثنائية مختارة لمن يرفضون المألوف.",
    "Explorer les motos": "اكتشف الدراجات", "Parler à un expert": "تحدث مع خبير", "Notre philosophie": "فلسفتنا",
    "Plus qu’une moto.": "أكثر من مجرد دراجة.", "Une extension de vous.": "امتداد لشخصيتك.",
    "Machines d’exception.": "دراجات استثنائية.", "Voir toute la collection": "عرض المجموعة", "Sélection privée": "تشكيلة خاصة",
    "Le service": "خدمة", "sans compromis.": "بلا تنازلات.", "L’expérience House": "تجربة موتوس هاوس",
    "Conseil sur mesure": "استشارة مخصصة", "Sélection contrôlée": "اختيار دقيق", "Accompagnement continu": "مواكبة مستمرة",
    "Découvrir la maison": "اكتشف قصتنا", "Années de passion": "سنوات من الشغف", "Pilotes accompagnés": "راكب تمت مواكبته",
    "Marques partenaires": "علامة شريكة", "Note communauté": "تقييم المجتمع", "Équipement": "المعدات", "Protection.": "حماية.",
    "Tout l’équipement": "كل المعدات", "Votre prochaine machine": "دراجتك القادمة", "Prêt à ressentir": "هل أنت مستعد لتشعر",
    "la différence ?": "بالفرق؟", "Réserver un essai": "احجز تجربة قيادة", "Contenu de démonstration": "محتوى تجريبي",
    "Collection de démonstration": "مجموعة تجريبية", "Choisissez votre": "اختر", "caractère.": "شخصيتك.",
    "Contenu placeholder": "محتوى مؤقت", "Toutes": "الكل", "Sport": "رياضية", "Roadster": "رودستر", "Recommandées": "موصى بها",
    "Prix croissant": "السعر: من الأقل", "Prix sur demande": "السعر عند الطلب", "Fiche à venir": "المواصفات قريباً", "Modèle démo": "نموذج تجريبي",
    "Explorer": "استكشف", "Visiter": "زرنا", "Suivre": "تابعنا", "Votre prochaine histoire commence ici.": "قصتك القادمة تبدأ هنا.",
    "Parlons de votre moto": "لنتحدث عن دراجتك", "Démarrer la conversation": "ابدأ المحادثة"
  }
};
const originalTexts = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Record<string, string>>();

function translateValue(source: string, lang: Lang) {
  const direct = lang === "fr" ? source : fullTranslations[lang]?.[source];
  if (direct) return direct;
  if (lang !== "fr" && source.startsWith("Ajouter ") && source.endsWith(" aux favoris")) {
    const name = source.slice(8, -12);
    const translatedName = name.endsWith(" — Démo") ? `${name.slice(0, -7)} — ${lang === "en" ? "Demo" : "تجريبي"}` : name;
    return lang === "en" ? `Add ${translatedName} to favourites` : `أضف ${translatedName} إلى المفضلة`;
  }
  if (lang !== "fr" && source.startsWith("Retirer ") && source.endsWith(" des favoris")) {
    const name = source.slice(8, -13);
    const translatedName = name.endsWith(" — Démo") ? `${name.slice(0, -7)} — ${lang === "en" ? "Demo" : "تجريبي"}` : name;
    return lang === "en" ? `Remove ${translatedName} from favourites` : `أزل ${translatedName} من المفضلة`;
  }
  if (lang !== "fr" && source.startsWith("Demander des informations sur ")) {
    const name = source.slice(30);
    const translatedName = name.endsWith(" — Démo") ? `${name.slice(0, -7)} — ${lang === "en" ? "Demo" : "تجريبي"}` : name;
    return lang === "en" ? `Ask for information about ${translatedName}` : `اطلب معلومات عن ${translatedName}`;
  }
  if (lang !== "fr" && source.startsWith("Voir ")) return lang === "en" ? `View ${source.slice(5)}` : `عرض ${source.slice(5)}`;
  if (lang !== "fr" && source.endsWith(" — Démo")) return `${source.slice(0, -7)} — ${lang === "en" ? "Demo" : "تجريبي"}`;
  if (lang !== "fr" && source.endsWith(" · Démonstration")) {
    const category = source.slice(0, -16);
    return `${fullTranslations[lang]?.[category] || category} · ${lang === "en" ? "Demo" : "تجريبي"}`;
  }
  return source;
}

function currentTranslation(source: string) {
  if (typeof document === "undefined") return source;
  const lang = (["fr", "en", "ar"].includes(document.documentElement.lang) ? document.documentElement.lang : "fr") as Lang;
  return translateValue(source, lang);
}

function LanguageSwitcher({ page }: { page: string }) {
  const [lang, setLang] = useState<Lang>("fr");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("mh-language") as Lang | null;
    if (saved && ["fr", "en", "ar"].includes(saved)) setLang(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("mh-language", lang);
    document.title = lang === "fr" ? "Motos House Kenitra — Machines d’exception" : lang === "en" ? "Motos House Kenitra — Exceptional motorcycles" : "موتوس هاوس القنيطرة — دراجات استثنائية";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = lang === "fr" ? "Motos premium, équipement et accompagnement personnalisé à Kénitra, Maroc." : lang === "en" ? "Premium motorcycles, equipment and personal guidance in Kenitra, Morocco." : "دراجات راقية وتجهيزات واستشارة شخصية في القنيطرة، المغرب.";
    const nodes = document.querySelectorAll<HTMLElement>("[data-fr]");
    nodes.forEach(el => { const source = el.dataset.fr || ""; el.textContent = translateValue(source, lang); });
    const walker = document.createTreeWalker(document.body, window.NodeFilter.SHOW_TEXT);
    const texts: Text[] = []; let node: Node | null;
    while ((node = walker.nextNode())) if (node.parentElement && !node.parentElement.closest(".language-switcher") && node.textContent?.trim()) texts.push(node as Text);
    texts.forEach(text => {
      const parent = text.parentElement; if (!parent) return;
      const current = text.textContent?.trim() || "";
      const original = originalTexts.get(text) || current;
      if (!originalTexts.has(text)) originalTexts.set(text, original);
      const translated = translateValue(original, lang);
      text.textContent = (text.textContent || "").replace(current, translated);
    });
    document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title], img[alt]").forEach(el => {
      const attrs = ["placeholder", "aria-label", "title", "alt"];
      let originals = originalAttributes.get(el);
      if (!originals) { originals = {}; originalAttributes.set(el, originals); }
      attrs.forEach(attr => {
        const value = el.getAttribute(attr); if (!value) return;
        if (!originals![attr]) originals![attr] = value;
        const source = originals![attr];
        el.setAttribute(attr, translateValue(source, lang));
      });
    });
  }, [lang, page]);
  const choose = (next: Lang) => { setLang(next); setOpen(false); };
  return <div className="language-switcher"><button className="language-current" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Choisir la langue"><span>◎</span>{lang.toUpperCase()}<i>⌃</i></button>{open&&<div className="language-list" role="menu"><button onClick={()=>choose("fr")} className={lang==="fr"?"active":""}>Français <span>FR</span></button><button onClick={()=>choose("en")} className={lang==="en"?"active":""}>English <span>EN</span></button><button onClick={()=>choose("ar")} className={lang==="ar"?"active":""}>العربية <span>AR</span></button></div>}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="nav-wrap">
    <Link href="/" className="brand" aria-label="Motos House Kenitra — Accueil"><span className="brand-mark">MH</span><span>MOTOS HOUSE<small>KENITRA</small></span></Link>
    <nav className={open ? "nav-links open" : "nav-links"} aria-label="Navigation principale">
      {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <a className="nav-cta" href="https://wa.me/212617697277?text=Bonjour%20Motos%20House%2C%20je%20souhaite%20obtenir%20plus%20d%E2%80%99informations." target="_blank" rel="noreferrer">WhatsApp <Arrow /></a>
    <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu"><i/><i/></button>
  </header>;
}

function Footer() {
  return <footer>
    <div className="footer-lead"><p>Votre prochaine histoire commence ici.</p><a href="https://wa.me/212617697277?text=Bonjour%20Motos%20House%2C%20je%20souhaite%20obtenir%20plus%20d%E2%80%99informations." target="_blank" rel="noreferrer">Parlons de votre moto <Arrow /></a></div>
    <div className="footer-grid"><div><Link href="/" className="brand"><span className="brand-mark">MH</span><span>MOTOS HOUSE<small>KENITRA</small></span></Link><p>Machines d’exception. Conseil humain.<br/>L’excellence moto à Kénitra.</p></div><div><b>Explorer</b>{nav.map(([l,h])=><Link key={h} href={h}>{l}</Link>)}</div><div><b>Visiter</b><p>Quartier Maamora<br/>Kénitra, Maroc</p><p>Lun—Sam · 09:00—19:00</p></div><div><b>Suivre</b><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram · @moto_house_kenitra</a><a href="https://wa.me/212617697277" target="_blank" rel="noreferrer">WhatsApp · +212 617 697 277</a></div></div>
    <div className="footer-bottom"><span>© 2026 Motos House Kenitra</span><Link href="/privacy">Confidentialité</Link><Link href="/terms">Conditions</Link><span>Contenu de démonstration</span></div>
  </footer>;
}

function BikeCard({ bike, index }: { bike: typeof bikes[number], index: number }) {
  const [favorite, setFavorite] = useState(false);
  const favoriteLabel = `${favorite ? "Retirer" : "Ajouter"} ${bike.name} ${favorite ? "des" : "aux"} favoris`;
  return <article className="bike-card"><div className="bike-image"><img src={bike.image} alt={bike.name}/><span className="num">0{index + 1}</span><span className="badge">{bike.badge}</span><button key={favorite ? "saved" : "unsaved"} type="button" className={`heart${favorite ? " active" : ""}`} aria-label={currentTranslation(favoriteLabel)} aria-pressed={favorite} onClick={()=>setFavorite(!favorite)}>{favorite ? "♥" : "♡"}</button></div><div className="bike-info"><div><p>{bike.type} · {bike.power}</p><h3>{bike.name}</h3></div><div><p>À partir de</p><strong>{bike.price}</strong></div></div></article>;
}

function Home() {
  return <>
    <section className="hero">
      <img className="hero-bg" src="/hero.jpg" alt="Moto sportive premium dans un décor sombre"/>
      <div className="hero-shade"/><div className="hero-grain"/>
      <div className="hero-copy"><span className="eyebrow"><i/> L’excellence moto à Kénitra</span><h1>Repoussez<br/><em>les limites.</em></h1><p>Des machines iconiques, choisies pour ceux qui refusent l’ordinaire.</p><div className="hero-actions"><Link className="btn red" href="/motorcycles">Explorer les motos <Arrow /></Link><a className="btn glass" href="https://wa.me/212617697277?text=Bonjour%20Motos%20House%2C%20je%20souhaite%20obtenir%20plus%20d%E2%80%99informations." target="_blank" rel="noreferrer">Parler à un expert</a></div></div>
      <div className="hero-meta"><span>34°15′ N<br/>KÉNITRA, MA</span><span>DÉFILER POUR DÉCOUVRIR<br/><i className="scroll-line"/></span></div>
    </section>

    <section className="manifesto"><div className="section-kicker">01 — Notre philosophie</div><div><h2>Plus qu’une moto.<br/><span>Une extension de vous.</span></h2><p>Chez Motos House, chaque machine est sélectionnée pour sa présence, son caractère et la sensation qu’elle procure avant même de démarrer.</p></div></section>

    <section className="showcase"><div className="section-head"><div><span className="section-kicker">02 — Sélection privée</span><h2>Machines<br/>d’exception.</h2></div><Link href="/motorcycles" className="text-link">Voir toute la collection <Arrow /></Link></div><div className="bike-grid">{bikes.slice(0,3).map((b,i)=><BikeCard key={b.name} bike={b} index={i}/>)}</div></section>

    <section className="experience"><div className="experience-image"><img src="/showroom.jpg" alt="Showroom de motos premium"/><div className="red-block"><span>Depuis</span><strong>2018</strong><p>À Kénitra</p></div></div><div className="experience-copy"><span className="section-kicker">03 — L’expérience House</span><h2>Le service<br/>sans compromis.</h2><p>De la première conversation à la livraison, notre équipe transforme votre recherche en une expérience fluide, personnelle et mémorable.</p><ul><li><b>01</b><span>Conseil sur mesure<small>Une recommandation guidée par votre usage et vos envies.</small></span></li><li><b>02</b><span>Sélection contrôlée<small>Chaque machine est inspectée selon nos standards.</small></span></li><li><b>03</b><span>Accompagnement continu<small>Atelier, équipement et suivi après livraison.</small></span></li></ul><Link className="text-link" href="/about">Découvrir la maison <Arrow /></Link></div></section>

    <section className="numbers"><div><strong>7+</strong><span>Années de passion</span></div><div><strong>480</strong><span>Pilotes accompagnés</span></div><div><strong>18</strong><span>Marques partenaires</span></div><div><strong>4.9</strong><span>Note communauté</span></div></section>

    <section className="gear"><div className="section-head"><div><span className="section-kicker">04 — Équipement</span><h2>Protection.<br/>Sans compromis.</h2></div><Link href="/accessories" className="text-link">Tout l’équipement <Arrow /></Link></div><div className="gear-grid">{accessories.slice(0,4).map((a,i)=><article key={a.name}><div><img src={a.image} alt={a.name}/><span>0{i+1}</span></div><p>{a.tag}</p><h3>{a.name}</h3><strong>{a.price}</strong></article>)}</div></section>

    <section className="instagram-showcase"><div className="instagram-head"><div><span className="section-kicker">05 — Instagram</span><h2>La vie<br/>Motos House.</h2><p>Nouvelles arrivées, détails d’équipement, coulisses du showroom et moments de route depuis Kénitra.</p></div><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="instagram-link"><span>Suivre sur Instagram</span><b>@moto_house_kenitra</b><Arrow/></a></div><div className="instagram-grid"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src="/ride-4.jpg" alt="Portrait moto Motos House sur Instagram"/></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src="/bike-1.jpg" alt="Moto sportive Motos House sur Instagram"/></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src="/gear-2.jpg" alt="Équipement pilote Motos House sur Instagram"/></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src="/story-1.jpg" alt="Sortie moto Motos House sur Instagram"/></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src="/bike-3.jpg" alt="Détail roadster Motos House sur Instagram"/></a></div></section>

    <section className="quote"><span className="quote-mark">“</span><blockquote>La route ne demande pas où vous allez.<br/>Elle révèle <em>qui vous êtes.</em></blockquote><p>— La philosophie Motos House</p></section>

    <section className="cta"><img src="/bike-2.jpg" alt="Moto sportive prête pour un essai"/><div/><article><span className="section-kicker">Votre prochaine machine</span><h2>Prêt à ressentir<br/>la différence ?</h2><p>Réservez un essai privé à Kénitra. Une machine, une route, votre décision.</p><a className="btn red" href="https://wa.me/212617697277?text=Bonjour%20Motos%20House%2C%20je%20souhaite%20r%C3%A9server%20un%20essai." target="_blank" rel="noreferrer">Réserver un essai <Arrow /></a></article></section>
  </>;
}

function Motorcycles() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [sort, setSort] = useState("recommended");
  const filtered = useMemo(()=>{
    const normalizedQuery = query.trim().toLowerCase();
    const list = bikes.filter(b =>
      (!normalizedQuery || `${b.name} ${b.type}`.toLowerCase().includes(normalizedQuery)) &&
      (category === "Toutes" || b.type === category)
    );
    return sort === "name" ? [...list].sort((a,b)=>a.name.localeCompare(b.name, "fr")) : list;
  },[query, category, sort]);
  return <main className="inner collection-page">
    <div className="inner-hero"><span className="section-kicker">Collection de démonstration</span><h1>Choisissez votre<br/><em>caractère.</em></h1><p>Sport, roadster ou grand tourisme — trouvez la machine qui partage votre vision de la route.</p><div className="demo-note"><b>Contenu placeholder</b><span>Les modèles, caractéristiques, prix et disponibilités seront remplacés par le catalogue réel de Motos House.</span></div></div>
    <div className="category-strip"><div><b>SPORT</b><span>Précision & adrénaline</span></div><div><b>ROADSTER</b><span>Caractère au quotidien</span></div><div><b>AVENTURE</b><span>Plus loin, toujours</span></div><div><b>CLASSIQUE</b><span>L’élégance intemporelle</span></div></div>
    <div className="filters"><input aria-label="Rechercher une moto" placeholder="Rechercher un modèle…" value={query} onChange={e=>setQuery(e.target.value)}/>{["Toutes", "Sport", "Roadster"].map(c=><button type="button" key={c} onClick={()=>setCategory(c)} className={category===c?"active":""}>{c}</button>)}<select aria-label="Trier les motos" value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">Recommandées</option><option value="name">Nom A—Z</option></select></div>
    <div className="catalog">{filtered.map((b,i)=><BikeCard key={b.name} bike={b} index={i}/>)}</div>
    <section className="buying-guide"><div><span className="section-kicker">Trouver votre moto</span><h2>Trois questions.<br/>Une évidence.</h2></div><div className="guide-steps"><article><b>01</b><h3>Votre terrain</h3><p>Ville, grands axes, piste ou voyage : nous partons de votre vraie pratique.</p></article><article><b>02</b><h3>Votre sensation</h3><p>Souplesse, couple, précision ou confort : votre plaisir définit la machine.</p></article><article><b>03</b><h3>Votre essai</h3><p>Une sélection ciblée et un essai privé pour confirmer le bon choix.</p></article></div></section>
    <section className="wide-story"><img src="/ride-1.jpg" alt="Pilote sur une route ouverte"/><div><span className="section-kicker">Essai privé</span><h2>La fiche technique informe.<br/>La route décide.</h2><p>Réservez votre session à Kénitra et découvrez la machine dans les conditions qui comptent pour vous.</p><a className="btn red" href="https://wa.me/212617697277?text=Bonjour%20Motos%20House%2C%20je%20souhaite%20r%C3%A9server%20un%20essai." target="_blank" rel="noreferrer">Planifier un essai <Arrow/></a></div></section>
  </main>;
}

function AccessoriesPage() {
  const [active, setActive] = useState("Tous");
  const categories = ["Tous", "Casques", "Vestes", "Gants", "Voyage"];
  const visibleAccessories = useMemo(()=>accessories.filter(a => active === "Tous" || a.tag === active || (active === "Vestes" && a.tag === "Équipement")), [active]);
  return <main className="inner collection-page">
    <div className="inner-hero split-hero"><div><span className="section-kicker">Équipement premium</span><h1>Roulez protégé.<br/><em>Restez vous-même.</em></h1><p>Des pièces choisies pour leur sécurité, leur confort et leur présence. Chaque produit présenté est un exemple de démonstration.</p></div><img src="/gear-3.jpg" alt="Pilote portant un casque premium"/></div>
    <div className="accessory-nav">{categories.map(c=><button key={c} onClick={()=>setActive(c)} className={active===c?"active":""}>{c}</button>)}</div>
    <div className="gear-grid product-grid">{visibleAccessories.map((a,i)=><article key={a.name}><div><img src={a.image} alt={a.name}/><span>0{i+1}</span><a className="shop-plus" aria-label={currentTranslation(`Demander des informations sur ${a.name}`)} href="https://wa.me/212617697277" onClick={event=>{event.preventDefault();const lang=document.documentElement.lang;const product=currentTranslation(a.name);const text=lang==="ar"?`مرحباً موتوس هاوس، أريد معلومات عن ${product}.`:lang==="en"?`Hello Motos House, I would like information about ${product}.`:`Bonjour Motos House, je souhaite des informations sur ${product}.`;window.open(`https://wa.me/212617697277?text=${encodeURIComponent(text)}`,"_blank","noopener,noreferrer")}} target="_blank" rel="noreferrer">+</a></div><p>{a.tag} · Démonstration</p><h3>{a.name}</h3><strong>{a.price}</strong></article>)}</div>
    <section className="editorial-banner"><img src="/gear-2.jpg" alt="Gants et casque de moto"/><div><span className="section-kicker">Le bon équipement</span><h2>Confiance à chaque kilomètre.</h2><p>Notre équipe vous aide à choisir la bonne taille, le niveau de protection et les matières adaptées à votre conduite.</p><Link href="/contact" className="text-link">Demander conseil <Arrow/></Link></div></section>
    <section className="service-row"><article><span>01</span><h3>Essayage en boutique</h3><p>Conseil de taille et ajustement personnalisé.</p></article><article><span>02</span><h3>Sélection experte</h3><p>Des références choisies, pas un catalogue infini.</p></article><article><span>03</span><h3>Commande spéciale</h3><p>Nous recherchons la pièce ou la finition précise.</p></article></section>
  </main>;
}

function AboutPage() {
  return <main className="inner story-page">
    <div className="inner-hero"><span className="section-kicker">Motos House Kenitra</span><h1>La passion,<br/><em>avec des standards.</em></h1><p>Une maison indépendante née à Kénitra avec une idée simple : choisir une moto doit être aussi mémorable que la piloter.</p></div>
    <section className="story-collage"><img className="story-main" src="/showroom.jpg" alt="L’univers Motos House"/><img className="story-small" src="/ride-5.jpg" alt="Détail d’une moto classique"/><div className="story-label"><b>KENITRA</b><span>34°15′ N · 06°35′ W</span></div></section>
    <section className="story-intro"><span className="section-kicker">Notre raison d’être</span><div><h2>Nous ne vendons pas<br/>simplement des motos.</h2><p>Nous créons le lien entre une personne, une machine et la route qu’elles vont partager. Cela exige de l’écoute, une vraie culture produit et la volonté de rester présent après la remise des clés.</p></div></section>
    <section className="values-grid"><article><span>01</span><img src="/ride-4.jpg" alt="Portrait d’un passionné de moto"/><h3>Passion lucide</h3><p>L’émotion guide le choix. Notre expertise sécurise la décision.</p></article><article><span>02</span><img src="/bike-3.jpg" alt="Moto roadster en détail"/><h3>Exigence réelle</h3><p>Une sélection courte, inspectée et expliquée avec transparence.</p></article><article><span>03</span><img src="/gear-4.jpg" alt="Pilote équipé sur la route"/><h3>Relation durable</h3><p>Conseil, équipement et suivi : l’histoire continue après l’achat.</p></article></section>
    <section className="timeline"><div><span className="section-kicker">Notre parcours</span><h2>Une maison<br/>en mouvement.</h2></div><ol><li><b>2018</b><span>Naissance de Motos House à Kénitra autour d’une sélection passion.</span></li><li><b>2021</b><span>Développement du conseil personnalisé et de l’équipement pilote.</span></li><li><b>2024</b><span>Plus de 400 pilotes accompagnés dans tout le Maroc.</span></li><li><b>2026</b><span>Une nouvelle expérience digitale, pensée comme notre showroom.</span></li></ol></section>
    <section className="wide-story reverse"><img src="/story-1.jpg" alt="Pilote et moto à la tombée du jour"/><div><span className="section-kicker">Notre vision</span><h2>Faire de chaque départ un moment attendu.</h2><p>Construire à Kénitra une adresse de référence où expertise, style et culture moto se rencontrent.</p><Link href="/contact" className="btn red">Venir nous rencontrer <Arrow/></Link></div></section>
  </main>;
}

const posts = [
  {tag:"GUIDE",title:"Bien choisir sa première grosse cylindrée",date:"12 min",image:"/ride-2.jpg",excerpt:"Position, puissance, poids et usage réel : les critères essentiels pour progresser avec confiance.",url:"https://powersports.honda.com/articles/riding-101/motorcycle-buyers-guide"},
  {tag:"CULTURE",title:"La route côtière idéale au départ de Kénitra",date:"8 min",image:"/ride-1.jpg",excerpt:"Un itinéraire entre Atlantique, longues courbes et haltes choisies pour profiter pleinement de la journée.",url:"https://www.lerepairedesmotards.com/voyages/maroc/route-cotiere-tanger-agadir.php"},
  {tag:"ÉQUIPEMENT",title:"Casque intégral : les détails qui changent tout",date:"6 min",image:"/gear-3.jpg",excerpt:"Homologation, ventilation, champ de vision et ajustement : notre guide pour une protection vraiment adaptée.",url:"https://sharp.dft.gov.uk/get-the-right-fit/"},
  {tag:"ATELIER",title:"Préparer sa moto avant un long trajet",date:"9 min",image:"/bike-3.jpg",excerpt:"Pression, transmission, niveaux et bagagerie : la vérification complète avant de prendre la route.",url:"https://www.revzilla.com/common-tread/motorcycle-pre-ride-checklist"},
  {tag:"SÉCURITÉ",title:"Les fondamentaux pour rouler en sécurité",date:"5 min",image:"/story-1.jpg",excerpt:"Visibilité, équipement, anticipation et contrôle : les principes essentiels à garder en tête à chaque sortie.",url:"https://www.nhtsa.gov/road-safety/motorcycles"},
  {tag:"TECHNIQUE",title:"Comprendre les modes de conduite modernes",date:"10 min",image:"/bike-2.jpg",excerpt:"Rain, Road, Sport ou Track : comment l’électronique transforme réellement le comportement de la moto.",url:"https://www.bmwmotorcycles.com/en/engineering/detail/safety/riding-modes.html"},
  {tag:"COMPARATIF",title:"Roadster ou sportive : quelle architecture choisir ?",date:"11 min",image:"/ride-3.jpg",excerpt:"Deux philosophies, deux positions et des sensations très différentes pour trouver celle qui vous correspond.",url:"https://powersports.honda.com/articles/tech-corner/supersport-vs-sport-bike-vs-standard"},
  {tag:"ÉQUIPEMENT",title:"Rouler sous la pluie sans perdre le plaisir",date:"7 min",image:"/gear-4.jpg",excerpt:"Visibilité, textiles étanches, adhérence et gestes souples : les bonnes habitudes lorsque la météo change.",url:"https://www.nzta.govt.nz/roadcode/motorcycle-code/about-riding/when-conditions-change/riding-in-bad-weather"},
  {tag:"ENTRETIEN",title:"Chaîne moto : tension, nettoyage et lubrification",date:"8 min",image:"/ride-5.jpg",excerpt:"Un entretien simple mais essentiel pour préserver la transmission, la souplesse et la sécurité.",url:"https://www.revzilla.com/common-tread/how-to-clean-and-lube-a-motorcycle-chain"},
];

function BlogPage() {
  const [subscribed, setSubscribed] = useState(false);
  return <main className="inner journal-page">
    <div className="inner-hero"><span className="section-kicker">Le Journal</span><h1>Culture moto.<br/><em>Routes & récits.</em></h1><p>Guides, nouveautés, équipement et histoires de pilotes — une lecture de la moto par l’équipe Motos House.</p></div>
    <article className="featured-post"><img src="/ride-3.jpg" alt="Pilote en mouvement sur route"/><div><span>À LA UNE · 14 MIN</span><h2>Pourquoi certaines machines restent avec nous.</h2><p>Une moto ne se résume jamais à ses chiffres. Son équilibre, son son et la confiance qu’elle inspire composent une mémoire très personnelle.</p><a href="#articles" className="text-link">Lire l’article <Arrow/></a></div></article>
    <div className="article-grid" id="articles">{posts.map((p,i)=><article key={p.title}><div><img src={p.image} alt={p.title}/><span>0{i+1}</span></div><p>{p.tag} · {p.date}</p><h2>{p.title}</h2><p className="article-excerpt">{p.excerpt}</p><a href={p.url} target="_blank" rel="noreferrer">Lire la source <Arrow/></a></article>)}</div>
    <section className="newsletter"><span className="section-kicker">Notes de route</span><h2>Un email. De temps en temps.<br/>Toujours quelque chose à dire.</h2><form onSubmit={e=>{e.preventDefault();setSubscribed(true)}}><input required type="email" placeholder="Votre adresse email" aria-label="Votre adresse email"/><button type="submit"><span key={subscribed ? "subscribed" : "subscribe"}>{currentTranslation(subscribed ? "Inscrit — merci" : "S’inscrire")}</span> <Arrow/></button></form><small>Actualités, guides et invitations privées. Aucun bruit inutile.</small></section>
  </main>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const sendToWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lang = document.documentElement.lang;
    const labels = lang === "ar"
      ? { intro: "مرحباً موتوس هاوس، أتواصل معكم من الموقع.", name: "الاسم", phone: "الهاتف", request: "الطلب", message: "الرسالة" }
      : lang === "en"
        ? { intro: "Hello Motos House, I am contacting you from the website.", name: "Name", phone: "Phone", request: "Request", message: "Message" }
        : { intro: "Bonjour Motos House, je vous contacte depuis le site.", name: "Nom", phone: "Téléphone", request: "Demande", message: "Message" };
    const message = [
      labels.intro,
      `${labels.name} : ${data.get("name")}`,
      `${labels.phone} : ${data.get("phone")}`,
      `${labels.request} : ${data.get("request")}`,
      `${labels.message} : ${data.get("message")}`,
    ].join("\n");
    window.open(`https://wa.me/212617697277?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };
  return <main className="inner contact-page">
    <div className="inner-hero"><span className="section-kicker">Contact & visite</span><h1>Parlons de votre<br/><em>prochaine machine.</em></h1><p>Une question, une recherche précise ou simplement l’envie de découvrir notre sélection ? Notre équipe vous répond directement.</p></div>
    <section className="contact-layout"><div className="contact-visual"><img src="/showroom.jpg" alt="Showroom Motos House à Kénitra"/><div className="map-card"><span>NOTRE ADRESSE</span><b>Quartier Maamora<br/>Kénitra, Maroc</b><a href="https://maps.google.com/?q=Kenitra+Morocco" target="_blank" rel="noreferrer">Ouvrir dans Maps <Arrow/></a></div></div><form className="contact-form" onSubmit={sendToWhatsApp}><span className="section-kicker">Écrivez-nous</span><h2>Comment pouvons-nous vous aider ?</h2><label>Nom complet<input required name="name" placeholder="Votre nom"/></label><label>Téléphone<input required name="phone" type="tel" placeholder="+212 6…"/></label><label>Votre demande<select name="request"><option>Découvrir une moto</option><option>Réserver un essai</option><option>Accessoires & équipement</option><option>Autre demande</option></select></label><label>Message<textarea required name="message" rows={5} placeholder="Parlez-nous de votre recherche…"/></label><button className="btn red" type="submit"><span key={sent ? "sent" : "send"}>{currentTranslation(sent?"WhatsApp ouvert — merci":"Envoyer sur WhatsApp")}</span> <Arrow/></button><p>Votre message est préparé et ouvert dans WhatsApp avant envoi.</p></form></section>
    <section className="contact-cards"><article><span>01</span><h3>WhatsApp direct</h3><p>+212 617 697 277</p><a href="https://wa.me/212617697277" target="_blank" rel="noreferrer">Démarrer la conversation <Arrow/></a></article><article><span>02</span><h3>Horaires</h3><p>Lundi — Samedi<br/>09:00 — 19:00</p></article><article><span>03</span><h3>Instagram officiel</h3><p>@moto_house_kenitra<br/>Actualités, motos et coulisses</p><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Voir le profil <Arrow/></a></article></section>
    <section className="visit-gallery"><img src="/bike-1.jpg" alt="Moto sportive en exposition"/><img src="/gear-5.jpg" alt="Détail d’équipement moto"/><img src="/ride-4.jpg" alt="Culture moto Motos House"/></section>
  </main>;
}

function Generic({ type }: { type: string }) {
  const content: Record<string, {k:string,title:string,sub:string}> = {
    accessories:{k:"Équipement premium",title:"Roulez protégé.\nRestez vous-même.",sub:"Casques, vestes et protections sélectionnés pour leur technologie, leur confort et leur ligne."},
    about:{k:"Motos House Kenitra",title:"La passion,\navec des standards.",sub:"Une maison indépendante née d’une conviction : l’achat d’une moto mérite une expérience aussi forte que la route."},
    contact:{k:"Contact & visite",title:"Parlons de votre\nprochaine machine.",sub:"Notre équipe vous accueille à Kénitra du lundi au samedi, de 09:00 à 19:00."},
    blog:{k:"Le Journal",title:"Culture moto.\nRoutes & récits.",sub:"Conseils, nouveautés et histoires de pilotes — par l’équipe Motos House."},
    faq:{k:"Questions fréquentes",title:"Tout ce qu’il faut\nsavoir.",sub:"Financement, livraison, reprise et entretien : nos réponses en toute transparence."},
    privacy:{k:"Informations légales",title:"Politique de\nconfidentialité.",sub:"Nous protégeons vos informations et les utilisons uniquement pour répondre à vos demandes."},
    terms:{k:"Informations légales",title:"Conditions\nd’utilisation.",sub:"Les prix, disponibilités et informations affichés sur ce site de démonstration sont indicatifs."}
  };
  const c=content[type]||content.faq;
  return <main className="inner generic"><div className="inner-hero"><span className="section-kicker">{c.k}</span><h1>{c.title.split("\n").map((x,i)=><span key={x}>{x}{i===0&&<br/>}</span>)}</h1><p>{c.sub}</p></div>{type==="accessories"?<div className="gear-grid">{accessories.map((a,i)=><article key={a.name}><div><img src={a.image} alt={a.name}/><span>0{i+1}</span></div><p>{a.tag}</p><h3>{a.name}</h3><strong>{a.price}</strong></article>)}</div>:<div className="info-panels"><article><span>01</span><h2>{type==="contact"?"Kénitra, Maroc":"Une approche personnelle"}</h2><p>{type==="contact"?"Quartier Maamora · Lun—Sam, 09:00—19:00":"Nous prenons le temps de comprendre votre usage, votre niveau et ce que vous attendez vraiment d’une machine."}</p></article><article><span>02</span><h2>{type==="contact"?"WhatsApp direct":"L’exigence d’abord"}</h2><p>{type==="contact"?"Écrivez-nous pour connaître les disponibilités ou réserver votre essai privé.":"Sélection, transparence et accompagnement : aucun détail n’est secondaire."}</p><a className="text-link" href="https://wa.me/212617697277?text=Bonjour%20Motos%20House%2C%20je%20souhaite%20obtenir%20plus%20d%E2%80%99informations." target="_blank" rel="noreferrer">Démarrer la conversation <Arrow/></a></article></div>}</main>;
}

export default function Site({ page="home" }: { page?: string }) {
  const content = page === "home" ? <Home/> : page === "motorcycles" ? <Motorcycles/> : page === "accessories" ? <AccessoriesPage/> : page === "about" ? <AboutPage/> : page === "blog" ? <BlogPage/> : page === "contact" ? <ContactPage/> : <Generic type={page}/>;
  return <><Header/>{content}<Footer/><LanguageSwitcher page={page}/></>;
}
