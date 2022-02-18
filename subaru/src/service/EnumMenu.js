/*SEGMENTO MENU */
const listaRepuesto = [
    { descripcion: "Partes de Mantenimiento" ,codigo:1,identificador:'Repuesto-1-1',subFamilia:['111A0']},
    { descripcion: "Sistema Enfriamiento del Motor",codigo:2,identificador:'Repuesto-1-2',subFamilia:['111A2'] },
    { descripcion: "Sistema de Combustible",codigo:3,identificador:'Repuesto-1-3',subFamilia:['111A3'] },
    { descripcion: "Sistema Eléctrico del Motor",codigo:4,identificador:'Repuesto-1-4',subFamilia:['111A5'] },
    { descripcion: "Suspensión (Amortiguación)",codigo:5,identificador:'Repuesto-1-5',subFamilia:['111A6'] },
    { descripcion: "Dirección, Ejes y Ruedas",codigo:6,identificador:'Repuesto-1-6',subFamilia:['111A7']},
    { descripcion: "Transmisión AT, MT y Diferencial" ,codigo:7,identificador:'Repuesto-1-7',subFamilia:['111A8', '111A9']},
    { descripcion: "Frenos",codigo:8,identificador:'Repuesto-1-8',subFamilia:['112A0'] },
    { descripcion: "Puertas y Paneles Exterior" ,codigo:9,identificador:'Repuesto-1-9',subFamilia:['112A1']},
    { descripcion: "Faros, Iluminación y Eléctricos",codigo:10,identificador:'Repuesto-1-10',subFamilia:['112A3', '112A4'] },
    { descripcion: "Parabrisas, Vidrios de Puertas",codigo:11,identificador:'Repuesto-1-11',subFamilia:['112A5'] },
    { descripcion: "Aire Acondicionado",codigo:12,identificador:'Repuesto-1-12',subFamilia:['112A7']},
    { descripcion: "Fluidos Subaru",codigo:4,identificador:'Accesorio-2-4',subFamilia:['112A9']  },
  ]
  
  const listaAcesorios = [
    { descripcion: "Accesorios Subaru",codigo:1,identificador:'Accesorio-2-1',subFamilia:['113A1'] },
    { descripcion: "Subaru Lifestyle",codigo:2,identificador:'Accesorio-2-2',subFamilia:['113A2']  },
    { descripcion: "Accesorios STI",codigo:3,identificador:'Accesorio-2-3',subFamilia:['113A3']  },  ]
  
  /*SEGMETOS DE ATAJOS */
    const segmentoMantenimiento = [
      { key: 1, discripcion: "Filtros de Aire", srcimg: "/marcas/subaru/mantenimiento/M1.png", url: "/shop",identificador:"Mantenimiento-1",query:["filtro de aire"]},
      { key: 2, discripcion: "Filtros de Aceite", srcimg: "/marcas/subaru/mantenimiento/M2.png", url: "/shop",identificador:"Mantenimiento-2",query:["filtro de aceite"] },
      { key: 3, discripcion: "Pastillas de Freno", srcimg: "/marcas/subaru/mantenimiento/M3.png", url: "/shop",identificador:"Mantenimiento-3",query:["pastillas de freno"] },
      { key: 4, discripcion: "Discos de Freno", srcimg: "/marcas/subaru/mantenimiento/M4.png", url: "/shop",identificador:"Mantenimiento-4",query:["disco de freno"] }, 
      { key: 5, discripcion: "Bujías", srcimg: "/marcas/subaru/mantenimiento/M5.png", url: "/shop", identificador:"Mantenimiento-5",query:["bujías","bujia","bujia"] }, 
      { key: 6, discripcion: "Fajas, correas y templadores", srcimg: "/marcas/subaru/mantenimiento/M6.png", url: "/shop" ,identificador:"Mantenimiento-6",query:["faja","correa","templador"]}, 
    ];
   
    const segmentoRecambio = [
      { key: 1, discripcion: "Alternadores", srcimg: "/marcas/subaru/recambio/R1.png", url: "/shop",identificador:"Recambio-1",query:["alternador"] },
      { key: 2, discripcion: "Arrancadores", srcimg: "/marcas/subaru/recambio/R2.png", url: "/shop",identificador:"Recambio-2",query:["arrancador"]  },
      { key: 3, discripcion: "Radiadores", srcimg: "/marcas/subaru/recambio/R3.png", url: "/shop",identificador:"Recambio-3",query:["radiador"]  },
      { key: 4, discripcion: "Suspensión", srcimg: "/marcas/subaru/recambio/R4.png",url: "/shop",identificador:"Recambio-4",query:["suspensión","suspension"]  },
      { key: 5, discripcion: "Limpiaparabrisas", srcimg: "/marcas/subaru/recambio/R5.png", url: "/shop",identificador:"Recambio-5",query:["limpiaparabrisas"]  },
      { key: 6, discripcion: "Todas las categorías", srcimg: "/marcas/subaru/recambio/R6.png", url: "/shop",identificador:"Recambio-6",query:[""]  },
    ];
   
    const segmentoAccesorios = [
      
      { key: 1, discripcion: "Carga", srcimg: "/marcas/subaru/accesorios/A1.png", url: "/shop",identificador:"Accesorios-1",query:[""]  },
      { key: 2, discripcion: "Embellecedor de Estribo", srcimg: "/marcas/subaru/accesorios/A2.png", url: "/shop",identificador:"Accesorios-2",query:[""]  },
      { key: 3, discripcion: "Cargomat y Pisos de Alfombra", srcimg: "/marcas/subaru/accesorios/A3.png", url: "/shop",identificador:"Accesorios-3",query:[""]  },   
      { key: 4, discripcion: "Perillas de cambio", srcimg: "/marcas/subaru/accesorios/A4.png", url: "/shop",identificador:"Accesorios-4",query:[""]  },
      { key: 5, discripcion: "Parrillas y Riel de Techo", srcimg: "/marcas/subaru/accesorios/A5.png", url: "/shop",identificador:"Accesorios-5",query:[""]  },
      { key: 6, discripcion: "Spoiler Post. y Estribo ", srcimg: "/marcas/subaru/accesorios/A6.png", url: "/shop",identificador:"Accesorios-6",query:[""]  },
      { key: 7, discripcion: "Kit de Seguros de Ruedas", srcimg: "/marcas/subaru/accesorios/A7.png", url: "/shop",identificador:"Accesorios-7",query:[""]  }, 
      { key: 8, discripcion: "Sistema de Remolque", srcimg: "/marcas/subaru/accesorios/A8.png", url: "/shop",identificador:"Accesorios-8",query:[""]  },
      { key: 9, discripcion: "Interior", srcimg: "/marcas/subaru/accesorios/A9.png", url: "/shop",identificador:"Accesorios-9",query:[""]  },
       
    ];
    
    const segmentoLifeStyle = [  
      { key: 1, discripcion: "Llaveros", srcimg: "/marcas/subaru/lifestyle/l1.png", url: "/shop" ,identificador:"LifeStyle-1",query:[""] },
      
    ];
    
    const listaCategoria = [
      { key: 1, title: <><span>Impreza</span><span> / XV</span></>, content: "Donde quiera que la te aventura conduzca, mantente conectado en tu Subaru.", srcimg: "/marcas/subaru/categoria/1.png" },
      { key: 2, title: <><span>Legacy </span></>, content: "Menos dificultad Más disfrute. Todo personalizado para ti y tu Subaru.", srcimg: "/marcas/subaru/categoria/2.png" },
      { key: 3, title: <><span>Forester</span></>, content: "Estilo Subaru sintonizado precisamente para usted y su Subaru.", srcimg: "/marcas/subaru/categoria/3.png" },
      { key: 4, title: <><span>Outback </span></>, content: "Ayuda a prevenir lo peor y a disminuir el impacto de lo inevitable en tu Subaru.", srcimg: "/marcas/subaru/categoria/4.png" },
      { key: 5, title:<><span>WRX</span><span> / STI</span></>, content: "Las modificaciones de Subaru que deseas para el poder que anhelas.", srcimg: "/marcas/subaru/categoria/5.png" },
      { key: 6, title:  <><span>BRZ </span></>, content: "Cuando lo que está afuera de tu Subaru es lo que cuenta.", srcimg: "/marcas/subaru/categoria/6.png" },
       
    ];
export{
    listaRepuesto,
    listaAcesorios,
    segmentoMantenimiento,segmentoRecambio,segmentoAccesorios,segmentoLifeStyle,listaCategoria
}  