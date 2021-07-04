const { Command, flags } = require('@oclif/command')
const { execSync } = require("child_process");
const { loadParams } = require("./paramStore");

class ExecWithAwsParamStoreCommand extends Command {
  async run() {
    const { flags } = this.parse(ExecWithAwsParamStoreCommand)
    const [env] = await loadParams()

    console.log(`Loaded ${Object.keys(env).length} secrets and running command "${flags.command}"`)
    await execSync(flags.command, {
      stdio: 'inherit',
      env: {
        ...process.env,
        ...env
      },
    });
  }
}

ExecWithAwsParamStoreCommand.description = `Execute script with environment variables from AWS parameter store
...

`

ExecWithAwsParamStoreCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  command: flags.string({ char: 'c', description: 'Command to execute with secrets' }),
}

module.exports = ExecWithAwsParamStoreCommand
