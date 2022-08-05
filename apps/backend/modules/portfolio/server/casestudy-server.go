package server

import (
	sanity_client "backend/db/sanity"
	"backend/modules/common"
	"backend/modules/portfolio/repo/implementation"
	"backend/modules/portfolio/service"

	"github.com/gofiber/fiber/v2"
)

type CasestudyServer struct {
	CasestudyService service.CasestudyService
}

func NewCasestudyServer() (*CasestudyServer, error) {
	op := "server.NewCasestudyServer"

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

	repo, repoErr := implementation.NewSanityCasestudyRepo(client)
	if repoErr != nil {
		return nil, common.ApiError{
			Op:       op,
			Code:     common.EInternal,
			Detail:   "unexpected error",
			Inner:    repoErr,
			Internal: "failed to init NewSanityCasestudyRepo",
		}
	}

	return &CasestudyServer{
		CasestudyService: service.NewCasestudyService(repo),
	}, nil
}

func (server *CasestudyServer) Mount(router fiber.Router) {
	router.Get("/casestudy", server.ListHandler)
	router.Get("/casestudy/:title", server.GetByTitleHandler) // TODO: rename to find
	router.Get("/casestudy/:id/exists", server.ExistsHandler)
}

func (server *CasestudyServer) ExistsHandler(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	result, err := server.CasestudyService.Exists(ctx.Context(), id)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}

func (server *CasestudyServer) ListHandler(ctx *fiber.Ctx) error {
	result, err := server.CasestudyService.List(ctx.Context())
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}

func (server *CasestudyServer) GetByTitleHandler(ctx *fiber.Ctx) error {
	title := ctx.Params("title")

	result, err := server.CasestudyService.GetByTitle(ctx.Context(), title)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}
