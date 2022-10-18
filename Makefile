build:
	docker build . -t ospiha-container

run: 
	docker run -p 3000:3000 -d ospiha-container:latest

up:
	docker-compose up

up-prod:
	docker-compose -f docker-compose.yml up

down:
	docker-compose down