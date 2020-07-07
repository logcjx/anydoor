module.exports = {
    root:process.cwd(),
    hostname:'127.0.0.1',
    port: 9527,
    compress: /\.(html|js|css|md)/,
    cache:{
        maxAge:600,
        expires:true,
        cancheControl:true,
        lastModified:true,
        etag:true
    }
}