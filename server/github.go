package main

import (
	"context"
	"fmt"

	"github.com/google/go-github/github"
	"github.com/pkg/errors"
)

func (p *Plugin) getPluginRepos() ([]github.Repository, error) {
	config := p.getConfiguration()
	search := fmt.Sprintf("org:%s is:public mattermost-plugin", config.PluginRepositoryOrg)

	result, _, err := p.github.Search.Repositories(context.Background(), search, nil)
	if err != nil {
		return nil, err
	}

	return result.Repositories, nil
}

func (p *Plugin) verifyPluginRepo(repoName string) (string, error) {
	if len(repoName) == 0 {
		return "", errors.New("No repo name provided")
	}

	config := p.getConfiguration()
	search := fmt.Sprintf("org:%s is:public %s", config.PluginRepositoryOrg, repoName)

	result, _, err := p.github.Search.Repositories(context.Background(), search, nil)
	if err != nil {
		return "", err
	}

	repos := result.Repositories
	if len(repos) > 1 {
		return "", errors.New("Multiple plugin repos matching name " + repoName)
	}

	if len(repos) == 0 || *repos[0].Name != repoName {
		return "", errors.New("Could not find plugin repo matching name " + repoName)
	}

	ownerAndRepo := fmt.Sprintf("%s/%s", config.PluginRepositoryOrg, repoName)
	return ownerAndRepo, nil
}
