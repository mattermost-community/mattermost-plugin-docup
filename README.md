# Doc Up
This plugin makes it easy to mark messages in Mattermost for documentation. Known as doc'ing up. It is meant to work with documentation that lives in GitHub.

The plugin is in alpha.

## Install
Simply upload the plugin bundle to your Mattermost and configure the fields on the settings page.

You will need to a GitHub Personal Access Token that has write permissions to the repositories you configure in the settings.

## Usage
Click 'Doc Up' in a post dropdown menu:

![image](https://user-images.githubusercontent.com/2672098/64022415-24d8b380-cb04-11e9-9477-194da777411c.png)

Fill out the fields and click 'Mark for Documentation':

![image](https://user-images.githubusercontent.com/2672098/64022419-26a27700-cb04-11e9-8f08-73b63f85b39f.png)

A post is created linking to the new GitHub issue:

![image](https://user-images.githubusercontent.com/2672098/64022731-d677e480-cb04-11e9-9daf-6633fdfcb055.png)

## FAQ

#### What does this do?
Marking something for documentation, otherwise known as doc'ing up, will create a GitHub issue in the corresponding repository for the documentation type that is selected. This GitHub issue can then be picked up by someone to edit and submit a pull request to update our official documentation.

#### Why create an issue instead of directly creating a pull request?
Creating a pull request requires intricate knowledge of our documentation repositories, making it difficult for someone not familiar to know exactly where to place the documentation. Creating an issue gives our writers and editors a list of items needing documenation while at the same time making a raw form of the documentation, in the GitHub issue, immediately searchable on the web.
