package implementation

import (
	"backend/modules/common"
	"backend/modules/portfolio/dao"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/repo"
	"context"

	sanity "github.com/sanity-io/client-go"
)

type SanityCasestudyRepo struct {
	client *sanity.Client
}

// TODO: This can probably be DRY
func NewSanityCasestudyRepo(sanityClient *sanity.Client) (*SanityCasestudyRepo, error) {
	op := "NewSanityCasestudyRepo"

	if sanityClient == nil {
		return nil, common.ApiError{
			Op:       op,
			Code:     common.EInternal,
			Internal: "sanityClient == nil",
		}
	}

	return &SanityCasestudyRepo{client: sanityClient}, nil
}

/*
FRAGMENTS
*/
const casestudyProjection = `{
	...,
	author->{
		...,
		profileImage {
			...,
			asset ->
		}
	},
	primaryMedia{
		..., 
		image{
			..., 
			asset->
		},
		video{
			...,
			asset_data{
				...,
				asset->
			}
		}
	},
	tags[]->{
		...,
		'count': count(*[references(^._id)])
	}
}`

/*
QUERIES
*/
func (casestudyRepo *SanityCasestudyRepo) Exists(ctx context.Context, id string) (bool, error) {
	op := "SanityCasestudyRepo.Exists"

	query := `*[_type == "casestudy" && _id == $id][0]{_id}`

	result, queryErr := casestudyRepo.client.Query(query).Param("id", id).Do(ctx)
	if queryErr != nil {
		return false, common.ApiError{
			Op:     op,
			Detail: repo.ErrCasestudyRepoExists,
			Code:   common.EInternal,
			Inner:  queryErr,
		}
	}

	data := map[string]string{}
	unmarshalErr := result.Unmarshal(&data)
	if unmarshalErr != nil {
		return false, common.ApiError{
			Op:     op,
			Detail: repo.ErrCasestudyRepoExists,
			Code:   common.EInternal,
			Inner:  unmarshalErr,
		}
	}

	_, exists := data["_id"]

	return exists, nil
}

func (casestudyRepo *SanityCasestudyRepo) List(ctx context.Context) ([]entity.Casestudy, error) {
	op := "SanityCasestudyRepo.List"

	query := `*[_type == 'casestudy']` + casestudyProjection

	result, queryErr := casestudyRepo.client.Query(query).Do(ctx)
	if queryErr != nil {
		return nil, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrCasestudyRepoList,
			Inner:  queryErr,
		}
	}

	casestudyDaos := []dao.CasestudyDAO{}
	unmarshalErr := result.Unmarshal(&casestudyDaos)
	if unmarshalErr != nil {
		return nil, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrCasestudyRepoList,
			Inner:  unmarshalErr,
		}
	}

	casestudies := []entity.Casestudy{}
	for _, casestudyDao := range casestudyDaos {
		casestudyEntity, mapErr := casestudyDao.ToEntity()
		if mapErr != nil {
			return []entity.Casestudy{}, common.ApiError{
				Op:     op,
				Code:   common.EConflict,
				Detail: repo.ErrCasestudyRepoList,
				Inner:  mapErr,
			}
		}
		casestudies = append(casestudies, casestudyEntity)
	}

	return casestudies, nil
}

func (casestudyRepo *SanityCasestudyRepo) GetByTitle(ctx context.Context, title string) (entity.Casestudy, error) {
	op := "SanityCasestudyRepo.GetByTitle"

	query := `*[_type == "casestudy" && title == $title][0]` + casestudyProjection

	result, queryErr := casestudyRepo.client.Query(query).Param("title", title).Do(ctx)
	if queryErr != nil {
		return entity.Casestudy{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrCasestudyRepoGetByTitle,
			Inner:  queryErr,
		}
	}

	data := dao.CasestudyDAO{}
	unmarshalErr := result.Unmarshal(&data)
	if unmarshalErr != nil {
		return entity.Casestudy{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrCasestudyRepoGetByTitle,
			Inner:  unmarshalErr,
		}
	}

	if data.Id == "" {
		return entity.Casestudy{}, common.ApiError{
			Op:     op,
			Code:   common.ENotFound,
			Detail: repo.ErrCasestudyRepoGetByTitle,
		}
	}

	casestudyEntity, mapErr := data.ToEntity()
	if mapErr != nil {
		return entity.Casestudy{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrCasestudyRepoGetByTitle,
			Inner:  mapErr,
		}
	}

	return casestudyEntity, nil
}
