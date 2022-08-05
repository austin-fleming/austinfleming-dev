package router

import (
	"backend/modules/common"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

func New() *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			preparedError := common.PrepareError(err)
			// ctx.Status(preparedError.Code).JSON(preparedError)

			errDTO := struct {
				Status        int                   `json:"status"`
				Title         string                `json:"title"`
				Detail        string                `json:"detail"`
				Instance      string                `json:"instance"`
				InvalidFields []common.InvalidField `json:"invalidFields,omitempty"`
			}{
				Status:        preparedError.Code,
				Title:         common.ETitles[preparedError.Code],
				Detail:        preparedError.Detail,
				Instance:      ctx.Route().Path,
				InvalidFields: preparedError.InvalidFields,
			}

			return ctx.Status(preparedError.Code).JSON(errDTO)
		},
	})

	// TODO: refine cors settings
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, HEAD, PUT, PATCH, POST, DELETE",
	}))
	app.Use(logger.New(logger.Config{
		Next: func(ctx *fiber.Ctx) bool {
			return ctx.Path() == "/metrics" || ctx.Path() == "/favicon.ico"
		},
		Format:     "${time} ${latency} [${ip}]:${port} ${pid} ${locals:requestid}\n${status}-${method}${path}\nsent:${bytesSent} received:${bytesReceived}\n>>${error}",
		TimeFormat: "2006-01-02_15:04:05",
		TimeZone:   "America/Los_Angeles",
	}))
	app.Use(requestid.New())
	app.Use(recover.New())

	app.Get("/metrics", monitor.New())

	return app
}
