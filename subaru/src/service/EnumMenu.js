/*SEGMENTO MENU */
const _CodigoGrupo={
  Repuesto:"Repuesto",
  Accesorios:"Accesorios",
  Mantenimiento:"Mantenimiento",
  Recambio:"Recambio",
  Accesorio_LyfeStyle:"Accesorio_LyfeStyle",
  LifeStyle:"LifeStyle",
  Personalizado:"Personalizado",
  
}
 
const _IndentificadorMenu={
  Repuesto_1:"Repuesto_1",
  Repuesto_2:"Repuesto_2",
  Repuesto_3:"Repuesto_3",
  Repuesto_4:"Repuesto_4",
  Repuesto_5:"Repuesto_5",
  Repuesto_6:"Repuesto_6",
  Repuesto_7:"Repuesto_7",
  Repuesto_8:"Repuesto_8",
  Repuesto_9:"Repuesto_9",
  Repuesto_10:"Repuesto_10",
  Repuesto_11:"Repuesto_11",
  Repuesto_12:"Repuesto_12",
  Repuesto_13:"Repuesto_13",

  Accesorio_LyfeStyle_1:"Accesorio_LyfeStyle_1",
  Accesorio_LyfeStyle_2:"Accesorio_LyfeStyle_2",
  Accesorio_LyfeStyle_3:"Accesorio_LyfeStyle_3",
  Accesorio_LyfeStyle_4:"Accesorio_LyfeStyle_4",

  Mantenimiento_1:"Mantenimiento_1",
  Mantenimiento_2:"Mantenimiento_2",
  Mantenimiento_3:"Mantenimiento_3",
  Mantenimiento_4:"Mantenimiento_4",
  Mantenimiento_5:"Mantenimiento_5",
  Mantenimiento_6:"Mantenimiento_6",

  Recambio_1:"Recambio_1",
  Recambio_2:"Recambio_2",
  Recambio_3:"Recambio_3",
  Recambio_4:"Recambio_4",
  Recambio_5:"Recambio_5",
  Recambio_6:"Recambio_6", 

  Accesorios_1:"Accesorios_1", 
  Accesorios_2:"Accesorios_2",
  Accesorios_3:"Accesorios_3",
  Accesorios_4:"Accesorios_4", 
  Accesorios_5:"Accesorios_5",
  Accesorios_6:"Accesorios_6",
  Accesorios_7:"Accesorios_7", 
  Accesorios_8:"Accesorios_8",
  Accesorios_9:"Accesorios_9",

  LifeStyle_1:"LifeStyle_1",
  LifeStyle_2:"LifeStyle_2",

  /*Indentificadores de filtros personalizados */
  Busqueda:"busqueda",
  TodoDestacado:"destacado",
  TodoOferta:"oferta",
  TodoProducto:"productos",
  TodoRepuesto:"repuesto",
  TodoAccesorioLyfeStyle:"accesoriolyfestyle",
  Default:"default",

  MenuPadreRepuestos:"MenuPadreRepuestos",
  MenuPadreAccesoriosLifeStyle:"MenuPadreAccesoriosLifeStyle",
}
 

const listaMenu = [
  {
    descripcion: "Partes de Mantenimiento",    
    srcimg:"", 
    identificador:_IndentificadorMenu.Repuesto_1,
    subFamilia: ["111A0"],  
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,  
    
  },
  {
    descripcion: "Sistema Enfriamiento del Motor", 
    srcimg:"",  
    identificador: _IndentificadorMenu.Repuesto_2,
    subFamilia: ["111A2"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0, 
    select:0, 
    
  },
  {
    descripcion: "Sistema de Combustible",  
    srcimg:"",  
    identificador:  _IndentificadorMenu.Repuesto_3,
    subFamilia: ["111A3"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Sistema Eléctrico del Motor",
    srcimg:"",
    identificador:  _IndentificadorMenu.Repuesto_4,
    subFamilia: ["111A5"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Suspensión (Amortiguación)",    
    srcimg:"",
    identificador:  _IndentificadorMenu.Repuesto_5,
    subFamilia: ["111A6"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Dirección, Ejes y Ruedas",   
    srcimg:"",  
    identificador:  _IndentificadorMenu.Repuesto_6,
    subFamilia: ["111A7"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Transmisión AT, MT y Diferencial",
    srcimg:"",
    identificador:  _IndentificadorMenu.Repuesto_7,
    subFamilia: ["111A8", "111A9"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Frenos",
    srcimg:"",
    identificador:  _IndentificadorMenu.Repuesto_8,
    subFamilia: ["112A0"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Puertas y Paneles Exterior",     
    srcimg:"",
    identificador:  _IndentificadorMenu.Repuesto_9,
    subFamilia: ["112A1"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Faros, Iluminación y Eléctricos",
    srcimg:"",
    identificador:  _IndentificadorMenu.Repuesto_10,
    subFamilia: ["112A3", "112A4"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Parabrisas, Vidrios de Puertas",
    srcimg:"",  
    identificador:  _IndentificadorMenu.Repuesto_11,
    subFamilia: ["112A5"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Aire Acondicionado",
    srcimg:"",
    identificador:  _IndentificadorMenu.Repuesto_12,
    subFamilia: ["112A7"],
    query:[],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Fluidos Subaru",
    srcimg:"",
    identificador:  _IndentificadorMenu.Repuesto_13,
    subFamilia: ["112A9"],
    codigoGrupo: _CodigoGrupo.Repuesto,
    display: 0,
    select:0,
    
     
  }, 
  {
    descripcion: "Accesorios Subaru",
    srcimg:"",
    identificador: _IndentificadorMenu.Accesorio_LyfeStyle_1,
    subFamilia: ["113A1"],
    query:[],
    codigoGrupo: _CodigoGrupo.Accesorio_LyfeStyle,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Subaru Lifestyle",
    srcimg:"",
    identificador: _IndentificadorMenu.Accesorio_LyfeStyle_2,
    subFamilia: ["113A2"],
    query:[],
    codigoGrupo: _CodigoGrupo.Accesorio_LyfeStyle,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Accesorios STI", 
    srcimg:"",    
    identificador: _IndentificadorMenu.Accesorio_LyfeStyle_3,
    subFamilia: ["113A3"],
    query:[],
    codigoGrupo: _CodigoGrupo.Accesorio_LyfeStyle,
    display: 0,
    select:0,
    
     
  }, 
  {    
    descripcion: "Filtros de Aire",
    srcimg: "/marcas/subaru/mantenimiento/M1.png",  
    identificador: _IndentificadorMenu.Mantenimiento_1,
    subFamilia: [],
    query: ["filtro de aire"],     
    codigoGrupo: _CodigoGrupo.Mantenimiento,
    display: 0,
    select:0,
    
   
  },
  {    
    descripcion: "Filtros de Aceite",
    srcimg: "/marcas/subaru/mantenimiento/M2.png",     
    identificador: _IndentificadorMenu.Mantenimiento_2,
    subFamilia: [],
    query: ["filtro de aceite"],
    codigoGrupo: _CodigoGrupo.Mantenimiento,
    display: 0,
    select:0,
    
     
  },
  {    
    descripcion: "Pastillas de Freno",
    srcimg: "/marcas/subaru/mantenimiento/M3.png",    
    identificador: _IndentificadorMenu.Mantenimiento_3,
    subFamilia: [],
    query: ["pastillas de freno", "pastilla de freno"],
    codigoGrupo: _CodigoGrupo.Mantenimiento,
    display: 0,
    select:0,
    
     
  },
  {     
    descripcion: "Discos de Freno",
    srcimg: "/marcas/subaru/mantenimiento/M4.png",     
    identificador: _IndentificadorMenu.Mantenimiento_4,
    subFamilia: [],
    query: ["disco de freno"],
    codigoGrupo: _CodigoGrupo.Mantenimiento,
    display: 0,
    select:0,
    
    
  },
  {     
    descripcion: "Bujías",
    srcimg: "/marcas/subaru/mantenimiento/M5.png",     
    identificador: _IndentificadorMenu.Mantenimiento_5,
    subFamilia: [],
    query: ["bujías", "bujia"],
    codigoGrupo: _CodigoGrupo.Mantenimiento,
    display: 0,
    select:0,
    
     
  },
  {    
    descripcion: "Fajas, correas y templadores",
    srcimg: "/marcas/subaru/mantenimiento/M6.png",     
    identificador: _IndentificadorMenu.Mantenimiento_6,
    subFamilia: [],
    query: ["faja", "correa", "templador"],
    codigoGrupo: _CodigoGrupo.Mantenimiento,
    display: 0,
    select:0,
    
     
  }, 
  {
    
    descripcion: "Alternadores",
    srcimg: "/marcas/subaru/recambio/R1.png",     
    identificador: _IndentificadorMenu.Recambio_1,
    subFamilia: [],
    query: ["alternador"],
    codigoGrupo: _CodigoGrupo.Recambio,
    display: 0,
    select:0,
    
    
  },
  {
     
    descripcion: "Arrancadores",
    srcimg: "/marcas/subaru/recambio/R2.png",  
    identificador: _IndentificadorMenu.Recambio_2,
    subFamilia: [],
    query: ["arrancador"],
    codigoGrupo:  _CodigoGrupo.Recambio,
    display: 0,
    select:0,
    
     
  },
  {    
    descripcion: "Radiadores",
    srcimg: "/marcas/subaru/recambio/R3.png",     
    identificador: _IndentificadorMenu.Recambio_3,
    subFamilia: [],
    query: ["radiador"],
    codigoGrupo:  _CodigoGrupo.Recambio,
    display: 0,
    select:0,
    
     
  },
  {     
    descripcion: "Suspensión",
    srcimg: "/marcas/subaru/recambio/R4.png",     
    identificador: _IndentificadorMenu.Recambio_4,
    subFamilia: [],
    query: ["suspensión", "suspension"],
    codigoGrupo:  _CodigoGrupo.Recambio,
    display: 0,
    select:0,
    
     
  },
  {    
    descripcion: "Limpiaparabrisas",
    srcimg: "/marcas/subaru/recambio/R5.png",   
    identificador: _IndentificadorMenu.Recambio_5,
    subFamilia: [],
    query: ["limpiaparabrisas"],
    codigoGrupo:  _CodigoGrupo.Recambio,
    display: 0,
    select:0,
    
     
  },
  {     
    descripcion: "Lubricantes y Fluidos",
    srcimg: "/marcas/subaru/recambio/R6.gif",    
    identificador: _IndentificadorMenu.Recambio_6,
    subFamilia: [],
    query: [
      "alternador",
      "arrancador",
      "radiador",
      "suspensión",
      "suspension",
      "limpiaparabrisas",
    ],
    codigoGrupo:  _CodigoGrupo.Recambio,
    display: 0,
    select:0,
    
     
  }, 
  {   
    descripcion: "Carga",
    srcimg: "/marcas/subaru/accesorios/A1.png",
    identificador: _IndentificadorMenu.Accesorios_1,
    subFamilia: ["113A1"],
    query: ["Organizador"],
    codigoGrupo:  _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
    
    
  },
  {
    descripcion: "Embellecedor de Estribo",
    srcimg: "/marcas/subaru/accesorios/A2.png",
    identificador: _IndentificadorMenu.Accesorios_2,
    subFamilia: ["113A1"],
    query: ["Embellecedor", "Embellecedo", "Estribo"],
    codigoGrupo: _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
    
    
  },
  {
    descripcion: "Cargomat y Pisos de Alfombra",
    srcimg: "/marcas/subaru/accesorios/A3.png",
    identificador: _IndentificadorMenu.Accesorios_3,
    subFamilia: ["113A1"],
    query: ["Maletero", "Maletera", "Alfombra", "Cargo"],
    codigoGrupo: _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
    
     
  },
  {
    descripcion: "Perillas de cambio",
    srcimg: "/marcas/subaru/accesorios/A4.png",
    identificador: _IndentificadorMenu.Accesorios_4,
    subFamilia: ["113A1"],
    query: ["Perilla"],
    codigoGrupo: _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
       
  },
  {
    descripcion: "Parrillas y Riel de Techo",
    srcimg: "/marcas/subaru/accesorios/A5.png",
    identificador: _IndentificadorMenu.Accesorios_5,
    subFamilia: ["113A1"],
    query: ["Parrilla", "Riel"],
    codigoGrupo: _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
        
  },
  {
    descripcion: "Spoiler Post. y Estribo ",
    srcimg: "/marcas/subaru/accesorios/A6.png",    
    identificador: _IndentificadorMenu.Accesorios_6,
    subFamilia: ["113A1"],
    query: ["Spoiler"],
    codigoGrupo: _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
    
  },
  { 
    descripcion: "Kit de Seguros de Ruedas",
    srcimg: "/marcas/subaru/accesorios/A7.png",  
    identificador: _IndentificadorMenu.Accesorios_7,
    subFamilia: ["113A1"],
    query: ["Kit de Tuerca"],
    codigoGrupo: _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
    
  },
  {   
    descripcion: "Sistema de Remolque",
    srcimg: "/marcas/subaru/accesorios/A8.png",
    identificador: _IndentificadorMenu.Accesorios_8,
    subFamilia: ["113A1"],
    query: ["Remolque"],
    codigoGrupo: _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
    
  },
  {
    descripcion: "Interior",
    srcimg: "/marcas/subaru/accesorios/A9.png",
    identificador: _IndentificadorMenu.Accesorios_9,
    subFamilia: ["113A1"],
    query: ["pedal"],
    codigoGrupo: _CodigoGrupo.Accesorios,
    display: 0,
    select:0,
    
  }, 
  {
    descripcion: "Llaveros",
    srcimg: "/marcas/subaru/lifestyle/l1.png", 
    identificador: _IndentificadorMenu.LifeStyle_1,
    subFamilia: ["113A2"],
    query: ["Llavero"],  
    codigoGrupo: _CodigoGrupo.LifeStyle,
    display: 0,  
    select:0,
    
  },
  {
    descripcion: "Accesorios STI",
    srcimg: "/marcas/subaru/lifestyle/l2.png",   
    identificador: _IndentificadorMenu.LifeStyle_2,
    subFamilia: ["113A2"],
    query: ["STI"],    
    codigoGrupo: _CodigoGrupo.LifeStyle,
    display: 0,
    select:0,
         
  },
/*###################################*/
{
  descripcion: "Busqueda",
  srcimg: "",   
  identificador: _IndentificadorMenu.Busqueda,
  subFamilia: [],
  query: [],    
  codigoGrupo: _CodigoGrupo.Personalizado,
  display: 0,
  select:0,
  
   
},
{
  descripcion: "Destacado",
  srcimg: "",   
  identificador: _IndentificadorMenu.TodoDestacado,
  subFamilia: [],
  query: [],    
  codigoGrupo: _CodigoGrupo.Personalizado,
  display: 0,
  select:0,
     
},
{
  descripcion: "Oferta",
  srcimg: "",   
  identificador: _IndentificadorMenu.TodoOferta,
  subFamilia: [],
  query: [],    
  codigoGrupo: _CodigoGrupo.Personalizado,
  display: 0,
  select:0,
    
},
{
  descripcion: "Todos los Productos",
  srcimg: "",   
  identificador: _IndentificadorMenu.TodoProducto,
  subFamilia: [],
  query: [],    
  codigoGrupo: _CodigoGrupo.Personalizado,
  display: 0,  
  
},

{
  descripcion: "Repuestos",
  srcimg: "",   
  identificador: _IndentificadorMenu.TodoRepuesto,
  subFamilia: [],
  query: [],    
  codigoGrupo: _CodigoGrupo.Personalizado,
  display: 0,
    
},
{
  descripcion: "Accesorios y LifeStyle",
  srcimg: "",   
  identificador: _IndentificadorMenu.TodoAccesorioLyfeStyle,
  subFamilia: [],
  query: [],    
  codigoGrupo: _CodigoGrupo.Personalizado,
  display: 0, 
   
},
];


 
const listaCategoria = [
  {
    key: 1,
    title: (
      <>
        <span>Impreza</span>
        <span> / XV</span>
      </>
    ),
    content:
      "Donde quiera que la te aventura conduzca, mantente conectado en tu Subaru.",
    srcimg: "/marcas/subaru/categoria/1.png",
  },
  {
    key: 2,
    title: (
      <>
        <span>Legacy </span>
      </>
    ),
    content:
      "Menos dificultad Más disfrute. Todo personalizado para ti y tu Subaru.",
    srcimg: "/marcas/subaru/categoria/2.png",
  },
  {
    key: 3,
    title: (
      <>
        <span>Forester</span>
      </>
    ),
    content: "Estilo Subaru sintonizado precisamente para usted y su Subaru.",
    srcimg: "/marcas/subaru/categoria/3.png",
  },
  {
    key: 4,
    title: (
      <>
        <span>Outback </span>
      </>
    ),
    content:
      "Ayuda a prevenir lo peor y a disminuir el impacto de lo inevitable en tu Subaru.",
    srcimg: "/marcas/subaru/categoria/4.png",
  },
  {
    key: 5,
    title: (
      <>
        <span>WRX</span>
        <span> / STI</span>
      </>
    ),
    content:
      "Las modificaciones de Subaru que deseas para el poder que anhelas.",
    srcimg: "/marcas/subaru/categoria/5.png",
  },
  {
    key: 6,
    title: (
      <>
        <span>BRZ</span>
      </>
    ),
    content: "Cuando lo que está afuera de tu Subaru es lo que cuenta.",
    srcimg: "/marcas/subaru/categoria/6.png",
  },
];
export {
  listaMenu,  
  listaCategoria,
  _IndentificadorMenu,
  _CodigoGrupo,
   
};
