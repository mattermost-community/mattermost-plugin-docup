# Doc Up
This plugin makes it easy to mark messages in Mattermost for further documentation so we can try to keep improving our shared knowledge. Known as doc'ing up. It is meant to work with documentation that lives in GitHub.

#### What does this do?
Marking something for documentation, otherwise known as doc'ing up, will create a GitHub issue with the title `Request for Documentation:<Short_Title>` in the corresponding repository for the documentation type that is selected. This GitHub issue can then be picked up by someone to edit and submit a pull request to update our official documentation.

#### Why create an issue instead of directly creating a pull request?
Creating a pull request requires intricate knowledge of our documentation repositories, making it difficult for someone not familiar to know exactly where to place the documentation. Creating an issue gives our writers and editors a list of items needing documenation while at the same time making a raw form of the documentation, in the GitHub issue, immediately searchable on the web.

The plugin is in alpha and is intended for use by Mattermost and its community.

## Install
Simply upload the plugin bundle [from the releases page](https://github.com/jwilander/mattermost-plugin-docup/releases) to your Mattermost server and configure the fields on the settings page.

You will need to a GitHub Personal Access Token that has write permissions to the repositories you configure in the settings.

## Usage
Click 'Doc Up' in a post dropdown menu:

![image](https://user-images.githubusercontent.com/2672098/64022415-24d8b380-cb04-11e9-9477-194da777411c.png)

Fill out the fields and click 'Mark for Documentation':

![image](https://user-images.githubusercontent.com/2672098/64022419-26a27700-cb04-11e9-8f08-73b63f85b39f.png)

A post is created linking to the new GitHub issue:

![image](https://user-images.githubusercontent.com/2672098/64022731-d677e480-cb04-11e9-9daf-6633fdfcb055.png)

A GitHub issue is created in the appropriate repo:

![image](https://user-images.githubusercontent.com/915956/64045095-527e2680-cb1d-11e9-9cd4-9fc3c3d3e745.png) 

## Configuration Options

In the plugin settings area, you can configure the repos for:
- Mattermost Admin Repository
- Mattermost Developer Docs Repository
- Mattermost Handbook Repository

You can also specify which Labels are applied to each newly created DocUp issues in GitHub.

