package db

import (
	"backend/modules/messageboard/user"

	"github.com/google/uuid"
	postgrest_go "github.com/nedpals/postgrest-go/pkg"
)

type SupabaseRepository struct {
	db *postgrest_go.Client
	user *supabaseUser
}

type supabaseUser struct {
	Id uuid.UUID `json:"id"`
	Username string `json:"username"`
	PublicAddress string `json:"public_address"`
	Nonce string `json:"nonce"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// *******************
// HELPERS
// *******************

// map DSO -> Model
func (su supabaseUser) ToEntity () (user.User, error) {
	entity := user.User{
		Id: su.Id,
		Username: user.UserUsername(su.Username),
		PublicAddress: user.UserPublicAddress(su.PublicAddress),
		Nonce: su.Nonce,
		CreatedAt: su.CreatedAt,
		UpdatedAt: su.UpdatedAt,
	}

	return entity, nil
}

func dsoFromEntity (userEntity user.User) (supabaseUser, error) {
	dso := supabaseUser{
		Id: userEntity.Id,
		Username: string(userEntity.Username),
		PublicAddress: string(userEntity.PublicAddress),
		Nonce: userEntity.Nonce,
		CreatedAt: userEntity.CreatedAt,
		UpdatedAt: userEntity.UpdatedAt,
	}
	
	return dso, nil
}

// *******************
// IMPLEMENTATION
// *******************
func (sr *SupabaseRepository) GetById (id uuid.UUID) (user.User, error) {
	userDso := supabaseUser{}

	// TODO: db gets addressed twice here. Should abstract in client?
	srErr := sr.db.From("user").Select("*").Single().Eq("id", id.String()).Execute(&userDso)
	if srErr != nil {
		return user.User{}, srErr
	}

	userEntity, err := userDso.ToEntity()
	if err != nil {
		return user.User{}, err
	}

	return userEntity, nil
}

func (sr *SupabaseRepository) GetByUsername (username user.UserUsername) (user.User, error) {
	userDso := supabaseUser{}

	srErr := sr.db.From("user").Select("*").Single().Eq("username", string(username)).Execute(&userDso)
	if srErr != nil {
		return user.User{}, srErr
	}

	userEntity, err := userDso.ToEntity()
	if err != nil {
		return user.User{}, err
	}

	return userEntity, nil
}

func (sr *SupabaseRepository) GetByPublicAddress (publicAddress user.UserPublicAddress) (user.User, error) {
	userDso := supabaseUser{}

	srErr := sr.db.From("user").Select("*").Single().Eq("public_address", string(publicAddress)).Execute(&userDso)
	if srErr != nil {
		return user.User{}, srErr
	}

	userEntity, err := userDso.ToEntity()
	if err != nil {
		return user.User{}, err
	}

	return userEntity, nil
}

func (sr *SupabaseRepository) Add (userEntity user.User) error {
	// TODO: add timeout
	userDso, mapErr := dsoFromEntity(userEntity)
	if mapErr != nil {
		return mapErr
	}

	// Only needed to satisfy the parameter of Execute()
	newEntry := supabaseUser{}

	insertErr := sr.db.From("user").Insert(userDso).Execute(&newEntry)
	if insertErr != nil {
		return insertErr
	}

	return nil
}

func (sr *SupabaseRepository) Delete (userId uuid.UUID) error {
	stringId := userId.String()

	deleteErr := sr.db.From("user").Delete().Eq("id", stringId).Execute(&supabaseUser{})
	if deleteErr != nil {
		return deleteErr
	}

	return nil
}