import { Body, Controller, Post } from '@nestjs/common';
import * as moment from 'moment';
import clientGraphql from 'src/utils/graphqlClient';

@Controller('discord')
export class DiscordController {
  @Post('nuevo-usuario')
  async create(@Body() payload: Respuesta) {
    /* Captura de webhook */

    if (!payload.form) {
      return { ok: true };
    }
    const {
      form: { questions },
      answer: { answers },
    } = payload;

    const emailID = findId('Email', questions);
    /*   const discordID = findId('Usuario', questions); */

    const emailResponse = findResponse(emailID, answers);
    /*   const discordResponse = findResponse(discordID, answers); */

    const response = await clientGraphql.request(
      `mutation crearUsuario($object: usuarios_insert_input!) {
        insert_usuarios_one(object: $object, on_conflict: {constraint: usuarios_email_key, update_columns: [created_at,  email]}) {
          id
        }
      }

  `,
      {
        object: {
          email: emailResponse,
          /*  user: discordResponse, */
        },
      },
    );

    return {
      message: 'Usuario almacenado correctamente!',
      response,
    };
  }

  @Post('checkUsers')
  async check() {
    const { usuarios } = await clientGraphql.request(`query getUsers {
      usuarios {
        created_at
        id
      }
    }
    `);

    const usuariosAntiguos = usuarios
      .map((user) => ({
        ...user,
        semanas: moment().diff(moment(user.created_at), 'weeks'),
      }))
      .filter((user) => user.semanas > 8)
      .map((user) => user.id);

    await clientGraphql.request(
      `mutation MyMutation($users: [uuid!]!) {
      delete_usuarios(where: {id: {_in: $users}}) {
        affected_rows
      }
    }

    `,
      { users: usuariosAntiguos },
    );

    return {
      message: 'OK',
    };
  }
}

type Respuesta = {
  form: Form;
  answer: Answer;
};

type Form = {
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
