var fs = require('fs');

//validate
if (process.argv[2] == 'undefined') process.exit();
var projectName = process.argv[2];
var linkToProject = __dirname;

//START - create folder
async function createFolder() {
    await fs.mkdirSync(projectName);
    await fs.mkdirSync(`${linkToProject}/${projectName}/bin`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src`);

    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/public`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/public/homepage`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/public/adminpage`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/routes`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/routes/homepage`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/routes/adminpage`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/views`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/views/homepage`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/views/adminpage`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/app/views/error`);

    await fs.mkdirSync(`${linkToProject}/${projectName}/src/model`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/model/schema`);

    await fs.mkdirSync(`${linkToProject}/${projectName}/src/config`);
    await fs.mkdirSync(`${linkToProject}/${projectName}/src/services`);
};
//END - create folder

//START - create file
async function createFile() {
    //package.json
    var content;
    var data;
    var listLinkFiles = [
        "./template/package.json",
        "./template/app.js",
        "./template/.gitignore",
        "./template/bin/www",
        "./template/src/app/routes/index.js",
        "./template/src/app/routes/homepage/index.js",
        "./template/src/app/routes/adminpage/index.js",
        "./template/src/app/views/homepage/index.ejs",
        "./template/src/app/views/adminpage/index.ejs",
        "./template/src/app/views/error/index.ejs",
        "./template/src/config/index.js",
        "./template/src/config/passport.js",
        "./template/src/model/connect.js",
        "./template/src/model/schema.js",
        "./template/src/model/schema/index.js",
        "./template/src/model/schema/users.js",
        "./template/src/services/checkPermission.js",
        "./template/src/services/convert.js",
        "./template/src/services/returnToUser.js",
        "./template/src/services/uploadFile.js",
    ];

    for (let i = 0; i < listLinkFiles.length; i++) {
        content = await fs.readFileSync(listLinkFiles[i]);
        // console.log(content);
        data = content.toString().replace(new RegExp("</project_name>", 'g'), projectName);
        await fs.writeFileSync(`${linkToProject}/${projectName}/${listLinkFiles[i].slice(11)}`, data);
    };
};
//END - create file


(async () => {
    await createFolder();
    await createFile();
})();

