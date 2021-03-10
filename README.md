# CMPE 202 Team Project

## Project setup process

## Set up amplify react app

- Clone the repo using ‘git clone <git_url>’

- Navigate to the cloned repo , open the code editor you chose to use and run the command : npm install -g @aws-amplify/cli

- Load node modules for the cloned project using 'npm install'

- Make sure you are logged into aws console before amplify configure

- Set up amplify using commnd : amplify configure

  - Press enter to continue
  - set region : us-east-1
  - set user name: [username]
  - set access key : [access_key]
  - set secret key : [secret_key]
  - Set profile name for the user created: [profile_name]
    You are going to use this IAM user for the development

  - Initialize Amplify on the repo using command : amplify init

  - Set name of the project (default)
  - Name of the environment:dev (DEFAULT)
  - Type of app : javascript (default)
  - Javascript framework: react (default)
  - Source directory path: src (default)
  - Distribution directory path: build (default)
  - Build command : npm run-script build (default)
  - Start command : npm run-script start (default)
  - Use aws profile :‘Yes’
    Select the profile created previously: [profile_name]

- Add authentication to the react app using ‘amplify add auth’ (go with the default values) and select the following for the prompted :

  - Default authentication and security configuration : Default configuration
  - User should be able to login with : username
  - Configure advanced settings : No

- Update ‘aws-exports.js’ using with the user pool details using command : ‘amplify push’ , provide ‘Y’ when prompted

- npm install --save aws-amplify @aws-amplify/ui-react

- npm start
