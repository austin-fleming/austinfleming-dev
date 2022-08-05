package main

import (
	portfolioServer "backend/modules/portfolio/server"
	"backend/router"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	envLoadErr := godotenv.Load()
	if envLoadErr != nil {
		log.Fatal(envLoadErr)
	}

	app := router.New()

	apiGroup := app.Group("/api/v1")
	portfolioGroup := apiGroup.Group("/portfolio")

	tags, tagServerErr := portfolioServer.NewTagServer()
	if tagServerErr != nil {
		// TODO: handle better
		panic(tagServerErr.Error())
	}
	tags.Mount(portfolioGroup)

	authors, authorsServerErr := portfolioServer.NewAuthorServer()
	if authorsServerErr != nil {
		panic(authorsServerErr.Error())
	}
	authors.Mount(portfolioGroup)

	casestudies, casestudiesServerErr := portfolioServer.NewCasestudyServer()
	if casestudiesServerErr != nil {
		panic(casestudiesServerErr.Error())
	}
	casestudies.Mount(portfolioGroup)

	// Catch missing routes and methods.
	app.Use(func(ctx *fiber.Ctx) error {
		return ctx.SendStatus(404)
	})

	log.Fatal(app.Listen(":80"))
}
