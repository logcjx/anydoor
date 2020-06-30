module.exports = (totalSize, req, res) => {
    console.log(req.range['range'])
    const range = req.range['range']
    if(!range){
        return {code: 200}
    }

    const sizes = range.match(/bytes =(\d*)-(\d*)/)
    const end = sizes[2] || totalSize -1 
    const star = sizes[0] || totalSize - end

    if(star > end || star < 0 || end > totalSize){
        return {code: 200}
    }
    res.setHeader('Accept-Ranges','bytes')
    res.setHeader('Content-Ranges',`bytes ${star}-${end}/${totalSize}`)
    res.setHeader('Content-Length',end - star)
    return {code:206,star:parseInt(star),end:parseInt(end)}
}