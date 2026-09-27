# 🚫🧱 No Borders

Stickers worldwide. Petite app perso et open source pour garder la trace de tous les stickers que je colle dans le monde.

- 🏠 **Page d'accueil** : compteur de stickers et de pays, ville n°1, sticker le plus éloigné de chez moi, date de mon premier sticker et 3 « stickers du jour »
- 📷 **Je prends le sticker en photo** → la position GPS exacte est enregistrée automatiquement
- 🌍 **Globe 3D** qu'on fait tourner, sur fond de galaxie, en vue satellite (couleurs réelles) ou plan : du globe entier jusqu'à la rue, avec tous mes stickers (miniatures, regroupement quand on dézoome)
- 🔍 **Photos zoomables** : pincer, double-taper ou molette
- 🟥 **Pays visités coloriés** en rouge sur le globe
- 🔔 **Rappel de sauvegarde** sur l'accueil quand la dernière date de plus d'un mois ou que 5 nouveaux stickers ne sont pas sauvegardés
- 🖼️ **Galerie** triée par date, filtrable par pays (🇫🇷 🇰🇭 🇪🇸…) et par état, avec **recherche** (ville, quartier, pays, note, mois)
- 🧱 **Suivi des stickers** : toujours là, surstické, décollé ou restické. Chaque surstick est pris en photo et s'ajoute à l'historique de l'emplacement ; la photo d'origine reste la principale, avec les surstickers en mini-vignettes en bas à droite
- 🏙️ Ville et pays trouvés automatiquement (OpenStreetMap)
- ✏️ Position corrigeable à la main (toucher la carte, glisser le point, ou chercher un lieu)
- 💾 Sauvegarde / restauration en un fichier
- 📴 Fonctionne hors ligne, s'installe sur l'écran d'accueil comme une vraie app

Aucun serveur, aucun compte, aucune clé API : les photos restent **sur ton téléphone**.

## Mettre l'app en ligne (gratuit, 5 min) avec GitHub Pages

La géolocalisation et l'appareil photo ne marchent que sur une adresse **https**. GitHub Pages en fournit une gratuitement.

1. Crée un compte sur [github.com](https://github.com) si tu n'en as pas.
2. Crée un nouveau dépôt public, par exemple `mes-stickers`.
3. Envoie les fichiers de ce dossier dans le dépôt (bouton **Add file → Upload files**, ou `git push`).
4. Dans le dépôt : **Settings → Pages → Source : Deploy from a branch → `main` / `(root)` → Save**.
5. Après une minute, l'app est en ligne sur `https://TON-PSEUDO.github.io/mes-stickers/`.

> Les photos ne sont **jamais** envoyées sur GitHub : le site ne contient que le code, tes stickers restent dans ton téléphone.

## L'installer sur le téléphone

- **iPhone (Safari)** : ouvre l'adresse → bouton Partager → **Sur l'écran d'accueil**.
- **Android (Chrome)** : ouvre l'adresse → menu ⋮ → **Installer l'application**.

Au premier sticker, accepte l'accès à la **position** et à l'**appareil photo**.

⚠️ Sur iPhone, installe-la bien sur l'écran d'accueil et utilise-la depuis là : Safari peut effacer les données des sites non installés qu'on n'a pas ouverts depuis longtemps.

## Sauvegarde

Tes stickers sont stockés dans l'app, sur l'appareil. **Réglages → Exporter une sauvegarde** crée un fichier `.json` (photos incluses) à ranger sur iCloud Drive / Google Drive. **Importer une sauvegarde** permet de tout restaurer ou de passer sur un nouveau téléphone. Pense à exporter de temps en temps !

## Tester sur l'ordinateur

```bash
python3 -m http.server 8000
```

puis ouvre http://localhost:8000.

## Comment c'est fait

Un seul fichier `index.html` (HTML/CSS/JS sans framework ni build) :

- [MapLibre GL JS](https://maplibre.org) pour le globe 3D et les cartes
- Fonds de carte : imagerie satellite [Esri World Imagery](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9) et plan [OpenStreetMap](https://www.openstreetmap.org/copyright)
- [Nominatim](https://nominatim.org) pour retrouver quartier/ville/pays et chercher un lieu
- Contours des pays : [Natural Earth](https://www.naturalearthdata.com) (domaine public), simplifiés dans `countries.geojson`
- Drapeaux : [flag-icons](https://github.com/lipis/flag-icons) (MIT)
- IndexedDB pour stocker photos et positions sur l'appareil
- Service worker (`sw.js`) + manifest pour l'installation et le hors-ligne

## Licence

MIT — fais-en ce que tu veux.
