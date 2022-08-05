package user

import "github.com/google/uuid"

// https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
// In the future, there should be a validity check that an ETH address is valid.

type UserPublicAddress string
type UserUsername string

type User struct {
	Id uuid.UUID `json:"id"`
	Username UserUsername `json:"username"` // unique
	PublicAddress UserPublicAddress `json:"public_address"`
	Nonce string `json:"nonce"` // Should be reset after each usage.
	CreatedAt string `json:"created_at"` // TODO: change timestamps to time.Time
	UpdatedAt string `json:"updated_at"`
}

type UserDTO struct {
	Username string `json:"username"`
	PublicAddress UserPublicAddress `json:"publicAddress"`
	Nonce string `json:"nonce"`
}

func (user *User) isEqual(otherUser *User) bool {
	return user.Id == otherUser.Id
}