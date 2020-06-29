const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
module.exports=async function(req, res, filePath){
    try{
        const stats =  await stat(filePath)
        if(stats.isFile()){
            res.statusCode = 200
            res.setHeader('Content-Type','text/html')
            fs.createReadStream(filePath).pipe(res)
        }else if(stats.isDirectory()){
            const readdirs = await readdir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type','text/html')
            res.end(readdirs.join(','))
        }
    }catch{
        res.statusCode = 404
        res.setHeader('Content-Type','text/html')
        res.end(`${filePath} is not a directory or file`)
    }
}