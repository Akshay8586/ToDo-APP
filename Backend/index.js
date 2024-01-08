const express = require("express");
const { createTodo, updateTodo } = require("./type");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todos", async function(req,res){
    const createPayLoad = req.body;
    const parsePayLoad = createTodo.safeParse(createPayLoad);
    if(!parsePayLoad.success){
        res.status(411).json({
            msg: "You sent the wrong inputs."
        });
        return;
    }
    //save to DB
    await todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description
    });

    res.json({
        msg: "Todo is created successfully."
    })
});

app.get("/todos", async function(req,res){
    const todos = await todo.find({});

    res.json({
        todos: todos
    })
});

app.put("/completed", async function(req,res){
    const updatePayLoad = req.body;
    const parsePayLoad = updateTodo.safeParse(updatePayLoad);
    if(!parsePayLoad.success){
        res.status(411).json({
            msg: "You sent the wrong inputs."
        });
        return;
    }

    await todo.updateOne({
        _id: req.body.id
    }, {
        completed: req.body.completed
    });

    res.json({
        msg: "todo marked completed."
    })
});

app.listen(3000);