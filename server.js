import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import * as crypto from "crypto";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

let users = [
  {
    login: 'admin',
    password: 'admin',
    pinnedMessage: null,
  }
];

let messages = [
  {
    id: crypto.randomUUID(),
    content: "Сообщение 1",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected: false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 2",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 3",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 4",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : true,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 5",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 6",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 7",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 8",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 9",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Сообщение 10",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Мы всё больше привыкаем к неформальному формату организации информации, где ключевое — не структура, а удобство и поиск. Примеры: Slack, Telegram, WhatsApp, вплоть до помощников типа Siri или Алиса.",
    created: Date.now(),
    user: 'admin',
    type: 'text',
    selected : true,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Napalm Death - You Suffer.mp3",
    created: Date.now(),
    user: 'admin',
    type: 'audio',
    path: 'files/Napalm Death - You Suffer.mp3',
    selected : true,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "https://netology.ru/",
    created: Date.now(),
    user: 'admin',
    type: 'link',
    selected : true,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "CyberpunkRED_JumpstartKit_rules.pdf",
    created: Date.now(),
    user: 'admin',
    type: 'file',
    path: 'files/CyberpunkRED_JumpstartKit_rules.pdf',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Gandalf.mp4",
    created: Date.now(),
    user: 'admin',
    type: 'video',
    path: 'files/Gandalf.mp4',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Phasmid.jpg",
    created: Date.now(),
    user: 'admin',
    type: 'photo',
    path: 'files/Phasmid.jpg',
    selected : false,
    coordinates: {
      latitude: 59.91007995605469,
      longitude: 30.50927925109863
    },
  },
];

let user = null;
let userMessages = [];


app.post('/login', bodyParser.json(), function(request, response) {
  const loginData = request.body;  
  user = users.find((user) => user.login === loginData.login);
    
  if (!user) {
    return response
      .send(JSON.stringify({ message: "User not found" }))
      .end();
  } else if (user.password !== loginData.password) {
    return response
      .send(JSON.stringify({ message: "Wrong password" }))
      .end();
  } else {
    return response.send(JSON.stringify(user.login)).end();
  }
});

app.get('/lastMessages', bodyParser.json(), function(request, response) {
  userMessages = messages.filter(message => message.user === user.login).reverse();
  let lazyMessages = userMessages.slice(0, 10);
      
  return response.send(JSON.stringify(lazyMessages)).end();
});

app.get('/lazyMessages', bodyParser.json(), function(request, response) { 
  const { id } = request.query;
  let firstMessage = userMessages.find((message) => message.id === id);
  let firstMessagePosition = userMessages.indexOf(firstMessage) + 1;
  let lastMessagePosition = firstMessagePosition + 9;
  let nextLazyMessages = userMessages.slice(firstMessagePosition, lastMessagePosition);
      
  return response.send(JSON.stringify(nextLazyMessages)).end();
});

app.get('/getPinnedMessage', bodyParser.json(), function(request, response) {
    return response.send(JSON.stringify(user.pinnedMessage)).end();
});

app.get('/getselectedMessages', bodyParser.json(), function(request, response) {
  let selectedMessages = userMessages.filter(message => message.selected === true);

  return response.send(JSON.stringify(selectedMessages)).end();
});

app.get('/pinMessageDelete', bodyParser.json(), function(request, response) {
  user.pinnedMessage = null;
  return response.status(204).end();
});

app.get('/selectMessage', bodyParser.json(), function(request, response) {
  const { id } = request.query;
  const message = messages.find((message) => message.id === id);
  const userMessage = userMessages.find((message) => message.id === id);
    if (!message) {
      return response
        .status(404)
        .send(JSON.stringify({ message: "Message not found" }))
        .end();
    }
    
    if (message.selected === true && userMessage.selected === true) {
      message.selected = false;
      userMessage.selected = false;
    } else {
      message.selected = true;
      userMessage.selected = true;
    }
    
    console.log(userMessage);
    return response.send(JSON.stringify(message)).end();
});

app.get('/messageById', bodyParser.json(), function(request, response) {
  const { id } = request.query;
  const message = messages.find((message) => message.id === id);
    if (!message) {
      return response
        .status(404)
        .send(JSON.stringify({ message: "Message not found" }))
        .end();
    }
    return response.send(JSON.stringify(message)).end();
});

app.post('/createMessage', bodyParser.json(), function(request, response) {
  try {
    const createData = request.body;
    const newMessage = {
      id: crypto.randomUUID(),
      content: createData.content,
      created: Date.now(),
      user : createData.user,
      type : createData.type,
      path : createData.path,
      selected : false,
      coordinates: createData.coordinates,
    };
    messages.push(newMessage);
    return response.send(JSON.stringify(newMessage)).end();
  } catch (error) {
    return response.status(500).send(JSON.stringify({ error: error.message }));
  }
});

app.get('/deleteById', bodyParser.json(), function(request, response) {
  const { id } = request.query;
  const message = messages.find((message) => message.id === id);
    if (user.pinnedMessage && user.pinnedMessage.id === message.id) {
      user.pinnedMessage = null;
    }

    if (message) {
      messages = messages.filter((message) => message.id !== id);
      return response.status(204).end();
    } else {
      return response
        .status(404)
        .send(JSON.stringify({ message: "Message not found" }))
        .end();
    }
});

app.get('/downloadFile', function(request, response) {
  const { id } = request.query;
  const message = messages.find((message) => message.id === id);
    if (message) {
      let path = message.path;
      return response.download(__dirname + '/' + path);
    } else {
      return response
        .status(404)
        .send(JSON.stringify({ message: "Message not found" }))
        .end();
    }
});

app.post('/pinMessage', bodyParser.json(), function(request, response) {
  const pinData = request.body;
  const message = messages.find((message) => message.id === pinData.id);
    if (message) {
      user.pinnedMessage = message;
      return response.send(JSON.stringify(user.pinnedMessage));
    } else {
      return response
        .status(404)
        .send(JSON.stringify({ message: "Message not found" }))
        .end();
    }
});

app.post('/updateById', bodyParser.json(), function(request, response) {
  const updateData = request.body;
  const message = messages.find((message) => message.id === updateData.id);
    if (message) {
      if (user.pinnedMessage && user.pinnedMessage.id === message.id) {
        user.pinnedMessage.content = updateData.content;
      }

      Object.assign(message, updateData);
      return response.send(JSON.stringify(message));
    } else {
      return response
        .status(404)
        .send(JSON.stringify({ message: "Message not found" }))
        .end();
    }
});

app.post('/uploadFile', fileUpload({}), function(request, response) {
  if(!request.files) {
    return response.status(404).send('No files were uploaded.');
  }
  const file = request.files.file;
  const path = "files/" + file.name;

  file.mv(path, (err) => {
    if(err) {
      return response.status(500).send(err);
    }
    return response.send(JSON.stringify(path));
  })
});

const port = process.env.PORT || 3000;
const bootstrap = async () => {
  try {
    app.listen(port, () =>
        console.log(`Server has been started on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();