class ParketLoader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="parket-global-loader" style="position: fixed; inset: 0; background: #000; z-index: 10000; display: flex; align-items: center; justify-content: center; transition: opacity 0.6s cubic-bezier(.22,.61,.36,1); pointer-events: none;">
        <h1 style="font-family: 'Inter', sans-serif; font-size: 1.5rem; letter-spacing: 0.5em; text-transform: uppercase; color: #fff; font-weight: 200; animation: pulse 2s infinite ease-in-out;">
          Parket
        </h1>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
        }
      </style>
    `;
    
    window.addEventListener('load', () => {
      const loader = document.getElementById('parket-global-loader');
      if (loader) {
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => loader.remove(), 1000);
        }, 500); // 500ms delay to ensure heavy scripts and images have started downloading visually
      }
    });
  }
}

const PARKET_PAGES = [
  { cat: 'Catálogo', name: 'Catálogo', url: 'catalogo.html' },
  { cat: 'Decks', name: 'Decks', url: 'decks.html', tags: 'deck' },
  { cat: 'Decks', name: 'Brazil', url: 'decks-brazil.html', tags: 'deck cumaru ipe ipê garapa massaranduba itauba peroba tauari jatobá' },
  { cat: 'Decks', name: 'EuroDeck', url: 'decks-eurodeck.html', tags: 'deck eurodeck carvalho europeu pinho' },
  { cat: 'Decks', name: 'Kebony', url: 'decks-kebony.html', tags: 'deck kebony clear character noruega' },
  { cat: 'Decks', name: 'Únicos', url: 'decks-unicos.html', tags: 'deck unicos únicos exóticas raras' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Naturalle', url: 'pisos-carvalhos.html', tags: 'carvalho europeu naturalle' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Mont Blanc', url: 'pisos-carvalhos.html', tags: 'carvalho europeu mont blanc' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Smoke', url: 'pisos-carvalhos.html', tags: 'carvalho europeu smoke' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Armani', url: 'pisos-carvalhos.html', tags: 'carvalho europeu armani' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Wild Grey', url: 'pisos-carvalhos.html', tags: 'carvalho europeu wild grey' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Nevado', url: 'pisos-carvalhos.html', tags: 'carvalho europeu nevado' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Batman', url: 'pisos-carvalhos.html', tags: 'carvalho europeu batman' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Cappuccino', url: 'pisos-carvalhos.html', tags: 'carvalho europeu cappuccino capuccino' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Light Brown', url: 'pisos-carvalhos.html', tags: 'carvalho europeu light brown' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Marrone', url: 'pisos-carvalhos.html', tags: 'carvalho europeu marrone' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Milano', url: 'pisos-carvalhos.html', tags: 'carvalho europeu milano' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu All Black', url: 'pisos-carvalhos.html', tags: 'carvalho europeu all black' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Grigio Negro', url: 'pisos-carvalhos.html', tags: 'carvalho europeu grigio negro' },
  { cat: 'Pisos › Carvalhos', name: 'Carvalho Europeu Giz', url: 'pisos-carvalhos.html', tags: 'carvalho europeu giz' },
  { cat: 'Pisos › Grandiosos', name: 'Carvalho Europeu', url: 'pisos-grandiosos.html', tags: 'carvalho europeu grandioso' },
  { cat: 'Pisos › Wood + Mármore', name: 'Carvalho Europeu + Mármore', url: 'pisos-listone-giordano.html', tags: 'carvalho europeu travertino navona carrara nero marquina quartizitos' },
  { cat: 'Pisos › Clássicos', name: 'Chevron em Carvalho Europeu', url: 'pisos-classicos.html', tags: 'carvalho europeu chevron mont blanc batman naturalle' },
  { cat: 'Pisos › Clássicos', name: 'Espinha de Peixe em Carvalho Europeu', url: 'pisos-classicos.html', tags: 'carvalho europeu espinha de peixe baby brey' },
  { cat: 'Pisos › Clássicos', name: 'Versalles em Carvalho Europeu', url: 'pisos-classicos.html', tags: 'carvalho europeu versalles versailles' },

  // ─── Pisos › Brazil ───
  { cat: 'Pisos › Brazil', name: 'Cumaru', url: 'pisos.html#brazil', tags: 'piso cumaru brazil' },
  { cat: 'Pisos › Brazil', name: 'Peroba Mica', url: 'pisos.html#brazil', tags: 'piso peroba mica brazil' },
  { cat: 'Pisos › Brazil', name: 'Tauari', url: 'pisos.html#brazil', tags: 'piso tauari brazil' },

  // ─── Pisos › Eternos ───
  { cat: 'Pisos › Eternos', name: 'Bambu Demolição', url: 'pisos.html#eternos', tags: 'piso bambu demolição eternos' },
  { cat: 'Pisos › Eternos', name: 'Canela Demolição', url: 'pisos.html#eternos', tags: 'piso canela demolição eternos' },
  { cat: 'Pisos › Eternos', name: 'Peroba Demolição', url: 'pisos.html#eternos', tags: 'piso peroba demolição eternos' },

  // ─── Pisos › Únicos ───
  { cat: 'Pisos › Únicos', name: 'Pau Ferro', url: 'pisos.html#unicos', tags: 'piso pau ferro únicos unicos' },
  { cat: 'Pisos › Únicos', name: 'Lapacho', url: 'pisos.html#unicos', tags: 'piso lapacho únicos unicos' },
  { cat: 'Pisos › Únicos', name: 'Nogueira', url: 'pisos.html#unicos', tags: 'piso nogueira únicos unicos' },

  // ─── Pisos › Pinho de Riga ───
  { cat: 'Pisos › Pinho de Riga', name: 'Pinho de Riga', url: 'pisos-pinho-de-riga.html', tags: 'piso pinho de riga' },
  { cat: 'Pisos › Grandiosos', name: 'Pinho de Riga Mont Blanc', url: 'pisos.html#grandiosos', tags: 'piso pinho de riga mont blanc grandiosos' },

  // ─── Forros (fotos) ───
  { cat: 'Forros', name: 'Carvalho Europeu', url: 'forros.html', tags: 'forro carvalho europeu' },
  { cat: 'Forros', name: 'Carvalho Europeu Customizado', url: 'forros.html', tags: 'forro carvalho europeu customizado' },
  { cat: 'Forros', name: 'Freijó', url: 'forros.html', tags: 'forro freijó freijo' },
  { cat: 'Forros', name: 'Cumaru', url: 'forros.html', tags: 'forro cumaru' },
  { cat: 'Forros', name: 'Tauari', url: 'forros.html', tags: 'forro tauari' },
  { cat: 'Forros', name: 'Cabreúva Dourada', url: 'forros.html', tags: 'forro cabreúva dourada cabreuva' },
  { cat: 'Forros', name: 'Toblerone de Cabreúva Branca', url: 'forros.html', tags: 'forro toblerone cabreúva branca cabreuva' },

  // ─── Painéis (fotos) ───
  { cat: 'Painéis', name: 'Carvalho Europeu', url: 'paineis.html', tags: 'painel paineis carvalho europeu' },
  { cat: 'Painéis', name: 'Carvalho Europeu Customizado', url: 'paineis.html', tags: 'painel paineis carvalho europeu customizado' },
  { cat: 'Painéis', name: 'Freijó', url: 'paineis.html', tags: 'painel paineis freijó freijo' },
  { cat: 'Painéis', name: 'Freijó Customizado', url: 'paineis.html', tags: 'painel paineis freijó freijo customizado' },
  { cat: 'Painéis', name: 'Peroba do Campo', url: 'paineis.html', tags: 'painel paineis peroba do campo' },
  { cat: 'Painéis', name: 'Cumaru', url: 'paineis.html', tags: 'painel paineis cumaru' },
  { cat: 'Painéis', name: 'Shou Sugi Ban', url: 'paineis.html', tags: 'painel paineis shou sugi ban' },
  { cat: 'Painéis', name: 'Shou Sugi Ban + Freijó', url: 'paineis.html', tags: 'painel paineis shou sugi ban freijó freijo' },

  // ─── Escadas (fotos) ───
  { cat: 'Escadas', name: 'Peroba do Campo', url: 'escadas.html', tags: 'escada peroba do campo' },
  { cat: 'Escadas', name: 'Peroba Demolição', url: 'escadas.html', tags: 'escada peroba demolição' },
  { cat: 'Escadas', name: 'Carvalho Europeu Naturalle', url: 'escadas.html', tags: 'escada carvalho europeu naturalle' },
  { cat: 'Escadas', name: 'Carvalho Europeu Customizado', url: 'escadas.html', tags: 'escada carvalho europeu customizado' },

  // ─── Portas (fotos) ───
  { cat: 'Portas', name: 'Laca Branca', url: 'portas.html', tags: 'porta laca branca' },
  { cat: 'Portas', name: 'Muxarabie em Freijó', url: 'portas.html', tags: 'porta muxarabie freijó freijo' },
  { cat: 'Portas', name: 'Freijó', url: 'portas.html', tags: 'porta freijó freijo' },
  { cat: 'Portas', name: 'Shou Sugi Ban', url: 'portas.html', tags: 'porta shou sugi ban' },
  { cat: 'Escadas', name: 'Escadas', url: 'escadas.html' },
  { cat: 'Fachadas', name: 'Fachadas', url: 'fachadas.html' },
  { cat: 'Forros', name: 'Forros', url: 'forros.html' },
  { cat: 'Painéis', name: 'Painéis', url: 'paineis.html' },
  { cat: 'Pisos', name: 'Pisos', url: 'pisos.html' },
  { cat: 'Pisos', name: 'Brazil', url: 'pisos-brazil.html' },
  { cat: 'Pisos', name: 'Carvalhos', url: 'pisos-carvalhos.html' },
  { cat: 'Pisos', name: 'Clássicos', url: 'pisos-classicos.html' },
  { cat: 'Pisos', name: 'Eternos', url: 'pisos-eternos.html' },
  { cat: 'Pisos', name: 'Grandiosos', url: 'pisos-grandiosos.html' },
  { cat: 'Pisos', name: 'Listone Giordano', url: 'pisos-listone-giordano.html' },
  { cat: 'Pisos', name: 'Pinho de Riga', url: 'pisos-pinho-de-riga.html' },
  { cat: 'Pisos', name: 'Únicos', url: 'pisos-unicos.html' },
  { cat: 'Portas', name: 'Portas', url: 'portas.html' },
  { cat: 'Texturas', name: 'Texturas', url: 'texturas.html' },
  { cat: 'Texturas › Pisos', name: 'Visão geral', url: 'texturas-pisos.html' },
  { cat: 'Texturas › Pisos', name: 'Chevron Naturalle', url: 'texturas-pisos-chevron-naturalle.html' },
  { cat: 'Texturas › Pisos', name: 'Espinha de Peixe Mont Blanc', url: 'texturas-pisos-espinha-de-peixe-mont-blanc.html' },
  { cat: 'Texturas › Pisos', name: 'Piso Verssailes', url: 'texturas-pisos-piso-verssailes.html' },
  { cat: 'Texturas › Pisos', name: 'Reta', url: 'texturas-pisos-reta.html' },
];

function parketNormalize(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Distância de Levenshtein (edição mínima entre duas strings)
function parketLevenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

// Match com tolerância a erros de digitação (fuzzy).
// Para cada token: substring exata OU palavra do texto a até N edições de distância.
function parketFuzzyMatch(query, text) {
  const q = parketNormalize((query || '').trim());
  if (!q) return false;
  const t = parketNormalize(text || '');
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every(token => {
    if (t.includes(token)) return true;
    if (token.length < 3) return false;
    const maxDist = token.length <= 5 ? 1 : 2;
    const words = t.split(/[\s+\-›()/]+/).filter(Boolean);
    return words.some(w => {
      if (Math.abs(w.length - token.length) > maxDist) return false;
      return parketLevenshtein(token, w) <= maxDist;
    });
  });
}

// ── Photo Index (used by busca.html carousel) ──
const PARKET_PHOTOS = (() => {
  const photos = [];
  const expand = (cat, page, srcBuilder, names) => {
    Object.entries(names).forEach(([i, name]) => {
      photos.push({ cat, name, page, src: srcBuilder(i) });
    });
  };

  // Pisos › Brazil (local 01-11)
  expand('Pisos › Brazil', 'pisos.html#brazil',
    i => `pisos/brazil/${String(i).padStart(2,'0')}.webp`,
    { 1:'Cumaru',2:'Cumaru',3:'Peroba Mica',4:'Peroba Mica',5:'Cumaru',6:'Cumaru',7:'Cumaru',8:'Tauari',9:'Tauari',10:'Tauari',11:'Tauari' });

  // Pisos › Eternos (local 01-05)
  expand('Pisos › Eternos', 'pisos.html#eternos',
    i => `pisos/eternos/${String(i).padStart(2,'0')}.webp`,
    { 1:'Bambu Demolição',2:'Canela Demolição',3:'Canela Demolição',4:'Canela Demolição',5:'Canela Demolição' });

  // Pisos › Únicos (local 01-04)
  expand('Pisos › Únicos', 'pisos.html#unicos',
    i => `pisos/unicos/${String(i).padStart(2,'0')}.webp`,
    { 1:'Pau Ferro',2:'Lapacho',3:'Lapacho',4:'Nogueira' });

  // Pisos › Carvalhos (remote 30)
  const carvalhosUrls = [
    'https://parket.com.br/wp-content/uploads/2026/03/4D5A0231-b-1-scaled.jpg',
    'https://parket.com.br/wp-content/uploads/2026/03/27e09f2b-808a-4ecb-b60d-c2702e023383-1.jpg',
    'https://parket.com.br/wp-content/uploads/2026/03/aa120b24-69d4-48d5-b47f-b73099b875ef-2-1.jpg',
    'https://parket.com.br/wp-content/uploads/2026/03/european-oak-capuccino-1.jpeg',
    'https://parket.com.br/wp-content/uploads/2026/03/European-Oak-Giant-1.jpg',
    'https://parket.com.br/wp-content/uploads/2026/03/Imagem_7-30-1.webp',
    'https://parket.com.br/wp-content/uploads/2026/03/IMG_0150-1-scaled.jpg',
    'https://parket.com.br/wp-content/uploads/2026/03/IMG_6862-1-scaled.jpg',
    'https://parket.com.br/wp-content/uploads/2026/03/IMG_8925-2-1.jpeg',
    'https://parket.com.br/wp-content/uploads/2026/03/IMG_8932-2-1.jpeg',
    'https://parket.com.br/wp-content/uploads/2026/03/oak-flooring-dinesen-victoria-miro-gallery-wide-wooden-floorboards-02-1.jpg',
    'https://parket.com.br/wp-content/uploads/2026/03/sao_paulo_tch1-1.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-01.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-03.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-05.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-06.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-07.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-08.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-09.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-11.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-12.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-13.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-15.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-16.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-18.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-20.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-21.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-22.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-24.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-25.jpg',
  ];
  const carvalhosNames = { 1:'Carvalho Europeu Naturalle',2:'Carvalho Europeu Mont Blanc',3:'Carvalho Europeu Mont Blanc',4:'Carvalho Europeu Cappuccino',5:'Carvalho Europeu Naturalle',6:'Carvalho Europeu Naturalle',7:'Carvalho Europeu Naturalle',8:'Carvalho Europeu Light Brown',9:'Carvalho Europeu Light Brown',10:'Carvalho Europeu Smoke',11:'Carvalho Europeu Naturalle',12:'Carvalho Europeu Marrone',13:'Carvalho Europeu Naturalle',14:'Carvalho Europeu Mont Blanc',15:'Carvalho Europeu Nevado',16:'Carvalho Europeu Batman',17:'Carvalho Europeu Armani',18:'Carvalho Europeu Armani',19:'Carvalho Europeu Smoke',20:'Carvalho Europeu Giz',21:'Carvalho Europeu Wild Grey',22:'Carvalho Europeu Armani',23:'Carvalho Europeu Naturalle',24:'Carvalho Europeu Smoke',25:'Carvalho Europeu Naturalle',26:'Carvalho Europeu Milano',27:'Carvalho Europeu Naturalle',28:'Carvalho Europeu All Black',29:'Carvalho Europeu Nevado',30:'Carvalho Europeu Batman' };
  carvalhosUrls.forEach((src, idx) => {
    photos.push({ cat: 'Pisos › Carvalhos', name: carvalhosNames[idx+1], page: 'pisos.html#carvalhos', src });
  });

  // Pisos › Grandiosos (remote 10)
  const grandUrls = [
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-01.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-05.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-06.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-07.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-08.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-09.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-11.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-12.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-13.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-03.jpg',
  ];
  const grandNames = { 1:'Carvalho Europeu Smoke',2:'Carvalho Europeu Naturalle',3:'Carvalho Europeu Naturalle',4:'Pinho de Riga Mont Blanc',5:'Pinho de Riga Mont Blanc',6:'Pinho de Riga',7:'Pinho de Riga Mont Blanc',8:'Carvalho Europeu Naturalle',9:'Carvalho Europeu Mont Blanc',10:'Pinho de Riga Mont Blanc' };
  grandUrls.forEach((src, idx) => {
    photos.push({ cat: 'Pisos › Grandiosos', name: grandNames[idx+1], page: 'pisos.html#grandiosos', src });
  });

  // Pisos › Pinho de Riga (remote 6)
  const prUrls = [
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-07.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-02.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-03.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-04.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-05.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-06.jpg',
  ];
  prUrls.forEach(src => photos.push({ cat: 'Pisos › Pinho de Riga', name: 'Pinho de Riga', page: 'pisos.html#pinho-de-riga', src }));

  // Pisos › Clássicos (remote 10, ordered)
  const clUrls = [
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-02.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-03.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-05.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-06.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-04.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-07.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-01.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-08.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-09.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-10.jpg',
  ];
  const clNames = { 1:'Espinha de Peixe Baby Brey',2:'Chevron em Carvalho Europeu Batman',3:'Mosaico em Nogueira',4:'Chevron Curve em Nogueira',5:'Chevron em Carvalho Europeu Naturalle',6:'Espinha de Peixe em Carvalho Europeu',7:'Chevron em Carvalho Europeu Mont Blanc',8:'Chevron em Carvalho Europeu Mont Blanc',9:'Versalles em Carvalho Europeu Naturalle',10:'Versalles em Carvalho Europeu Naturalle' };
  clUrls.forEach((src, idx) => {
    photos.push({ cat: 'Pisos › Clássicos', name: clNames[idx+1], page: 'pisos-classicos.html', src });
  });

  // Pisos › Wood + Mármore (remote 7)
  const maUrls = [
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-04.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-05.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-06.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-07.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-09.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-10.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-11.jpg',
  ];
  const maNames = { 1:'Carvalho Europeu Smoke + Travertino Navona',2:'Carvalho Europeu All Black + Carrara',3:'Nogueira + Nero Marquina + Latão',4:'Carvalho Europeu Naturalle + Travertino Navona',5:'Nogueira + Latão',6:'Carvalho Europeu Naturalle + Quartizitos Coloridos',7:'Nogueira + Nero Marquina + Latão' };
  maUrls.forEach((src, idx) => {
    photos.push({ cat: 'Pisos › Wood + Mármore', name: maNames[idx+1], page: 'pisos-listone-giordano.html', src });
  });

  // Forros (remote PRO_FO with NAMES)
  const forrosUrls = [
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-01.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-02.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-03.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-04.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-05.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-06.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-07.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-08.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-09.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-10.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-12.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-13.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-14.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-15.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-16.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-17.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-19.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-20.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-21.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-22.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-23.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-25.jpg',
  ];
  const forrosNames = { 1:'Carvalho Europeu',2:'Freijó',3:'Cumaru',4:'Cumaru',5:'Cumaru',6:'Cumaru',7:'Cumaru',8:'Cumaru',9:'Carvalho Europeu',10:'Carvalho Europeu',11:'Tauari',12:'Cabreúva Dourada',13:'Cabreúva Dourada',14:'Cabreúva Dourada',15:'Cabreúva Dourada',16:'Cabreúva Dourada',17:'Cumaru',18:'Cumaru',19:'Carvalho Europeu Customizado',20:'Toblerone de Cabreúva Branca',21:'Freijó',22:'Cumaru' };
  forrosUrls.forEach((src, idx) => {
    photos.push({ cat: 'Forros', name: forrosNames[idx+1], page: 'forros.html', src });
  });

  // Painéis (remote PRO_PA with NAMES)
  const paineisUrls = [
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-01.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-02.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-03.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-06.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-08.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-09.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-10.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-11.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-12.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-13.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-14.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-15.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-16.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-17.jpg',
    'https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-18.jpg',
  ];
  const paineisNames = { 1:'Carvalho Europeu Customizado',2:'Freijó',3:'Peroba do Campo',4:'Freijó Customizado',5:'Cumaru',6:'Carvalho Europeu',7:'Freijó',8:'Shou Sugi Ban',9:'Carvalho Europeu Customizado',10:'Freijó',11:'Freijó',12:'Cumaru',13:'Shou Sugi Ban',14:'Shou Sugi Ban + Freijó',15:'Carvalho Europeu Customizado' };
  paineisUrls.forEach((src, idx) => {
    photos.push({ cat: 'Painéis', name: paineisNames[idx+1], page: 'paineis.html', src });
  });

  // Escadas
  photos.push(
    { cat: 'Escadas', name: 'Peroba do Campo', page: 'escadas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-03.jpg' },
    { cat: 'Escadas', name: 'Peroba Demolição', page: 'escadas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-05.jpg' },
    { cat: 'Escadas', name: 'Peroba Demolição', page: 'escadas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-07.jpg' },
    { cat: 'Escadas', name: 'Carvalho Europeu Naturalle', page: 'escadas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-09.jpg' },
    { cat: 'Escadas', name: 'Carvalho Europeu Customizado', page: 'escadas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-10.jpg' },
  );

  // Portas
  photos.push(
    { cat: 'Portas', name: 'Laca Branca', page: 'portas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-05.jpg' },
    { cat: 'Portas', name: 'Muxarabie em Freijó', page: 'portas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-06.jpg' },
    { cat: 'Portas', name: 'Freijó', page: 'portas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-09.jpg' },
    { cat: 'Portas', name: 'Shou Sugi Ban', page: 'portas.html', src: 'https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-10.jpg' },
  );

  return photos;
})();

class ParketNav extends HTMLElement {
  connectedCallback() {
    const returnUrl = this.getAttribute('return-url') || 'catalogo.html';
    const returnText = this.getAttribute('return-text') || 'Voltar';
    const category = this.getAttribute('category') || '';

    this.innerHTML = `
      <nav class="fixed top-0 w-full z-50 nav-blur border-b border-white/5">
        <div class="flex justify-between items-center w-full px-6 md:px-12 py-4 md:py-6 max-w-screen-2xl mx-auto gap-4">
          <a href="${returnUrl}" class="flex items-center gap-3 md:gap-4 group min-w-0">
            <span class="material-symbols-outlined text-white/50 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1">arrow_back</span>
            <span class="font-label text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors hidden sm:inline truncate">${returnText}</span>
          </a>
          <div class="flex items-center gap-3 md:gap-5 min-w-0">
            ${category ? `<span class="font-label text-[10px] uppercase tracking-[0.3em] text-white/30 truncate max-w-[160px] md:max-w-[240px] text-right hidden sm:inline">${category}</span>` : ''}
            <label class="parket-nav-search" data-action="open-search">
              <span class="material-symbols-outlined">search</span>
              <input type="text" class="parket-nav-search-input" placeholder="Buscar..." aria-label="Buscar" readonly>
            </label>
          </div>
        </div>
      </nav>
      <div class="parket-search-overlay" data-action="search-overlay" aria-hidden="true">
        <div class="parket-search-panel">
          <div class="parket-search-input-wrap">
            <span class="material-symbols-outlined parket-search-icon">search</span>
            <input type="text" class="parket-search-input" placeholder="Buscar produto, coleção, categoria..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            <button type="button" class="parket-search-close" data-action="close-search" aria-label="Fechar">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="parket-search-results" data-results></div>
        </div>
      </div>
      <style>
        .nav-blur {
          background: rgba(0,0,0,0.6);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
        }
        .parket-search-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .parket-search-btn:hover { background: rgba(255,255,255,0.10); color: #fff; border-color: rgba(255,255,255,0.25); }
        .parket-search-btn .material-symbols-outlined { font-size: 18px; }

        .parket-nav-search {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 36px;
          padding: 0 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.25s ease;
          width: 220px;
          max-width: 30vw;
        }
        .parket-nav-search:hover { background: rgba(255,255,255,0.10); color: #fff; border-color: rgba(255,255,255,0.25); }
        .parket-nav-search .material-symbols-outlined { font-size: 18px; pointer-events: none; }
        .parket-nav-search-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: 0;
          outline: 0;
          color: inherit;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          letter-spacing: 0.05em;
          cursor: pointer;
        }
        .parket-nav-search-input::placeholder { color: rgba(255,255,255,0.45); }
        @media (max-width: 640px) {
          .parket-nav-search { width: auto; padding: 0 10px; }
          .parket-nav-search-input { width: 100px; font-size: 11px; }
        }

        .parket-search-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.85);
          backdrop-filter: saturate(180%) blur(28px);
          -webkit-backdrop-filter: saturate(180%) blur(28px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 14vh 24px 40px;
          overflow-y: auto;
        }
        .parket-search-overlay.is-open { opacity: 1; visibility: visible; }

        .parket-search-panel {
          width: 100%;
          max-width: 720px;
          transform: translateY(-12px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .parket-search-overlay.is-open .parket-search-panel { transform: translateY(0); }

        .parket-search-input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 9999px;
          background: rgba(255,255,255,0.04);
        }
        .parket-search-icon { color: rgba(255,255,255,0.5); font-size: 22px; }
        .parket-search-input {
          flex: 1;
          background: transparent;
          border: 0;
          outline: 0;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.02em;
        }
        .parket-search-input::placeholder { color: rgba(255,255,255,0.35); }
        .parket-search-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          border: 0;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .parket-search-close:hover { background: rgba(255,255,255,0.14); color: #fff; }
        .parket-search-close .material-symbols-outlined { font-size: 18px; }

        .parket-search-results {
          margin-top: 18px;
          display: none;
          flex-direction: column;
        }
        .parket-search-results.has-results { display: flex; }
        .parket-search-input::selection { background: rgba(255,255,255,0.18); color: rgba(255,255,255,0.6); }
        .parket-search-input::-moz-selection { background: rgba(255,255,255,0.18); color: rgba(255,255,255,0.6); }
        .parket-search-result {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 18px;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.2s ease, color 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        .parket-search-result:hover,
        .parket-search-result:focus { background: rgba(255,255,255,0.05); color: #fff; outline: 0; }
        .parket-search-result-name {
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .parket-search-result-cat {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
        }
        .parket-search-empty {
          padding: 24px 18px;
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.02em;
        }
        body.parket-search-locked { overflow: hidden; }
      </style>
    `;

    this._overlay = this.querySelector('[data-action="search-overlay"]');
    this._input   = this.querySelector('.parket-search-input');
    this._results = this.querySelector('[data-results]');

    this.querySelector('[data-action="open-search"]').addEventListener('click', () => this._openSearch());
    this.querySelector('[data-action="close-search"]').addEventListener('click', () => this._closeSearch());
    this._overlay.addEventListener('click', (e) => {
      if (e.target === this._overlay) this._closeSearch();
    });
    let searchDebounceTimer = null;
    this._input.addEventListener('input', (e) => {
      const isDelete = !!(e.inputType && e.inputType.startsWith('delete'));
      const val = e.target.value;
      if (searchDebounceTimer) cancelAnimationFrame(searchDebounceTimer);
      searchDebounceTimer = requestAnimationFrame(() => {
        this._handleType(val, isDelete);
      });
    });
    this._input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this._closeSearch();
      if (e.key === 'Enter') {
        const q = (this._userTyped || this._input.value || '').trim();
        if (q) window.location.href = `busca.html?q=${encodeURIComponent(q)}`;
      }
      // Seta esquerda aceita o autocompletar
      if (e.key === 'ArrowLeft') {
        const inp = this._input;
        if (inp.selectionStart !== inp.selectionEnd) {
          e.preventDefault();
          this._userTyped = inp.value;
          inp.setSelectionRange(inp.value.length, inp.value.length);
        }
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !this._isOpen() && !/^(input|textarea)$/i.test((document.activeElement || {}).tagName || '')) {
        e.preventDefault();
        this._openSearch();
      }
    });

    this._userTyped = '';
  }

  _isOpen() { return this._overlay.classList.contains('is-open'); }

  _findMatch(query) {
    const q = parketNormalize((query || '').trim());
    if (!q) return null;
    const fullText = (p) => parketNormalize(`${p.cat} ${p.name} ${p.tags || ''}`);
    return PARKET_PAGES.find(p => parketNormalize(p.name).startsWith(q))
        || PARKET_PAGES.find(p => parketNormalize(p.name).includes(q))
        || PARKET_PAGES.find(p => {
          const text = fullText(p);
          return q.split(/\s+/).every(token => text.includes(token));
        });
  }

  _handleType(value, isDelete) {
    this._userTyped = value;
    this._renderResults(value);
    if (isDelete || !value) return;
    const match = this._findMatch(value);
    if (!match) return;
    const userN = parketNormalize(value);
    const nameN = parketNormalize(match.name);
    if (nameN.startsWith(userN) && nameN !== userN) {
      const completed = value + match.name.slice(value.length);
      this._input.value = completed;
      this._input.setSelectionRange(value.length, completed.length);
    }
  }

  _findAllMatches(query) {
    if (!query || !query.trim()) return [];
    return PARKET_PAGES.filter(p =>
      parketFuzzyMatch(query, `${p.cat} ${p.name} ${p.tags || ''}`)
    );
  }

  _openSearch() {
    this._overlay.classList.add('is-open');
    this._overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('parket-search-locked');
    setTimeout(() => this._input.focus(), 50);
  }

  _closeSearch() {
    this._overlay.classList.remove('is-open');
    this._overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('parket-search-locked');
    this._input.value = '';
    this._userTyped = '';
    this._results.innerHTML = '';
    this._results.classList.remove('has-results');
  }

  _renderResults(query) {
    if (!query || !query.trim()) {
      this._results.innerHTML = '';
      this._results.classList.remove('has-results');
      return;
    }
    const list = this._findAllMatches(query);
    this._results.classList.add('has-results');
    if (!list.length) {
      this._results.innerHTML = `<div class="parket-search-empty">Nenhum resultado para "${query}".</div>`;
      return;
    }
    this._results.innerHTML = list.map(p => `
      <a class="parket-search-result" href="${p.url}">
        <span class="parket-search-result-name">${p.name}</span>
        <span class="parket-search-result-cat">${p.cat}</span>
      </a>
    `).join('');
  }
}



class ParketSEO extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Parket Catálogo';
    const description = this.getAttribute('description') || 'A evolução do design em madeira. Descubra nossas coleções exclusivas de pisos, decks, painéis, forros e escadas com design e engenharia de ponta.';
    const image = this.getAttribute('image') || 'https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-01.jpg';
    
    // Inject metadata into <head>
    const metaTags = `
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${image}">
      
      <!-- Twitter / X -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:title" content="${title}">
      <meta property="twitter:description" content="${description}">
      <meta property="twitter:image" content="${image}">
    `;
    
    document.head.insertAdjacentHTML('beforeend', metaTags);
  }
}

// ── Global Lightbox Logic (Vanilla CSS) ──
window.addEventListener('load', () => {
  const lbContainer = document.createElement('div');
  lbContainer.innerHTML = `
    <style>
      .carousel-slide { cursor: zoom-in !important; cursor: -webkit-zoom-in !important; }
      #parket-lb-overlay {
        position: fixed; inset: 0; z-index: 999999;
        background: rgba(0,0,0,0.95);
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        display: flex; align-items: center; justify-content: center;
        opacity: 0; visibility: hidden;
        transition: opacity 0.4s ease, visibility 0.4s ease;
      }
      #parket-lb-overlay.lb-active { opacity: 1; visibility: visible; }
      #parket-lb-img {
        max-width: 95vw; max-height: 95vh; object-fit: contain;
        transform: scale(0.9);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); user-select: none;
        cursor: zoom-in; cursor: -webkit-zoom-in;
        transform-origin: center center;
      }
      #parket-lb-overlay.lb-active #parket-lb-img { transform: scale(1); }
      #parket-lb-overlay.lb-active #parket-lb-img.extreme-zoom {
        transform: scale(2.5);
        cursor: zoom-out; cursor: -webkit-zoom-out;
      }
    </style>
    <div id="parket-lb-overlay">
      <img id="parket-lb-img" src="" alt="Zoom detalhe">
    </div>
  `;
  document.body.appendChild(lbContainer);

  const lb = document.getElementById('parket-lb-overlay');
  const img = document.getElementById('parket-lb-img');
  let isZoomed = false;

  function panImage(e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  }

  img.addEventListener('click', (e) => {
    e.stopPropagation();
    isZoomed = !isZoomed;
    if (isZoomed) {
      img.classList.add('extreme-zoom');
      panImage(e);
    } else {
      img.classList.remove('extreme-zoom');
      // Reset after transition or immediately
      setTimeout(() => { if (!isZoomed) img.style.transformOrigin = 'center center'; }, 400);
    }
  });

  lb.addEventListener('mousemove', (e) => {
    if (isZoomed) panImage(e);
  });
  
  lb.addEventListener('click', () => { 
    lb.classList.remove('lb-active'); 
    isZoomed = false;
    img.classList.remove('extreme-zoom');
    img.style.transformOrigin = 'center center';
  });

  window.openParketLightbox = (src) => {
    img.src = src;
    requestAnimationFrame(() => lb.classList.add('lb-active'));
  };
  
  document.body.addEventListener('click', (e) => {
    const slide = e.target.closest('.carousel-slide');
    const arrow = e.target.closest('.carousel-arrow');
    
    if (slide && !arrow) {
      e.stopPropagation();
      const slideImg = slide.querySelector('img');
      if (slideImg && slideImg.src) window.openParketLightbox(slideImg.src);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('lb-active')) {
      lb.click();
    }
  });
});

class ParketVideos extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '';
  }
}

// Register components
customElements.define('parket-loader', ParketLoader);
customElements.define('parket-nav', ParketNav);
customElements.define('parket-seo', ParketSEO);
customElements.define('parket-videos', ParketVideos);
