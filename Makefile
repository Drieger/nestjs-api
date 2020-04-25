run:
	@echo "#######################"
	@echo "# Running application #"
	@echo "#######################"
	docker-compose up --remove-orphans

build:
	@echo "########################"
	@echo "# Building application #"
	@echo "########################"
	docker build -t api-server:latest .
