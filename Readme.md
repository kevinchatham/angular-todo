# Angular Todo

A basic todo application for brushing up on my Angular skills.

## Stack

- Angular 13
    - Angular Material
    - Tailwind CSS

- Azure Functions on Docker
    - .NET 6
    - EF Core Sqlite

## Getting Started

1. Install [Docker](https://docs.docker.com/get-docker/)

2. Install [Node.js 16 LTS](https://nodejs.org/en/download/)

3. Install [.NET 6 SDK](https://nodejs.org/en/download/)


4. Install Azure Functions Core Tools

    ```
    npm install -g azure-functions-core-tools
    ```

5. Install Angular CLI

    ```
    npm install -g @angular/cli
    ```

6. Restore Client Packages

    ```
    cd ./Client
    npm i
    ```

7. Restore Server Packages

    ```
    cd ./Server
    dotnet restore
    ```

8. Start Server Project

    ```
    cd ./Server
    func start
    ```

    1. (alt) Build and Run Docker Container

        ```
        docker build -t angular-todo .
        docker run -p 80:80 angular-todo

        // or just use the powershell script
        pwsh ./Server/Scripts/docker-run.ps1
        ```

9. Start Client Project

    ```
    ng serve
    ```

10. Done! At this point the Server should be running on http://localhost and the Client should be running on http://localhost:4200

