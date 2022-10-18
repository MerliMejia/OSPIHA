# OSPIHA

**O**pen **S**ource **P**erceptual **I**mage **H**ashing **A**PI.

<br />

The idea was to create an open-source API public to the world that can provide the following features:

- Send an image and it will return the block hash perceptual image hashing string.

- Send 2 images and it will return the Hamming Distance between their hashing so you can have a % of how similar they are.

<br />

This will be an open-source project so it will be free forever, we are going to provide ways for people to donate to help keep the servers running and also to get better servers.

This source code will be used to create a web and mobile app for finding island information in the game Sea of Thieves.

## Doc

Run eveything:
```
docker-compose up
```
Run DB:
```
docker-compose db
```
Run PGAdmin:
```
docker-compose pgadmin
```
Run API:
```
docker-compose api
```
Run tests:
```
docker-compose run --rm api npm run test
```
