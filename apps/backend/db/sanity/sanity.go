package sanity_client

import (
	"errors"
	"os"

	sanity "github.com/sanity-io/client-go"
)

const (
	API_VERSION = "2021-03-25"
)

func CreateClient () (*sanity.Client, error) {
	projectId := os.Getenv("SANITY_PROJECT_ID")
	if projectId == "" {
		return nil, errors.New("Environmental variable SANITY_PROJECT_ID is missing.")
	}

	dataset := os.Getenv("SANITY_DATASET")
	if dataset == "" {
		return nil, errors.New("Environmental variable SANITY_DATASET is missing.")
	}

	token := os.Getenv("SANITY_AUTH_TOKEN")
	if token == "" {
		return nil, errors.New("Environmental variable SANITY_AUTH_TOKEN is missing.")
	}

	client, err := sanity.Version(API_VERSION).NewClient(
		os.Getenv("SANITY_PROJECT_ID"), 
		os.Getenv("SANITY_DATASET"), 
		sanity.WithCDN(false), 
		sanity.WithToken(os.Getenv("SANITY_AUTH_TOKEN")),
	)
	if err != nil {
		return nil, err
	}

	return client, nil
}