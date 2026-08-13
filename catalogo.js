    (async function () {
      // ─── SINGLE-CATEGORY FILTER ─────────────────────────────────
      // When this page is served from a category folder (/pisos/, /decks/...),
      // the folder's index.html sets window.PARKET_FILTER to that product key.
      // We then hide cross-category navigation and only render that one product.
      const SINGLE_CATEGORY = typeof window !== 'undefined' && window.PARKET_FILTER ? String(window.PARKET_FILTER) : null;

      // ─── DATA ────────────────────────────────────────────────────
      const ALL_PRODUCTS = [
        {
          key: 'pisos',
          title: 'Pisos',
          desc: 'A base do luxo. Texturas orgânicas e padrões exclusivos que definem o caráter do seu espaço.',
          cover: 'pisos/piso.webp',
          videos: [
            { type: 'youtube', id: 'fHEBXGLVck4', vertical: true, title: 'A presença absoluta do material' },
            { type: 'youtube', id: 'i4gXTyMsTZo', vertical: true, title: 'Coleção Brazil: o espectro tonal da madeira brasileira' },
            { type: 'youtube', id: 'j6ptdgucfRs', vertical: true, title: 'Brazil' },
           ],
          collections: [
            {
              key: 'brazil', title: 'Brazil',
              desc: 'A autenticidade das madeiras brasileiras traduzida em réguas de beleza única. Uma coleção que exalta a alma tropical com cores profundas e fibras marcantes.',
              localFolder: 'pisos/brazil',
              names: { 1: 'Canela', 2: 'Peroba Mica', 3: 'Peroba Mica', 4: 'Cumaru', 5: 'Cumaru', 6: 'Tauari Naturalle', 7: 'Cumaru', 8: 'Chevron de Tauari', 9: 'Cumaru', 10: 'Sucupira Rústica' },
              // Foto 9 (Chevron de Tauari) é retrato: em vez do corte "cover"
              // (que dá zoom forte), exibe a foto inteira, sem corte (contain).
              fits: { 8: 'contain' },
              specs: [
                { label: 'Espécies', value: 'Cumaru, Ipê, Tauari, Catuaba, Peroba do Campo, Sucupira Negra, Peroba Mica, Cabreúva Dourada e Pau Mulato.' },
                { label: 'Origem', value: 'Brasil · manejo sustentável' },
              ]
            },
            {
              key: 'eternos', title: 'Eternos',
              desc: 'Tons e texturas que atravessam o tempo. Uma coleção concebida para durar visualmente e estruturalmente, em qualquer cenário.',
              localFolder: 'pisos/eternos',
              names: { 1: 'Bambu Demolição', 2: 'Canela Demolição', 4: 'Canela Demolição', 5: 'Canela Demolição' },
              specs: [
                { label: 'Espécies', value: 'Bambu, Canela' },
                { label: 'Origem', value: 'Madeira de reaproveitamento' },
                { label: 'Característica', value: 'Aspecto envelhecido natural' },
              ]
            },
            {
              key: 'unicos', title: 'Únicos',
              desc: 'Peças raras com desenhos irrepetíveis. Cada régua é assinada pela natureza com veios, nós e matizes singulares.',
              localFolder: 'pisos/unicos',
              names: { 1: 'Pau ferro', 2: 'Lapacho', 3: 'Momoki de Marrocos', 4: 'Nogueira' },
              specs: [
                { label: 'Espécies', value: 'Pau Ferro, Lapacho, Nogueira, Momoki' },
                { label: 'Origem', value: 'Seleção curada · diversas procedências' },
                { label: 'Característica', value: 'Veios, nós e matizes singulares' },
              ]
            },
            {
              key: 'carvalhos', title: 'Carvalhos',
              desc: 'A nobreza do Carvalho Europeu em texturas que contam histórias. Tons orgânicos e toques acetinados que trazem o equilíbrio perfeito entre tradição e modernidade.',
              specs: [
                { label: 'Espécie', value: 'Carvalho Europeu (Quercus robur)' },
                { label: 'Origem', value: 'Europa' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2026/03/4D5A0231-b-1-scaled.jpg", name: "Carvalho Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/27e09f2b-808a-4ecb-b60d-c2702e023383-1.jpg", name: "Carvalho Europeu<br>Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/aa120b24-69d4-48d5-b47f-b73099b875ef-2-1.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/european-oak-capuccino-1.jpeg", name: "Carvalho Europeu Cappuccino" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/European-Oak-Giant-1.jpg", name: "Carvalho Europeu<br>Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/Imagem_7-30-1.webp", focus: 'bottom' },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/IMG_0150-1-scaled.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/IMG_6862-1-scaled.jpg", name: "Carvalho Europeu<br>Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/IMG_8925-2-1.jpeg", name: "Carvalho Europeu Capuccino" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/IMG_8932-2-1.jpeg", name: "Carvalho Europeu Capuccino" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/oak-flooring-dinesen-victoria-miro-gallery-wide-wooden-floorboards-02-1.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2026/03/sao_paulo_tch1-1.jpg", name: "Carvalho Europeu Marrone" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-01.jpg", name: "Carvalho Europeu Milano" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-03.jpg", name: "Carvalho Europeu<br>Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-05.jpg", name: "Carvalho Europeu Nevado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-06.jpg", name: "Carvalho Europeu Batman" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-07.jpg", name: "Carvalho Europeu Armani" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-08.jpg", name: "Carvalho Europeu Armani" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-09.jpg", name: "Carvalho Europeu Smoke" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-11.jpg", name: "Carvalho Europeu Giz" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-12.jpg", name: "Carvalho Europeu<br>Wild Grey" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-13.jpg", name: "Carvalho Europeu Armani" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-15.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-16.jpg", name: "Carvalho Europeu Smoke" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-18.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-20.jpg", name: "Carvalho Europeu Milano" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-21.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-22.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-24.jpg", name: "Carvalho Europeu Nevado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CA-25.jpg", name: "Carvalho Europeu Batman" }
              ]
            },
            {
              key: 'grandiosos', title: 'Grandiosos',
              desc: 'Réguas de proporções imponentes que ampliam e valorizam o espaço. Uma coleção que celebra o impacto do formato XL e a continuidade visual da madeira.',
              specs: [
                { label: 'Espécies', value: 'Carvalho Europeu, Pinho de Riga' },
                { label: 'Formato', value: 'Réguas extragrandes (XL)' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-01.jpg", name: "Carvalho Europeu Smoke" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-05.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-06.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-07.jpg", name: "Pinho de Riga Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-08.jpg", name: "Pinho de Riga Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-09.jpg", name: "Pinho de Riga" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-11.jpg", name: "Pinho de Riga Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-12.jpg", name: "Carvalho Europeu Naturalle" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-13.jpg", name: "Carvalho Europeu<br>Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_GR-03.jpg", name: "Pinho de Riga Mont Blanc" }
              ]
            },
            {
              key: 'pinho-de-riga', title: 'Pinho de Riga',
              desc: 'Resgatado de antigas construções europeias, o Pinho de Riga é sinônimo de história e resiliência. Uma madeira com alma que traz profundidade a qualquer projeto contemporâneo.',
              specs: [
                { label: 'Espécie', value: 'Pinho de Riga' },
                { label: 'Origem', value: 'Reaproveitamento de construções europeias' },
                { label: 'Característica', value: 'Densidade e narrativa histórica' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-07.jpg", name: "Pinho de Riga" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-02.jpg", name: "Pinho de Riga" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-03.jpg", name: "Pinho de Riga" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-04.jpg", name: "Pinho de Riga" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-05.jpg", name: "Pinho de Riga" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_PR-06.jpg", name: "Pinho de Riga" }
              ]
            },
            {
              key: 'classicos', title: 'Clássicos',
              desc: 'Padrões atemporais que definem a sofisticação residencial. Uma linha dedicada à elegância contínua que transcende tendências passageiras.',
              specs: [
                { label: 'Padrões', value: 'Chevron, Espinha de Peixe, Versalles, Mosaico' },
                { label: 'Espécies', value: 'Carvalho Europeu, Nogueira' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-02.jpg", name: "Chevron Naturale" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-03.jpg", name: "Chevron" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-05.jpg", name: "Chevron" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-06.jpg", name: "Paginação especial" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-04.jpg", name: "Chevron Smoked" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-07.jpg", name: "Espinha de Peixe em Carvalho Europeu" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-01.jpg", name: "Chevron em Nogueira" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-08.jpg", name: "Chevron em Carvalho Europeu Mont Blanc" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-09.jpg", name: "Carvalho Europeu Batman" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_CL-10.jpg", name: "Carvalho Europeu<br>Mont Blanc" }
              ]
            },
            {
              key: 'listone-giordano',
              title: 'Wood + Stone',
              titleHtml: 'Wood + <span class="italic font-normal">Stone</span>',
              desc: 'A fusão sublime entre a madeira nobre e a imponência mineral. Uma experiência tátil e visual única que redefine a elegância nos detalhes.',
              specs: [
                { label: 'Composição', value: 'Madeira + Pedra + Latão' },
                { label: 'Espécies', value: 'Carvalho Europeu, Nogueira' },
                { label: 'Pedras', value: 'Travertino, Carrara, Nero Marquina, Quartzitos' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-04.jpg", name: "Carvalho Europeu Smoke + Travertino Navona" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-05.jpg", name: "Carvalho Europeu<br>all black + Carrara" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-06.jpg", name: "Nogueira +<br>Nero Marquina + Latão" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-07.jpg", name: "Carvalho Europeu Naturalle + Travertino Navona" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-09.jpg", name: "Nogueira + Latão" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-10.jpg", name: "Carvalho Europeu Armani com paginação petala" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PI_MA-11.jpg", name: "Nogueira + Nero Marquina<br>+ Latão" }
              ]
            }
          ]
        },
        {
          key: 'decks',
          title: 'Decks',
          desc: 'O exterior elevado. Resistência e beleza natural para transformar terraços em refúgios atemporais.',
          cover: 'decks/image.webp',
          collections: [
            {
              key: 'brazil', title: 'Brazil',
              desc: 'Nossa homenagem às raízes tropicais. A Coleção Brazil traz o calor e a beleza duradoura da madeira nativa brasileira para áreas externas.',
              specs: [
                { label: 'Espécies', value: 'Itaúba, Cumaru, Ipê' },
                { label: 'Origem', value: 'Brasil · manejo sustentável' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-11.jpg", name: "Itaúba" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-10.jpg", name: "Cumaru Oxidado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-09.jpg", name: "Cumaru Oxidado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-06.jpg", name: "Ipê Oxidado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-05.jpg", name: "Cumaru" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-04.jpg", name: "Ipê Oxidado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-03.jpg", name: "Ipê" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-01.jpg", name: "Ipê Oxidado + Cumaru" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-08.jpg", name: "Itaúba Oxidada" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_BR-07.jpg", name: "Cumaru Oxidado" }
              ]
            },
            {
              key: 'eurodeck', title: 'Eurodeck',
              desc: 'Engenharia de precisão com peças longas e uniformes. Uma seleção premium que alia simetria impecável e refinamento absoluto para o seu deck.',
              specs: [
                { label: 'Tons', value: 'Preto, Marrom, Cinza' },
                { label: 'Origem', value: 'Engenharia europeia' },
                { label: 'Característica', value: 'Peças longas e uniformes' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_EU-01.jpg", name: "Eurodeck Preto" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_EU-02.jpg", name: "Eurodeck Marrom" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_EU-03.jpg", name: "Eurodeck Cinza" }
              ]
            },
            {
              key: 'kebony', title: 'Kebony',
              desc: 'Tecnologia norueguesa de modificação que transforma madeiras sustentáveis em joias estéticas e duráveis. O Kebony ganha uma belíssima pátina prateada atemporal.',
              specs: [
                { label: 'Espécies', value: 'Momoki, Kebony®' },
                { label: 'Tecnologia', value: 'Modificação Kebony® (Noruega)' },
                { label: 'Característica', value: 'Pátina prateada atemporal' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-01.jpg", name: "Kebony Oxidado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-02.jpg", name: "Kebony Oxidado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-03.jpg", name: "Kebony Oxidado" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-04.jpg", name: "Kebony Clear" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-05.jpg", name: "Deck de Momoki" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-06.jpg", name: "Kebony Clear" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-07.jpg", name: "Kebony Clear" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-08.jpg", name: "Kebony Clear" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-09.jpg", name: "Kebony Clear" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_KE-10.jpg", name: "Kebony Clear" }
              ]
            },
            {
              key: 'unicos', title: 'Únicos',
              desc: 'Projetos de decks que vão além do convencional. Peças de arte natural e padrões sob medida desenhados para áreas molhadas que respiram vanguarda e ousadia.',
              specs: [
                { label: 'Espécies', value: 'Teca, Peroba Demolição, Momoki' },
                { label: 'Característica', value: 'Soluções sob medida · padrões autorais' },
              ],
              images: [
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_UN-05.jpg", name: "Teca" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_UN-06.jpg", name: "Teca" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_UN-03.jpg", name: "Teca Oxidada" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_UN-04.jpg", name: "Teca Oxidada" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_UN-01.jpg", name: "Deck de Momoki" },
                { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_DE_UN-02.jpg", name: "Peroba Demolição" }
              ]
            }
          ]
        },
        {
          key: 'escadas',
          title: 'Escadas',
          desc: 'A ascensão da forma. Design esculpido em madeira para conectar níveis com elegância absoluta.',
          cover: 'escadas/hero.webp',
          videos: [
            { type: 'youtube', id: 'J82KxeHE1Yg', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' }
          ],
          images: [
            
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-09.jpg", name: "Carvalho Europeu Naturalle" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-10.jpg", name: "Carvalho Europeu Customizado" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-11.jpg", name: "Pinho de Riga" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-13.jpg", name: "Carvalho Europeu Customizado" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-14.jpg" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_ESC-16.jpg", name: "Carvalho Europeu Black" }
          ]
        },
        {
          key: 'portas',
          title: 'Portas',
          desc: 'O limiar da sofisticação. Portas que narram a identidade do ambiente desde o primeiro toque.',
          cover: 'portas/image.webp',
          videos: [
            { type: 'youtube', id: 'CzXoo6eq06M', vertical: true, title: 'Portas que narram a identidade do ambiente desde o primeiro toque' },
            { type: 'youtube', id: 's_nafoR1yec', vertical: true, title: 'O limiar da sofisticação em cada detalhe da porta' },
            { type: 'youtube', id: 'E5B2cxIcobo', vertical: true, title: 'Madeira, proporção e acabamento: a porta como assinatura do projeto' }
          ],
          images: [
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-01.jpg", name: "Muxarabi de Cumaru Premium" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-02.jpg" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-04.jpg" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-06.jpg", name: "Muxarabie em Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-07.jpg", name: "Muxarabi de Carvalho Naturalle" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-09.jpg", name: "Carvalho Europeu Mont Blanc + Muxarabi de Itaúba" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-05.jpg", name: "Laca Branca" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-10.jpg", name: "Shou Sugi Ban" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-16.jpg" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-03.jpg" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-08.jpg" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PO-15.jpg" }
          ]
        },
        {
          key: 'paineis',
          title: 'Painéis',
          desc: 'Geometria viva. Revestimentos que trazem ritmo e profundidade às paredes através da marcenaria fina.',
          cover: 'paineis/image.webp',
          images: [
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-01.jpg", name: "Carvalho Europeu Customizado" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-02.jpg", name: "Ripado de Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-03.jpg", name: "Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-06.jpg", name: "Freijó Customizado" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-08.jpg", name: "Cumaru" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-09.jpg", name: "Carvalho Europeu Mont Blanc" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-10.jpg", name: "Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-11.jpg", name: "Shou Sugi Ban" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-12.jpg", name: "Carvalho Europeu Customizado" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-13.jpg", name: "Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-14.jpg", name: "Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-15.jpg", name: "Cumaru" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-16.jpg", name: "Shou Sugi Ban" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-17.jpg", name: "Shou Sugi Ban + Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_PA-18.jpg", name: "Carvalho Europeu Customizado" }
          ]
        },
        {
          key: 'forros',
          title: 'Forros',
          desc: 'Perspectiva superior. Detalhes em madeira que elevam o teto a uma obra de arte arquitetônica.',
          cover: 'forros/image.webp',
          videos: [
            { type: 'mp4', src: 'https://parket.com.br/wp-content/uploads/2026/05/Parket-LaminaCarvalho.mp4', vertical: true, poster: 'forros/video-1-cover.jpg' },
            { type: 'mp4', src: 'https://parket.com.br/wp-content/uploads/2026/05/ApKikoVertical-1.mp4', vertical: true },
            { type: 'mp4', src: 'https://parket.com.br/wp-content/uploads/2026/05/ForroObraFelipe.mp4', vertical: true },
            { type: 'youtube', id: 'ILvIX68_muY', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' },
            { type: 'youtube', id: 'RtGx42_LvDk', vertical: true, title: 'Carvalho Europeu em chevron, mármore Mont Blanc e latão num mesmo plano' },
            { type: 'youtube', id: 's31ibiYfs_E', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' },
            { type: 'youtube', id: 'zImd4pl2yJo', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' },
            { type: 'youtube', id: '-EvbDbcaFds', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' },
            { type: 'youtube', id: 'l3ER_9_misQ', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' },
            { type: 'youtube', id: 'a5RUs8M3E-0', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' },
            { type: 'youtube', id: 'pWWP7BRaN5A', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' },
            { type: 'youtube', id: 'z4GFZJSSNw4', vertical: true, title: 'O detalhe que define o projeto premium é aquele que ninguém vê' }
          ],
          images: [
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-01.jpg", name: "Carvalho Europeu" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-02.jpg", name: "Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-03.jpg", name: "Cumaru" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-04.jpg", name: "Tauari Customizado" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-05.jpg", name: "Cumaru" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-06.jpg", name: "Cumaru" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-07.jpg", name: "Carvalho Europeu Light Brown" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-08.jpg", name: "Peroba do Campo" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-09.jpg", name: "Milano" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-10.jpg", name: "Carvalho Europeu" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-12.jpg", name: "Tauari" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-13.jpg", name: "Cabreúva Dourada" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-14.jpg", name: "Cabreúva Dourada" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-15.jpg", name: "Cabreúva Dourada" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-16.jpg", name: "Cabreúva Dourada" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-17.jpg", name: "Cabreúva Dourada" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-19.jpg", name: "Peroba de Demolição" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-20.jpg", name: "Cumaru" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-21.jpg", name: "Carvalho Europeu Customizado" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-22.jpg", name: "Toblerone de Cabreúva Branca" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-23.jpg", name: "Freijó" },
            { src: "https://parket.com.br/wp-content/uploads/2025/10/PRO_FO-25.jpg", name: "Cumaru" }
          ]
        }
      ];

      // Filter products if a single-category mode is active. Also hides the
      // products-index section ("Escolha um produto:") since there's only one.
      const PRODUCTS = SINGLE_CATEGORY
        ? ALL_PRODUCTS.filter(p => p.key === SINGLE_CATEGORY)
        : ALL_PRODUCTS;
      if (SINGLE_CATEGORY) {
        document.documentElement.classList.add('single-category');
        const pi = document.getElementById('products-index');
        if (pi) pi.style.display = 'none';
        // Hero "split" da home tem título editorial e imagem próprios — não sobrescreve.
        const heroViewport = document.getElementById('hero-viewport');
        const isSplitHero = heroViewport && heroViewport.classList.contains('hero-split');
        // Hero subtitle: só o nome da categoria
        const heroContent = document.getElementById('hero-content');
        const catTitle = (PRODUCTS[0] && PRODUCTS[0].title) || SINGLE_CATEGORY;
        if (heroContent && !isSplitHero) {
          heroContent.innerHTML = `
            <span class="font-label uppercase tracking-[0.6em] text-[24px] text-white block">${catTitle}</span>
          `;
        }
        // Use category-specific hero image (each /<cat>/autoload/ has its own)
        const heroBg = document.getElementById('hero-bg');
        if (heroBg && !isSplitHero) {
          heroBg.style.backgroundImage = `url('${SINGLE_CATEGORY}/autoload/Hero.webp')`;
        }
      }

      // ─── SINGLE-COLLECTION FILTER ───────────────────────────────
      // When the folder's index.html sets window.PARKET_COLLECTION, keep only
      // that one collection inside each product. Used to split Pisos into one
      // standalone site per collection (Brazil, Eternos, …). Inert if unset.
      const SINGLE_COLLECTION = typeof window !== 'undefined' && window.PARKET_COLLECTION ? String(window.PARKET_COLLECTION) : null;
      if (SINGLE_COLLECTION) {
        PRODUCTS.forEach(p => {
          if (p.collections && p.collections.length) {
            p.collections = p.collections.filter(c => c.key === SINGLE_COLLECTION);
          }
        });
      }

      // ─── HELPERS ─────────────────────────────────────────────────
      const EXTS = ['webp', 'jpg', 'jpeg', 'png'];
      const MAX_LOCAL = 30;

      const probe = (src) => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(src);
        img.onerror = () => rej();
        img.src = src;
      });

      const KNOWN_LOCAL = {
        'pisos/brazil': [2,3,4,5,6,7,8,9,10,11].map(n => `pisos/brazil/${String(n).padStart(2,'0')}.webp`),
        'pisos/eternos': [1,2,3,4,5].map(n => `pisos/eternos/${String(n).padStart(2,'0')}.webp`),
        'pisos/unicos': [1,2,3,4].map(n => `pisos/unicos/${String(n).padStart(2,'0')}.webp`)
      };

      async function findLocalImages(folder) {
        if (KNOWN_LOCAL[folder]) return KNOWN_LOCAL[folder];
        const found = [];
        let misses = 0;
        for (let i = 1; i <= MAX_LOCAL; i++) {
          const num = String(i).padStart(2, '0');
          try {
            const src = await probe(`${folder}/${num}.webp`);
            found.push(src);
            misses = 0;
          } catch {
            if (++misses >= 2) break;
          }
        }
        return found;
      }

      const getImg = (item) => typeof item === 'string' ? { src: item } : item;

      // Proxy remote parket.com.br images through images.weserv.nl for
      // automatic WebP conversion + on-the-fly resize. Local URLs pass-through.
      function proxify(url, width = 1600) {
        if (!url) return url;
        if (!url.includes('parket.com.br')) return url; // local images
        if (url.includes('images.weserv.nl')) return url; // already proxied
        const stripped = url.replace(/^https?:\/\//, '');
        return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}&output=webp&q=80&w=${width}`;
      }

      // ─── LIGHTBOX ────────────────────────────────────────────────
      const lb = document.getElementById('lightbox');
      const lbImg = document.getElementById('lightbox-img');
      let lbImages = [], lbIndex = 0;
      window.openLightbox = (images, idx) => {
        lbImages = images; lbIndex = idx;
        lbImg.src = proxify(getImg(lbImages[lbIndex]).src, 1600);
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      window.closeLightbox = () => { lb.classList.remove('active'); document.body.style.overflow = ''; };
      window.lbNext = () => { lbIndex = (lbIndex + 1) % lbImages.length; lbImg.src = proxify(getImg(lbImages[lbIndex]).src, 1600); };
      window.lbPrev = () => { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; lbImg.src = proxify(getImg(lbImages[lbIndex]).src, 1600); };
      document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lbNext();
        if (e.key === 'ArrowLeft') lbPrev();
      });

      // ─── PHOTO STREAM ────────────────────────────────────────────
      // Sequence of full-screen photos, lazy-loaded, with reveal animation
      function buildPhotoStream(container, images, title, names, idPrefix) {
        names = names || {};
        const photos = images.map(getImg);

        const inViewIo = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('in-view');
          });
        }, { threshold: 0.25 });

        photos.forEach((img, i) => {
          const caption = img.name || names[i + 1];
          const num = String(i + 1).padStart(2, '0');
          const item = document.createElement('figure');
          item.className = 'photo-stream-item';
          if (idPrefix) item.id = `foto-${idPrefix}-${i}`;
          const label = caption ? `<span class="photo-num-inline">${num}</span> ${caption}` : `<span class="photo-num-inline">${num}</span>`;
          const styleParts = [];
          if (img.focus) styleParts.push(`object-position: center ${img.focus}`);
          if (img.fit) styleParts.push(`object-fit: ${img.fit}`);
          const focusStyle = styleParts.length ? ` style="${styleParts.join('; ')};"` : '';
          const proxiedSrc = proxify(img.src, 1600);
          // Imagens remotas ganham srcset (mobile baixa versão menor via proxy)
          const isRemote = img.src.includes('parket.com.br');
          const srcsetAttr = isRemote
            ? ` srcset="${proxify(img.src, 800)} 800w, ${proxify(img.src, 1200)} 1200w, ${proxify(img.src, 1600)} 1600w" sizes="100vw"`
            : '';
          // First photo of each stream loads eagerly with high priority
          const loadingAttr = i === 0 ? 'eager' : 'lazy';
          const priorityAttr = i === 0 ? ' fetchpriority="high"' : '';
          // Foto exibida inteira (fit contain): a própria foto, desfocada,
          // preenche o fundo para a moldura ocupar 100% da tela.
          const blurLayer = img.fit === 'contain'
            ? `<img class="photo-blur-bg" aria-hidden="true" decoding="async" loading="${loadingAttr}" src="${proxiedSrc}" alt="">`
            : '';
          item.innerHTML = `
            ${blurLayer}
            <img decoding="async" loading="${loadingAttr}"${priorityAttr} src="${proxiedSrc}"${srcsetAttr} alt="${caption || title + ' ' + (i + 1)}"${focusStyle}>
            <figcaption class="photo-stream-caption">${label}</figcaption>
          `;
          container.appendChild(item);
          inViewIo.observe(item);
        });
      }

      // ─── VIDEO BLOCK ─────────────────────────────────────────────
      function buildVideos(videos) {
        if (!videos || !videos.length) return null;
        const wrap = document.createElement('div');
        wrap.className = 'video-block-wrap fade-up';
        const row = videos.map(v => {
          let media;
          if (v.type === 'youtube') {
            const poster = v.poster || `https://i.ytimg.com/vi/${v.id}/${v.vertical ? 'maxresdefault' : 'hqdefault'}.jpg`;
            media = `
              <div class="video-block${v.vertical ? ' vertical' : ''}" data-yt="${v.id}" role="button" aria-label="Reproduzir vídeo">
                <img class="video-poster" loading="lazy" decoding="async" src="${poster}" alt="Vídeo" onload="if(this.naturalWidth<=120)this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'">
                <div class="video-play" aria-hidden="true"></div>
              </div>`;
          } else {
            media = `
              <div class="video-block custom-player${v.vertical ? ' vertical' : ''}">
                <video preload="metadata" playsinline${v.poster ? ` poster="${v.poster}"` : ''}>
                  <source src="${v.src}" type="video/mp4">
                </video>
                <div class="video-play" aria-hidden="true"></div>
              </div>`;
          }
          return `
            <div class="video-item${v.vertical ? ' vertical' : ''}">
              ${media}
              ${v.title ? `<p class="video-caption">${v.title}</p>` : ''}
            </div>`;
        }).join('');
        wrap.innerHTML = `
          <div class="video-section-header">
            <span class="eyebrow block mb-3">Em movimento</span>
            <h3 class="display-title text-[clamp(1.5rem,3vw,2.4rem)] text-white/80">Vídeos</h3>
          </div>
          <div class="video-carousel">
            <div class="video-row">${row}</div>
            <div class="video-nav-bar">
              <button class="video-nav prev" type="button" aria-label="Anterior"><span class="material-symbols-outlined">chevron_left</span></button>
              <span class="video-progress">01 / ${String(videos.length).padStart(2, '0')}</span>
              <button class="video-nav next" type="button" aria-label="Próximo"><span class="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
        `;

        // Carousel: scroll N items at a time (responsive)
        const carousel = wrap.querySelector('.video-carousel');
        const rowEl = wrap.querySelector('.video-row');
        const prevBtn = wrap.querySelector('.video-nav.prev');
        const nextBtn = wrap.querySelector('.video-nav.next');
        const progressEl = wrap.querySelector('.video-progress');

        function updateNav() {
          const max = rowEl.scrollWidth - rowEl.clientWidth - 1;
          prevBtn.classList.toggle('is-disabled', rowEl.scrollLeft <= 1);
          nextBtn.classList.toggle('is-disabled', rowEl.scrollLeft >= max);
          // Progress: which item is currently leftmost-visible
          const first = rowEl.querySelector('.video-item');
          if (first && progressEl) {
            const w = first.getBoundingClientRect().width + 16;
            const idx = Math.min(videos.length, Math.round(rowEl.scrollLeft / w) + 1);
            progressEl.textContent = `${String(idx).padStart(2, '0')} / ${String(videos.length).padStart(2, '0')}`;
          }
        }
        function pageScroll(direction) {
          const firstItem = rowEl.querySelector('.video-item');
          if (!firstItem) return;
          const itemWidth = firstItem.getBoundingClientRect().width + 16; // + gap
          const visibleCount = Math.max(1, Math.round(rowEl.clientWidth / itemWidth));
          rowEl.scrollBy({ left: direction * itemWidth * visibleCount, behavior: 'smooth' });
        }
        prevBtn.addEventListener('click', () => pageScroll(-1));
        nextBtn.addEventListener('click', () => pageScroll(1));
        rowEl.addEventListener('scroll', updateNav, { passive: true });
        // Hide buttons entirely if nothing to scroll. Use ResizeObserver
        // because the element isn't in the DOM yet at this point (clientWidth=0).
        const checkOverflow = () => {
          const hasOverflow = rowEl.scrollWidth > rowEl.clientWidth + 1;
          carousel.classList.toggle('no-overflow', !hasOverflow);
          updateNav();
        };
        if (window.ResizeObserver) {
          new ResizeObserver(checkOverflow).observe(rowEl);
        } else {
          requestAnimationFrame(checkOverflow);
        }
        window.addEventListener('resize', checkOverflow);

        // YouTube lite — replaces poster with iframe on click
        wrap.querySelectorAll('.video-block[data-yt]').forEach(block => {
          block.addEventListener('click', () => {
            const id = block.dataset.yt;
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
            iframe.title = 'Vídeo';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            block.replaceChildren(iframe);
          }, { once: true });
        });

        // MP4 custom player — click toggles play
        wrap.querySelectorAll('.video-block.custom-player').forEach(block => {
          const video = block.querySelector('video');
          block.addEventListener('click', () => {
            if (video.paused) {
              // Pause other playing videos
              document.querySelectorAll('.video-block.custom-player video').forEach(v => {
                if (v !== video && !v.paused) { v.pause(); v.closest('.video-block').classList.remove('playing'); }
              });
              video.controls = true;
              video.play();
              block.classList.add('playing');
            } else {
              video.pause();
              block.classList.remove('playing');
            }
          });
          video.addEventListener('ended', () => { block.classList.remove('playing'); video.controls = false; });
        });

        return wrap;
      }

      // ─── BUILDERS ────────────────────────────────────────────────

      function buildProductCover(product) {
        const sec = document.createElement('section');
        sec.className = 'product-cover';
        sec.id = `produto-${product.key}`;
        sec.innerHTML = `
          <div class="product-cover-bg" data-mouse-parallax="30" style="background-image: url('${product.cover}');"></div>
          <div class="product-cover-content">
            <span class="eyebrow fade-up">Produto</span>
            <h2 class="product-cover-title fade-up" style="transition-delay: 0.08s">${product.title}</h2>
            ${product.desc ? `<p class="fade-up mt-6 max-w-xl text-white/70 font-light leading-relaxed text-base md:text-lg" style="transition-delay: 0.16s">${product.desc}</p>` : ''}
          </div>
        `;
        return sec;
      }

      // Frase por categoria (artigo/gênero corretos).
      const CHOOSE_PHRASE = {
        pisos: 'um piso', decks: 'um deck', portas: 'uma porta',
        escadas: 'uma escada', forros: 'um forro', paineis: 'um painel'
      };

      // Camada de fundo opaca (evita o hero fixo vazar por trás do índice).
      function ciBgLayer(product) {
        return product.cover
          ? `<div class="ci-bg" style="background-image: url('${product.cover}');"></div>`
          : '';
      }

      function buildCollectionsIndex(product) {
        const wrap = document.createElement('div');
        wrap.className = 'collections-index';
        const items = product.collections.map((c, i) => `
          <a class="index-link fade-up" href="#colecao-${product.key}-${c.key}" style="transition-delay: ${0.05 + i * 0.04}s">
            <span class="num">${String(i + 1).padStart(2, '0')}</span>${c.titleHtml || c.title}
          </a>
        `).join('');
        wrap.innerHTML = `
          ${ciBgLayer(product)}
          <div class="ci-inner">
            <span class="eyebrow block mb-8 fade-up">${product.title} · coleções</span>
            <h3 class="display-title text-[clamp(1.4rem,2.6vw,2.2rem)] mb-12 text-white/70 fade-up" style="transition-delay: 0.05s">
              Escolha ${CHOOSE_PHRASE[product.key] || 'um produto'}:
            </h3>
            <nav class="index-list">${items}</nav>
          </div>
        `;
        return wrap;
      }

      // Índice numerado de MODELOS p/ produtos-galeria (sem coleções): usa os nomes
      // das fotos (dedup), ancora em #foto-<key>-<i>. Mesmo visual do índice de coleções.
      // Espécies-base: variações da mesma madeira (Customizado, Light Brown, etc.)
      // entram no índice como um item só, para não poluir a lista.
      // A ordem importa: find() pega o primeiro que casar, então compostos vêm
      // antes — "Shou Sugi Ban + Freijó" casa com Shou Sugi Ban, não com Freijó.
      const ESPECIES_BASE = [
        'Muxarabi', 'Shou Sugi Ban', 'Laca Branca',
        'Carvalho Europeu', 'Tauari', 'Freijó', 'Cumaru', 'Nogueira', 'Teca',
        'Peroba do Campo', 'Peroba de Demolição', 'Cabreúva Dourada', 'Cabreúva Branca',
        'Itaúba', 'Ipê', 'Pinho de Riga'
      ];
      const especieBase = (nome) => ESPECIES_BASE.find(b => nome.includes(b)) || nome;

      function buildModelsIndex(product) {
        const porBase = new Map();
        (product.images || []).forEach((im, i) => {
          const nm = (im && typeof im === 'object') ? im.name : null;
          if (!nm) return;
          const base = especieBase(nm);
          // guarda a primeira foto do grupo e conta quantas variações ele tem
          if (!porBase.has(base)) porBase.set(base, { name: nm, base, i, count: 0 });
          porBase.get(base).count++;
        });
        // Grupo com mais de uma foto vira o nome da espécie ("Carvalho Europeu");
        // grupo de foto única mantém o nome original ("Toblerone de Cabreúva Branca").
        const models = Array.from(porBase.values())
          .map(m => ({ name: m.count > 1 ? m.base : m.name, i: m.i }));
        if (!models.length) return null;
        const wrap = document.createElement('div');
        wrap.className = 'collections-index';
        const items = models.map((m, idx) => `
          <a class="index-link fade-up" href="#foto-${product.key}-${m.i}" style="transition-delay: ${0.05 + idx * 0.04}s">
            <span class="num">${String(idx + 1).padStart(2, '0')}</span>${m.name}
          </a>
        `).join('');
        wrap.innerHTML = `
          ${ciBgLayer(product)}
          <div class="ci-inner">
            <span class="eyebrow block mb-8 fade-up">${product.title} · modelos</span>
            <h3 class="display-title text-[clamp(1.4rem,2.6vw,2.2rem)] mb-12 text-white/70 fade-up" style="transition-delay: 0.05s">
              Escolha ${CHOOSE_PHRASE[product.key] || 'um produto'}:
            </h3>
            <nav class="index-list">${items}</nav>
          </div>
        `;
        return wrap;
      }

      function buildCollection(product, col, colIndex) {
        const wrap = document.createElement('div');
        wrap.id = `colecao-${product.key}-${col.key}`;
        // Sem parallax nas capas de coleção (todas estáticas, incluindo Brazil).
        const coverParallax = '';

        const cover = document.createElement('section');
        cover.className = 'collection-cover';
        cover.dataset.collection = col.key;
        const specsHtml = col.specs && col.specs.length
          ? `<div class="collection-specs fade-up" style="transition-delay: 0.22s">
              ${col.specs.map(s => `
                <div>
                  <p class="collection-spec-label">${s.label}</p>
                  <p class="collection-spec-value">${s.value}</p>
                </div>
              `).join('')}
            </div>`
          : '';
        cover.innerHTML = `
          <div class="collection-cover-bg"${coverParallax}></div>
          <div class="collection-cover-content">
            <span class="eyebrow fade-up">Coleção</span>
            <h3 class="collection-cover-title fade-up" style="transition-delay: 0.08s">${col.titleHtml || col.title}</h3>
            ${col.desc ? `<p class="collection-cover-desc fade-up" style="transition-delay: 0.16s">${col.desc}</p>` : ''}
            ${specsHtml}
          </div>
        `;
        wrap.appendChild(cover);

        const stream = document.createElement('div');
        stream.className = 'photo-stream';
        wrap.appendChild(stream);

        const videoBlock = buildVideos(col.videos);
        if (videoBlock) wrap.appendChild(videoBlock);

        // Build DOM immediately so page has correct full height
        // (images still lazy-load via native loading="lazy")
        (async () => {
          let imgs = col.images;
          if (!imgs && col.localFolder) {
            const local = await findLocalImages(col.localFolder);
            imgs = local.map((src, i) => ({ src, name: (col.names || {})[i + 1], fit: (col.fits || {})[i + 1] }));
          }
          if (!imgs || !imgs.length) {
            stream.remove();
            return;
          }
          const bg = cover.querySelector('.collection-cover-bg');
          if (bg && !bg.style.backgroundImage) bg.style.backgroundImage = `url('${proxify(getImg(imgs[0]).src, 1600)}')`;
          buildPhotoStream(stream, imgs, col.title);
        })();

        return wrap;
      }

      function buildSimpleProduct(product) {
        // Product cover + photo stream (no nested collections)
        const wrap = document.createElement('div');
        wrap.appendChild(buildProductCover(product));

        const stream = document.createElement('div');
        stream.className = 'photo-stream';
        wrap.appendChild(stream);

        // Build photos immediately for accurate page height (browser still lazy-loads images)
        buildPhotoStream(stream, product.images, product.title, null, product.key);

        const videoBlock = buildVideos(product.videos);
        if (videoBlock) wrap.appendChild(videoBlock);

        return wrap;
      }

      // ─── BUILD PRODUCTS NAV ──────────────────────────────────────
      const productsNav = document.getElementById('products-nav');
      PRODUCTS.forEach((p, i) => {
        const a = document.createElement('a');
        a.className = 'index-link';
        a.href = `#produto-${p.key}`;
        a.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span>${p.title}`;
        productsNav.appendChild(a);
      });

      // ─── BUILD SIDE INDEX (right, fixed) ─────────────────────────
      const sideIndex = document.getElementById('side-index');
      const sideEntries = []; // [{el, targetId}]
      PRODUCTS.forEach((p) => {
        // In single-category mode, skip the product-level anchor — it would be
        // a redundant single entry. Only the collection sub-links matter.
        if (!SINGLE_CATEGORY) {
          const a = document.createElement('a');
          a.href = `#produto-${p.key}`;
          a.textContent = p.title;
          a.dataset.target = `produto-${p.key}`;
          sideIndex.appendChild(a);
          sideEntries.push({ el: a, targetId: `produto-${p.key}` });
        }

        // Sublinks de coleção só quando há mais de uma — com coleção única
        // (ex.: página Brazil) o link seria redundante e não deve existir.
        if (p.collections && p.collections.length > 1) {
          p.collections.forEach(c => {
            const sub = document.createElement('a');
            sub.href = `#colecao-${p.key}-${c.key}`;
            sub.className = 'side-collection';
            sub.textContent = c.title;
            sub.dataset.target = `colecao-${p.key}-${c.key}`;
            sideIndex.appendChild(sub);
            sideEntries.push({ el: sub, targetId: `colecao-${p.key}-${c.key}` });
          });
        }
      });

      // Hide side-index entirely if it has no entries (single-product page without collections)
      if (sideEntries.length === 0) {
        sideIndex.style.display = 'none';
      }

      // ─── HAMBÚRGUER: menu de coleções ───────────────────────────
      (function buildMenu() {
        const toggle = document.getElementById('menu-toggle');
        const overlay = document.getElementById('menu-overlay');
        const menuList = document.getElementById('menu-list');
        if (!toggle || !overlay || !menuList) return;

        // Coleções a exibir: do produto único (single-category) ou de todos
        const menuItems = [];
        PRODUCTS.forEach(p => {
          if (p.collections && p.collections.length) {
            p.collections.forEach(c => {
              menuItems.push({ label: c.titleHtml || c.title, target: `colecao-${p.key}-${c.key}` });
            });
          } else if (p.images && p.images.length) {
            // mesmo agrupamento do índice de modelos, para o menu não repetir
            // "Carvalho Europeu" três vezes
            const porBase = new Map();
            p.images.forEach((im, i) => {
              const nm = (im && typeof im === 'object') ? im.name : null;
              if (!nm) return;
              const base = especieBase(nm);
              if (!porBase.has(base)) porBase.set(base, { name: nm, base, i, count: 0 });
              porBase.get(base).count++;
            });
            porBase.forEach(m => menuItems.push({
              label: m.count > 1 ? m.base : m.name,
              target: `foto-${p.key}-${m.i}`
            }));
          }
        });

        // Sem coleções → esconde o hambúrguer
        if (!menuItems.length) { toggle.style.display = 'none'; return; }

        menuItems.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="#${item.target}">${item.label}</a>`;
          menuList.appendChild(li);
        });

        function openMenu() {
          overlay.classList.add('is-open');
          toggle.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
          overlay.setAttribute('aria-hidden', 'false');
        }
        function closeMenu() {
          overlay.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          overlay.setAttribute('aria-hidden', 'true');
        }
        toggle.addEventListener('click', () => {
          overlay.classList.contains('is-open') ? closeMenu() : openMenu();
        });
        // Clicar num link fecha o menu (o scroll é tratado pelo handler global de âncoras)
        menuList.addEventListener('click', (e) => {
          if (e.target.closest('a')) closeMenu();
        });
        // ESC fecha
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeMenu();
        });
      })();

      // Explicit click handler for internal anchor links — reliable smooth scroll
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const id = link.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#' + id);
        }
      });

      // ─── PRE-RESOLVE LOCAL-FOLDER IMAGES (parallel) ─────────────
      // Inlines the resolved image list into col.images so all sections render synchronously
      await Promise.all(PRODUCTS.flatMap(product =>
        (product.collections || []).map(async (col) => {
          if (!col.images && col.localFolder) {
            const local = await findLocalImages(col.localFolder);
            col.images = local.map((src, i) => ({ src, name: (col.names || {})[i + 1], fit: (col.fits || {})[i + 1] }));
          }
        })
      ));

      // ─── BUILD PRODUCT SECTIONS ──────────────────────────────────
      const productsContainer = document.getElementById('products');
      PRODUCTS.forEach((product, idx) => {
        const productSection = document.createElement('section');
        productSection.dataset.product = product.key;

        if (product.collections && product.collections.length) {
          productSection.appendChild(buildProductCover(product));
          // Índice numerado de coleções ("Escolha um deck:") — hero da categoria única.
          
          product.collections.forEach((col, ci) => {
            productSection.appendChild(buildCollection(product, col, ci));
          });
          // Product-level videos (after all collections)
          const productVideos = buildVideos(product.videos);
          if (productVideos) productSection.appendChild(productVideos);
        } else if (product.images && product.images.length) {
          if (SINGLE_CATEGORY) { const mi = buildModelsIndex(product); if (mi) productSection.appendChild(mi); }
          productSection.appendChild(buildSimpleProduct(product));
        } else {
          productSection.appendChild(buildProductCover(product));
        }

        productsContainer.appendChild(productSection);

        // Divider between products
        if (idx < PRODUCTS.length - 1) {
          const d = document.createElement('div');
          d.className = 'section-divider';
          d.innerHTML = '<div></div>';
          productsContainer.appendChild(d);
        }
      });

      // ─── FADE-UP OBSERVER ────────────────────────────────────────
      const fadeIo = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.12 });
      document.querySelectorAll('.fade-up').forEach(el => fadeIo.observe(el));

      // ─── COVER REVEAL (scale-down on enter) ──────────────────────
      const coverIo = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
      }, { threshold: 0.25 });
      document.querySelectorAll('.product-cover, .collection-cover').forEach(el => coverIo.observe(el));

      // ─── PROCESSO HERO: reveal animations + scroll parallax ──────
      const processoHero = document.querySelector('.processo-hero');
      if (processoHero) {
        // Reveal once when visible
        new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) processoHero.classList.add('is-revealed'); });
        }, { threshold: 0.2 }).observe(processoHero);

        // Parallax: shift elements by a factor of their distance to viewport center
        const parallaxEls = Array.from(processoHero.querySelectorAll('[data-parallax]'));
        let parallaxTicking = false;
        function updateParallax() {
          parallaxTicking = false;
          const heroRect = processoHero.getBoundingClientRect();
          // Only animate when hero is near/in viewport
          if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) return;
          const heroCenter = heroRect.top + heroRect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = viewportCenter - heroCenter;
          parallaxEls.forEach(el => {
            const factor = parseFloat(el.dataset.parallax) || 0.15;
            el.style.transform = `translate3d(0, ${(distance * factor).toFixed(1)}px, 0)`;
          });
        }
        const ioHeroParallax = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            window.addEventListener('scroll', updateParallax, { passive: true });
            updateParallax();
          } else {
            window.removeEventListener('scroll', updateParallax);
          }
        });
        ioHeroParallax.observe(heroSec);
      }

      // ─── REVEAL side index after "Pisos · coleções" (first collections-index) ─
      const firstProduct = PRODUCTS[0];
      const firstCollection = firstProduct.collections && firstProduct.collections[0];
      const firstCollectionEl = firstCollection
        ? document.getElementById(`colecao-${firstProduct.key}-${firstCollection.key}`)
        : null;
      if (firstCollectionEl && sideIndex) {
        const checkReveal = () => {
          if (window.innerWidth <= 1024) return;
          const rect = firstCollectionEl.getBoundingClientRect();
          // Reveal when the first collection (Brazil) starts entering the viewport
          const entering = rect.top < window.innerHeight * 0.85;
          sideIndex.classList.toggle('is-revealed', entering);
        };
        window.addEventListener('scroll', checkReveal, { passive: true });
        checkReveal();
      }

      // ─── SCROLL-SPY for side index ───────────────────────────────
      function updateSideIndex() {
        if (window.innerWidth <= 1024 || !sideIndex) return;
        const centerY = window.innerHeight / 2;
        let best = null, bestDist = Infinity;
        for (const entry of sideEntries) {
          const target = document.getElementById(entry.targetId);
          if (!target) continue;
          const rect = target.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - centerY);
          if (dist < bestDist && rect.bottom > 0 && rect.top < window.innerHeight) {
            bestDist = dist;
            best = entry;
          }
        }
        sideEntries.forEach(e => e.el.classList.toggle('is-active', e === best));
        // Auto-scroll the side-index to keep the active item visible
        if (best) {
          const idxRect = sideIndex.getBoundingClientRect();
          const elRect = best.el.getBoundingClientRect();
          if (elRect.top < idxRect.top + 30 || elRect.bottom > idxRect.bottom - 30) {
            sideIndex.scrollTo({
              top: sideIndex.scrollTop + (elRect.top - idxRect.top) - idxRect.height / 2 + elRect.height / 2,
              behavior: 'smooth'
            });
          }
        }
      }
      let spyTicking = false;
      window.addEventListener('scroll', () => {
        if (window.innerWidth <= 1024) return;
        if (!spyTicking) {
          requestAnimationFrame(() => { updateSideIndex(); spyTicking = false; });
          spyTicking = true;
        }
      }, { passive: true });
      updateSideIndex();

      // ─── HERO PARALLAX ───────────────────────────────────────────
      let heroTicking = false;
      function updateHero() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(scrollY / vh, 1);
        document.documentElement.style.setProperty('--scroll-progress', progress);
        heroTicking = false;
      }
      window.addEventListener('scroll', () => {
        if (!heroTicking) { requestAnimationFrame(updateHero); heroTicking = true; }
      }, { passive: true });
      updateHero();

      // ─── MOUSE PARALLAX (reutilizável — desativado em telas touch/mobile)
      function attachMouseParallax(bgEl) {
        if (!bgEl || bgEl.__mouseParallaxAttached) return;
        bgEl.__mouseParallaxAttached = true;

        const container = bgEl.closest('[data-mouse-parallax-host]') || bgEl.parentElement;
        if (!container) return;

        bgEl.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)';

        const MAX = parseFloat(bgEl.dataset.mouseParallax) || 40;
        const EASE = 0.06;
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let active = false;

        container.addEventListener('mousemove', (e) => {
          const rect = container.getBoundingClientRect();
          const nx = ((e.clientX - rect.left) / rect.width) - 0.5;
          const ny = ((e.clientY - rect.top) / rect.height) - 0.5;
          targetX = nx * MAX;
          targetY = ny * MAX;
          if (!active) { active = true; loop(); }
        }, { passive: true });

        container.addEventListener('mouseleave', () => {
          targetX = 0; targetY = 0;
          if (!active) { active = true; loop(); }
        });

        function loop() {
          currentX += (targetX - currentX) * EASE;
          currentY += (targetY - currentY) * EASE;
          bgEl.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
          if (Math.abs(currentX - targetX) > 0.05 || Math.abs(currentY - targetY) > 0.05) {
            requestAnimationFrame(loop);
          } else {
            active = false;
          }
        }
      }

      // Escaneia apenas em dispositivos desktop com ponteiro preciso
      const isDesktopPointer = window.matchMedia('(pointer: fine)').matches;
      if (isDesktopPointer) {
        function scanMouseParallax() {
          document.querySelectorAll('[data-mouse-parallax]').forEach(attachMouseParallax);
        }
        scanMouseParallax();
        const parallaxRescan = new MutationObserver(scanMouseParallax);
        parallaxRescan.observe(document.body, { childList: true, subtree: true });
      }

      // ─── BACK TO TOP ─────────────────────────
      const topBtn = document.getElementById('back-to-top');

      if (topBtn) {
        topBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        const updateFloating = () => {
          topBtn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.7);
        };
        window.addEventListener('scroll', updateFloating, { passive: true });
        updateFloating();
      }

      // ─── FADE-OUT por scroll nas linhas de "Madeira multicamadas"
      (function scrollFadeMulticamadas() {
        const els = document.querySelectorAll('.multicamadas-line');
        if (!els.length) return;
        const parentSec = els[0].closest('section') || els[0].parentElement;
        let ticking = false;
        const update = () => {
          const vh = window.innerHeight;
          els.forEach(el => {
            const r = el.getBoundingClientRect();
            const fadeStart = vh * 0.45;
            const fadeEnd = -r.height * 0.5;
            const t = r.top;
            let op;
            if (t >= fadeStart) op = 1;
            else if (t <= fadeEnd) op = 0;
            else op = (t - fadeEnd) / (fadeStart - fadeEnd);
            el.style.setProperty('--scroll-opacity', op.toFixed(3));
          });
          ticking = false;
        };
        const onScroll = () => {
          if (!ticking) { requestAnimationFrame(update); ticking = true; }
        };
        if (parentSec) {
          const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              window.addEventListener('scroll', onScroll, { passive: true });
              update();
            } else {
              window.removeEventListener('scroll', onScroll);
            }
          });
          io.observe(parentSec);
        }
      })();

      // ─── TEXTURAS: réguas que trocam com navegação lateral (clara → escura)
      (function texturasLaterais() {
        const wrap = document.getElementById('texturas');
        if (!wrap) return;
        const regua = document.getElementById('texturas-regua');
        const nome = document.getElementById('texturas-nome');
        const desc = document.getElementById('texturas-desc');
        const atual = document.getElementById('texturas-atual');
        const total = document.getElementById('texturas-total');
        const stage = wrap.querySelector('.texturas-stage');  

        // Apenas as espécies usadas na marcenaria sob medida (painéis, portas,
        // armários, bancadas e mobiliário). Ordenadas por luminância média da
        // textura: da mais clara à mais escura.
        const ESPECIES = [
          ['tauari', 'Tauari', 'Clara e homogênea, o Tauari ilumina os ambientes, oferecendo um visual moderno e minimalista.'],
          ['carvalho-europeu', 'Carvalho Europeu', 'Nobre e versátil, de tom claro acetinado e veios calmos — a referência para painéis ripados e portas de acabamento impecável.'],
          ['freijo', 'Freijó', 'Marrom dourado de veios longos e discretos, é a madeira clássica da marcenaria brasileira de alto padrão.'],
          ['nogueira', 'Nogueira', 'A mais escura da seleção, de tom profundo e desenho marcante, confere gravidade e sofisticação ao ambiente.'],
        ];
        const n = ESPECIES.length;
        const pad = (v) => String(v).padStart(2, '0');

        // Monta as imagens empilhadas (crossfade por opacity)
        ESPECIES.forEach(([slug, label], i) => {
          const img = document.createElement('img');
          img.src = `texturas/${slug}.jpg`;
          img.alt = '';
          img.loading = 'lazy';
          img.decoding = 'async';
          if (i === 0) img.classList.add('is-visivel');
          regua.appendChild(img);
        });
        total.textContent = pad(n);

        const palco = wrap.querySelector('.texturas-palco');
        const setas = Array.from(wrap.querySelectorAll('.texturas-seta'));
        const imgs = Array.from(regua.children);
        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

        let idx = 0;
        let nomeTimer = null;
        nome.textContent = ESPECIES[0][1];
        desc.textContent = ESPECIES[0][2];

        const trocaNome = (label, texto) => {
          nome.classList.add('is-trocando');
          desc.classList.add('is-trocando');
          clearTimeout(nomeTimer);
          nomeTimer = setTimeout(() => {
            nome.textContent = label;
            desc.textContent = texto;
            nome.classList.remove('is-trocando');
            desc.classList.remove('is-trocando');
          }, 200);
        };

        // dir: +1 avança (entra pela direita), -1 volta (entra pela esquerda)
        const ir = (next, dir) => {
          next = clamp(next, 0, n - 1);
          if (next === idx) return;
          if (!dir) dir = next > idx ? 1 : -1;

          const sai = imgs[idx];
          const entra = imgs[next];
          sai.style.setProperty('--sai', (dir * -8) + '%');
          sai.classList.remove('is-visivel');
          entra.style.setProperty('--sai', (dir * 8) + '%');
          entra.style.setProperty('--arrasto', '0px');
          // força o reflow para que a posição inicial seja aplicada antes da transição
          void entra.offsetWidth;
          entra.classList.add('is-visivel');

          idx = next;
          atual.textContent = pad(next + 1);
          trocaNome(ESPECIES[next][1], ESPECIES[next][2]);
          stage.style.setProperty('--texturas-p', (n > 1 ? next / (n - 1) : 1).toFixed(4));
          setas.forEach(b => {
            const d = Number(b.dataset.dir);
            b.disabled = (d < 0 && idx === 0) || (d > 0 && idx === n - 1);
          });
          palco.classList.add('is-usado');
        };

        stage.style.setProperty('--texturas-p', '0');
        setas.forEach(b => {
          if (Number(b.dataset.dir) < 0) b.disabled = true;
          b.addEventListener('click', () => ir(idx + Number(b.dataset.dir), Number(b.dataset.dir)));
        });

        // ── roda/trackpad horizontal (deltaX) e shift+scroll
        let acumulado = 0;
        let travado = false;
        wrap.addEventListener('wheel', (e) => {
          const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
          if (!dx) return;
          e.preventDefault();
          if (travado) return;
          acumulado += dx;
          if (Math.abs(acumulado) >= 60) {
            const dir = acumulado > 0 ? 1 : -1;
            acumulado = 0;
            travado = true;
            setTimeout(() => { travado = false; }, 320);
            ir(idx + dir, dir);
          }
        }, { passive: false });

        // ── arraste com mouse/toque sobre a régua
        let inicioX = null;
        let largura = 1;
        const alvo = () => imgs[idx];

        regua.addEventListener('pointerdown', (e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          inicioX = e.clientX;
          largura = regua.offsetWidth || 1;
          regua.classList.add('is-arrastando');
          regua.setPointerCapture(e.pointerId);
        });
        regua.addEventListener('pointermove', (e) => {
          if (inicioX === null) return;
          const dx = e.clientX - inicioX;
          alvo().style.setProperty('--arrasto', (dx * 0.25).toFixed(1) + 'px');
        });
        const soltar = (e) => {
          if (inicioX === null) return;
          const dx = e.clientX - inicioX;
          inicioX = null;
          regua.classList.remove('is-arrastando');
          alvo().style.setProperty('--arrasto', '0px');
          if (Math.abs(dx) > Math.max(40, largura * 0.12)) {
            const dir = dx < 0 ? 1 : -1;
            ir(idx + dir, dir);
          }
        };
        regua.addEventListener('pointerup', soltar);
        regua.addEventListener('pointercancel', soltar);

        // ── setas do teclado quando a seção está na tela
        window.addEventListener('keydown', (e) => {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
          const r = wrap.getBoundingClientRect();
          if (r.bottom < window.innerHeight * 0.3 || r.top > window.innerHeight * 0.7) return;
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          ir(idx + dir, dir);
        });
      })();

      // ─── BRAND LOCK: impede tradução automática da palavra "Parket"
      (function lockBrand() {
        const BRAND = 'Parket';
        const re = new RegExp(`(${BRAND})`, 'g');
        function wrap(root) {
          if (!root || root.nodeType !== 1) return;
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
              if (!node.nodeValue || !node.nodeValue.includes(BRAND)) return NodeFilter.FILTER_REJECT;
              const p = node.parentElement;
              if (!p) return NodeFilter.FILTER_REJECT;
              if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
              if (p.closest('[translate="no"]')) return NodeFilter.FILTER_REJECT;
              return NodeFilter.FILTER_ACCEPT;
            }
          });
          const nodes = [];
          let n;
          while ((n = walker.nextNode())) nodes.push(n);
          nodes.forEach(node => {
            const parts = node.nodeValue.split(re);
            if (parts.length <= 1) return;
            const frag = document.createDocumentFragment();
            parts.forEach(part => {
              if (part === BRAND) {
                const span = document.createElement('span');
                span.setAttribute('translate', 'no');
                span.className = 'notranslate';
                span.textContent = BRAND;
                frag.appendChild(span);
              } else if (part) {
                frag.appendChild(document.createTextNode(part));
              }
            });
            node.parentNode.replaceChild(frag, node);
          });
        }
        wrap(document.body);
        new MutationObserver((muts) => {
          muts.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) wrap(n); }));
        }).observe(document.body, { childList: true, subtree: true });
      })();

    })();
