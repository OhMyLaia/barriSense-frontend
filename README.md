# BarriSense Frontend

Aquest projecte és la interfície frontend de barriSense, una aplicació pensada per monitoritzar i visualitzar dades relacionades amb barris.

## Requisits previs

Abans d’instal·lar i executar el projecte en local, assegura’t de tenir instal·lat al teu equip:

- **Node.js** (versió recomanada: 16.x o superior)
- **npm** o **yarn**

## Instal·lació

Clona el repositori

```sh
git clone https://github.com/OhMyLaia/barriSense-frontend.git
cd barriSense-frontend
```

Instal·la les dependències

Amb **npm**:

```sh
npm install
```

O amb **yarn**:

```sh
yarn install
```

## 🔑 Configuració del fitxer .env

Per executar aquest projecte localment, has de configurar les variables d’entorn. Segueix aquests passos:

Necessitaràs:
- Una clau de Mapbox. Pots obtenir la teva a la [pàgina oficial de Mapbox](https://www.mapbox.com/)

## Executa el projecte en mode desenvolupament

Amb **npm**:

```sh
npm start
```

O amb **yarn**:

```sh
yarn start
```

El servidor local normalment estarà disponible a [http://localhost:3000](http://localhost:3000) o el port que indiqui la consola.

## Scripts comuns

- `npm start` / `yarn start`: Inicia l’aplicació en mode desenvolupament.
- `npm run build` / `yarn build`: Genera una versió optimitzada per a producció.
- `npm test` / `yarn test`: Executa els tests (si estan configurats).

## Estructura del projecte

```
barriSense-frontend/
├── public/
├── src/
├── package.json
├── README.md
└── ...
```