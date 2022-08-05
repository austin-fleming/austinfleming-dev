package server

import (
	sanity_client "backend/db/sanity"
	"backend/modules/common"
	"backend/modules/portfolio/repo/implementation"
	"backend/modules/portfolio/service"

	"github.com/gofiber/fiber/v2"
)

type TagServer struct {
	TagService service.TagService
}

func NewTagServer() (*TagServer, error) {
	op := "server.NewTagServer"

	client, clientErr := sanity_client.CreateClient()
	if clientErr != nil {
		return nil, common.ApiError{
			Op:       op,
			Code:     common.EInternal,
			Detail:   "could not connect to data provider",
			Inner:    clientErr,
			Internal: "failed to init sanity client",
		}
	}

	repo, repoErr := implementation.NewSanityTagRepo(client)
	if repoErr != nil {
		return nil, common.ApiError{
			Op:       op,
			Code:     common.EInternal,
			Detail:   "unexpected error",
			Inner:    repoErr,
			Internal: "failed to init NewSanityTagRepo",
		}
	}

	return &TagServer{
		TagService: service.NewTagService(repo),
	}, nil
}

func (server *TagServer) Mount(router fiber.Router) {
	router.Get("/tag", server.ListHandler)
	router.Get("/tag/:title", server.GetByTitleHandler)
	router.Get("/tag/:id/exists", server.ExistsHandler)
}

func (server *TagServer) ExistsHandler(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	result, err := server.TagService.Exists(ctx.Context(), id)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}

func (server *TagServer) ListHandler(ctx *fiber.Ctx) error {
	result, err := server.TagService.List(ctx.Context())
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}

func (server *TagServer) GetByTitleHandler(ctx *fiber.Ctx) error {
	title := ctx.Params("title")

	result, err := server.TagService.GetByTitle(ctx.Context(), title)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}
