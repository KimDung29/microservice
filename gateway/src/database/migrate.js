const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { logger } = require("../logs");

const modulesDir = path.join(process.cwd(), "../services");
let migrateCommands = [];

fs.readdirSync(modulesDir).forEach((module) => {
    const migrationsPath = path.join(
        modulesDir,
        module,
        "src",
        "database",
        "migrations"
    );
    if (fs.existsSync(migrationsPath)) {
        const command = `sequelize-cli db:migrate --migrations-path ${migrationsPath} --config src/database/dbConfig.js`;
        migrateCommands.push(command);
    }
});

const getCommands = async () => {
    return migrateCommands;
};

getCommands()
    .then((commands) => {
        const promises = commands.map((command) => {
            return new Promise((resolve, reject) => {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        logger.error(
                            `Error executing command: ${command}`,
                            error.stack
                        );
                        reject(error);
                    } else {
                        logger.info(
                            `Executed command successfully: ${command}`
                        );
                        resolve();
                    }
                });
            });
        });
        return Promise.all(promises);
    })
    .then(() => {
        logger.info("All migration commands executed successfully.");
    })
    .catch((error) => {
        logger.error("Error executing migration commands:", error.stack);
    });
