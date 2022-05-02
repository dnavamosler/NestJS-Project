import { Body, Controller, Post } from '@nestjs/common';
import clientGraphql from 'src/utils/graphqlClient';

@Controller('discord')
export class DiscordController {
  @Post('nuevo-usuario')
  async create(@Body() payload: Respuesta) {
    /* Captura de webhook */
    const {
      form: { _id, questions },
      answer: { answers },
    } = payload;

    const emailID = findId('Email', questions);
    const discordID = findId('Usuario', questions);

    const emailResponse = findResponse(emailID, answers);
    const discordResponse = findResponse(discordID, answers);

    const response = await clientGraphql.request(
      `mutation crearUsuario($object: usuarios_insert_input!) {
    insert_usuarios_one(object: $object) {
      id
    }
  }
  `,
      {
        object: {
          id: _id,
          email: emailResponse,
          user: discordResponse,
        },
      },
    );

    return {
      message: 'Usuario almacenado correctamente!',
      response,
    };
  }
}

type Respuesta = {
  form: Form;
  answer: Answer;
};

type Form = {
  _id: string;
  questions: [Questions];
};

type Questions = {
  question: string;
  _id: string;
};

type Answer = {
  answers: [Response];
};

type Response = {
  q: string;
  t: string;
};

const findId = (id: string, questions: [Questions]) =>
  questions.find((q) => q.question === id)._id || null;

const findResponse = (id: string, answers: [Response]) =>
  answers.find((a) => a.q === id).t || null;
