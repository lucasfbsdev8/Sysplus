function gerarEstrelas(avaliacao) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (avaliacao >= i) {
      html += '<span class="estrela cheia">★</span>';
    } else if (avaliacao >= i - 0.5) {
      html += '<span class="estrela meia">★</span>';
    } else {
      html += '<span class="estrela vazia">★</span>';
    }
  }
  return html;
}
const PRODUTOS = [
  {
    id: 1,
    nome: "Notebook Gamer RGB",
    preco: 4599,
    precoOriginal: 5299,
    imagem: "img/notebook.png",
    categoria: ["Eletronicos"],
    oferta: true,
    frete: "Frete grátis",
    entrega: "Entrega Full",
    descricao: "Notebook gamer com processador Intel i7, 16GB RAM e RTX 3060.",
    avaliacao: 4.8,
    avaliacoes: 312
  },
  {
    id: 2,
    nome: "Smart TV 50",
    preco: 2754,
    precoOriginal: 3566,
    imagem: "img/tv.png",
    categoria: ["Eletronicos"],
    oferta: true,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "Samsung UHD 4K Crystal UHD U8600F UN50U8600FGXZD Tizen Crystal 4K Bixby e Alexa 3 HDMI.",
    avaliacao: 4.6,
    avaliacoes: 589
  },
  {
    id: 3,
    nome: "Mesa Retangular",
    preco: 2268,
    precoOriginal: 2520,
    imagem: "img/mesa.webp",
    categoria: ["Moveis"],
    oferta: true,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "Mesa Retangular 1,60m x 1,0m Mineira. Móvel na cor natural, construído em madeira maciça de demolição Peroba Rosa.",
    avaliacao: 4.3,
    avaliacoes: 139
  },
  {
    id: 4,
    nome: "Headset Wireless",
    preco: 499,
    precoOriginal: 499,
    imagem: "img/fone.jpg",
    categoria: ["Eletronicos"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega amanhã",
    descricao: "Headset sem fio com cancelamento de ruído e 30h de bateria.",
    avaliacao: 4.5,
    avaliacoes: 198
  },
  {
    id: 5,
    nome: "Tênis NIKE Air Max Dn",
    preco: 1278,
    precoOriginal: 1278,
    imagem: "img/airmax.webp",
    categoria: ["Moda"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "O Air Max Dn apresenta nosso sistema Dynamic Air com tubos de dupla pressão. Vá em frente — Sinta o Unreal",
    avaliacao: 4.9,
    avaliacoes: 59742
  },
  {
    id: 6,
    nome: "Saco de Pancada Boxe, Muay Thai e MMA Maximum Profissional",
    preco: 899,
    precoOriginal: 899,
    imagem: "img/sacoBoxe.webp",
    categoria: ["Esportes"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "O Saco de Pancada Profissional Maximum é confeccionado com materiais de ponta, escolhidos por sua resistência incomparável e capacidade de absorver os impactos mais intensos. Sua construção robusta garante que ele permaneça um componente estável e confiável de seu regime de treinamento, mesmo sob uso constante.",
    avaliacao: 3.5,
    avaliacoes: 3
  },
  {
    id: 7,
    nome: "iPhone 17 Pro Max",
    preco: 12499,
    precoOriginal: 12499,
    imagem: "img/iphone17.webp",
    categoria: ["Eletronicos"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "iPhone 17 Pro Max de 256 GB – Laranja-cósmico. Seu novo iPhone 17 Pro Max. Do seu jeito.",
    avaliacao: 4.5,
    avaliacoes: 25000
  },
  {
    id: 8,
    nome: "Sofá Retrátil e Reclinável",
    preco: 2559.99,
    precoOriginal: 2559.99,
    imagem: "img/sofá.webp",
    categoria: ["Moveis"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "Sofá Retrátil e Reclinável com Molas ensacadas e Carregador USB Colosso 2,90m Linho Soft Prata",
    avaliacao: 4.5,
    avaliacoes: 52
  },
  {
    id: 9,
    nome: "Calça Jeans Wide Leg Cinza",
    preco: 179.99,
    precoOriginal: 179.99,
    imagem: "img/calça.webp",
    categoria: ["Moda"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "Calça jeans feminina wide leg na cor cinza, modelagem ampla, cintura alta e acabamento moderno. Ideal para looks casuais e estilosos.",
    avaliacao: 4.7,
    avaliacoes: 103
  },
  {
    id: 10,
    nome: "Estante Large Loft Mascavo",
    preco: 939,
    precoOriginal: 939,
    imagem: "img/estante.jpg",
    categoria: ["Moveis"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "Móvel de madeira com linhas retas e inspirados nas principais tendências de decoração de interiores!",
    avaliacao: 3.9,
    avaliacoes: 159
  },
  {
    id: 11,
    nome: "Camisa do Brasil I",
    preco: 449.99,
    precoOriginal: 449.99,
    imagem: "img/camisaBrasil.webp",
    categoria: ["Moda", "Esportes"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "Camisa Brasil Nike I 2026/27 Torcedor Pro Masculina.",
    avaliacao: 3.2,
    avaliacoes: 42
  },
  {
    id: 12,
    nome: "Console PlayStation 5 Pro",
    preco: 7299,
    precoOriginal: 7299,
    imagem: "img/playstation.webp",
    categoria: ["Eletronicos"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "Com o console PlayStation 5 Pro, os maiores criadores de jogos do mundo podem melhorar seus jogos com recursos incríveis, como Ray Tracing avançado, imagem super nítida para TV 4K e jogabilidade com alta taxa de quadros.",
    avaliacao: 4.8,
    avaliacoes: 673
  },
  {
    id: 13,
    nome: "Bola de Vôlei Mikasa V360W Couro Sintético",
    preco: 189.99,
    precoOriginal: 189.99,
    imagem: "img/bolaVolei.jpg",
    categoria: ["Esportes"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "Alcance a excelência nas quadras com a Bola de Vôlei Mikasa V360W Couro Sintético. A Mikasa é a escolha de campeões, e a V360W está pronta para levar seu jogo a novos patamares. Garanta já a sua Bola de Vôlei Mikasa V360W Couro Sintético e destaque-se!",
    avaliacao: 4.9,
    avaliacoes: 58
  },
  {
    id: 14,
    nome: "Cama Casal Xangai",
    preco: 669,
    precoOriginal: 669,
    imagem: "img/cama.webp",
    categoria: ["Moveis"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "A Cama Casal Xangai CX1140 da Art in Móveis é a opção perfeita para quem deseja unir conforto, durabilidade e estilo no ambiente do quarto. Com um design moderno e elegante, ela acomoda colchões de 138x188 cm e possui medidas otimizadas de 142 cm de largura, 192 cm de profundidade e 36 cm de altura, adaptando-se facilmente ao seu espaço. *NÃO CONTÉM COLCHÃO*",
    avaliacao: 4.0,
    avaliacoes: 27
  },
  {
    id: 15,
    nome: "Tenis Under Armour Jet 21 Basquete",
    preco: 387,
    precoOriginal: 387,
    imagem: "img/tenisBasquete.webp",
    categoria: ["Esportes"],
    oferta: false,
    frete: "Frete grátis",
    entrega: "Entrega rápida",
    descricao: "A combinação de malha e TPU perfurado proporciona conforto, leveza, durabilidade e respirabilidade.",
    avaliacao: 3.9,
    avaliacoes: 96
  },
];