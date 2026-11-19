export const peoples = {
  warao: {
    name: "Warao",
    area: "Delta del Orinoco",
    art: "delta",
    alt: "Río entre palmas, una canoa y una casa de madera levantada sobre postes",
    color: "river",
    intro: "Sigue el río y descubre una casa sobre postes.",
    scenes: [
      ["¿Dónde estamos?", "El delta", "Cerca del mar, el río Orinoco se divide en muchos brazos. Varias comunidades Warao viven junto a esos canales.", "🌊"],
      ["¿Dónde vivían?", "Una casa en alto", "Junto a algunos canales, familias Warao construyeron casas sobre postes. Se llaman palafitos. Los postes ayudan a elevar el piso cuando sube el agua.", "🏠"],
      ["¿Qué comían?", "Peces del delta", "La pesca ha sido importante en comunidades Warao del delta. El pescado es uno de los alimentos que las familias han obtenido del río.", "🐟"],
      ["¿Cómo se vestían?", "El guayuco", "En el pasado, algunos hombres Warao usaban un guayuco. Era una prenda corta que se sujetaba a la cintura.", "🧵"],
      ["¿Y hoy?", "El río y la canoa", "En comunidades del delta, la canoa sirve para moverse entre los canales. También hay familias Warao que viven en otros lugares.", "🛶"],
    ],
    sequence: [["🛶","Salir en canoa"],["🐟","Pescar en el río"],["🏠","Llevar el pescado a casa"]],
    food: ["🐟","Pescado"],
    place: ["🏠","Palafito"],
  },
  wayuu: {
    name: "Wayúu",
    area: "La Guajira",
    art: "guajira",
    alt: "Paisaje seco con cactus y una enramada que da sombra",
    color: "sand",
    intro: "Busca la sombra y descubre el trabajo de las tejedoras.",
    scenes: [
      ["¿Dónde estamos?", "La Guajira", "En el noroeste de Venezuela está La Guajira. Allí está Paraguaipoa, una comunidad en territorio del pueblo Wayúu.", "🌵"],
      ["¿Dónde vivían?", "A la sombra", "En algunas rancherías Wayúu hay una enramada cerca de la vivienda. Su techo da sombra para descansar, conversar o tejer.", "🌤️"],
      ["¿Qué comían?", "Maíz y frijoles", "En partes de La Guajira se cultivan alimentos como el maíz y los frijoles. Lo que se siembra depende del lugar y de las lluvias.", "🌽"],
      ["¿Cómo se vestían?", "La manta wayúu", "La manta wayúu es una prenda larga que usan algunas mujeres Wayúu. Puede tener colores y diseños distintos.", "👗"],
      ["¿Y hoy?", "Manos que tejen", "En Paraguaipoa hay tejedoras Wayúu que trabajan con hilos de colores y enseñan sus saberes a otras personas.", "🧶"],
    ],
    sequence: [["🧶","Escoger los hilos"],["🪡","Tejer"],["👜","Ver la pieza terminada"]],
    food: ["🌽","Maíz"],
    place: ["🌤️","Enramada"],
  },
  pemon: {
    name: "Pemón",
    area: "Gran Sabana",
    art: "sabana",
    alt: "Sabana verde, montañas de cima plana y un espacio comunitario con techo",
    color: "hill",
    intro: "Viaja a la Gran Sabana y descubre cómo se hace el casabe.",
    scenes: [
      ["¿Dónde estamos?", "La Gran Sabana", "En el estado Bolívar está la Gran Sabana. Allí viven comunidades del pueblo Pemón. En el paisaje se ven montañas con cimas planas llamadas tepuyes.", "⛰️"],
      ["¿Dónde se reúnen?", "Un espacio comunitario", "En algunas comunidades Pemón de la Gran Sabana hay espacios con techo, de tipo churuata, donde varias personas pueden preparar casabe.", "🛖"],
      ["¿Qué comían?", "Yuca y casabe", "El casabe es una torta delgada que se hace con yuca. Preparar alimentos de yuca es una tradición que se sigue practicando en comunidades Pemón.", "🫓"],
      ["¿Cómo se vestían?", "Una mirada al presente", "Las personas Pemón viven en distintas comunidades y su ropa puede variar según el lugar, la actividad y la ocasión.", "👕"],
      ["¿Y hoy?", "Compartir lo aprendido", "En comunidades como Kumarakapay, mujeres Pemón preparan casabe para sus familias y también para venderlo.", "🤝"],
    ],
    sequence: [["🌱","Conseguir la yuca"],["🫓","Preparar el casabe con ayuda adulta"],["🍽️","Compartir el casabe"]],
    food: ["🫓","Casabe"],
    place: ["🛖","Churuata comunitaria"],
  },
};

const options = (...choices) => choices.map(([icon, label]) => ({ icon, label }));
const question = (title, choices, answer, hint, feedback, people, scene) =>
  ({ title, choices, answer, hint, feedback, people, scene });

export const games = {
  lugares: {
    name: "¿Dónde vivían?", icon: "🏡", color: "river", description: "Encuentra el paisaje o el lugar de la historia.",
    rounds: [
      question("¿Qué casa de la lección Warao tiene el piso elevado sobre postes?", options(peoples.warao.place, peoples.wayuu.place, peoples.pemon.place), 0, "Está junto al agua del delta.", "¡Es el palafito! Los postes ayudan a mantener el piso en alto.", "warao", 1),
      question("¿En qué lugar de la ranchería Wayúu se puede descansar a la sombra?", options(peoples.pemon.place, peoples.wayuu.place, peoples.warao.place), 1, "Su nombre empieza por enra.", "¡La enramada! Su techo da sombra.", "wayuu", 1),
      question("¿Qué paisaje viste en la lección del pueblo Pemón?", options(["🌵","La Guajira"],["🌊","Delta del Orinoco"],["⛰️","Gran Sabana"]), 2, "Busca las montañas de cima plana.", "¡La Gran Sabana! Allí puedes ver tepuyes.", "pemon", 0),
    ],
  },
  cesta: {
    name: "La cesta de alimentos", icon: "🧺", color: "sand", description: "Recoge alimentos que aparecen en las lecciones.",
    rounds: [
      question("Toca el alimento que algunas familias Warao obtienen al pescar.", options(["🌽","Maíz"],["🐟","Pescado"],["🫓","Casabe"]), 1, "Vive en el agua.", "¡El pescado va a la cesta!", "warao", 2),
      question("Toca el alimento con granos amarillos que viste en La Guajira.", options(["🌽","Maíz"],["🐟","Pescado"],["🍌","Plátano"]), 0, "Sus granos crecen juntos en una mazorca.", "¡El maíz va a la cesta!", "wayuu", 2),
      question("Toca la torta delgada hecha de yuca.", options(["🐟","Pescado"],["🌽","Maíz"],["🫓","Casabe"]), 2, "Su nombre empieza por ca.", "¡El casabe va a la cesta!", "pemon", 2),
    ],
  },
  ropa: {
    name: "¿Cómo se vestían?", icon: "🧵", color: "rose", description: "Identifica prendas del pasado y del presente.",
    rounds: [
      question("¿Qué prenda corta usaban algunos hombres Warao en el pasado?", options(["🧣","Bufanda"],["👖","Pantalón"],["🧵","Guayuco"]), 2, "Se sujetaba a la cintura, como viste en la lección.", "¡El guayuco! Era una prenda corta.", "warao", 3),
      question("¿Qué prenda larga aparece en la lección Wayúu?", options(["👗","Manta wayúu"],["👒","Sombrero"],["🧤","Guantes"]), 0, "Es una prenda que puede tener distintos colores.", "¡La manta wayúu!", "wayuu", 3),
    ],
  },
  memoria: { name: "Memoria de imágenes", icon: "🃏", color: "hill", description: "Voltea las cartas y encuentra las parejas." },
  ordenar: { name: "Ordena la historia", icon: "🛶", color: "river", description: "Descubre qué pasó primero, después y al final." },
  reto: {
    name: "Reto del explorador", icon: "🏅", color: "sand", description: "Pon a prueba lo que descubriste.",
    rounds: [
      question("¿Qué lugar tiene muchos brazos de río?", options(["🌊","El delta"],["⛰️","La Gran Sabana"],["🌵","La Guajira"]), 0, "Lo viste en la lección Warao.", "¡El delta del Orinoco!", "warao", 0),
      question("¿En qué se puede navegar entre los canales del delta?", options(["🚲","Bicicleta"],["🛶","Canoa"],["🛹","Patineta"]), 1, "Flota y se puede mover con un remo.", "¡En una canoa!", "warao", 4),
      question("¿Con qué trabajan las tejedoras que conociste en Paraguaipoa?", options(["🪨","Piedras"],["🍂","Hojas"],["🧶","Hilos"]), 2, "Pueden ser de muchos colores.", "¡Con hilos de colores!", "wayuu", 4),
      question("¿Con qué se prepara el casabe?", options(["🌽","Maíz"],["🌱","Yuca"],["🍌","Plátano"]), 1, "Es una raíz que aparece en la lección Pemón.", "¡Con yuca!", "pemon", 2),
      question("¿Cuándo viven las comunidades indígenas que conociste?", options(["📜","Solo en el pasado"],["🗓️","También en el presente"],["🌙","Solo en los cuentos"]), 1, "La última página de cada lección habla de nuestras comunidades hoy.", "¡También en el presente! Sus comunidades siguen formando parte de Venezuela.", "pemon", 4),
    ],
  },
};

export const pairs = [
  { icon: "🛶", label: "Canoa", fact: "Sirve para navegar por los canales del delta." },
  { icon: "🧶", label: "Hilos", fact: "Las tejedoras Wayúu crean piezas con hilos de colores." },
  { icon: "🫓", label: "Casabe", fact: "Es una torta de yuca." },
];

export const sources = [
  ["UNESCO · Reserva de Biosfera Delta del Orinoco","https://www.unesco.org/en/mab/delta-del-orinoco"],
  ["UNICEF y FUNPROEIB Andes · Atlas sociolingüístico, tomo 1","https://www.unicef.org/lac/sites/unicef.org.lac/files/2020-02/20100318_UNICEF_AtlasSociolinguistico_tomo1.pdf"],
  ["Universidade Estadual de Roraima · Warao Janoko Emo","https://edicoes.uerr.edu.br/index.php/inicio/en/catalog/download/125/114/1105?inline=1"],
  ["Naciones Unidas en Venezuela · Tejedoras Wayúu de Paraguaipoa","https://venezuela.un.org/es/288213-mujeres-ind%C3%ADgenas-way%C3%BAu-tejen-sue%C3%B1os-por-un-futuro-sostenible"],
  ["Banco de la República · Conjunto de edificaciones Wayúu en Media Luna","https://www.cervantesvirtual.com/obra/conjunto-de-edificaciones-wayuu-en-media-luna-1266313/"],
  ["Anas Wayuu EPSI · Seguridad alimentaria","https://epsianaswayuu.com/seguridad-alimentaria/"],
  ["Universidad de Guadalajara · Patrimonio textil wayúu","https://revistavivienda.cuaad.udg.mx/index.php/rv/article/download/306/813?inline=1"],
  ["FAO Venezuela · Producción de alimentos ancestrales en la Gran Sabana","https://www.fao.org/venezuela/noticias/detail-events/es/c/1733204/"],
];
