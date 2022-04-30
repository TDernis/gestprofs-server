# gestprofs-server
Bienvenue sur l'API de l'application gestprofs.
Il permet de faire fonctionner l'application: https://github.com/TDernis/gestprof
### Prérequis
nodejs, mysql et redis
## Configuration
Tout d'abord, il faut installer les dépendances du projet:
```
npm install
```
Ensuite il faut configurer les accès aux bases de données via le fichier ``config/default.json``:
```
{
  "express":{
    "url": "127.0.0.1",
    "port": 8082
  },
  "db": {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "gestprofs"
  },
  "privateToken": "031f796adb5c77b5ac7fa88d4ac74898"
}
```
Ensuite, il ne vous reste plus qu'à lancer le serveur:
```
npm run dev
```
