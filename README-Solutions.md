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
You are a consultant that has been recently assigned to a new client, Charon Cruises. This relatively small client is 
 well-known for transporting various goods from one bank of the Savannah River to the other. Your consulting group has
 been hired to build an online application that can help them manage the transportation of these goods. You are 
 tasked with building this web app from the ground up.
 
### Challenge #1
For the first sprint, the lead on your project wants you to generate the foundation for the project
 by creating a basic, containerized web server. When a POST request is made to the root path, the server should send 
 the contents of the request body in the response (i.e. sending a POST request with "test" in the body should return 
 a response with "test" in the body). This web server should be set up with a Dockerfile that generates a functional
 Docker image from the server source code.
  
Submit your source code for the web server and the Dockerfile to your solutions repository. This solution repository 
contains an app.yaml file.
#### DO NOT TOUCH THE APP.YAML FILE
This file is configured to deploy your web server to Google Cloud using the settings you define in your Dockerfile. 

#### Deliverable
The following files must be pushed to your repository:
 * The source code for your web server 
 * A Dockerfile that generates an image from your source code
#### Example
 ##### Input:  
 * POST /
 * Request body: "Hello World"
 ##### Output:  
 * 200 status  
 * Response body: "Hello World"
#### FAQ
 * You can use any web server you desire as long as the Dockerfile is configured to build the image 
 correctly.
 * Your web server MUST be set to listen on port 8080. This is the port that App Engine instances communicate on.

### Challenge #2
The circus has come to Savannah! This circus is renowned all over the world for its incredible animal-based acts, and 
Charon Cruises has been hired by the city to transport some of these acts across the river. Due to a 
miscommunication, however, a pack of ferocious lions has ended up in the same pen as a set of acrobatic sheep. Time 
is of the essence and the company has come to your team for help solving this conundrum.

The team at Charon Cruises gives you the following guidelines:
 * The lions and sheep must be moved across the river in the fewest number of moves possible
 * There must be at least one lion/sheep on the boat in order to move from one riverbank to the other
 * If there are more lions than sheep in any location, the lions will eat the sheep

Write an algorithm on your web server. This should take in the number of lions, sheep, and available space in 
the boat, and return the minimum number of trips required to move all of the animals across the river. 

#### Example
 * Input: GET /circus-planning?lions=3&sheep=3&space=2
 * Output: 11
 
Below is an optimal solution when the 3 lions and sheep, and the boat can carry 2 animals

| Move Count | Left Bank |      | River |      | Right Bank |
|:---:       |:---:      |:---: |:---:  |:---: |:---:       |
|0           |           |      | River | Raft | 3L 3S      |
|1           | 2L        | Raft | River |      | 1L 3S      |
|2           | 1L        |      | River | Raft | 2L 3S      |
|3           | 3L        | Raft | River |      | 3S         |
|4           | 2L        |      | River | Raft | 1L 3S      |
|5           | 2L 2S     | Raft | River |      | 1L 1S      |
|6           | 1L 1S     |      | River | Raft | 2L 2S      |
|7           | 1L 3S     | Raft | River |      | 2L         |
|8           | 3S        |      | River | Raft | 3L         |
|9           | 2L 3S     | Raft | River |      | 1L         |
|10          | 1L 3S     |      | River | Raft | 2L         |
|11          | 3L 3S     | Raft | River |      |            |
