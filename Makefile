.PHONY: log dist
include .env

build:
	pnpm run build

# docker-update:
# 	# presetup
# 	cd docker && npm i
# 	cd docker && docker buildx build -t mercstudio/node16-alpine:latest --platform=linux/amd64 . && docker push mercstudio/node16-alpine:latest

db-migrate:
	# npx prisma migrate resolve --applied XXXname
	# npx prisma migrate deploy
	npx prisma db pull
	npx prisma generate

db-rollback:
	npx prisma migrate resolve --rolled-back $(name)

# prisma-db-setup:
# 	npx prisma migrate resolve --applied 20210825051035_initial

db-gen:
	mkdir -p "prisma/migrations/$$(date +%Y%m%d%H%M%S)_$(name)"
	touch "prisma/migrations/$$(date +%Y%m%d%H%M%S)_$(name)/migration.sql"

# this push unique index to the database
prisma-push:
	npx prisma db push

prisma-update:
	# npx prisma db pull
	npx prisma generate
	mkdir -p ${PATH_TO_ADMIN}/src/prisma/client
	cp -Rf node_modules/.prisma/client/* ${PATH_TO_ADMIN}/src/prisma/client/

admin-model-gen:
	@[ "${name}" ] && sleep 0.1 || ( echo "name is not set"; exit 1 )
	npx nest g resource crud/$(name)
	npx eslint --fix admin/crud/$(name)

	sed -i -e "s/\@Controller('${name}/\@Controller('\/crud\/v1\/$(name)/g" admin/crud/$(name)/$(name).controller.ts
	# npx nest generate controller crud/$(name)
	# npx nest generate service crud/$(name)

cron:
	npx ts-node ./src/console $(name)

upgrade:
	npx ts-node-esm ./upgrade.ts
	npm update -S