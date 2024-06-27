import { Command } from "commander";

const program = new Command()

program
        .option('-d', 'Variable para debug', false)
        .option('-p <port>', 'Puerto del server', 8080)
        .option('--mode <mode>', 'modo de trabajo de mi server', 'production')
        .option('-u <user>', 'usuario utilizado en el aplicativo', 'no se ha declarado user')
        .option('-l, --letters [letters...]', 'specify letter')

program.parse()