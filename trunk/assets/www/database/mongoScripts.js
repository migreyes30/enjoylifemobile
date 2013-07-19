db.clientes.insert({
	"usuario":"jegordon",
	"nombre":"Juan Gordon",
	"password":"123456",
	"email":"jgordon87@gmail.com",
	"fechaRegistro":"2013-06-25",
	"peso":"99",
	"talla":"100",
	"planActual":"plan1"
})

db.clientes.insert({
	"usuario":"jgordon",
	"nombre":"Juan Gordon2",
	"password":"123456",
	"email":"jgordon87@gmail.com",
	"fechaRegistro":"2013-06-25",
	"peso":"89",
	"talla":"120",
	"planActual":"plan1"
})



db.plans.insert({
	"_id" : ObjectId("51c7d2063a0b5d51adcbd55f"),
	"plan" : "<h1>DIETA DE INICIO</h1><br /><br />Son 2 dias alternados, jamás mezclarlos. Es decir: Lunes: día 1, Martes: día 2, Miércoles:dia 1, Jueves: día 2, Viernes: día 1, Sábado: día 2 y Domingo: dia 1 El desayuno, comida y cena, deberán de ser elaborados con los elementos a continuación expuestos a libre demanda.<br /><h2>Día 1 </h2><br />Frutas: manzana, pera, toronja, mandarina, guayaba, melón, durazno, papaya Condimentos: hierbas de olor, clavo, pimienta, ajo, orégano, laurel, cebolla, chiles Carnes: carne asada, pechuga asada o hervida, pescado, atún en agua, claras de huevo Verduras: acelga, alcachofa, apio, berro, berenjena, col, coliflor, espinacas espárragos, flor de calabaza, hongos, lechuga, nopal, quelite, rábano, tomate verde, verdolagas. Entre comidas día 1: frutas permitidas (manzana, pera, toronja, mandarina, guayaba, melón, durazno, papaya) 2 limones al día opcional"
})

db.mensajes.insert({
	"mensaje":"Hola como estas , estuvo buena la #cena",
	"remitente":"jegordon",
	"status":"noLeido",
	"Fecha":"2013-06-25",
	"hashtags":["cena"]
})

db.hashtags.insert({
	"hashtag" : "desayuno"
})

db.hashtags.insert({
	"hashtag" : "cena"
})

db.especialistas.insert({
	"username":"@jgordon",
	"nombre":"Juan Gordon",
	"bio":"Desarrollador web",
	"type":"contact",
	"FechaRegistro":"2013-06-25"
})

db.especialistas.insert({
	"username":"@atrevino",
	"nombre":"Alejandro Treviño",
	"bio":"Mafioso ruso",
	"type":"contact",
	"FechaRegistro":"2013-07-25"
})
