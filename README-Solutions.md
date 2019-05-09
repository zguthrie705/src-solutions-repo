# Slalom ATL Recruiting Challenge
You are reading this because you have successfully been added as a collaborator to your private solutions repository.
 You are now ready to get started!

## Getting Started
Create a clone of this Git repository on your local machine. You will be able to upload all solution attempts through
 this repo.

### Returning to the Challenge
Click [the following link](https://astral-subject-238413.appspot.com/) to return to the Recruiting 
Challenge website. The challenge descriptions provided below will also be shown on the website.

## The Challenge
You are a consultant that has been recently assigned to a new client, Transatlantic Transport Inc. This client has asked
 for an online application that can help them handle the transportation of various goods across the Atlantic Ocean. 
 You are tasked with building this web app from the ground up.
 
### Challenge #1
For the first sprint, the lead on your project wants you to generate the foundation for the project
 by creating a basic, containerized web server. When a GET request is made to the root path, the server should send a
 basic response ("Web server initialized!") to showcase the fact that the server is running. This web server should 
 be set up with a Dockerfile that generates a functional Docker image from the server source code.
  
To pass this stage of the challenge, a Docker image must be generated from your code and Dockerfile. Then, the Docker
 image must be put into a container and successfully echo the solution string when the server is started.

#### Deliverable
The following files must be pushed to your repository:
 * The source code for your web server 
 * A Dockerfile that generates an image from your source code
#### Example
 * Input: GET /
 * Output: Web server initialized!
#### FAQ
 * You can use any web server you desire as long as the Dockerfile is configured to build the image 
 correctly.

### Challenge #2