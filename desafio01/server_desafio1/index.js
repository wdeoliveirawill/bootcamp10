const express = require("express");

const server = express();
server.use(express.json());

const projects = [];


server.use((req, res, next)=>{
    console.count(`Número de requisições`);
    next();
});

function checkIfProjectExists(req, res, next){
    const {id} = req.params;
    const index = projects.findIndex(proj => proj.id == id);
    if (index < 0){
        res.status(400).json({"message":`Projeto não encontrado para o id ${id}`});
    }
    next();
    
}

server.get("/projects", (req, res)=>{
    return res.json(projects);
});

server.post("/projects", (req, res)=>{
    const {id, title} = req.body;
    const project_data = {
        id,
        title,
        tasks:[]
    }

    projects.push(project_data);
    return res.json(project_data);

});

server.put("/projects/:id", checkIfProjectExists, (req, res)=>{
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(proj => proj.id == id);

    project.title = title;

    return res.json(project);

});

server.delete("/projects/:id", checkIfProjectExists, (req, res)=>{
    const {id} = req.query;

    const index = projects.findIndex(proj => proj.id == id);
    projects.splice(index, 1);

    return res.send()

});

server.post("/projects/:id/tasks", checkIfProjectExists, (req, res)=>{
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(proj => proj.id == id);
    project.tasks.push(title);

    return res.json(project);

});


server.listen(3000);