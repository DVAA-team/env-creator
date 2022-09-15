import inquirer from "inquirer";
import fs from 'fs';
const path = './.env';
const fileQuestions = [
    {
        type: 'list',
        name: 'create',
        message: fs.existsSync(path)
            ? 'Файл .env уже существует, перезаписать?'
            : 'Файл .env не существует, создать новый?',
        choices: ['yes', 'no'],
    }
];
const mainQuestions = [
    {
        name: 'nodeEnv',
        message: 'NODE_ENV',
        default: 'development'
    },
    {
        name: 'port',
        message: 'PORT',
        default: '3000'
    },
    {
        name: 'dbPort',
        message: 'DB_PORT',
        default: '5432'
    },
    {
        name: 'dbHost',
        message: 'DB_HOST',
        default: 'db'
    },
    {
        name: 'debug',
        message: 'DEBUG',
        default: 'galaga:*'
    },
    {
        name: 'postgresUser',
        message: 'POSTGRES_USER',
        default: 'user'
    },
    {
        name: 'postgresPassword',
        message: 'POSTGRES_PASSWORD',
        default: 'password'
    },
    {
        name: 'postgresDb',
        message: 'POSTGRES_DB',
        default: 'root'
    },
    {
        name: 'pgAdminEmail',
        message: 'PGADMIN_DEFAULT_EMAIL',
        default: 'admin'
    },
    {
        name: 'pgAdminPassword',
        message: 'PGADMIN_DEFAULT_PASSWORD',
        default: 'root'
    },
    {
        name: 'pgAdminPort',
        message: 'PGADMIN_LISTEN_PORT',
        default: '80'
    },
];

inquirer
    .prompt(fileQuestions)
    .then(answers => {
        if (answers.create === 'yes') {
            return inquirer.prompt(mainQuestions);
        } else {
            return Promise.resolve(undefined);
        }
    }).then(res => {
    if (!res) {
        console.log('Ничего не сделано');
    } else {
        const {
            nodeEnv,
            port,
            dbPort,
            dbHost,
            debug,
            postgresUser,
            postgresPassword,
            postgresDb,
            pgAdminEmail,
            pgAdminPassword,
            pgAdminPort
        } = res;

        let file = `NODE_ENV=${nodeEnv}\nPORT=${port}\nDB_PORT=${dbPort}\nDB_HOST=${dbHost}\nDEBUG=${debug}\nPOSTGRES_USER=${postgresUser}\nPOSTGRES_PASSWORD=${postgresPassword}\nPOSTGRES_DB=${postgresDb}\nPGADMIN_DEFAULT_EMAIL=${pgAdminEmail}\nPGADMIN_DEFAULT_PASSWORD=${pgAdminPassword}\nPGADMIN_LISTEN_PORT=${pgAdminPort}`;
        fs.writeFileSync(".env", file);
        console.log('Файл успешно создан/перезаписан');
    }
});
