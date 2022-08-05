package user

import (
	"errors"

	"github.com/google/uuid"
)

var (
	ErrorUserNotFound = errors.New("The user was not found in the repository.")
	ErrorFailedToAddUser = errors.New("Failed to add user to the repository.")
	ErrorUpdateUser = errors.New("Failed to update the user in the repository.")
)

type UserRepository interface {
	GetById(id uuid.UUID) (User, error)
	GetByUsername(username UserUsername) (*User, error)
	GetByPublicAddress(publicAddress UserPublicAddress) (*User, error)
	Add(user User) error
	Delete(user User) error
}