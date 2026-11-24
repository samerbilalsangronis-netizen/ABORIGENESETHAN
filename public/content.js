export const peoples = {
  warao: {
    name: "Warao",
    area: "Delta del Orinoco",
    color: "river",
    intro: "Sigue el río y descubre una casa sobre postes.",
    scenes: [
      ["¿Dónde estamos?", "El delta", "Cerca del mar, el río Orinoco se divide en muchos brazos. Varias comunidades Warao viven junto a esos canales.", "🌊"],
      ["¿Dónde vivían?", "Una casa en alto", "Junto a algunos canales, familias Warao construyeron casas sobre postes. Se llaman palafitos. Los postes ayudan a elevar el piso cuando sube el agua.", "🏠"],
      ["¿Qué comían?", "Peces del delta", "La pesca ha sido importante en comunidades Warao del delta. El pescado es uno de los alimentos que las familias han obtenido del río.", "🐟"],
      ["¿Cómo se vestían?", "El guayuco", "En el pasado, algunos hombres Warao usaban un guayuco. Era una prenda corta que se sujetaba a la cintura.", "🧵"],
      ["¿Y hoy?", "El río y la canoa", "En comunidades del delta, la canoa sirve para moverse entre los canales. También hay familias Warao que viven en otros lugares.", "🛶"],
      ["La palma del delta", "Un hilo que viene de una hoja", "En el delta crece una palma llamada moriche. Algunas familias warao sacan fibras de sus hojas. Mira las tiras claras que sostiene la niña. ¿A qué se parecen?", "🌴", "moriche", "Dos personas observan fibras largas junto a una palma de moriche."],
      ["El tejido", "Una cesta toma forma", "Sigue una tira con el dedo sobre la pantalla. Pasa por encima de otra y luego por debajo. Así, al cruzar muchas fibras, las manos de quien teje van formando una cesta. ¿Encuentras una que ya está terminada?", "🧺", "cesteria", "Unas manos tejen junto a una cesta terminada con un dibujo oscuro."],
    ],
    sequence: [["🛶","Salir en canoa"],["🐟","Pescar en el río"],["🏠","Llevar el pescado a casa"]],
    food: ["🐟","Pescado"],
    place: ["🏠","Palafito"],
  },
  wayuu: {
    name: "Wayúu",
    area: "La Guajira",
    color: "sand",
    intro: "Busca la sombra y descubre el trabajo de las tejedoras.",
    scenes: [
      ["¿Dónde estamos?", "La Guajira", "En el noroeste de Venezuela está La Guajira. Allí está Paraguaipoa, una comunidad en territorio del pueblo Wayúu.", "🌵"],
      ["¿Dónde vivían?", "A la sombra", "En algunas rancherías Wayúu hay una enramada cerca de la vivienda. Su techo da sombra para descansar, conversar o tejer.", "🌤️"],
      ["¿Qué comían?", "Maíz y frijoles", "En partes de La Guajira se cultivan alimentos como el maíz y los frijoles. Lo que se siembra depende del lugar y de las lluvias.", "🌽"],
      ["¿Cómo se vestían?", "La manta wayúu", "La manta wayúu es una prenda larga que usan algunas mujeres Wayúu. Puede tener colores y diseños distintos.", "👗"],
      ["¿Y hoy?", "Manos que tejen", "En Paraguaipoa hay tejedoras Wayúu que trabajan con hilos de colores y enseñan sus saberes a otras personas.", "🧶"],
      ["La palabra", "El oficio de escuchar", "Cuando dos familias wayúu tienen un desacuerdo, pueden pedir ayuda a un palabrero. Él lleva la palabra de una familia a la otra. Mira las caras de quienes escuchan. ¿Qué haces tú para escuchar con atención?", "💬", "palabrero", "Un palabrero conversa con una familia bajo una enramada."],
      ["El acuerdo", "Volver a saludarse", "El palabrero ayuda a las familias a buscar un acuerdo. Si alguien causó un daño, conversan sobre cómo repararlo. Imagina que rompiste sin querer el dibujo de un amigo. ¿Qué podrías ofrecerle para ayudar?", "🤝", "acuerdo", "Dos personas se saludan mientras sus familias las acompañan."],
    ],
    sequence: [["🧶","Escoger los hilos"],["🪡","Tejer"],["👜","Ver la pieza terminada"]],
    food: ["🌽","Maíz"],
    place: ["🌤️","Enramada"],
  },
  pemon: {
    name: "Pemón",
    area: "Gran Sabana",
    color: "hill",
    intro: "Viaja a la Gran Sabana y descubre cómo se hace el casabe.",
    scenes: [
      ["¿Dónde estamos?", "La Gran Sabana", "En el estado Bolívar está la Gran Sabana. Allí viven comunidades del pueblo Pemón. En el paisaje se ven montañas con cimas planas llamadas tepuyes.", "⛰️"],
      ["¿Dónde se reúnen?", "Un espacio comunitario", "En algunas comunidades Pemón de la Gran Sabana hay espacios con techo, de tipo churuata, donde varias personas pueden preparar casabe.", "🛖"],
      ["¿Qué comían?", "Yuca y casabe", "El casabe es una torta delgada que se hace con yuca. Preparar alimentos de yuca es una tradición que se sigue practicando en comunidades Pemón.", "🫓"],
      ["¿Cómo se vestían?", "Una mirada al presente", "Las personas Pemón viven en distintas comunidades y su ropa puede variar según el lugar, la actividad y la ocasión.", "👕"],
      ["¿Y hoy?", "Compartir lo aprendido", "En comunidades como Kumarakapay, mujeres Pemón preparan casabe para sus familias y también para venderlo.", "🤝"],
      ["El conuco", "Un tesoro bajo la tierra", "Un conuco es un terreno donde se cultivan alimentos. En esta escena, una familia pemón observa una planta de yuca. Arriba están las hojas. Abajo crecen las raíces que se usan para hacer casabe. ¿Puedes señalar ambas partes?", "🌱", "conuco", "Una persona adulta y un niño observan una planta de yuca y sus raíces."],
      ["La mesa", "De una raíz a una torta", "En Kumarakapay, algunas familias pemón preparan casabe para compartir y vender. Mira el pedacito que sostiene el niño. Antes fue parte de una raíz. Si contaras su viaje, ¿qué dibujarías primero: la planta o el casabe?", "🫓", "mesa", "Una familia comparte trozos de casabe frente a un tepuy."],
    ],
    sequence: [["🌱","Conseguir la yuca"],["🫓","Preparar el casabe con ayuda adulta"],["🍽️","Compartir el casabe"]],
    food: ["🫓","Casabe"],
    place: ["🛖","Churuata comunitaria"],
  },
  humogrias: {
    name: "Humogrías", area: "La Grita", color: "hill",
    intro: "Viaja al Táchira con Ethan y descubre qué puede contarnos una piedra.",
    scenes: [
      ["¿Dónde estamos?", "La Grita entre montañas", "Hoy llegamos a La Grita, en el estado Táchira. Mucho antes de que existiera la ciudad, en este valle vivían los humogrías. Busca las casas de hoy entre las montañas.", "⛰️", "escena-humogrias", "Un pueblo entre laderas verdes de los Andes."],
      ["El paisaje", "El valle de los humogrías", "Sigue con el dedo una ladera desde la cima hasta el fondo. La tierra baja que ves entre las montañas forma un valle. Los relatos de La Grita recuerdan este lugar con el nombre de Humogría.", "🌄", "valle-humogrias", "Un curso de agua recorre el fondo de un valle."],
      ["Una herramienta", "La piedra de moler", "Una crónica de La Grita cuenta que los humogrías trabajaban la piedra. Entre sus herramientas había piedras de moler. Mira el dibujo: una piedra pequeña se mueve sobre otra para triturar lo que queda entre ellas.", "🪨", "piedra-humogrias", "Una piedra pequeña y lisa descansa sobre una piedra más ancha."],
      ["Investiga con Ethan", "Dibuja una pista", "Imagina que visitas un museo. Mira las dos piedras y dibuja sus formas en el aire. ¿Cuál cabe en una mano? ¿Cuál sirve de base? Así puedes explicar con tus palabras cómo se usaba la herramienta.", "✏️", "cuaderno-humogrias", "Una niña de hoy dibuja la herramienta en su cuaderno."],
    ],
    sequence: [["👀","Observar las piedras"],["✏️","Dibujar sus formas"],["💬","Explicar su uso"]],
  },
};

const options = (...choices) => choices.map(([icon, label]) => ({ icon, label }));
const question = (title, choices, answer, hint, feedback, people, scene) =>
  ({ title, choices, answer, hint, feedback, people, scene });

function identify(image, description, labels, answer, hint, feedback, people, scene) {
  return { title: "¿Qué ves en la imagen?", image, description, choices: labels.map(label => ({ label })), answer, hint, feedback, people, scene };
}

export const games = {
  identificar: {
    name: "¿Qué ves?", icon: "🔎", color: "sand", description: "Mira la imagen y toca su nombre.",
    rounds: [
      identify("piedra-humogrias", "Dos piedras lisas, una pequeña sobre una base ancha.", ["Cesta", "Piedra de moler", "Canoa"], 1, "Sirve para triturar.", "¡Una piedra de moler!", "humogrias", 2),
      identify("canoa", "Embarcación larga y estrecha de madera.", ["Canoa", "Cesta", "Remo"], 0, "En ella puedes viajar por el río.", "¡Una canoa! Sirve para navegar.", "warao", 4),
      identify("maiz", "Mazorca cubierta de pequeños granos amarillos.", ["Yuca", "Maíz", "Casabe"], 1, "Sus granos crecen en una mazorca.", "¡Es maíz! Reconociste sus granos.", "wayuu", 2),
      identify("manta", "Prenda larga, ancha y de colores.", ["Sombrero", "Guantes", "Manta wayúu"], 2, "Es una prenda que cubre el cuerpo.", "¡Es una manta wayúu!", "wayuu", 3),
      identify("pescado", "Animal con aletas, escamas y cola.", ["Pescado", "Tortuga", "Guacamaya"], 0, "Nada con sus aletas.", "¡Es un pescado!", "warao", 2),
      identify("casabe", "Torta redonda, delgada y plana.", ["Maíz", "Casabe", "Plátano"], 1, "Se prepara con yuca.", "¡Es casabe!", "pemon", 2),
    ],
  },
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
    name: "¿Cómo se vestían?", icon: "🧵", color: "rose", description: "Reconoce las prendas que viste en las historias.",
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
      question("¿En qué estado está el valle de los humogrías?", options(["⛰️","Táchira"],["🌵","Zulia"],["🌄","Bolívar"]), 0, "Recuerda la parada de La Grita.", "¡Táchira! Allí está La Grita.", "humogrias", 0),
      question("¿Qué lugar tiene muchos brazos de río?", options(["🌊","El delta"],["⛰️","La Gran Sabana"],["🌵","La Guajira"]), 0, "Lo viste en la lección Warao.", "¡El delta del Orinoco!", "warao", 0),
      question("¿En qué se puede navegar entre los canales del delta?", options(["🚲","Bicicleta"],["🛶","Canoa"],["🛹","Patineta"]), 1, "Flota y se puede mover con un remo.", "¡En una canoa!", "warao", 4),
      question("¿Con qué trabajan las tejedoras que conociste en Paraguaipoa?", options(["🪨","Piedras"],["🍂","Hojas"],["🧶","Hilos"]), 2, "Pueden ser de muchos colores.", "¡Con hilos de colores!", "wayuu", 4),
      question("¿Con qué se prepara el casabe?", options(["🌽","Maíz"],["🌱","Yuca"],["🍌","Plátano"]), 1, "Es una raíz que aparece en la lección Pemón.", "¡Con yuca!", "pemon", 2),
      question("¿Cuándo viven las comunidades indígenas que conociste?", options(["📜","Solo en el pasado"],["🗓️","También en el presente"],["🌙","Solo en los cuentos"]), 1, "Recuerda lo que aprendiste sobre las familias que viven hoy en estas comunidades.", "¡También en el presente! Sus comunidades siguen formando parte de Venezuela.", "pemon", 4),
    ],
  },
};

export const pairs = [
  { icon: "🛶", label: "Canoa", fact: "Sirve para navegar por los canales del delta." },
  { icon: "🧶", label: "Hilos", fact: "Las tejedoras Wayúu crean piezas con hilos de colores." },
  { icon: "🫓", label: "Casabe", fact: "Es una torta de yuca." },
];

export const sources = [
  ["Pedro Pablo Paredes · Pueblos del Táchira, capítulo La Grita","https://pedropabloparedes.com/wp-content/uploads/2017/05/pueblos%20del%20tachira%20de%20pedro%20pablo%20paredes%20edicion%20de%201982.pdf"],
  ["Macario Sandoval · La Grita, Ciudad Primogénita (crónica local)","https://www.aporrea.org/regionales/a331540.html"],
  ["UNESCO · El palabrero wayúu","https://ich.unesco.org/es/RL/00435"],
  ["Fundación Empresas Polar · Vivienda y artesanía del delta","https://bibliofep.fundacionempresaspolar.org/media/16968/geo_u7_l181_delta_vivienda_artesania.pdf"],
  ["UNESCO · Reserva de Biosfera Delta del Orinoco","https://www.unesco.org/en/mab/delta-del-orinoco"],
  ["UNICEF y FUNPROEIB Andes · Atlas sociolingüístico, tomo 1","https://www.unicef.org/lac/sites/unicef.org.lac/files/2020-02/20100318_UNICEF_AtlasSociolinguistico_tomo1.pdf"],
  ["Universidade Estadual de Roraima · Warao Janoko Emo","https://edicoes.uerr.edu.br/index.php/inicio/en/catalog/download/125/114/1105?inline=1"],
  ["Naciones Unidas en Venezuela · Tejedoras Wayúu de Paraguaipoa","https://venezuela.un.org/es/288213-mujeres-ind%C3%ADgenas-way%C3%BAu-tejen-sue%C3%B1os-por-un-futuro-sostenible"],
  ["Banco de la República · Conjunto de edificaciones Wayúu en Media Luna","https://www.cervantesvirtual.com/obra/conjunto-de-edificaciones-wayuu-en-media-luna-1266313/"],
  ["Anas Wayuu EPSI · Seguridad alimentaria","https://epsianaswayuu.com/seguridad-alimentaria/"],
  ["Universidad de Guadalajara · Patrimonio textil wayúu","https://revistavivienda.cuaad.udg.mx/index.php/rv/article/download/306/813?inline=1"],
  ["FAO Venezuela · Producción de alimentos ancestrales en la Gran Sabana","https://www.fao.org/venezuela/noticias/detail-events/es/c/1733204/"],
];
