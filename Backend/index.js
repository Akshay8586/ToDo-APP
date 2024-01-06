const express = require("express");
const { createTodo, updateTodo } = require("./type");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async function(req,res){
    const createPayLoad = req.body;
    const parsePayLoad = createTodo.safeParse(createPayLoad);
    if(!parsePayLoad.success){
        res.status(411).json({
            msg: "You sent the wrong inputs."
        });
        return;
    }
    //save to DB
    await todo.Create({
        title: createPayLoad.title,
        description: createPayLoad.description
    });

    res.json({
        msg: "Todo is created successfully."
    })
});

app.get("/todo", async function(req,res){
    const todos = await todo.find();

    res.json({
        todos
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

    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    });

    res.json({
        msg: "todo marked completed."
    })
});