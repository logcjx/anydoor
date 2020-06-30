const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const path = require('path')
const handlebars = require('handlebars')
const tplPath = path.join(__dirname,"../template/dir.tpl")
const source = fs.readFileSync(tplPath)
const template = handlebars.compile(source.toString())
const conf = require('../config/defaultConfig.js')
const mime = require('./mime.js')
const compress = require('./compress.js')
const ranges = require('./range.js')
module.exports=async function(req, res, filePath){
    try{
        const stats =  await stat(filePath)
        if(stats.isFile()){
            const contentType = mime(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type',contentType)
            let rs
            const {code,start,end} = ranges(stats.size, req, res)
            if(code == 200){
                rs = fs.createReadStream(filePath)
            }else{
                rs = fs.createReadStream(filePath,{start,end})
            }
            rs = fs.createReadStream(filePath)
            if(filePath.match(conf.compress)){
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        }else if(stats.isDirectory()){
            const readdirs = await readdir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type','text/html')
            const dir = path.relative(conf.root,filePath)
            const data = {
                title:path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                readdirs : readdirs.map(file => {
                    return{
                        file,
                        icon:mime(file)
                    }
                })
            }
            res.end(template(data))
        }
    }catch(ex){
        res.statusCode = 404
        res.setHeader('Content-Type','text/html')
        /* res.end(`${filePath} is not a directory or file`) */
        res.end(`${filePath}/${ex}`)
    }
}