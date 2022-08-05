package server

import (
	sanity_client "backend/db/sanity"
	"backend/modules/common"
	"backend/modules/portfolio/repo/implementation"
	"backend/modules/portfolio/service"

	"github.com/gofiber/fiber/v2"
)

type AuthorServer struct {
	AuthorService service.AuthorService
}

func NewAuthorServer() (*AuthorServer, error) {
	op := "server.NewAuthorServer"

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

	repo, repoErr := implementation.NewSanityAuthorRepo(client)
	if repoErr != nil {
		return nil, common.ApiError{
			Op:       op,
			Code:     common.EInternal,
			Detail:   "unexpected error",
			Inner:    repoErr,
			Internal: "failed to init NewSanityAuthorRepo",
		}
	}

	return &AuthorServer{
		AuthorService: service.NewAuthorService(repo),
	}, nil
}

func (server *AuthorServer) Mount(router fiber.Router) {
	router.Get("/author", server.ListHandler)
	router.Get("/author/:title", server.GetByTitleHandler) // TODO: rename to find
	router.Get("/author/:id/exists", server.ExistsHandler)
}

func (server *AuthorServer) ExistsHandler(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	result, err := server.AuthorService.Exists(ctx.Context(), id)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}

func (server *AuthorServer) ListHandler(ctx *fiber.Ctx) error {
	result, err := server.AuthorService.List(ctx.Context())
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}

func (server *AuthorServer) GetByTitleHandler(ctx *fiber.Ctx) error {
	title := ctx.Params("title")

	result, err := server.AuthorService.GetByTitle(ctx.Context(), title)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}
