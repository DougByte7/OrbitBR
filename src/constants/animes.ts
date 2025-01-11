export const streamings = [
  "Crunchyroll",
  "Netflix",
  "Prime Video",
  "Disney Plus",
];

export const genres = [
  "Aventura",
  "Ação",
  "Boys Love",
  "Comédia",
  "Cyberpunk",
  "Culinária",
  "Drama",
  "Ecchi",
  "Esportes",
  "Fantasia",
  "Ficção Científica",
  "Girls Love",
  "Horror",
  "Mistério",
  "Romance",
  "Sobrenatural",
  "Suspense",
  "Vida Cotidiana",
] as const;

export const themes = [
  "Elenco Adulto",
  "Antropomórfico",
  "Garotas Fofas Fazendo Coisas Fofas",
  "Cuidados Infantis",
  "Esportes de Combate",
  "Delinquentes",
  "Detetive",
  "Humor de Esquetes",
  "Violência Explícita",
  "Histórico",
  "Outro Mundo",
  "Confortante/Curativo",
  "Polígono Amoroso",
  "Mecha (Robôs Gigantes)",
  "Médico",
  "Militar",
  "Música",
  "Mitologia",
  "Crime Organizado",
  "Cultura Otaku",
  "Paródia",
  "Artes Performáticas",
  "Artes Marciais",
  "Psicológico",
  "Reencarnação",
  "Samurai",
  "Escolar",
  "Mundo do Entretenimento",
  "Espaço",
  "Jogo de Estratégia",
  "Superpoder",
  "Sobrevivência",
  "Esportes em Equipe",
  "Viagem no Tempo",
  "Fantasia Urbana",
  "Vampiro",
  "Ambiente de Trabalho",
] as const;

export const genreMap = new Map([
  ["Adventure", "Aventura"],
  ["Action", "Ação"],
  ["Boys Love", "Boys Love"],
  ["Comedy", "Comédia"],
  ["Cyberpunk", "Cyberpunk"],
  ["Gourmet", "Culinária"],
  ["Drama", "Drama"],
  ["Ecchi", "Ecchi"],
  ["Sports", "Esportes"],
  ["Fantasy", "Fantasia"],
  ["Sci-Fi", "Ficção Científica"],
  ["Girls Love", "Girls Love"],
  ["Horror", "Horror"],
  ["Mystery", "Mistério"],
  ["Romance", "Romance"],
  ["Supernatural", "Sobrenatural"],
  ["Suspense", "Suspense"],
  ["Slice of Life", "Vida Cotidiana"],
]);

const themeMap = new Map([
  ["Adult Cast", "Elenco Adulto"],
  ["Martial Arts", "Artes Marciais"],
  ["Anthropomorphic", "Antropomórfico"],
  ["CGDCT", "Garotas Fofas Fazendo Coisas Fofas"],
  ["Childcare", "Cuidados Infantis"],
  ["Combat Sports", "Esportes de Combate"],
  ["Delinquents", "Delinquentes"],
  ["Detective", "Detetive"],
  ["Gag Humor", "Humor de Esquetes"],
  ["Gore", "Violência Explícita"],
  ["Historical", "Histórico"],
  ["Isekai", "Outro Mundo"],
  ["Iyashikei", "Confortante/Curativo"],
  ["Love Polygon", "Polígono Amoroso"],
  ["Mecha", "Mecha (Robôs Gigantes)"],
  ["Medical", "Médico"],
  ["Military", "Militar"],
  ["Music", "Música"],
  ["Mythology", "Mitologia"],
  ["Organized Crime", "Crime Organizado"],
  ["Otaku Culture", "Cultura Otaku"],
  ["Parody", "Paródia"],
  ["Performing Arts", "Artes Performáticas"],
  ["Psychological", "Psicológico"],
  ["Reincarnation", "Reencarnação"],
  ["Samurai", "Samurai"],
  ["School", "Escolar"],
  ["Showbiz", "Mundo do Entretenimento"],
  ["Space", "Espaço"],
  ["Strategy Game", "Jogo de Estratégia"],
  ["Super Power", "Superpoder"],
  ["Survival", "Sobrevivência"],
  ["Team Sports", "Esportes em Equipe"],
  ["Time Travel", "Viagem no Tempo"],
  ["Urban Fantasy", "Fantasia Urbana"],
  ["Vampire", "Vampiro"],
  ["Workplace", "Ambiente de Trabalho"],
]);

export const status = [
  { label: "Concluído", value: "complete" },
  { label: "Em andamento", value: "ongoing" },
  { label: "Não estreado", value: "unreleased" },
  { label: "Cancelado", value: "canceled" },
] as const;
